import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex justify-content-between">
      <div className="mr-3">
        <h1>
          <Link to={"/"} className="text-light">
            CRUD - React, Redux, Rest API & Axios
          </Link>
        </h1>
      </div>

      <Link
        to={"/products/new"}
        className="btn btn-danger new-post d-md-inline-block"
      >
        &#43; Add Product
      </Link>
    </nav>
  );
}

export default Header;
