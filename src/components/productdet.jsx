import React from "react";
import http from "../services/httpService";
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
            <span className="badge badge-success p-1"> Special Offer</span>
            <br />
            <span>
              <small>
                <del>{`MRP: ${product.mrp} `}</del>
              </small>
            </span>
            <br />
            <div style={{ position: "relative", bottom: "-40px" }}>
              <div
                className="btn btn-lg btn-success"
                style={{ width: "47%", marginRight: "6%" }}
              >
                Add Cart{" "}
              </div>

              <div className="btn btn-lg btn-warning " style={{ width: "47%" }}>
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pdetail;
