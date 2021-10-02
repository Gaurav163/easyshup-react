import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  render() {
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
          <Link className="navbar-brand nav-link mr-auto" to="/">
            EasyShup
          </Link>

          <form className="form-inline m-auto">
            <div className="input-group">
              <input
                type="searh"
                className="form-control"
                placeholder="search"
                aria-label="Search"
                aria-describedby="button-addon2"
              ></input>
              <div className="input-group-append">
                <button
                  className="btn btn-info"
                  type="button"
                  id="button-addon2"
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto">
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/register">
                  Regsiter
                </NavLink>
              </li>
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item mr-2">
                <NavLink className="nav-link" to="/verify">
                  Verify
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
