import PropTypes from "prop-types";

const PrimaryButton = ({ children, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 font-inter bg-secondary text-white rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      {...props}
    >
      {children}
    </button>
  );
};

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  // Define additional prop types if necessary
};

export default PrimaryButton;
