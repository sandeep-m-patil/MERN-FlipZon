import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    });
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        try {
            const { success, message } = await deleteProduct(pid);
            showToast(success, message);
        } catch (error) {
            showToast(false, "Failed to delete product");
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            console.log('Updating product:', {
                id: product._id,
                updates: updatedProduct
            });

            // Validate inputs
            if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
                showToast(false, "All fields are required");
                return;
            }

            // Format price as number and create update payload
            const updatePayload = {
                ...updatedProduct,
                price: parseFloat(updatedProduct.price)
            };

            console.log('Update payload:', updatePayload);

            const { success, message } = await updateProduct(product._id, updatePayload);
            console.log('Update response:', { success, message });

            if (success) {
                setIsEditing(false);
                showToast(true, "Product updated successfully");
            } else {
                showToast(false, message || "Failed to update product");
            }
        } catch (error) {
            console.error('Update error:', error);
            showToast(false, error.message || "Error updating product");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const showToast = (success, message) => {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 p-4 rounded-lg ${
            success ? 'bg-green-500' : 'bg-red-500'
        } text-white`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-lg shadow-lg p-4">
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={updatedProduct.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Product Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={updatedProduct.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        required
                    />
                    <input
                        type="url"
                        name="image"
                        value={updatedProduct.image}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        placeholder="Image URL"
                        required
                    />
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-80 w-full object-contain p-12"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-gray-600 mb-4">
                    ${product.price}
                </p>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-10 10a2 2 0 01-2.828 0l-4-4a2 2 0 112.828-2.828L6 13.172l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;