import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password);
    navigate("/");
  };

  return (
    <main className="auth-page">
      <section className="auth-card card">
        <div className="auth-header">
          <h1>Logga in</h1>
          <p>Välkommen tillbaka till adminportalen.</p>
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
            placeholder="Ditt lösenord"
          />

          <Button type="submit">Logga in</Button>
        </form>

        <p className="auth-link">
          Har du inget konto? <Link to="/signup">Skapa konto</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;