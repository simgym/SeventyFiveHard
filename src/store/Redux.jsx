import { createSlice, configureStore } from "@reduxjs/toolkit";
import databaseReducer from "./Redux_database";
import taskReducer from "./Redux_taskData";
import portalReducer from "./Redux_PortalHandler";

const initialState = { auth: false };

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: initialState,
  reducers: {
    authentication(state, action) {
      state.auth = true;
    },
  },
});

const store = configureStore({
  reducer: {
    authReducer: AuthSlice.reducer,
    databaseReducer: databaseReducer,
    taskReducer: taskReducer,
    portalReducer: portalReducer,
  },
});

export const authAction = AuthSlice.actions;

export default store;
