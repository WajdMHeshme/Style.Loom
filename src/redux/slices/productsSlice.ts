import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchProductsApi } from "../../api/productsApi";

export type RawProduct = {
    id: number;
    name: string;
    description?: string;
    imageUrl?: string | null;
    price?: number;
    subCategory?: {
        name?: string;
        main?: {
            name?: string;
        };
    };
};

export type MappedProduct = {
    id: number;
    img: string;
    title: string;
    category: "All" | "Men" | "Women" | "Kids" | string;
    fit?: string;
    price?: number;
};

type ProductsState = {
    items: MappedProduct[];
    loading: boolean;
    error: string | null;
};

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const data = await fetchProductsApi();
        return data as RawProduct[];
    } catch (err: any) {
        // Normalise error message
        return rejectWithValue(err?.response?.data?.message || err.message || "Failed to fetch products");
    }
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        // لو بدك تعليمات إضافية لـ add/update/delete تقدر تضيف هنا
        clearProducts(state) {
            state.items = [];
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<RawProduct[]>) => {
                state.loading = false;
                state.error = null;

                // map the data the same way كان عم تعمل في الكومبوننت
                const mapped: MappedProduct[] = action.payload.map((p) => {
                    const rawImg = p.imageUrl ?? "";
                    const img =
                        rawImg.startsWith("http") || rawImg.startsWith("data:")
                            ? rawImg
                            : rawImg
                                ? `http://localhost:3000${rawImg}`
                                : "/assets/imgs/default-product.jpg";

                    const mainName = p.subCategory?.main?.name?.toLowerCase() ?? "";
                    let category: MappedProduct["category"] = "All";
                    if (mainName === "child" || mainName === "kids") category = "Kids";
                    else if (mainName === "man" || mainName === "men") category = "Men";
                    else if (mainName === "woman" || mainName === "women") category = "Women";
                    else category = p.subCategory?.name ?? "Other";

                    return {
                        id: p.id,
                        img,
                        title: p.name,
                        category,
                        fit: p.description ?? "",
                        price: p.price ?? 0,
                    };
                });

                state.items = mapped;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || action.error.message || "Failed to fetch products";
            });
    },
});

export const { clearProducts } = productsSlice.actions;
export default productsSlice.reducer;