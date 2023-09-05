import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductsError,
  getProductsSuccess,
  selectError,
  selectLoading,
  selectProducts,
} from "../slices/productsSlice";
import axiosClient from "../../config/axios";
import Product from "./Product";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    // get products from API
    dispatch(getProducts());
  }, [dispatch]);

  // create function to get products from api and show them in the table
  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await axiosClient.get("/products");
        dispatch(getProductsSuccess(response.data));
      } catch (error) {
        console.error(error);
        dispatch(getProductsError(true));
      }
    };

    handleGetProducts();
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-center my-5">Products List</h2>

      {error && (
        <p className="font-weight-bold alert alert-danger text-center mt-4">
          There was an error getting the products
        </p>
      )}

      {loading && <p className="text-center">Loading...</p>}

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product, index) => (
            <Product key={index.toString()} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
