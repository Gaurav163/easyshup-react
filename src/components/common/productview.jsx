import React from "react";

class Pview extends React.Component {
  style = {
    backgroundImage: `url(${this.props.product.image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
  render() {
    const { product } = this.props;
    return (
      <div className="float-left pview" style={this.style}>
        {product.name}
      </div>
    );
  }
}

export default Pview;
