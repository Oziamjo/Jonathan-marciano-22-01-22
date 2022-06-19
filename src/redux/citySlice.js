import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

// before the Geolocation task the initialState was:
// const initialState = {
//   cityName: "Tel Aviv",
//   country: "Israel",
//   id: 215854,
// };

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.cityName = action.payload.cityName;
      state.country = action.payload.country;
      state.id = action.payload.id;
    },
  },
});

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
