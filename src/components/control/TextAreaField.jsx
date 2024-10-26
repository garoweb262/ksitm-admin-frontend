import React from 'react';

const TextAreaField = ({
  label = '',
  name = '',
  value = '',
  onChange = () => {},
  placeholder = '',
  error = '',
  rows = 3,
  maxLength,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm text-start font-medium text-dark"
        >
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
        {...rest}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaField;
