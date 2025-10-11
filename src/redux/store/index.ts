// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../slices/FavoritesSlice"
import productsReducer from "../slices/productsSlice";
import cartReducer from "../slices/cartSlice";
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
