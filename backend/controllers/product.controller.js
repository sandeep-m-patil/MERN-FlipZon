import mongoose from 'mongoose';
import Product from "../models/Product.model.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error("Error in fetching Products", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        console.error("Error in Creating Product", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Product ID"
            });
        }

        // Validate required fields
        if (!updates.name || !updates.price || !updates.image) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        // Convert price to number if it's a string
        if (typeof updates.price === 'string') {
            updates.price = parseFloat(updates.price);
        }

        // Validate price is a positive number
        if (isNaN(updates.price) || updates.price <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be a positive number"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updates },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        console.log('Product updated successfully:', updatedProduct);

        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error("Error in Updating Product:", error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log("Error in Deleting Product", error.message);
        res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
}
