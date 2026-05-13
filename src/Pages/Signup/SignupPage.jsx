import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import Input from "../../components/Ui/Input.jsx";
import Button from "../../components/Ui/Button.jsx";
import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signup(formData);
      setSuccess("Konto skapat! Du kan nu logga in.");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError("Kunde inte skapa konto. Kontrollera uppgifterna.");
    } finally {
      setLoading(false);
    }
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
            label="Förnamn"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Ditt förnamn"
          />

          <Input
            label="Efternamn"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Ditt efternamn"
          />

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

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <Button type="submit">
            {loading ? "Skapar konto..." : "Skapa konto"}
          </Button>
        </form>

        <p className="auth-link">
          Har du redan konto? <Link to="/login">Logga in</Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;