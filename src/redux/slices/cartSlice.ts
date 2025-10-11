// src/redux/slices/cartSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { addToCartApi, fetchCartApi, updateCartItemApi, removeCartItemApi } from "../../api/cartApi";

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

export const fetchCart = createAsyncThunk("cart/fetch", async (userId: number, { rejectWithValue }) => {
    try {
        const data = await fetchCartApi(userId);
        return data;
    } catch (err: any) {
        return rejectWithValue(err?.response?.data?.message || err.message || "Failed to fetch cart");
    }
});

export const addToCart = createAsyncThunk(
    "cart/add",
    async (payload: { userId: number; productId: number; quantity?: number }, { dispatch, rejectWithValue }) => {
        try {
            const body = { userId: payload.userId, productId: payload.productId, quantity: payload.quantity ?? 1 };
            const res = await addToCartApi(body);
            // refresh cart after success to keep canonical state
            await dispatch(fetchCart(payload.userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || err.message || "Failed to add to cart");
        }
    }
);

export const updateCartItem = createAsyncThunk(
    "cart/updateItem",
    async ({ userId, itemId, quantity }: { userId: number; itemId: number; quantity: number }, { dispatch, rejectWithValue }) => {
        try {
            const res = await updateCartItemApi(userId, itemId, quantity);
            await dispatch(fetchCart(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || err.message || "Failed to update cart item");
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeItem",
    async ({ userId, itemId }: { userId: number; itemId: number }, { dispatch, rejectWithValue }) => {
        try {
            const res = await removeCartItemApi(userId, itemId);
            await dispatch(fetchCart(userId));
            return res;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data?.message || err.message || "Failed to remove cart item");
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
