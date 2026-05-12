import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Button from "../../components/ui/Button.jsx";
import InformationCard from "../../components/cards/InformationCard.jsx";
import InformationModal from "../../components/modals/InformationModal.jsx";
import {
  createInformation,
  deleteInformation,
  getAllInformation,
  updateInformation,
} from "../../services/informationService.js";
import "./DashboardPage.css";

function DashboardPage() {
  const { user, isAdmin } = useAuth();

  const [informationList, setInformationList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInformation, setEditingInformation] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadInformation = async () => {
    try {
      const result = await getAllInformation();

      if (result.success) {
        setInformationList(result.result || []);
      }
    } catch (error) {
      console.error("Could not load information:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInformation();
  }, []);

  const openAddModal = () => {
    setEditingInformation(null);
    setModalOpen(true);
  };

  const openEditModal = (information) => {
    setEditingInformation(information);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingInformation) {
        await updateInformation(editingInformation.id, {
          title: data.title,
          text: data.text,
        });
      } else {
        await createInformation({
          title: data.title,
          text: data.text,
          createdBy: `${user.firstName} ${user.lastName}`,
          createdByUserId: user.id,
        });
      }

      setModalOpen(false);
      await loadInformation();
    } catch (error) {
      console.error("Could not save information:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInformation(id);
      await loadInformation();
    } catch (error) {
      console.error("Could not delete information:", error);
    }
  };

  if (loading) {
    return <p>Laddar information...</p>;
  }

  return (
    <section className="page dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Senaste informationen från företaget.</p>
        </div>

        {isAdmin && (
          <Button onClick={openAddModal}>
            <i className="fa-solid fa-plus"></i>
            Lägg till information
          </Button>
        )}
      </div>

      <div className="status-row">
        <a>ALLA ({informationList.length})</a>
        <a>AKTIVA ({informationList.length})</a>
      </div>

      <section className="grid-list">
        {informationList.map((information) => (
          <InformationCard
            key={information.id}
            information={information}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {modalOpen && (
        <InformationModal
          mode={editingInformation ? "edit" : "add"}
          initialData={editingInformation}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

export default DashboardPage;