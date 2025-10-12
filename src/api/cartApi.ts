// src/api/cartApi.ts
import api from "./axios";

export type AddToCartReq = {
    userId: number;
    productId: number;
    quantity: number; // front-end uses this name
};

export const addToCartApi = async (payload: AddToCartReq) => {
    try {
        // Backend expects "quantit" (as seen in your Postman) — normalize here
        const body = {
            userId: payload.userId,
            productId: payload.productId,
            quantit: payload.quantity ?? 1,
        };

        console.log("[API] addToCart -> POST /cart body:", body);
        const res = await api.post("/cart", body); // final URL -> {baseURL}/cart
        console.log("[API] addToCart -> response:", res.status, res.data);
        return res.data;
    } catch (err: any) {
        console.error("[API] addToCart error:", err?.response?.status, err?.response?.data || err.message);
        // rethrow normalized error
        throw err?.response?.data ?? { message: err?.message ?? "Unknown error" };
    }
};

export const fetchCartApi = async (userId: number) => {
    const res = await api.get(`/cart/${userId}`);
    return res.data;
};

export const updateCartItemApi = async (userId: number, itemId: number, quantity: number) => {
    // If backend expects a different key on patch, change it here
    const res = await api.patch(`/cart/${userId}/items/${itemId}`, { quantity });
    return res.data;
};

export const removeCartItemApi = async (userId: number, itemId: number) => {
    const res = await api.delete(`/cart/${userId}/items/${itemId}`);
    return res.data;
};
