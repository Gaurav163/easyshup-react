import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class AddProduct extends Form {
  state = {
    data: {
      name: "",
      brand: "",
      mrp: "",
      price: "",
      count: "",
      size: "",
      description: "",
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
    description: Joi.string().required().label("Description"),
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = this.validate();
    if (error) return;
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
          {this.renderInput("description", "Description")}
          {this.renderButton("Sell Product")}
        </form>
      </div>
    );
  }
}

export default AddProduct;
