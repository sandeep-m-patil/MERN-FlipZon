import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";

const CreatePage = () => {
    const navigate = useNavigate();
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { createProduct } = useProductStore();

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { success, message } = await createProduct(newProduct);
            showToast(success, message);
            
            if (success) {
                setNewProduct({ name: "", price: "", image: "" });
                navigate('/');
            }
        } catch (error) {
            showToast(false, error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const showToast = (success, message) => {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 p-4 rounded-lg ${
            success ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Create New Product
                </h1>

                <form 
                    onSubmit={handleAddProduct}
                    className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                    <input
                        type="url"
                        placeholder="Image URL"
                        name="image"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded text-white transition-colors duration-200 ${
                            isLoading 
                                ? 'bg-blue-400 cursor-not-allowed' 
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        {isLoading ? 'Adding Product...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePage;