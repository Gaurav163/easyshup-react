import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_url;

class Cart extends Component {
  state = { products: [], done: false };

  async componentDidMount() {
    try {
      const response = await http.get(apiUrl + "/buy/mycart");
      const products = response.data.cart;
      this.setState({ products, done: true });
      console.log(products);
    } catch (error) {
      console.log(error);
    }
  }
  buyProduct = (id) => {
    this.props.history.push("/buy/" + id);
  };
  viewProduct = (id) => {
    this.props.history.push("/product/" + id);
  };
  removeCart = async (id) => {
    try {
      const response = await http.get(apiUrl + "/buy/removecart/" + id);
      if (response.status === 200) {
        console.log(response.data.message);
        toast.success(response.data.message);
        const products = this.state.products.filter((p) => p._id !== id);
        this.setState({ products });
      }
    } catch (error) {}
  };

  render() {
    const { products, done } = this.state;
    console.log(products.length, done);
    return (
      <div className="container">
        <center>
          {" "}
          <h1>My Cart</h1>
        </center>
        {products.length === 0 && done && <h3>There is no item in cart.</h3>}

        {products.map((product) => (
          <div
            key={product._id}
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
                <b>{`Rs: ${product.price} `}</b>
              </span>
              <span>
                <small>
                  <del>{`MRP: ${product.mrp} `}</del>
                </small>
              </span>
              <br />
              <div style={{ fontSize: "larger" }}>???????????????</div>
              <br />
              <div
                className="btn btn-warning mr-2"
                onClick={() => this.buyProduct(product._id)}
              >
                Buy Now
              </div>
              <div
                className="btn btn-danger mr-2"
                onClick={() => this.removeCart(product._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Cart;
