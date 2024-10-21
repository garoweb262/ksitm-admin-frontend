// MenuLink.js
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuLink = ({ item, path, location, icon, isExpanded, onClick }) => {
  const isActive = location.pathname === path;

  return (
    <Link to={path} onClick={onClick}>
      <div
        className={`flex items-center gap-3 p-3 rounded ${
          isActive
            ? "bg-green-700 text-white py-2 border-l-4"
            : "bg-primary hover:bg-green-700 hover:text-white"
        }`}
      >
        {icon}
        {isExpanded && <h2>{item}</h2>}
      </div>
    </Link>
  );
};

// Prop validation
MenuLink.propTypes = {
  item: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  icon: PropTypes.element.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MenuLink;
