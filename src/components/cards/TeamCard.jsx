import { useAuth } from "../../Contexts/AuthContext.jsx";
import Badges from "../Ui/Badges.jsx";
import "./TeamCard.css";

function TeamCard({ member, onToggleActive, onDelete }) {
  const { isAdmin } = useAuth();

  const profile = member.profile;

  const firstName = profile?.firstName || "Okänd";
  const lastName = profile?.lastName || "användare";
  const email = profile?.email || "Ingen email";
  const phone = profile?.phone || "Inget telefonnummer";
  const imageUrl = profile?.imageUrl;

  return (
    <article className="card team-card">
      <div className="team-avatar">
        {imageUrl ? (
          <img src={imageUrl} alt={`${firstName} ${lastName}`} />
        ) : (
          <>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </>
        )}
      </div>

      <div className="team-info">
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{member.companyRole}</p>
        <small>{email}</small>
        <small>{phone}</small>
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