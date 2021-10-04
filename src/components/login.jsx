import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/userService";
import { toast } from "react-toastify";

class Login extends Form {
  state = { data: { email: "", password: "" }, errors: {}, valids: {} };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) return;

    const user = { ...this.state.data };
    const id = toast.loading("Login ...");
    try {
      const response = await login(user);
      if (response?.status === 200) {
        toast.update(id, {
          render: "Login Successful",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        localStorage.setItem("token", response.data.token);
        this.props.history.replace("/");
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status < 500) {
        toast.update(id, {
          render: ex.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        const { errors, valids } = this.state;
        if (ex.response.status === 400) {
          errors.email = ex.response.data.message;
          valids.email = "is-invalid";
        } else if (ex.response.status === 401) {
          errors.password = ex.response.data.message;
          valids.password = "is-invalid";
        }
        this.setState({ errors });
      } else {
        toast.dismiss(id);
      }
    }
  };

  toRegister = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h1 className="text-center" style={{ color: "teal" }}>
          Login
        </h1>
        <form>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
        <br />
        <br />
        <div>
          New to Easy?{" "}
          <div className="btn btn-info" onClick={this.toRegister}>
            Create New Account
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
