/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  deleteProductError,
  deleteProductSuccess,
  updateProduct,
} from "../slices/productsSlice";
import { toast } from "react-hot-toast";
import axiosClient from "../../config/axios";

function Product({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteProduct = async (id) => {
    const deleteAnswer = confirm(
      "Are you sure you want to delete this product?"
    );

    // have reference to the product id in the state
    dispatch(deleteProduct(id));

    if (deleteAnswer) {
      try {
        // delete product from API
        await axiosClient.delete(`/products/${id}`);
        // update state if product is deleted
        dispatch(deleteProductSuccess(id));
        // show alert
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error(error);
        // update state if product is not deleted
        dispatch(deleteProductError(true));
        // show alert
        toast.error("Error deleting product");
      }
    }
  };

  const redirectToEditProduct = (product) => {
    dispatch(updateProduct(product));
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{product?.name}</td>
      <td>{product?.price}€</td>
      <td className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
        <button
          type="button"
          onClick={() => redirectToEditProduct(product)}
          className="btn btn-sm btn-primary actionsBtn"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => handleDeleteProduct(product?.id)}
          className="btn btn-sm btn-danger actionsBtn"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Product;
