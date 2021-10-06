import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiEndpoint = process.env.REACT_APP_url;

class BecomeSeller extends Form {
  state = { data: { shop: "", shopadd: "" }, errors: {}, valids: {} };

  schema = {
    shop: Joi.string().required().label("Shop Name"),
    shopadd: Joi.string().required().label("Shop Address"),
  };

  handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    if (this.validate()) return;

    try {
      const { data } = await http.post(
        apiEndpoint + "/seller/setup",
        this.state.data
      );
      toast.success(data.message);
      console.log(data);
      localStorage.setItem("token", data.token);

      window.location.replace("/");
    } catch (ex) {
      console.log(ex);

      toast.error(ex.response.data.message);
    }
  };

  cancel = () => {
    this.props.history.replace("/seller");
  };

  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h1 className="text-center" style={{ color: "teal" }}>
          Shop Details to Become Seller
        </h1>
        <form>
          {this.renderInput("shop", "Shop Name")}
          {this.renderInput("shopadd", "Shop Address")}
          {this.renderButton("Register Shop and Become Seller")}
        </form>
        <br />
        <br />
        <div>
          Not want to become Seller?{" "}
          <div className="btn btn-secondary" onClick={this.cancel}>
            Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default BecomeSeller;
