import { createSlice, configureStore } from "@reduxjs/toolkit";

const taskInitialState = { diet: "", workout: "", date: "" };

const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    setDiet(state, action) {
      state.diet = action.payload;
    },
    setWorkout(state, action) {
      state.workout = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});

const taskReducer = taskSlice.reducer;

export const taskAction = taskSlice.actions;

export default taskReducer;
