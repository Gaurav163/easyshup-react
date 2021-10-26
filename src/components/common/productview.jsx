import React from "react";

class Pview extends React.Component {
  viewProduct = (id) => {
    this.props.history.push("/product/" + id);
  };

  render() {
    const { product } = this.props;
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
          height="280"
          className="rounded"
        />
        <div className="rounded col p-2">
          <h4>{product.name}</h4>
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
          <div style={{ fontSize: "larger" }}>★★★★☆</div>
        </div>
      </div>
    );
  }
}

export default Pview;
