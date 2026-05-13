import { useAuth } from "../../contexts/AuthContext.jsx";
import Badge from "../ui/Badge.jsx";
import "./TeamCard.css";

function TeamCard({ member, onToggleActive, onDelete }) {
  const { isAdmin } = useAuth();

  return (
    <article className="card team-card">
      <div className="team-avatar">
        {member.companyRole?.charAt(0) || "T"}
      </div>

      <div className="team-info">
        <h3>{member.companyRole}</h3>
        <p>AuthUserId: {member.authUserId}</p>
        <small>ProfileId: {member.profileId || "Saknas"}</small>
      </div>

      <div className="team-meta">
        <Badge variant={member.active ? "success" : "danger"}>
          {member.active ? "Aktiv" : "Inaktiv"}
        </Badge>

        <Badge variant="normal">{member.systemRole}</Badge>
      </div>

      {isAdmin && (
        <div className="team-actions">
          <button
            type="button"
            onClick={() => onToggleActive(member.authUserId, member.active)}
          >
            {member.active ? "Inaktivera" : "Aktivera"}
          </button>

          <button
            className="remove"
            type="button"
            onClick={() => onDelete(member.authUserId)}
          >
            Ta bort
          </button>
        </div>
      )}
    </article>
  );
}

export default TeamCard;