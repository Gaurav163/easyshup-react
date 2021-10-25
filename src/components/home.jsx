import React, { Component } from "react";
import http from "../services/httpService";
import Pview from "./common/productview";

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
        {products.map((product) => (
          <Pview product={product} {...this.props} />
        ))}
      </div>
    );
  }
}

export default Home;
