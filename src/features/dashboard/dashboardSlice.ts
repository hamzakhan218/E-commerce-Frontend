import { createSlice } from "@reduxjs/toolkit";
const defaultValues = {
  recentOrders: false,
  cart: false,
  browseProducts: false,
  yourProducts: false,
  addProduct: false,
};
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: false,
    cart: false,
    browseProducts: true,
    yourProducts: false,
    addProduct: false,
  },
  reducers: {
    toggleRecentOrders: (state) => {
      state.recentOrders = true;
      state.addProduct = false;
      state.browseProducts = false;
      state.cart = false;
      state.yourProducts = false;
    },
    toggleCart: (state) => {
      state.cart = true;
      state.recentOrders = false;
      state.addProduct = false;
      state.browseProducts = false;
      state.yourProducts = false;
    },
    toggleBrowseProducts: (state) => {
      state.browseProducts = true;
      state.recentOrders = false;
      state.addProduct = false;
      state.cart = false;
      state.yourProducts = false;
    },
    toggleYourProducts: (state) => {
      state.yourProducts = true;
      state.recentOrders = false;
      state.addProduct = false;
      state.browseProducts = false;
      state.cart = false;
    },
    toggleAddProduct: (state) => {
      state.addProduct = true;
      state.recentOrders = false;
      state.browseProducts = false;
      state.cart = false;
      state.yourProducts = false;
    },
  },
});

export const {
  toggleAddProduct,
  toggleBrowseProducts,
  toggleCart,
  toggleRecentOrders,
  toggleYourProducts,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
