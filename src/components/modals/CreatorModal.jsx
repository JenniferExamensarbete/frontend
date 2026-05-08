import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import Input from "../ui/Input.jsx";
import Textarea from "../ui/Textarea.jsx";
import Button from "../ui/Button.jsx";

function CreatorModal({ mode = "add", initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    interests: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        age: initialData.age || "",
        location: initialData.location || "",
        interests: initialData.interests || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      title={mode === "add" ? "Lägg till kreatör" : "Redigera kreatör"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input label="Namn" name="name" value={formData.name} onChange={handleChange} />
        <Input
          label="Ålder"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
        />
        <Input label="Bor" name="location" value={formData.location} onChange={handleChange} />
        <Textarea
          label="Intressen"
          name="interests"
          value={formData.interests}
          onChange={handleChange}
        />
        <Textarea
          label="Övrigt / ny information"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <Button type="submit">
          <i className="fa-solid fa-floppy-disk"></i>
          Spara
        </Button>
      </form>
    </Modal>
  );
}

export default CreatorModal;