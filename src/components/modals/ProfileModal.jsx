import { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import Modal from "./Modal.jsx";
import Input from "../Ui/Input.jsx";
import Button from "../Ui/Button.jsx";

function ProfileModal({ onClose }) {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, ...formData }));
    onClose();
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

        <Button type="submit">Spara profil</Button>
      </form>
    </Modal>
  );
}

export default ProfileModal;