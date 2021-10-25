import React, { Component } from "react";
import http from "../services/httpService";

const apiUrl = process.env.REACT_APP_url;

class Home extends Component {
  state = { products: [] };
  async componentDidMount() {
    try {
      const response = await http.get(apiUrl + "/products/");
      const products = response.data.products;
      this.setState({ products });
      console.log(products);
    } catch (error) {}
  }
  viewProduct = (id) => {
    this.props.history.push("/product/" + id);
  };

  render() {
    const { products } = this.state;

    return (
      <div>
        <h1>Products</h1>
        {products.map((product) => {
          return (
            <div
              key={product._id}
              className="rounded row pdiv float-left"
              style={{
                width: "46%",
                margin: "10px 0 10px 3%",
                padding: "10px 1%",
              }}
              onClick={() => this.viewProduct(product._id)}
            >
              <img
                src={product.image}
                alt=""
                width="auto"
                height="250"
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
                <span>
                  <b>{`Rs: ${product.price} `}</b>
                </span>
                <span>
                  <small>
                    <del>{`MRP: ${product.mrp} `}</del>
                  </small>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
