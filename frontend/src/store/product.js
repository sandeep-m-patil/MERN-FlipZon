import { create } from "zustand";

const API_URL = 'https://mern-flip-zon.vercel.app/api';

export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    error: null,

    createProduct: async (newProduct) => {
        try {
            if (!newProduct.name || !newProduct.image || !newProduct.price) {
                return { success: false, message: "Please fill in all fields." };
            }

            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error('Failed to create product');
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    fetchProducts: async () => {
        try {
            set({ isLoading: true });
            const res = await fetch(`${API_URL}/products`);
            
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await res.json();
            set({ products: data.data, isLoading: false });
            return { success: true, data: data.data };
        } catch (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, message: error.message };
        }
    },

    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`${API_URL}/products/${pid}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error('Failed to delete product');
            }

            const data = await res.json();
            set((state) => ({
                products: state.products.filter((product) => product._id !== pid)
            }));
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`${API_URL}/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) {
                throw new Error('Failed to update product');
            }

            const data = await res.json();
            set((state) => ({
                products: state.products.map((product) => 
                    product._id === pid ? data.data : product
                ),
            }));
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
}));