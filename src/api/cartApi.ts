// src/api/cartApi.ts
import api from "./axios"; // your axios instance (already adds auth token)

export type AddToCartReq = {
    userId: number;
    productId: number;
    quantity: number;
};

export const addToCartApi = async (payload: AddToCartReq) => {
    // Backend example you provided: POST /api/cart
    // Make sure the backend expects "quantity" (not "quantit")
    const res = await api.post("/cart", payload);
    return res.data;
};

export const fetchCartApi = async (userId: number) => {
    const res = await api.get(`/cart/${userId}`);
    return res.data; // expected shape: { id, userId, items: [...], totalPrice }
};

// Optional endpoints if backend supports them:
export const updateCartItemApi = async (userId: number, itemId: number, quantity: number) => {
    // PATCH or PUT endpoint example — change path to match backend
    const res = await api.patch(`/cart/${userId}/items/${itemId}`, { quantity });
    return res.data;
};

export const removeCartItemApi = async (userId: number, itemId: number) => {
    const res = await api.delete(`/cart/${userId}/items/${itemId}`);
    return res.data;
};
