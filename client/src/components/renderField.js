import React from 'react';

const renderField = ({
  placeholder,
  input,
  label,
  type,
  meta: { touched, error }
}) => (
  <>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={placeholder ? placeholder : label}
        type={type}
      />
      {touched && error && <span>{error}</span>}
    </div>
  </>
);

export default renderField;
