// src/redux/slices/cartSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { addToCartApi, fetchCartApi, updateCartItemApi, removeCartItemApi } from "../../api/cartApi";
import { setAuthToken } from "../../api/axios";

export type CartProduct = {
    id: number; // cart item id
    productId?: number;
    quantity: number;
    product?: {
        id?: number;
        name?: string;
        price?: number;
        imageUrl?: string | null;
    };
};

type CartState = {
    id?: number;
    userId?: number;
    items: CartProduct[];
    totalPrice: number;
    loading: boolean;
    error?: string | null;
};

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
};

/** helper to set token from state or fallback to localStorage */
function ensureAuthHeader(getState: any) {
    try {
        const state = getState() as any;
        const token = state?.auth?.user?.token ?? localStorage.getItem("token");
        setAuthToken(token ?? null);
    } catch (e) {
        const token = localStorage.getItem("token");
        setAuthToken(token ?? null);
    }
}

export const fetchCart = createAsyncThunk(
    "cart/fetch",
    async (userId: number, { getState, rejectWithValue }) => {
        try {
            ensureAuthHeader(getState);
            const data = await fetchCartApi(userId);
            console.log("[cart/fetch] userId", userId, "->", data);
            return data;
        } catch (err: any) {
            console.error("[cart/fetch] error", err);
            return rejectWithValue(err?.message || "Failed to fetch cart");
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/add",
    async (
        payload: { userId: number; productId: number; quantity?: number },
        { dispatch, getState, rejectWithValue }
    ) => {
        try {
            ensureAuthHeader(getState);
            console.log("[cart/add] payload:", payload);

            if (!payload?.userId || !payload?.productId) {
                return rejectWithValue("Missing userId or productId");
            }

            const res = await addToCartApi({
                userId: payload.userId,
                productId: payload.productId,
                quantity: payload.quantity ?? 1,
            });

            console.log("[cart/add] api response:", res);

            // force refresh canonical cart and wait for it to finish
            await dispatch(fetchCart(payload.userId)).unwrap();

            return res;
        } catch (err: any) {
            console.error("[cart/add] error:", err);
            return rejectWithValue(err?.message || "Failed to add to cart");
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateItem",
    async (
        { userId, itemId, quantity }: { userId: number; itemId: number; quantity: number },
        { dispatch, getState, rejectWithValue }
    ) => {
        try {
            ensureAuthHeader(getState);
            const res = await updateCartItemApi(userId, itemId, quantity);
            console.log("[cart/updateItem] api resp:", res);
            await dispatch(fetchCart(userId)).unwrap();
            return res;
        } catch (err: any) {
            console.error("[cart/updateItem] error:", err);
            return rejectWithValue(err?.message || "Failed to update cart item");
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeItem",
    async ({ userId, itemId }: { userId: number; itemId: number }, { dispatch, getState, rejectWithValue }) => {
        try {
            ensureAuthHeader(getState);
            const res = await removeCartItemApi(userId, itemId);
            console.log("[cart/removeItem] api resp:", res);
            await dispatch(fetchCart(userId)).unwrap();
            return res;
        } catch (err: any) {
            console.error("[cart/removeItem] error:", err);
            return rejectWithValue(err?.message || "Failed to remove cart item");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
            state.totalPrice = 0;
            state.id = undefined;
            state.userId = undefined;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = null;
                state.id = action.payload?.id;
                state.userId = action.payload?.userId;
                state.items = Array.isArray(action.payload?.items) ? action.payload.items : [];
                state.totalPrice = action.payload?.totalPrice ?? 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCartItem.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeCartItem.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
