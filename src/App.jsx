import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Products from "./components/Products";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Header />

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          {/* <Route path="/products" element={<h1>Products</h1>} /> */}
        </Routes>
      </div>

      <Toaster />
    </Router>
  );
}

export default App;
