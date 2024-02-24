import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const Email = email.toLowerCase();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setShowError(true);
      return;
    }

    try {
      let response = await fetch(
        "http://localhost:8000/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: Email, password }),
        }
      );

      response = await response.json();

      if (!response.error) {
        toast.success("succés");
        localStorage.setItem("token", response.token);

        setTimeout(() => {
          window.location.href = "/recipes";
        }, 4000);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("An error occurred while registering user:", error);
    }
  };

  return (
    <div className="SignupContainer">
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <h2>S'authentifier</h2>

        <input
          type="email"
          placeholder="Entreé votre email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Entrer votre mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="envoyer">Submit</button>

        <Link to="/forgotPassword">mot de passe oublié</Link>
      </form>
      {showError && (
        <span className="fill-fields-error">Veuillez remplir ce champ</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
