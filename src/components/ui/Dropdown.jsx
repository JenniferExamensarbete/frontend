import { useEffect, useRef } from "react";
import "./Dropdown.css";

function Dropdown({ open, children, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!open) return null;

  return (
    <div ref={dropdownRef} className="dropdown-menu">
      {children}
    </div>
  );
}

export default Dropdown;