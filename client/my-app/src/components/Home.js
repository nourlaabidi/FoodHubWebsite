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
                <p class="title">Food<span class="red-text">Hub</span></p>
                <p class="sub-title">choisissez votre recette préféré </p>
                <div className="button-container">
                  <Link to="/login" >
                    <button>Login</button>
                  </Link>
                  <Link to="/signup" >
                    <button>SignUp</button>
                  </Link>
                </div>

            </div>
          </div>
       </div>
  );
};

export default Home;
