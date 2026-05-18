import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { createTeamMember } from "../../Services/teamService.js";
import { createProfile } from "../../Services/profileService.js";
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

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    setErrors([]);
    setSuccess("");
    setLoading(true);

    try {
         const result = await signup(formData);

          const createdUser = result?.user;

          if (!createdUser?.id) {
            throw new Error("Konto skapades men användar-id saknas.");
          }

          await createProfile({
            authUserId: createdUser.id,
            email: createdUser.email,
            firstName: createdUser.firstName || null,
            lastName: createdUser.lastName || null,
            phone: null,
            imageUrl: null,
          });

          await createTeamMember({
            authUserId: createdUser.id,
            companyRole: "Ingen roll satt",
            systemRole: createdUser.role || "Employee",
            active: true,
          });

      setSuccess("Konto skapat och användaren är tillagd i teamet!");

      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });

      setTimeout(() => {
        navigate("/team");
      }, 1000);
    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        const validationErrors = Object.values(
          error.response.data.errors
        ).flat();

        setErrors(validationErrors);
      } else if (error.response?.data?.error) {
        setErrors([error.response.data.error]);
      } else if (error.message) {
        setErrors([error.message]);
      } else {
        setErrors(["Kunde inte skapa konto."]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card card">
        <div className="auth-header">
          <h1>Skapa konto</h1>
          <p>Skapa ett konto för en ny användare.</p>
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

          {errors.length > 0 && (
            <div className="form-errors">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

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