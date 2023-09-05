import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: null,
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.alerts = action.payload;
    },
    hideAlert: (state, action) => {
      state.alerts = null;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;

export const selectAlerts = (state) => state.alertSlice.alerts;
