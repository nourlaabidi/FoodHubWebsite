import React, { useEffect, useState } from "react";
import "../styles/RecipeStyle.css";
import { Link } from "react-router-dom";
import "../styles/Searchbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [uniqueIngredients, setUniqueIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch("http://localhost:8000/auth/recipe", {
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
        extractUniqueIngredients(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const extractUniqueIngredients = (data) => {
    const allIngredients = data.reduce((acc, recipe) => {
      return [...acc, ...recipe.ingredients];
    }, []);
    const uniqueIngredients = [...new Set(allIngredients)];
    setUniqueIngredients(uniqueIngredients);
  };

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const filterRecipesByIngredients = (recipe) => {
    if (selectedIngredients.length === 0) {
      return true; // Si aucun ingrédient sélectionné, toutes les recettes sont affichées
    }
    
    // Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
    return selectedIngredients.every(ingredient =>
      recipe.ingredients.includes(ingredient)
    );
  };
  

  const handleDeleteRecipe = async (recipeId) => {
    try {
      if (window.confirm("Vous etes sur de supprimer cette recette?")) {
        const response = await fetch(
          `http://localhost:8000/auth/recipe/${recipeId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Suppression avec succées");
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
        `http://localhost:8000/auth/likedRecipes/${recipeId}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Recette ajouté au favoris avec succées");
        setTimeout(() => {
          window.location.href = "/favouriteRecipes";
        }, 4000);
      } else {
        const data = await response.json();
        if (data.error === "Recette deja existante dans les favoris") {
          toast.warn("Recette deja existante dans les favoris");
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
          `http://localhost:8000/auth/searchRecipes/${e.target.value}`,
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
          extractUniqueIngredients(Searchedrecipes);
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
    <div className="Recipes">
      <div className="filter-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="chercher une recette"
            onChange={(e) => SearchRecipes(e)}
          />
        </div>
        <div className="ingredient-list">
          {uniqueIngredients.map((ingredient, index) => (
            <label key={ingredient} className="ingredient-label">
              <input
                type="checkbox"
                value={ingredient}
                checked={selectedIngredients.includes(ingredient)}
                onChange={() => handleIngredientToggle(ingredient)}
              />
              {ingredient}
            </label>
          ))}
        </div>
      </div>
      {recipes.length > 0 ? (
        recipes.filter(filterRecipesByIngredients).map((recipe) => (
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
            <div className="instructions-container">
              <h3>Instructions:</h3>
              {recipe.instructions.match(/^\d+\./) ? (
                <div className="instructions-text">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
              ) : (
                <ol className="instructions-list">
                  {recipe.instructions.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteRecipe(recipe._id)}
            >
              Supprimer
            </button>
            <button
              className="add-to-favorites-button"
                        onClick={() => handleAddToFavorites(recipe._id)}
                      >
                        Ajout au favoris
                      </button>
                      <Link to={"/addRecipe"}>Ajout de recette</Link>
                    </div>
                  ))
                ) : (
                  <h2 className="no-recipes">pas de recette exstante</h2>
                )}
            <div className="fixed-button-container">
              <Link to="/addRecipe" className="fixed-button">
                +
              </Link>
            </div>

      <ToastContainer />
    </div>
  );
};

export default Recipes;
