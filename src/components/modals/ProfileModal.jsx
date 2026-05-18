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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
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

        <Button type="submit">Spara profil</Button>
      </form>
    </Modal>
  );
}

export default ProfileModal;