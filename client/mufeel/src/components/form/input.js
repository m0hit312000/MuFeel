import React from "react";
import PropTypes from "prop-types";
/**
 * @author
 * @function Input
 **/

const Input = ({ name, type, placeholder, value, onChange, onBlur, text }) => {
  return (
    <div>
      <label>{text.label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={text.error ? true : false}
      />
      <div>{text.error}</div>
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
