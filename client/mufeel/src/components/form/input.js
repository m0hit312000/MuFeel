import React from "react";
import PropTypes from "prop-types";
import "./input.css";
/**
 * @author
 * @function Input
 **/

const Input = ({ name, type, placeholder, value, onChange, onBlur, text }) => {
  return (
    <div className="input">
      <label className="input_label">{text.label}</label>
      <input
        className="input_box"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={text.error ? true : false}
      />
      <div className="error" type="invalid">
        {text.error}
      </div>
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

export default Input;
