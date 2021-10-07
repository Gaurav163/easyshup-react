import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiEndpoint = process.env.REACT_APP_url;

class Seller extends Component {
  state = { products: [] };
  async componentDidMount() {
    try {
      const { data } = await http.get(apiEndpoint + "/seller/myproducts");
      this.setState({ products: data.myproducts });
    } catch (ex) {}
  }

  becomeSeller = () => {
    this.props.history.push("/seller/setup");
  };

  addProduct = () => {
    this.props.history.push("/addproduct");
  };

  render() {
    const { user } = this.props;
    const { products } = this.state;
    console.log(products);

    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Hello, {user && user.name}</h1>
          {user && user.type === "Customer" && (
            <div className="btn btn-info" onClick={this.becomeSeller}>
              Become Seller
            </div>
          )}
          {user && user.type === "Seller" && (
            <div className="btn btn-info" onClick={this.addProduct}>
              + Sell Product
            </div>
          )}
        </div>
        <h1 className="text-center" style={{ color: "teal" }}>
          My Products
        </h1>
        {products.map((product) => {
          return (
            <div key={product._id} className="rounded p-2 m-4 row pdiv">
              <img
                src={product.image}
                alt=""
                width="200"
                height="auto"
                className="rounded"
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
                <span>{`Rs: ${product.price} `}</span>
                <span>
                  <small>
                    <del>{`MRP: ${product.mrp} `}</del>
                  </small>
                </span>
                <h5>Stock Left : {product.count}</h5>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Seller;
