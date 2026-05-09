import { useState } from "react";
import { fakeCreators } from "../../data/fakeData.js";
import Button from "../../components/ui/Button.jsx";
import CreatorCard from "../../components/cards/CreatorCard.jsx";
import CreatorModal from "../../components/modals/CreatorModal.jsx";
import "./CreatorsPage.css";

function CreatorsPage() {
  const [creators, setCreators] = useState(fakeCreators);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);

  const openAddModal = () => {
    setEditingCreator(null);
    setModalOpen(true);
  };

  const openEditModal = (creator) => {
    setEditingCreator(creator);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingCreator) {
      setCreators((prev) =>
        prev.map((creator) =>
          creator.id === editingCreator.id
            ? {
                ...creator,
                ...data,
                updatedAt: new Date().toISOString().slice(0, 10),
              }
            : creator
        )
      );
    } else {
      const newCreator = {
        ...data,
        id: Date.now(),
        updatedAt: new Date().toISOString().slice(0, 10),
      };

      setCreators((prev) => [newCreator, ...prev]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setCreators((prev) => prev.filter((creator) => creator.id !== id));
  };

  return (
    <section className="page creators-page">
      <div className="page-header">
        <div>
          <h1>Kreatörer</h1>
          <p>Samlad information om kreatörer.</p>
        </div>

        <Button onClick={openAddModal}>
          <i className="fa-solid fa-plus"></i>
          Lägg till kreatör
        </Button>
      </div>

      <div className="status-row">
        <a>ALLA ({creators.length})</a>
        <a>AKTIVA ({creators.length})</a>
      </div>

      <section className="grid-list">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}
      </section>

      {modalOpen && (
        <CreatorModal
          mode={editingCreator ? "edit" : "add"}
          initialData={editingCreator}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

export default CreatorsPage;