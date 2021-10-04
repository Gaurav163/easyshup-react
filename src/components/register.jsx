import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";
import { register } from "../services/userService";
import { toast } from "react-toastify";

class Regsiter extends Form {
  state = {
    data: { name: "", email: "", password: "", repassword: "" },
    errors: {},
    valids: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    repassword: Joi.string().min(8).required().label("Password"),
  };

  handleRepassword = (e) => {
    if (e) this.handleChange(e);
    const { errors, valids, data } = this.state;
    if (errors.repassword) {
      return;
    } else {
      if (data.password !== data.repassword) {
        errors.repassword = "Password not Matched";
        valids.repassword = "is-invalid";
      } else {
        valids.repassword = "is-valid";
      }
    }
    this.setState({ data, errors, valids });
    if (data.password !== data.repassword) return true;
    else return null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) return;
    if (this.handleRepassword()) return;

    const user = { ...this.state.data };
    const id = toast.loading("Registering ...");
    try {
      const response = await register(user);
      if (response?.status === 200) {
        toast.update(id, {
          render: "Resgistration Successful",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        this.props.history.replace("/login");
      }
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        toast.update(id, {
          render: ex.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        const { errors, valids } = this.state;
        errors.email = ex.response.data.message;
        valids.email = "is-invalid";

        this.setState({ errors });
      } else {
        toast.dismiss(id);
      }
    }
  };
  tologin = () => {
    this.props.history.push("/login");
  };
  render() {
    const { data, errors, valids } = this.state;

    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h1 className="text-center" style={{ color: "teal" }}>
          Register
        </h1>
        <form>
          {this.renderInput("name", "Name")}

          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          <Input
            type="password"
            name="repassword"
            value={data.repassword}
            label="Re-enter Password"
            onChange={this.handleRepassword}
            valid={valids.repassword}
            error={errors.repassword}
            validm="Password Matched"
          />

          {this.renderButton("Regsiter")}
        </form>
        <br />
        <br />
        <div>
          Already have an account?{" "}
          <div className="btn btn-info" onClick={this.tologin}>
            Go to Login
          </div>
        </div>
      </div>
    );
  }
}

export default Regsiter;
