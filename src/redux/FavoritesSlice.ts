// src/features/favorites/favoritesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  fit: string;
  category: string;
  id: string;
  title?: string;
  price?: number;
  image?: string;
};

type FavoritesState = Product[];

const STORAGE_KEY = "myapp_favorites_redux_v1";

const loadFavorites = (): FavoritesState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoritesState) : [];
  } catch {
    return [];
  }
};

const saveFavorites = (state: FavoritesState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const initialState: FavoritesState = loadFavorites();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<Product>) {
      if (!state.find((p) => p.id === action.payload.id)) {
        state.unshift(action.payload);
        saveFavorites(state);
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const next = state.filter((p) => p.id !== action.payload);
      saveFavorites(next);
      return next;
    },
    toggleFavorite(state, action: PayloadAction<Product>) {
      const idx = state.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) {
        state.splice(idx, 1);
      } else {
        state.unshift(action.payload);
      }
      saveFavorites(state);
    },
    clearFavorites() {
      saveFavorites([]);
      return [];
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
