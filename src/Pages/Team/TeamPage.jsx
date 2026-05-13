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

      console.log("Team result:", teamResult);
      console.log("Profile result:", profileResult);

      const teamMembers = teamResult.result || [];
      const profiles = profileResult.result || [];

      const combinedTeam = profiles.map((profile) => {
        const teamMember = teamMembers.find(
          (member) => member.authUserId === profile.authUserId
        );

        return {
          id: teamMember?.id || profile.authUserId,
          authUserId: profile.authUserId,
          profile: profile,
          companyRole: teamMember?.companyRole || "Ingen roll satt",
          systemRole: teamMember?.systemRole || "Employee",
          active: teamMember?.active ?? true,
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