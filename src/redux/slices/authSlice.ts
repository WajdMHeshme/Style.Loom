// src/redux/slices/authSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken } from "../../api/axios";

export type User = {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    token?: string;
};

type AuthState = {
    user?: User | null;
    loading: boolean;
    error?: string | null;
};

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";
            const res = await fetch(`${API_BASE}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const text = await res.text();
            let body: any;
            try { body = text ? JSON.parse(text) : {}; } catch { body = { message: text }; }

            if (!res.ok) return rejectWithValue(body?.message || "Login failed");

            const token = body?.token || body?.accessToken || null;
            const userId = body?.user?.id || body?.user?.userId || (token ? (JSON.parse(atob(token.split(".")[1]))?.id) : undefined);
            const firstName = body?.user?.first_name || body?.user?.name || null;

            // set token in axios defaults so subsequent api calls include Authorization
            if (token) {
                setAuthToken(token);
                // also persist token if you want it to survive reloads
                localStorage.setItem("token", token);
            }

            return { id: Number(userId), firstName: firstName ?? undefined, token: token ?? undefined };
        } catch (err: any) {
            return rejectWithValue(err?.message || "Network error");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            // also clear token from axios and localStorage
            setAuthToken(null);
            localStorage.removeItem("token");
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            if (action.payload?.token) {
                setAuthToken(action.payload.token);
                localStorage.setItem("token", action.payload.token);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
