import React from 'react';
import PropTypes from 'prop-types';

// Define the format function outside the component for reusability
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const FormatDate = ({ value }) => {
  return (
    <div>{value ? formatDate(value) : 'N/A'}</div>
  );
};

FormatDate.propTypes = {
  value: PropTypes.string, // Accepting date strings
};

export default FormatDate;
