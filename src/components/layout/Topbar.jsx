import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import "./Topbar.css";

function Topbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <form className="search-form">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" placeholder="Sök i portalen..." />
      </form>

      <div className="topbar-actions">
        <button className="icon-button" type="button">
          <i className="fa-solid fa-gear"></i>
        </button>

        <div className="account-menu">
          <button
            className="account-button"
            type="button"
            onClick={() => setOpen(!open)}
          >
            <span>{user?.firstName?.charAt(0) || "U"}</span>
          </button>

           <Dropdown open={open} onClose={() => setOpen(false)}>
            <div className="account-info">
              <strong>
                {user?.firstName} {user?.lastName}
              </strong>
              <small>{user?.email}</small>
              <span className="role-pill">{user?.role}</span>
            </div>

            <div className="divider"></div>

            <button className="dropdown-action" type="button" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              Logga ut
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Topbar;