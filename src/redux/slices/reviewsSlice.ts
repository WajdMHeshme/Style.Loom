// src/redux/slices/reviewsSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { fetchReviewsApi, postReviewApi } from "../../api/reviewsApi";

/* ---- Types ---- */
export type RawUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export type RawReview = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
  userId?: number;
  user?: RawUser;
};

export type MappedReview = {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
  user?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
  };
};

type ReviewsState = {
  items: MappedReview[];
  loading: boolean;
  error: string | null;
};

const initialState: ReviewsState = {
  items: [],
  loading: false,
  error: null,
};

/* helper to read token the same way you used elsewhere */
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

/* ---- Thunks ---- */
export const fetchReviews = createAsyncThunk<RawReview[], void, { rejectValue: string }>(
  "reviews/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchReviewsApi();
      return data as RawReview[];
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message || "Failed to fetch reviews");
    }
  }
);

export const addReview = createAsyncThunk<RawReview, Partial<RawReview>, { rejectValue: string }>(
  "reviews/add",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getStoredToken();
      const created = await postReviewApi(payload, token);
      return created;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || err.message || "Failed to submit review");
    }
  }
);

/* ---- Slice ---- */
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews(state) {
      state.items = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<RawReview[]>) => {
        state.loading = false;
        state.error = null;

        // map raw -> mapped
        const mapped: MappedReview[] = action.payload.map((r) => ({
          id: r.id,
          rating: r.rating ?? 5,
          comment: r.comment ?? "",
          createdAt: r.createdAt ?? new Date().toISOString(),
          isApproved: !!r.isApproved,
          user: r.user
            ? {
                id: r.user.id,
                first_name: r.user.first_name,
                last_name: r.user.last_name,
                email: r.user.email,
              }
            : undefined,
        }));

        state.items = mapped;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Failed to fetch reviews";
      })

      .addCase(addReview.pending, (state) => {
        // keep previous items, maybe set a small flag if needed
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action: PayloadAction<RawReview>) => {
        // map and prepend if approved, else still keep but mark not approved
        const r = action.payload;
        const mapped: MappedReview = {
          id: r.id,
          rating: r.rating ?? 5,
          comment: r.comment ?? "",
          createdAt: r.createdAt ?? new Date().toISOString(),
          isApproved: !!r.isApproved,
          user: r.user
            ? {
                id: r.user.id,
                first_name: r.user.first_name,
                last_name: r.user.last_name,
                email: r.user.email,
              }
            : undefined,
        };

        // prepend new review so newest show first
        state.items = [mapped, ...state.items];
      })
      .addCase(addReview.rejected, (state, action) => {
        state.error = action.payload || action.error.message || "Failed to submit review";
      });
  },
});

export const { clearReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
