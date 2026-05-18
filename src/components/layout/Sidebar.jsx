import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./Sidebar.css";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" end className="sidebar-link">
          <i className="fa-solid fa-house-user"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/team" className="sidebar-link">
          <i className="fa-solid fa-user-group"></i>
          <span>Team</span>
        </NavLink>

        <NavLink to="/schema" className="sidebar-link">
          <i className="fa-solid fa-calendar-days"></i>
          <span>Schema</span>
        </NavLink>

        <NavLink to="/kreatorer" className="sidebar-link">
          <i className="fa-solid fa-star"></i>
          <span>Kreatörer</span>
        </NavLink>

        <NavLink to="/profile" className="sidebar-link">
          <i className="fa-solid fa-user"></i>
          <span>Profil</span>
        </NavLink>

        {user?.role === "Admin" && (
          <NavLink to="/signup" className="sidebar-link">
            <i className="fa-solid fa-user-plus"></i>
            <span>Skapa användare</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;