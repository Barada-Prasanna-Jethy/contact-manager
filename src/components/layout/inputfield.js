import React from "react";

function inputfield(props) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className="form-control"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onchange}
      />
    </div>
  );
}
inputfield.defaultProps = {
  type: "text"
};

export default inputfield;
