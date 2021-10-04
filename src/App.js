import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Cart from "./components/cart";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Regsiter from "./components/register";
import Verify from "./components/verify";
import AddProduct from "./components/addproduct";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) { }
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar user={this.state.user} />

        <Switch>
          <Route path="/register" component={Regsiter} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Route path="/verify" component={Verify} />
          <Route path="/addproduct" component={AddProduct} />

          <Route path="/" component={Home} />
        </Switch>
        <div className="mb-5"></div>
      </div >
    );
  }
}

export default App;
