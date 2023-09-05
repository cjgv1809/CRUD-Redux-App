/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  addProductSuccess,
  addProductError,
  selectProducts,
  selectLoading,
  selectError,
} from "../slices/productsSlice";
import { hideAlert, selectAlerts, showAlert } from "../slices/alertSlice";
import axiosClient from "../../config/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const alerts = useSelector(selectAlerts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  const handleNewProduct = async (e) => {
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
    dispatch(addProduct({ name, price }));

    try {
      // add product to API
      await axiosClient.post("/products", { name, price });
      // update state if product is added
      dispatch(addProductSuccess({ name, price }));
      // show alert
      toast.success("Product added successfully");
      // redirect to home
      navigate("/");
    } catch (error) {
      console.error(error);
      // update state if product is not added
      dispatch(addProductError(true));
      // show alert
      toast.error("Error adding product");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xs-12 col-md-5">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Add New Product
            </h2>

            {alerts && <p className={alerts?.classes}>{alerts?.msg}</p>}

            <form onSubmit={handleNewProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold d-block w-100"
              >
                Add Product
              </button>
            </form>

            {loading && <p className="text-center mt-4">Loading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
