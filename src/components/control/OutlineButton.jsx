import React from 'react';
import PropTypes from 'prop-types';

const OutlineButton = ({ label, onClick, icon, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="p-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white flex flex-row space-x-2 items-center focus:outline-none"
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

OutlineButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.element,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default OutlineButton;
