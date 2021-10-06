import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiEndpoint = process.env.REACT_APP_url;

class AddProduct extends Form {
  state = {
    data: {
      name: "",
      brand: "",
      mrp: "",
      price: "",
      count: "",
      size: "",
      image: "",
    },
    errors: {},
    valids: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),

    brand: Joi.string().required().label("Brand"),
    price: Joi.number().required().min(20).label("Price"),
    mrp: Joi.number().required().min(20).label("MRP"),
    size: Joi.string().required().label("Size"),

    count: Joi.number().required().min(5).label("Count"),
    image: Joi.string().required().label("Image Link"),
  };

  handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    const error = this.validate();
    console.log(error);

    try {
      console.log("submit");
      const response = await http.post(
        apiEndpoint + "/seller/addproduct",
        this.state.data
      );
      if (response && response.status === 200) {
        toast.success(`Now we are selling you Product ${this.state.data.name}`);
      }
    } catch (error) {}
  };

  render() {
    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h1 className="text-center" style={{ color: "teal" }}>
          Sell Product
        </h1>
        <form>
          {this.renderInput("name", "Name")}
          {this.renderInput("brand", "Brand")}
          {this.renderInput("price", "Price")}
          {this.renderInput("mrp", "MRP")}
          {this.renderInput("size", "Size")}
          {this.renderInput("count", "Count")}
          {this.renderInput("image", "Image Link")}
          {this.renderButton("Sell Product")}
        </form>
      </div>
    );
  }
}

export default AddProduct;
