import React from "react";
import http from "../services/httpService";
import Joi from "joi-browser";

import { toast } from "react-toastify";
import Form from "./common/form";
const apiEndpoint = process.env.REACT_APP_url;

class Buy extends Form {
  state = {
    product: {},
    data: { phone: "", address: "", pincode: "" },
    errors: {},
    valids: {},
  };

  schema = {
    phone: Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .required()
      .label("Phone"),
    pincode: Joi.number()
      .integer()
      .min(100000)
      .max(999999)
      .required()
      .label("Phone"),
    address: Joi.string().required().min(12).label("Address"),
  };

  async componentDidMount() {
    const response = await http.get(
      apiEndpoint + "/products/product/" + this.props.match.params.id
    );
    console.log(response.data.product);
    this.setState({ product: response.data.product });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.validate()) return;

    const body = { ...this.state.data };
    try {
      const response = await http.post(
        apiEndpoint + "/buy/buy/" + this.state.product._id,
        body
      );
      console.log(response);
      this.props.history.push("/orders");
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status < 500) {
        toast.error(ex.response.data.message);
      }
    }
  };
  render() {
    const { product } = this.state;

    return (
      <div className="m-auto" style={{ maxWidth: "1200px" }}>
        <div key={product._id} className="rounded p-4 m-4 row pdiv">
          <img
            src={product.image}
            alt=""
            width="50%"
            style={{ maxHeight: "100vh" }}
            className="rounded"
          />
          <div className="rounded col p-4">
            <h3>{product.name}</h3>
            <span>
              <strong>Brand :</strong>
              {product.brand}
            </span>
            <br />
            <span>
              <strong>Size :</strong>
              {product.size}
            </span>
            <br />
            <span>
              {" "}
              <b>{`Rs: ${product.price} `} </b>
            </span>
            <span className="badge badge-success p-1"> Offer Price!</span>
            <br />
            <span>
              <small>
                <del>{`MRP: ${product.mrp} `}</del>
              </small>
            </span>
            <br />
            <div style={{ fontSize: "larger" }}>★★★★☆</div>
            <br />
            <div>
              <center>
                <h4>
                  {"<--"}Order Details{"-->"}
                </h4>
              </center>
              Total Bill (Rs) : <solid>{` ${product.price}/-   `}</solid>
              <span style={{ color: "grey", marginLeft: "10px" }}>
                (Cash On Delivery)
              </span>
              <br />
              <br />
              <form>
                {this.renderInput("phone", "Phone")}
                {this.renderInput("address", "Address")}
                {this.renderInput("pincode", "Pincode")}

                {this.renderButton("Place Order")}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Buy;
