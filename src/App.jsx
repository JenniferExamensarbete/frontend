import { Navigate, Route, Routes } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import DashboardPage from "./Pages/dashboard/DashboardPage.jsx";
import TeamPage from "./Pages/team/TeamPage.jsx";
import CreatorsPage from "./Pages/creators/CreatorsPage.jsx";
import SchedulePage from "./Pages/schedule/SchedulePage.jsx";
import ProfilePage from "./Pages/profile/ProfilePage.jsx";
import LoginPage from "./Pages/login/LoginPage.jsx";
import SignupPage from "./Pages/signup/SignupPage.jsx";

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