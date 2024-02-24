import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false); // State to control the error message visibility
  const Email = email.toLowerCase();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      // If any of the fields are empty, show the error message
      setShowError(true);
      return; // Prevent further execution
    }

    try {
      const response = await fetch(
        "http://localhost:8000/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email: Email, password }),
        }
      );

      if (response.ok) {
        const user = await response.json();

        if (user.error) {
          toast.warn("Utilisateur existe déja");
        } else {
          toast.success("Création avec succées");
          localStorage.setItem("token", user.token);
          setTimeout(() => {
            window.location.href = "/recipes";
          }, 4000);
        }
      } else {
        console.error("échec", response.status);
      }
    } catch (error) {
      toast.error("An error occurred while registering user:", error);
    }
  };

  return (
    <div className="SignupContainer">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <h2>Créer un compte</h2>
        <input
          type="text"
          placeholder="Entrer votre nom"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Entrer votre email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entrer votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
      {showError && (
        <span className="fill-fields-error">Veuillez remplir ce champ</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Register;
