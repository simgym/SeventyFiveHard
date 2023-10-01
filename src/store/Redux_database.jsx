//This is for storing name of child node(folderr)
import { createSlice } from "@reduxjs/toolkit";

const databaseInitialState = { data: "" };

const databaseSlice = createSlice({
  name: "database",
  initialState: databaseInitialState,
  reducers: {
    saveUserData(state, action) {
      state.data = action.payload;
    },
  },
});

const databaseReducer = databaseSlice.reducer;

export const databaseAction = databaseSlice.actions;

export default databaseReducer;
