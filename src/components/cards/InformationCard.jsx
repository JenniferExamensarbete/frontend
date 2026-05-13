import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import Dropdown from "../Ui/Dropdown.jsx";
import Badges from "../Ui/Badges.jsx";
import "./InformationCard.css";

function InformationCard({ information, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <article className="card information-card">
      <div className="card-header information-header">
        <div>
          <h3>{information.title}</h3>
          <p>{information.createdBy}</p>
        </div>

        {isAdmin && (
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
                onClick={() => onEdit(information)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                Redigera
              </button>

              <div className="divider"></div>

              <button
                className="dropdown-action remove"
                type="button"
                onClick={() => onDelete(information.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
                Ta bort
              </button>
            </Dropdown>
          </div>
        )}
      </div>

      <div className="card-body">
        <p>{information.text}</p>
      </div>

      <div className="card-footer">
        <Badge variant="normal">
          <i className="fa-solid fa-calendar"></i>
          {new Date(information.createdAt).toLocaleDateString("sv-SE")}
        </Badge>
      </div>
    </article>
  );
}

export default InformationCard;