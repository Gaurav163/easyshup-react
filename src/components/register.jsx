import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";
import auth from "../services/authService";
import { register, generateOtp } from "../services/userService";
import { toast } from "react-toastify";

class Regsiter extends Form {
  state = {
    data: { name: "", userid: "", password: "", repassword: "", otp: "" },
    errors: {},
    valids: {},
    type: "Email",
    gOtp: false,
  };

  schema = {
    name: Joi.string().required().label("Name"),
    userid: Joi.string().email().required().label("Email"),
    password: Joi.string().min(8).required().label("Password"),

    repassword: Joi.string().min(8).required().label("Password"),
    otp: Joi.number().integer().min(100000).max(999999).required().label("OTP"),
  };

  newsc = {
    phone: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .label("Phone"),
    email: Joi.string().email().required().label("Email"),
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
    user.type = this.state.type === "Email" ? "email" : "phone";
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
        auth.setToken(response.data.token);

        window.location.replace("/");
      }
    } catch (ex) {
      toast.dismiss(id);
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data.message);
        const { errors, valids } = this.state;
        errors.email = ex.response.data.message;
        valids.email = "is-invalid";

        this.setState({ errors });
      }
    }
  };

  tologin = () => {
    this.props.history.push("/login");
  };

  handleUserid = () => {
    if (this.state.type === "Email") {
      this.setState({ type: "Phone" });
      this.schema.userid = this.newsc.phone;
      this.state.data.userid = "";
      this.setState();
    } else {
      this.setState({ type: "Email" });
      this.schema.userid = this.newsc.phone;
      this.state.data.userid = "";
      this.setState();
    }
  };

  generateOtp = async () => {
    let type = "email";
    if (this.state.type === "Phone") type = "phone";
    try {
      const response = await generateOtp(type, this.state.data.userid);
      if (response.status === 200) {
        this.setState({ gOtp: true });
        toast.succcess(response.data.message);
      }
    } catch (ex) {
      if (ex.response) {
        console.log(ex.response.data.message);
        const { errors, valids } = this.state;
        errors.userid = ex.response.data.message;
        valids.userid = "is-invalid";

        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors, valids, type } = this.state;

    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h1 className="text-center" style={{ color: "teal" }}>
          Register
        </h1>
        <br />

        <div className="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            onChange={this.handleUserid}
            disabled={this.state.gOtp}
          />
          <label class="form-check-label" for="flexCheckDefault">
            Register With Mobile Number.
          </label>
        </div>
        <br />
        <form>
          {this.renderInput("name", "Name")}

          {this.renderInput("userid", type)}

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
          {!this.state.gOtp && (
            <div
              className="btn btn-info"
              onClick={this.generateOtp}
              style={{ backgroundColor: "teal" }}
              diabled={this.state.gOtp}
            >
              Generate Otp
            </div>
          )}

          {this.state.gOtp && this.renderInput("otp", "OTP")}

          {this.state.gOtp && this.renderButton("Regsiter")}
        </form>
        <br />
        <br />
        <div>
          Already have an account?
          <div className="btn btn-info" onClick={this.tologin}>
            Go to Login
          </div>
        </div>
      </div>
    );
  }
}

export default Regsiter;
