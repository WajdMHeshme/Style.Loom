// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../FavoritesSlice"

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

// types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
