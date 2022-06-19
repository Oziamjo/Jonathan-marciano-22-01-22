import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import cityReducer from "./citySlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    city: cityReducer,
  },
});
