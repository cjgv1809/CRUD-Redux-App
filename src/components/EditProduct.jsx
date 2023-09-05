import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectProductToUpdate,
  updateProduct,
  updateProductError,
  updateProductSuccess,
} from "../slices/productsSlice";
import { hideAlert, selectAlerts, showAlert } from "../slices/alertSlice";
import axiosClient from "../../config/axios";
import { toast } from "react-hot-toast";

function EditProduct() {
  const productToEdit = useSelector(selectProductToUpdate);
  const alerts = useSelector(selectAlerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
  });

  const { name, price, id } = product;

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit]);

  const handleOnChangeForm = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOnEditProduct = async (e) => {
    e.preventDefault();
    // validate form
    if (name.trim() === "" || price <= 0) {
      const alert = {
        msg: "All fields are required",
        classes: "alert alert-danger text-center p3 font-weight-bold",
      };
      dispatch(showAlert(alert));
      return;
    }
    // if there are no errors, hide alert
    dispatch(hideAlert());

    // create new product in the state
    dispatch(updateProduct(product));

    try {
      // add product to API
      await axiosClient.put(`/products/${id}`, product);
      // update state if product is added
      dispatch(updateProductSuccess(product));
      // show alert
      toast.success("Product updated successfully");
      // redirect to home
      navigate("/");
    } catch (error) {
      console.error(error);
      // update state if product is not added
      dispatch(updateProductError(true));
      // show alert
      toast.error("Error updating product");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Edit Product</h2>

            {alerts && <p className={alerts?.classes}>{alerts?.msg}</p>}

            <form onSubmit={handleSubmitOnEditProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={handleOnChangeForm}
                />
              </div>

              <div className="form-group">
                <label>Product Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Price"
                  name="price"
                  value={price}
                  onChange={handleOnChangeForm}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold d-block w-100"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
