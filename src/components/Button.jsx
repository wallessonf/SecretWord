import "./Button.css"; 

const Button = ({ children, onClick, type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      className="offset"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;