import React from "react";

const Input = ({ name, label, error, valid, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={`form-control ${valid}`}
        id={name}
        name={name}
        {...rest}
        rest
      ></input>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default Input;
