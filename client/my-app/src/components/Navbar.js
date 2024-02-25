import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const LogoutUser = () => {
    if (window.confirm("vous voulez vous déconnecter?")) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      window.location.href = "/recipes";
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const auth = localStorage.getItem("token");

  const handleToggleMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <nav>
        <div className="nav-left">
          <FontAwesomeIcon
            icon={faBars}
            className="hamburger-icon"
            onClick={toggleMenu}
            style={isOpen ? { transform: "rotate(90deg)" } : {}}
          />

          <h2>Food<span class="red-text">Hub</span></h2>
        </div>
        <div className={`nav-right ${isOpen ? "open" : ""}`}>
          <ul>
           
            {auth ? (
              <>
                <li>
                  <NavLink to="/recipes" onClick={handleToggleMenu}>
                    Recettes
                  </NavLink>
                </li>

                
                <li>
                  <NavLink to="/favouriteRecipes" onClick={handleToggleMenu}>
                    Favoris
                  </NavLink>
                </li>
                <li>
                  <NavLink to="login" onClick={LogoutUser}>
                    Déconnexion
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="login">S'authentifier</NavLink>
                </li>
                <li>
                  <NavLink to="signup">Créer un compte</NavLink>
                </li>
                
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
