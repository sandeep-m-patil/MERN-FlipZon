import { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [isOpen, setIsOpen] = useState(false);
    const { deleteProduct, updateProduct } = useProductStore();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        showToast(success, message);
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        setIsOpen(false);
        showToast(success, message);
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

    return (
        <div className="bg-whiterounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-80 w-full object-contain p-12"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-gray-600  mb-4">
                    ${product.price}
                </p>

                <div className="flex space-x-2">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
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

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Update Product</h2>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;