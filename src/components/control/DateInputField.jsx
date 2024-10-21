import React from 'react';
import PropTypes from 'prop-types';

const DateInputField = ({ label, name, value, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

DateInputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // Change to required
  onChange: PropTypes.func.isRequired,
};

export default DateInputField;
