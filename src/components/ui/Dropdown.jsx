import "./Dropdown.css";

function Dropdown({ open, children }) {
  if (!open) return null;

  return <div className="dropdown-menu">{children}</div>;
}

export default Dropdown;