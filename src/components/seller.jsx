import React, { Component } from "react";

class Seller extends Component {
  state = { products: [] };
  componentDidMount() {}

  becomeSeller = () => {
    this.props.history.push("/seller/setup");
  };

  addProduct = () => {
    this.props.history.push("/addproduct");
  };

  render() {
    const { user } = this.props;
    const { products } = this.state;

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
        {products.map((product) => {})}
      </div>
    );
  }
}

export default Seller;
