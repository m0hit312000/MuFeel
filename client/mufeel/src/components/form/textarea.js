import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ name, placeholder, value, onChange, onBlur, text }) => {
  return (
    <div>
      <label>{text.label}</label>
      <input
        name={name}
        as="textarea"
        row="10"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={text.error ? true : false}
      />
      <div type="invalid">{text.error}</div>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  text: PropTypes.object.isRequired,
};

export default Textarea;
