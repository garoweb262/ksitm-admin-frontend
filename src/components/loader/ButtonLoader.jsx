import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const ButtonLoader = ({ loading }) => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader loading={loading} size={20} color="#ffffff" />
    </div>
  );
};

export default ButtonLoader;
