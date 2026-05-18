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
    imageUrl: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        age: initialData.age || "",
        location: initialData.location || "",
        interests: initialData.interests || "",
        notes: initialData.notes || "",
        imageUrl: initialData.imageUrl || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrors([]);
      await onSave(formData);
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat();
        setErrors(validationErrors);
      } else if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["Något gick fel. Kontrollera uppgifterna och försök igen."]);
      }
    }
  };

  return (
    <Modal
      title={mode === "add" ? "Lägg till kreatör" : "Redigera kreatör"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Namn"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Ålder"
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="number"
        />

        <Input
          label="Bor"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

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

        <Input
          label="Bild URL"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://..."
        />

        {errors.length > 0 && (
          <div className="form-errors">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <Button type="submit">
          <i className="fa-solid fa-floppy-disk"></i>
          Spara
        </Button>
      </form>
    </Modal>
  );
}

export default CreatorModal;