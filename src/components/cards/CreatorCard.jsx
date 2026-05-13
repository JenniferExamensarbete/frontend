import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import Badges from "../ui/Badges.jsx";
import "./CreatorCard.css";

function CreatorCard({ creator, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <article className="card creator-card">
      <div className="card-header creator-header">
        <div className="creator-avatar">
          {creator.name?.charAt(0)}
        </div>

        <div>
          <h3>{creator.name}</h3>
          <p>{creator.location}</p>
        </div>

        <div className="card-actions">
          <button
            className="action-button"
            type="button"
            onClick={() => setOpen(!open)}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>

          <Dropdown open={open}>
            <button
              className="dropdown-action"
              type="button"
              onClick={() => onEdit(creator)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
              Redigera / uppdatera
            </button>

            {isAdmin && (
              <>
                <div className="divider"></div>

                <button
                  className="dropdown-action remove"
                  type="button"
                  onClick={() => onDelete(creator.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                  Ta bort
                </button>
              </>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="card-body creator-body">
        <p>
          <strong>Ålder:</strong> {creator.age}
        </p>

        <p>
          <strong>Bor:</strong> {creator.location}
        </p>

        <p>
          <strong>Intressen:</strong> {creator.interests}
        </p>

        <p>
          <strong>Övrigt:</strong> {creator.notes}
        </p>
      </div>

      <div className="card-footer">
        <Badges variant="normal">
           Uppdaterad {new Date(creator.updatedAt).toLocaleDateString("sv-SE")}
        </Badges>
      </div>
    </article>
  );
}

export default CreatorCard;