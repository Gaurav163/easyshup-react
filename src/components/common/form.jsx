import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return;
    const errors = {};
    const { valids } = this.state;
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
      valids[item.path[0]] = "is-invalid";
    }
    this.setState({ errors, valids });
    return error ? error : null;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error?.details[0]?.message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const { data, errors, valids } = this.state;
    data[input.name] = input.value;
    const error = this.validateProperty(input);
    if (error) {
      errors[input.name] = error;
      valids[input.name] = "is-invalid";
    } else {
      valids[input.name] = "is-valid";
      delete errors[input.name];
    }

    this.setState({ data, valids, errors });
  };

  renderInput(name, label, type = "text") {
    const { data, errors, valids } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        valid={valids[name]}
        error={errors[name]}
      />
    );
  }
  renderButton(label) {
    return (
      <div
        className="btn btn-info"
        onClick={this.handleSubmit}
        style={{ backgroundColor: "teal" }}
      >
        {label}
      </div>
    );
  }
}

export default Form;
