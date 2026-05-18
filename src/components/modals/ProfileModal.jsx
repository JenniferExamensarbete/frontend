import { useState } from "react";
import Modal from "./Modal.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

function ProfileModal({ profile, onClose, onSave }) {
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    imageUrl: profile?.imageUrl || "",
  });

  const [errors, setErrors] = useState([]);

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
        const validationErrors = Object.values(
          error.response.data.errors
        ).flat();

        setErrors(validationErrors);
      } else if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["Något gick fel. Försök igen."]);
      }
    }
  };

  return (
    <Modal title="Redigera profil" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Input
          label="Förnamn"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <Input
          label="Efternamn"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
        />

        <Input
          label="Telefonnummer"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Bild-URL"
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

        <Button type="submit">Spara profil</Button>
      </form>
    </Modal>
  );
}

export default ProfileModal;