import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling


const Home = () => {
  return (
    
       <div class="overlay-container">
          <div class="overlay-content">
            <div class="overlay-text"> 
                <p class="title">FoodHub</p>
                <p class="sub-title">choisissez votre recette préféré </p>
                <div className="button-container">
                  <Link to="/login" >
                    <button>S'authentifier</button>
                  </Link>
                  <Link to="/signup" >
                    <button>Créer un compte</button>
                  </Link>
                </div>

            </div>
          </div>
       </div>
  );
};

export default Home;
