import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_url;

class Orders extends Component {
  state = { products: [], done: false };

  async componentDidMount() {
    try {
      const response = await http.get(apiUrl + "/buy/myorder");
      const products = response.data.orders;
      this.setState({ products, done: true });
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  }

  viewProduct = (id) => {
    this.props.history.push("/product/" + id);
  };

  render() {
    const { products, done } = this.state;
    console.log(products.length, done);
    return (
      <div className="container">
        <center>
          {" "}
          <h1>My Orders</h1>
        </center>
        {products.length === 0 && done && <h3>There is no Orders to show.</h3>}

        {products.map(({ product, address, pincode, status, _id }) => (
          <div
            key={_id}
            className="rounded row float-left"
            style={{
              width: "100%",
              margin: "10px 0 10px 3%",
              padding: "10px 1%",
              border: "solid teal 2px",
              borderRadius: "10px",
            }}
          >
            <img
              src={product.image}
              alt=""
              width="auto"
              height="280"
              className="rounded pdiv"
              onClick={() => this.viewProduct(product._id)}
            />
            <div className="rounded col p-2">
              <h3>Order Details</h3>
              <b>{product.name}</b>
              <br />
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
              <div>
                <b>Bill Amount (in Rs):</b> {product.price}
              </div>
              <div>
                <b>Address : </b> {address}
              </div>
              <div>
                <b>Pincode : </b> {pincode}
              </div>
              <div>
                <b>Status : </b> {status}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Orders;
