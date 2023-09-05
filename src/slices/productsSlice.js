// each reducer has its own state
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productToDelete: null,
  productToUpdate: null,
};

// each reducer is a function that takes two arguments: state and action
// the action is an object with a type property
// the reducer returns a new state

// the createSlice function takes an object with three properties: name, initialState, and reducers
// the name property is the name of the slice
// the initialState property is the initial state of the slice
// the reducers property is an object with functions that take two arguments: state and action

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.loading = true;
      state.products = [...state.products, action.payload];
    },
    addProductSuccess: (state, action) => {
      state.loading = false;
      state.products = [...state.products, action.payload];
    },
    addProductError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getProducts: (state, action) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProduct: (state, action) => {
      state.loading = true;
      state.productToDelete = action.payload;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== state.productToDelete
      );
      state.productToDelete = null;
    },
    deleteProductError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProduct: (state, action) => {
      state.loading = true;
      state.productToUpdate = action.payload;
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.products = state.products.map((product) =>
        product.id === state.productToUpdate.id
          ? (product = action.payload)
          : product
      );
      state.productToUpdate = null;
    },
    updateProductError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// the reducer is exported as the reducer property of the slice
export default productsSlice.reducer;

// the actions are exported as the actions property of the slice
export const {
  addProduct,
  addProductError,
  addProductSuccess,
  getProducts,
  getProductsError,
  getProductsSuccess,
  deleteProduct,
  deleteProductError,
  deleteProductSuccess,
  updateProduct,
  updateProductError,
  updateProductSuccess,
} = productsSlice.actions;

// the thunk is exported as the thunk property of the slice
export const addProductThunk = (product) => async (dispatch) => {
  try {
    dispatch(addProduct(product));
    dispatch(addProductSuccess(product));
  } catch (error) {
    dispatch(addProductError(error.message));
  }
};

// the selector is exported as the selector property of the slice
export const selectProducts = (state) => state.productsSlice.products;
export const selectLoading = (state) => state.productsSlice.loading;
export const selectError = (state) => state.productsSlice.error;
export const selectProductToUpdate = (state) =>
  state.productsSlice.productToUpdate;
export const selectProductToDelete = (state) =>
  state.productsSlice.productToDelete;
