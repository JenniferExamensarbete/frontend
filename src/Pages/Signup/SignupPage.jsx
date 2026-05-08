import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <main className="auth-page">
      <section className="auth-card card">
        <div className="auth-header">
          <h1>Skapa konto</h1>
          <p>Registrera dig för att komma åt adminportalen.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Din emailadress"
          />
          <Input
            label="Lösenord"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Välj lösenord"
          />
          <Input
            label="Bekräfta lösenord"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Bekräfta lösenord"
          />

          <Button type="submit">Skapa konto</Button>
        </form>

        <p className="auth-link">
          Har du redan konto? <Link to="/login">Logga in</Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;