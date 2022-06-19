import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.findIndex((city) => city.id === action.payload.id);
      state.splice(index, 1);
    },
  },
});

export const { add, remove } = favoritesSlice.actions;
export default favoritesSlice.reducer;
