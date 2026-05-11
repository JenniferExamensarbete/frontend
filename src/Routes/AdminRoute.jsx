import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;