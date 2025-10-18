// src/redux/slices/faqSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchFaqsApi, withToken } from "../../api/faqsApi";

/* ---- Types ---- */
export type RawFaq = {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  createdAt: string;
};

export type MappedFaq = {
  id: number;
  question: string;
  answer: string;
  category: string; // original category (e.g. "Ordering")
  categoryUpper: string; // normalized uppercase for easy comparisons
  isActive: boolean;
  createdAt: string;
};

type FaqState = {
  items: MappedFaq[];
  loading: boolean;
  error: string | null;
};

const initialState: FaqState = {
  items: [],
  loading: false,
  error: null,
};

/* helper: find token in common places in localStorage (same logic you used) */
function getStoredToken(): string | null {
  const possibleKeys = ["token", "accessToken", "authToken"];
  for (const k of possibleKeys) {
    const v = localStorage.getItem(k);
    if (v) return v;
  }
  const userRaw = localStorage.getItem("user") || localStorage.getItem("auth");
  if (userRaw) {
    try {
      const parsed = JSON.parse(userRaw);
      return parsed?.token || parsed?.accessToken || null;
    } catch {
      // ignore
    }
  }
  return null;
}

/* ---- Thunk ---- */
export const fetchFaqs = createAsyncThunk<RawFaq[], void, { rejectValue: string }>(
  "faq/fetchAll",
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();
    try {
      // set axios header via helper
      withToken(token);

      const data = await fetchFaqsApi();
      return data as RawFaq[];
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message || "Failed to fetch FAQs");
    } finally {
      // remove token from defaults to avoid leaking to other requests
      withToken(null);
    }
  }
);

/* ---- Slice ---- */
const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    clearFaqs(state) {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaqs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action: PayloadAction<RawFaq[]>) => {
        state.loading = false;
        state.error = null;

        const mapped: MappedFaq[] = action.payload.map((f) => {
          const category = f.category ?? "Other";
          const categoryUpper = category.toUpperCase();
          return {
            id: f.id,
            question: f.question,
            answer: f.answer,
            category,
            categoryUpper,
            isActive: !!f.isActive,
            createdAt: f.createdAt ?? new Date().toISOString(),
          };
        });

        state.items = mapped;
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Failed to fetch FAQs";
      });
  },
});

export const { clearFaqs } = faqSlice.actions;
export default faqSlice.reducer;
