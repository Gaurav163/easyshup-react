import React from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Form from "./common/form";

class Login extends Form {
  state = { data: { email: "", password: "" }, errors: {}, valids: {} };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    if (error) return;
  };

  render() {
    const { data, errors, valids } = this.state;
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
      </div>
    );
  }
}

export default Login;
