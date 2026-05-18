import { useEffect, useState } from "react";
import TeamCard from "../../components/cards/TeamCard.jsx";
import {
  deleteProfile,
  getAllProfiles,
} from "../../Services/profileService.js";
import { deleteAuthUser } from "../../Services/authService.js";
import {
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "../../Services/teamService.js";
import "./TeamPage.css";

function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTeam = async () => {
    try {
      const teamResult = await getTeamMembers();
      const profileResult = await getAllProfiles();

      const teamMembers = teamResult.result || [];
      const profiles = profileResult.result || [];

      const combinedTeam = teamMembers.map((member) => {
        const profile = profiles.find(
          (profile) => profile.authUserId === member.authUserId
        );

        return {
          ...member,
          profile,
        };
      });

      setTeam(combinedTeam);
    } catch (error) {
      console.error("Could not load team:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleToggleActive = async (authUserId, currentActive) => {
    try {
      await updateTeamMember(authUserId, {
        active: !currentActive,
      });

      await loadTeam();
    } catch (error) {
      console.error("Could not update team member:", error);
    }
  };

  const handleDelete = async (authUserId) => {
    const confirmed = window.confirm(
      "Är du säker på att du vill ta bort användaren helt? Detta tar bort konto, profil och teamkoppling."
    );

    if (!confirmed) return;

    try {
      await deleteTeamMember(authUserId);
      await deleteProfile(authUserId);
      await deleteAuthUser(authUserId);

      await loadTeam();
    } catch (error) {
      console.error("Could not delete user completely:", error);
    }
  };

  if (loading) {
    return <p>Laddar team...</p>;
  }

  return (
    <section className="page team-page">
      <div className="page-header">
        <div>
          <h1>Team</h1>
          <p>Alla medlemmar som finns i systemet.</p>
        </div>
      </div>

      <section className="team-list">
        {team.length > 0 ? (
          team.map((member) => (
            <TeamCard
              key={member.authUserId}
              member={member}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Inga teammedlemmar hittades.</p>
        )}
      </section>
    </section>
  );
}

export default TeamPage;