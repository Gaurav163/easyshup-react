import React from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiEndpoint = process.env.REACT_APP_url;

class Pdetail extends React.Component {
  state = { product: {} };
  async componentDidMount() {
    const response = await http.get(
      apiEndpoint + "/products/product/" + this.props.match.params.id
    );
    console.log(response.data.product);
    this.setState({ product: response.data.product });
  }

  addCart = async (id) => {
    try {
      const response = await http.get(apiEndpoint + "/buy/addcart/" + id);
      if (response.status === 200) {
        console.log(response.data.message);
        this.props.history.push("/cart");
        toast.success(response.data.message);
      }
    } catch (error) {}
  };
  buyProduct = (id) => {
    this.props.history.push("/buy/" + id);
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
            height="auto"
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

            <div style={{ position: "relative", bottom: "-40px" }}>
              <div
                className="btn btn-lg btn-success"
                style={{ width: "47%", marginRight: "6%" }}
                onClick={() => this.addCart(product._id)}
              >
                Add Cart
              </div>

              <div
                className="btn btn-lg btn-warning "
                style={{ width: "47%" }}
                onClick={() => this.buyProduct(product._id)}
              >
                Buy Now
              </div>
            </div>
            <br />
            <br />
            <br />
            <div className="p-2">
              <h3>Reviews</h3>

              <div className="m-2">
                <span className="badge badge-success mr-2">5 ✰</span>
                <solid>Nice Product </solid>
                <br />
                <small style={{ color: "grey" }}>
                  Harshit Kumar, 4 days Ago
                </small>
              </div>
              <div className="m-2">
                <span className="badge badge-success mr-2">4 ✰</span>
                <solid>Value for money and comfortable , good looking</solid>
                <br />
                <small style={{ color: "grey" }}>
                  Shahuraj Pawar, 4 Days Ago
                </small>
              </div>
              <div className="m-2">
                <span className="badge badge-success mr-2">4 ✰</span>
                <solid>Good Product not much as expected</solid>
                <br />
                <small style={{ color: "grey" }}>Gaurav, 1 Week Ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pdetail;
