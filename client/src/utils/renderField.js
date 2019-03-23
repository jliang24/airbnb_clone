import React from 'react';

export const renderError = ({ error, touched }) => {
  if (touched && error) {
    return (
      <div className="ui pointing red basic label">
        <div>{error}</div>
      </div>
    );
  }
};

export const renderField = ({ placeholder, input, label, type, meta }) => (
  <>
    <label>{label}</label>
    <div>
      <input
        {...input}
        placeholder={placeholder ? placeholder : label}
        type={type}
      />
      {renderError(meta)}
    </div>
  </>
);
