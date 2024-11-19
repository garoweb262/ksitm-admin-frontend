import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  type = 'text',
  icon,
  placeholder = '',
  value,
  onChange,
  label,
  name,
  size = 'w-full',
  validationError,
  disabled = false, // Add disabled prop with a default value of false
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
            icon ? 'pr-10' : ''
          }`}
          disabled={disabled} // Pass disabled prop to the input element
        />
        {icon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>
      {validationError && (
        <p className="text-red-500 text-sm mt-1">{validationError}</p>
      )}
    </div>
  );
};

// Adding prop type validation
InputField.propTypes = {
  type: PropTypes.string, // The type of input (e.g., 'text', 'email', 'password')
  icon: PropTypes.element, // A JSX element for the icon (optional)
  placeholder: PropTypes.string, // Placeholder text
  value: PropTypes.string.isRequired, // The current value of the input
  onChange: PropTypes.func.isRequired, // A function to handle changes
  label: PropTypes.string, // Label for the input field
  name: PropTypes.string.isRequired, // Name attribute for the input
  size: PropTypes.string, // Size or custom classes for the input field
  validationError: PropTypes.string, // Validation error message (optional)
  disabled: PropTypes.bool, // Add prop type for disabled
};

export default InputField;
