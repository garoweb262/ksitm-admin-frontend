import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterSearch = ({ onClick, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
    if (onClick) onClick(); // Call the onClick prop if provided
  };

  return (
    <div className="flex flex-col space-y-3">
      <div onClick={handleClick} className="flex flex-row space-x-2 cursor-pointer">
        <p className="text-primary text-md">Advance Search Filter</p>
        <FilterListIcon fontSize="small" className="text-primary" />
      </div>
      {isVisible && (
        <div className="mt-3 p-3 rounded">
          {children} {/* Display the children content here when isVisible is true */}
        </div>
      )}
    </div>
  );
};

export default FilterSearch;
