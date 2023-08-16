import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    numberOfitems: 0,
  },
  reducers: {
    addItem: (state) => {
      state.numberOfitems += 1;
    },
    removeItem: (state) => {
      state.numberOfitems -= 1;
    },
  },
});

export const { addItem, removeItem } = storeSlice.actions;

export default storeSlice.reducer;
