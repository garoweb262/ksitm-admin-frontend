import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const OTPInput = ({ length = 6, value, onChange }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, event) => {
    const newValue = event.target.value;

    if (newValue.match(/^[0-9]$/)) {
      // If a valid digit is entered, update the value and focus next input
      onChange(value.substring(0, index) + newValue + value.substring(index + 1));
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else if (newValue === '') {
      // If the input is empty, focus the previous input
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData('Text');
    if (/^\d{6}$/.test(pastedData)) {
      // If the pasted data is 6 digits, update the value
      onChange(pastedData);
      inputRefs.current[length - 1].focus(); // Focus the last input
    }
    event.preventDefault(); // Prevent default paste behavior
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      ))}
    </div>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OTPInput;
