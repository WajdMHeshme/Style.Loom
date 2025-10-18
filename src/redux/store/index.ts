// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../slices/FavoritesSlice";
import productsReducer from "../slices/productsSlice";
import cartReducer from "../slices/cartSlice";
import authReducer from "../slices/authSlice";
import reviewsReducer from "../slices/reviewsSlice";
import faqReducer from "../slices/faqSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    faq: faqReducer,
    reviews: reviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
