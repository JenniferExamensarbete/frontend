import "./Textarea.css";

function Textarea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <textarea
        className="form-textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textarea;