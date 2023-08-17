import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    numberOfItems: 0,
  },
  reducers: {
    addItem: (state) => {
      state.numberOfItems += 1;
    },
    removeItem: (state) => {
      state.numberOfItems -= 1;
    },
    addSpecificAmount: (state, action: { payload: number }) => {
      state.numberOfItems = action.payload;
    },
  },
});

export const { addItem, removeItem, addSpecificAmount } = storeSlice.actions;

export default storeSlice.reducer;
