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
      console.log("Loaded profile:", result);

      if (result.success) {
        setProfile(result.result);
      }
    } catch (error) {
      console.log("Profile not found, creating new profile...");

      const newProfile = {
        authUserId: user.id,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        imageUrl: "",
      };

      const result = await createProfile(newProfile);
      console.log("Created profile:", result);

      if (result.success) {
        setProfile(result.result || newProfile);
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
    try {
      const profileData = {
        ...profile,
        ...data,
        authUserId: user.id,
        email: data.email || user.email,
      };

      const result = await updateProfile(user.id, profileData);
      console.log("Update profile result:", result);

      if (result.success) {
        setProfile(profileData);

        setUser((prev) => ({
          ...prev,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          phone: profileData.phone,
          email: profileData.email,
        }));

        setModalOpen(false);
      }
    } catch (error) {
      console.error("Could not update profile:", error);
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
            {profile?.firstName || "Förnamn"} {profile?.lastName || "Efternamn"}
          </h2>
          <p>{profile?.email || user?.email}</p>
          <p>{profile?.phone || "Inget telefonnummer"}</p>
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