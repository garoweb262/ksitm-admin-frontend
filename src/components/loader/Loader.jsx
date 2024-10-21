import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ loading }) => {
  return (
    <ClipLoader loading={loading} size={20} color="#ffffff" />
  );
}

export default Loader;
