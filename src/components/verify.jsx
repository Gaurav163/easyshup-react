import React, { Component } from "react";
import http from "../services/httpService";
import { toast } from "react-toastify";
const apiEndpoint = process.env.REACT_APP_url;

class Verify extends Component {
  state = { message: "pending" };
  async componentDidMount() {
    try {
      const { data } = await http.get(
        apiEndpoint + "/user/verify/" + this.props.match.params.token
      );
      toast.success(data);
      this.props.history.replace("/");
    } catch (ex) {
      if (ex.response && ex.response.data) toast.error(ex.response.data);
      this.props.history.replace("/");
    }
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <div className="d-flex justify-content-center m-2">
          <h3 className="m-2">Verifying </h3>
          <div className="spinner-border m-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Verify;
