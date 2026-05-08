import "./Input.css";

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;