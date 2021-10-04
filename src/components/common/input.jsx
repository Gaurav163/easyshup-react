import React from "react";

const Input = ({ name, label, error, valid, validm, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className={`form-control ${valid}`}
        id={name}
        name={name}
        {...rest}
      ></input>
      {error && <div className="invalid-feedback">{error}</div>}
      {valid === "is-valid" && validm && (
        <div className="valid-feedback">{validm}</div>
      )}
    </div>
  );
};

export default Input;
