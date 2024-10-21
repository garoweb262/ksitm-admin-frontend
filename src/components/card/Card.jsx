const Card = ({ children, className, ...props }) => {
  return (
    <div className={`shadow-md rounded-sm p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
