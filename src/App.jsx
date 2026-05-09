import { Navigate, Route, Routes } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import TeamPage from "./pages/Team/TeamPage.jsx";
import CreatorsPage from "./pages/Creators/CreatorsPage.jsx";
import SchedulePage from "./pages/Schedule/SchedulePage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import SignupPage from "./pages/Signup/SignupPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

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
        <Route path="profil" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;