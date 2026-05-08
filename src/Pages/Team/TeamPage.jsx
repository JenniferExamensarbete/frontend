import { useState } from "react";
import { fakeTeam } from "../../data/fakeData.js";
import TeamCard from "../../components/cards/TeamCard.jsx";
import "./TeamPage.css";

function TeamPage() {
  const [team, setTeam] = useState(fakeTeam);

  const handleToggleActive = (id) => {
    setTeam((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, active: !member.active } : member
      )
    );
  };

  const handleDelete = (id) => {
    setTeam((prev) => prev.filter((member) => member.id !== id));
  };

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