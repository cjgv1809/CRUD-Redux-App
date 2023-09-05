// we must have only one reducer, to have more than one we use combineReducers
import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import alertSlice from "./alertSlice";

const rootReducer = combineReducers({
  productsSlice,
  alertSlice,
});

export default rootReducer;
