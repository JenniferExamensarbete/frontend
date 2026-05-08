import { useAuth } from "../../contexts/AuthContext.jsx";
import Badge from "../ui/Badges.jsx";
import "./TeamCard.css";

function TeamCard({ member, onToggleActive, onDelete }) {
  const { isAdmin } = useAuth();

  return (
    <article className="card team-card">
      <div className="team-avatar">
        {member.firstName.charAt(0)}
        {member.lastName.charAt(0)}
      </div>

      <div className="team-info">
        <h3>
          {member.firstName} {member.lastName}
        </h3>
        <p>{member.companyRole}</p>
        <small>{member.email}</small>
        <small>{member.phone}</small>
      </div>

      <div className="team-meta">
        <Badge variant={member.active ? "success" : "danger"}>
          {member.active ? "Aktiv" : "Inaktiv"}
        </Badge>
        <Badge variant="normal">{member.systemRole}</Badge>
      </div>

      {isAdmin && (
        <div className="team-actions">
          <button type="button" onClick={() => onToggleActive(member.id)}>
            {member.active ? "Inaktivera" : "Aktivera"}
          </button>
          <button className="remove" type="button" onClick={() => onDelete(member.id)}>
            Ta bort
          </button>
        </div>
      )}
    </article>
  );
}

export default TeamCard;