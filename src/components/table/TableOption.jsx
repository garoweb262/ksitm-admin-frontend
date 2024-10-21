import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MoreVert } from "@mui/icons-material";

const TableOption = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 focus:outline-none"
      >
        <MoreVert />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-0 w-40 bg-white rounded-md shadow-lg z-10">
          <div className="py-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

TableOption.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableOption;
