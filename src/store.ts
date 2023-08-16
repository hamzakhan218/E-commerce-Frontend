import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import storeSlice from "./features/store/storeSlice";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    cart: storeSlice,
  },
});
