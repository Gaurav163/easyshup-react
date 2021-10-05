import React, { Component } from "react";

class Profile extends Component {
  render() {
    return (
      <div className="jumbotron container">
        <h1>Hello, {this.props.user && this.props.user.name}</h1>
        <p class="lead">Thanks for using</p>
      </div>
    );
  }
}

export default Profile;
