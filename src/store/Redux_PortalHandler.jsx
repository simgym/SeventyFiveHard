import { createSlice, configureStore } from "@reduxjs/toolkit";

const portalInitialState = { condition: false };

const portalSlice = createSlice({
  name: "portalHandler",
  initialState: portalInitialState,
  reducers: {
    closePortal(state) {
      state.condition = false;
    },
  },
});

const portalReducer = portalSlice.reducer;

export const portalAction = portalSlice.actions;

export default portalReducer;
