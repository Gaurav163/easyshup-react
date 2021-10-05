import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-teal">
        <button
          className="navbar-toggler mb-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink className="navbar-brand mr-auto ml-2" to="/">
          EasyShup
        </NavLink>

        <div className="input-group mr-auto ml-2" style={{ width: "800px" }}>
          <div className="input-group-prepend">
            <button className="btn btn-info" type="button" id="button-addon2">
              <i className="fa fa-search"></i>
            </button>
          </div>
          <input
            type="searh"
            className="form-control"
            placeholder="search"
            aria-label="Search"
            aria-describedby="button-addon2"
          ></input>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav m-auto">
            {!user && (
              <NavLink className="nav-link ml-2" to="/login">
                Sign_in
              </NavLink>
            )}

            {user && (
              <div className="nav-item dropdown ml-2">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/profile"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {user.name}
                </NavLink>
                <div
                  className="dropdown-menu bg-teal p-3 m-2"
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink className="nav-link pl-2" to="/profile">
                    Account
                  </NavLink>
                  <NavLink className="nav-link pl-2" to="/cart">
                    cart
                  </NavLink>
                  <NavLink className="nav-link pl-2" to="/addproduct">
                    Sell Product
                  </NavLink>
                  <NavLink className="nav-link pl-2" to="#">
                    Sell Items
                  </NavLink>
                  <NavLink className="nav-link pl-2" to="/logout">
                    Logout
                  </NavLink>
                </div>
              </div>
            )}

            <NavLink className="nav-link ml-2" to="/cart">
              Cart
            </NavLink>
            <NavLink className="nav-link ml-2" to="/feedback">
              Feedback
            </NavLink>
            <NavLink className="nav-link ml-2" to="/help">
              Help
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
