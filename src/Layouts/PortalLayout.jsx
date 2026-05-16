import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar.jsx";
import Topbar from "../components/layout/Topbar.jsx";
import logo from "../assets/Images/logo.svg";
import "./PortalLayout.css";

function PortalLayout() {
  return (
    <div className="portal-layout">
      <div className="portal-logo">
        <a href="/" className="memories-logotype">
          <img src={logo} alt="Memories logo" className="portal-logo-image" />

          <span className="portal-logo-subtitle">
            Admin
          </span>
        </a>
      </div>

      <Sidebar />
      <Topbar />

      <main className="portal-main">
        <Outlet />
      </main>
    </div>
  );
}

export default PortalLayout;