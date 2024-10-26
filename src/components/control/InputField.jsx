import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  type = 'text',
  icon = null,
  placeholder = '',
  value = '',
  onChange = () => {}, // Set default to an empty function
  label = '',
  name = '',
  size = 'w-full',
  validationError = '',
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-sm text-start font-medium text-dark mb-1"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none cursor-pointer">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={
            placeholder || `Enter your ${label ? label.toLowerCase() : ''}`
          }
          className={`${size} px-2 py-2 border ${
            validationError ? 'border-red-500' : 'border-gray-300'
          } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            icon ? 'pl-10' : ''
          }`}
          disabled={disabled}
        />
      </div>
      {validationError && (
        <p className="text-red-500 text-sm mt-1">{validationError}</p>
      )}
    </div>
  );
};

// Adding prop type validation
InputField.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.element,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
  ]), // Allow string, boolean, or number
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  validationError: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputField;
