import "./input.css";

export const Input = ({ type, placeholder, input, error }) => {
  return (
    <div className="input_div">
      {" "}
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        {...input}
      />
      {error && <span className="error_span">{error.message}</span>}
    </div>
  );
};
