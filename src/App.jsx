import { Navigate, Route, Routes } from "react-router-dom";
import PortalLayout from "./Layouts/PortalLayout.jsx";
import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import DashboardPage from "./Pages/Dashboard/DashboardPage.jsx";
import TeamPage from "./Pages/Team/TeamPage.jsx";
import CreatorsPage from "./Pages/Creators/CreatorsPage.jsx";
import SchedulePage from "./Pages/Schedule/SchedulePage.jsx";
import ProfilePage from "./Pages/Profile/ProfilePage.jsx";
import LoginPage from "./Pages/Login/LoginPage.jsx";
import SignupPage from "./Pages/Signup/SignupPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
     <Route path="/signup" element={
      <ProtectedRoute>
        <AdminRoute>
          <SignupPage />
        </AdminRoute>
      </ProtectedRoute>
     } 
     

     />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PortalLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="schema" element={<SchedulePage />} />
        <Route path="kreatorer" element={<CreatorsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;