import { useEffect, useState } from "react";
import Button from "../../components/ui/Button.jsx";
import CreatorCard from "../../components/cards/CreatorCard.jsx";
import CreatorModal from "../../components/modals/CreatorModal.jsx";
import {
  createCreator,
  deleteCreator,
  getAllCreators,
  updateCreator,
} from "../../Services/CreatorService.js";
import "./CreatorsPage.css";

function CreatorsPage() {
  const [creators, setCreators] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCreators = async () => {
    try {
      const result = await getAllCreators();

      if (result.success) {
        setCreators(result.result || []);
      }
    } catch (error) {
      console.error("Could not load creators:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCreators();
  }, []);

  const openAddModal = () => {
    setEditingCreator(null);
    setModalOpen(true);
  };

  const openEditModal = (creator) => {
    setEditingCreator(creator);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingCreator) {
        await updateCreator(editingCreator.id, {
          name: data.name,
          age: Number(data.age),
          location: data.location,
          interests: data.interests,
          notes: data.notes,
        });
      } else {
        await createCreator({
          name: data.name,
          age: Number(data.age),
          location: data.location,
          interests: data.interests,
          notes: data.notes,
        });
      }

      setModalOpen(false);
      await loadCreators();
    } catch (error) {
      console.error("Could not save creator:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCreator(id);
      await loadCreators();
    } catch (error) {
      console.error("Could not delete creator:", error);
    }
  };

  if (loading) {
    return <p>Laddar kreatörer...</p>;
  }

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