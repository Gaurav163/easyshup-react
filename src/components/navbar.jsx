import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
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
          <NavLink className="navbar-brand nav-link mr-auto" to="/">
            EasyShup
          </NavLink>

          <div className="input-group mr-auto">
            <input
              type="searh"
              className="form-control"
              placeholder="search"
              aria-label="Search"
              aria-describedby="button-addon2"
            ></input>
            <div className="input-group-append">
              <button className="btn btn-info" type="button" id="button-addon2">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-nav m-auto">
              {!user && (
                <NavLink className="nav-link ml-2" to="/login">
                  Sign_in
                </NavLink>
              )}

              {user && (
                <div class="nav-item dropdown ml-4">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user.name}
                  </NavLink>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink className="dropdown-item" to="/cart">
                      cart
                    </NavLink>
                    <NavLink className="dropdown-item" to="#">
                      Another action
                    </NavLink>
                    <div class="dropdown-divider"></div>
                    <NavLink className="dropdown-item" to="#">
                      Something else here
                    </NavLink>
                  </div>
                </div>
              )}

              <NavLink className="nav-link ml-2" to="/cart">
                Cart
              </NavLink>
              <NavLink className="nav-link ml-2" to="/verify">
                Orders
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
