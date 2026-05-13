import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../../components/ui/Button.jsx";
import ProfileModal from "../../components/modals/ProfileModal.jsx";
import Badges from "../../components/ui/Badges.jsx";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../../Services/profileService.js";
import "./ProfilePage.css";

function ProfilePage() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const result = await getProfile(user.id);

      if (result.success) {
        setProfile(result.result);
      }
    } catch {
      const newProfile = {
        authUserId: user.id,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        imageUrl: "",
      };

      const result = await createProfile(newProfile);

      if (result.success) {
        const loadedProfile = await getProfile(user.id);
        setProfile(loadedProfile.result);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const handleSaveProfile = async (data) => {
    const result = await updateProfile(user.id, data);

    if (result.success) {
      const updated = await getProfile(user.id);
      setProfile(updated.result);

      setUser((prev) => ({
        ...prev,
        firstName: updated.result.firstName,
        lastName: updated.result.lastName,
        phone: updated.result.phone,
      }));

      setModalOpen(false);
    }
  };

  if (loading) {
    return <p>Laddar profil...</p>;
  }

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
          {profile?.firstName?.charAt(0)}
          {profile?.lastName?.charAt(0)}
        </div>

        <div className="profile-info">
          <h2>
            {profile?.firstName} {profile?.lastName}
          </h2>
          <p>{profile?.email}</p>
          <p>{profile?.phone}</p>
          <Badges variant="normal">{user?.role}</Badges>
        </div>
      </div>

      {modalOpen && (
        <ProfileModal
          profile={profile}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </section>
  );
}

export default ProfilePage;