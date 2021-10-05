import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
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
    try {
      await auth.login(user);
      window.location.replace("/");
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status < 500) {
        const { errors, valids } = this.state;
        if (ex.response.status === 400) {
          errors.email = ex.response.data.message;
          valids.email = "is-invalid";
        } else if (ex.response.status === 401) {
          errors.password = ex.response.data.message;
          valids.password = "is-invalid";
        }
        toast.error(ex.response.data.message);
        this.setState({ errors });
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
          Sign In
        </h1>
        <form>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Sign In")}
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
