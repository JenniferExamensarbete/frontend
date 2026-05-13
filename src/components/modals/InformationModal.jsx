import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import Input from "../Ui/Input.jsx";
import Textarea from "../Ui/Textarea.jsx";
import Button from "../Ui/Button.jsx";

function InformationModal({ mode = "add", initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        text: initialData.text || "",
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
      title={mode === "add" ? "Lägg till information" : "Redigera information"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Titel"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ex. Veckoinformation v. 20"
        />

        <Textarea
          label="Information"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Skriv informationen här..."
        />

        <Button type="submit">
          <i className="fa-solid fa-floppy-disk"></i>
          Spara
        </Button>
      </form>
    </Modal>
  );
}

export default InformationModal;