import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../../components/ui/Button.jsx";
import ProfileModal from "../../components/modals/ProfileModal.jsx";
import Badge from "../../components/ui/Badge.jsx";
import "./ProfilePage.css";

function ProfilePage() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="page profile-page">
      <div className="page-header">
        <div>
          <h1>Min profil</h1>
          <p>Här kan du se och redigera din privata information.</p>
        </div>

        <Button onClick={() => setModalOpen(true)}>
          <i className="fa-solid fa-pen-to-square"></i>
          Redigera profil
        </Button>
      </div>

      <div className="profile-card card">
        <div className="profile-avatar-large">
          {user?.firstName?.charAt(0)}
          {user?.lastName?.charAt(0)}
        </div>

        <div className="profile-info">
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
          <Badge variant="normal">{user?.role}</Badge>
        </div>
      </div>

      {modalOpen && <ProfileModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}

export default ProfilePage;