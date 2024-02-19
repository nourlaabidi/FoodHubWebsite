import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling
import NewsletterForm from "./NewsletterForm";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch("https://recipe-app-mern.onrender.com/auth/recipe", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe data");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      if (window.confirm("Are you sure you want to delete this recipe?")) {
        const response = await fetch(
          `https://recipe-app-mern.onrender.com/auth/recipe/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Recipe deleted successfully");
          setTimeout(() => {
            window.location = "/recipes";
          }, 4000);
        } else {
          getRecipes();
          window.location = "/recipes";
        }
      }
    } catch (error) {
      toast.error("An error occurred while deleting the recipe:", error);
      setTimeout(() => {
        window.location.href = "/recipes";
      }, 3000);
    }
  };

  const handleAddToFavorites = async (recipeId) => {
    try {
      const response = await fetch(
        `https://recipe-app-mern.onrender.com/auth/likedRecipes/${recipeId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Recipe added to favorites successfully");
        setTimeout(() => {
          window.location.href = "/favouriteRecipes";
        }, 4000);
      } else {
        const data = await response.json();
        if (data.error === "Recipe already exists in your favorites") {
          toast.warn("Recipe already exists in your favorites");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.error("An error occurred while adding to favorites:", error);
    }
  };

  const SearchRecipes = async (e) => {
    try {
      if (e.target.value) {
        let Searchedrecipes = await fetch(
          `https://recipe-app-mern.onrender.com/auth/searchRecipes/${e.target.value}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Searchedrecipes = await Searchedrecipes.json();

        if (!Searchedrecipes.message) {
          setRecipes(Searchedrecipes);
        } else {
          setRecipes([]);
        }
      } else {
        getRecipes();
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="hero fade-in">
          <div className="slide-1">
            <img src="img/hero.jpg" alt="Hero Image" />
            <div className="hero-text">
              <h3>Explore a variety of recipes</h3>
              <a href="#">Start discovering now!</a>
            </div>
          </div>
        </div>
      </main>

            {recipes.length > 0 ? (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="Recipe">
              <h2>{recipe.title}</h2>
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.length > 0 && (
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                )}
              </ul>
              

              <div>
                <div>
                  
                  <button
                    className="add-to-favorites-button"
                    onClick={() => handleAddToFavorites(recipe._id)}
                  >
                    Add to Favorites
                  </button>
                </div>
                <div>
                  <Link to={"/addRecipe"}>Add more recipes</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        ) : (
          <h2 className="no-recipes">No Recipes Found</h2>
        )}
      <NewsletterForm />
    </div>
  );
};

export default Home;
