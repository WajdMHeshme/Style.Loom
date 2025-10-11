// src/api/axios.ts
import axios from "axios";

const API_BASE = (import.meta as any).env?.VITE_API_BASE || "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        "Content-Type": "application/json",
    },
    // withCredentials: true, // uncomment if your backend uses cookies
});

export function setAuthToken(token?: string | null) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}

export default api;
