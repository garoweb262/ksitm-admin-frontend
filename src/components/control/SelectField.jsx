import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, name, options, value, onChange,  disabled = false, }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm text-start  font-medium text-dark">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">Select {label}</option>
        {options.map((option, index) =>
          typeof option === 'string' ? (
            // If option is a simple string, use it as both the label and value
            <option key={index} value={option}>
              {option}
            </option>
          ) : (
            // If option is an object, use the provided value and label
            <option key={index} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ])
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default SelectField;
