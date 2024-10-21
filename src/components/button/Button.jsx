import PropTypes from "prop-types";

const Button = ({ label, onClick, disabled, type = "button", icon, variant = "solid", className, ...props }) => {
  const buttonClass =
    variant === "outline"
      ? "py-1 px-3 border border-primary text-primary bg-transparent rounded-xl hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary"
      : "py-1 px-3 bg-primary text-white rounded-xl active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <button
      type={type}
      onClick={onClick}
      className={` ${buttonClass} ${className}`} {...props}
      disabled={disabled}
    >
      <span className={!icon ? "text-center" : "flex flex-row space-x-1 items-center"}>
        {icon && <span>{icon}</span>}
        <span>{label}</span> {/* Render label directly, it can be a string or any React node */}
      </span>
    </button>
  );
};

// Update the PropTypes to accept both string and node for the label
Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired, // Accepts either string or node
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  icon: PropTypes.element,
  variant: PropTypes.oneOf(["solid", "outline"]), // Add "variant" prop type
};

export default Button;
