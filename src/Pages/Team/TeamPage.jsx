import { useEffect, useState } from "react";
import TeamCard from "../../components/cards/TeamCard.jsx";
import {
  deleteTeamMember,
  getTeamMembers,
  updateTeamMember,
} from "../../Services/teamService.js";
import { getAllProfiles } from "../../Services/profileService.js";
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
    try {
      await deleteTeamMember(authUserId);
      await loadTeam();
    } catch (error) {
      console.error("Could not delete team member:", error);
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
        {team.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
            onToggleActive={handleToggleActive}
            onDelete={handleDelete}
          />
        ))}
      </section>
    </section>
  );
}

export default TeamPage;