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
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Product ID"
        });
    }

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    } catch (error) {
        console.error("Error in Updating Product", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
