import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ loading }) => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader loading={loading} size={30} color="#186838" />
      <ClipLoader loading={loading} size={30} color="#186838" />
      <ClipLoader loading={loading} size={30} color="#186838" />
    </div>
  );
};

export default Loader;
