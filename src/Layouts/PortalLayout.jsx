import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar.jsx";
import Topbar from "../components/Layout/Topbar.jsx";
import "./PortalLayout.css";

function PortalLayout() {
  return (
    <div className="portal-layout">
      <div className="portal-logo">
        <a href="/" className="memories-logotype">
          <span className="logo-mark">A</span>
          <span>Admin</span>
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