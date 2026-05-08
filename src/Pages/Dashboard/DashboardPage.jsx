import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { fakeInformation } from "../../data/fakeData.js";
import Button from "../../components/ui/Button.jsx";
import InformationCard from "../../components/cards/InformationCard.jsx";
import InformationModal from "../../components/modals/InformationModal.jsx";
import "./DashboardPage.css";

function DashboardPage() {
  const { user, isAdmin } = useAuth();

  const [informationList, setInformationList] = useState(fakeInformation);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInformation, setEditingInformation] = useState(null);

  const openAddModal = () => {
    setEditingInformation(null);
    setModalOpen(true);
  };

  const openEditModal = (information) => {
    setEditingInformation(information);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingInformation) {
      setInformationList((prev) =>
        prev.map((item) =>
          item.id === editingInformation.id ? { ...item, ...data } : item
        )
      );
    } else {
      const newInformation = {
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString().slice(0, 10),
        createdBy: `${user.firstName} ${user.lastName}`,
      };

      setInformationList((prev) => [newInformation, ...prev]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setInformationList((prev) => prev.filter((item) => item.id !== id));
  };

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