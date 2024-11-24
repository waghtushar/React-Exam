import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  addRecipe,
  editRecipe,
  fetchRecipes,
} from "../features/recipe/recipesSlice.js";

export default function AddEdit() {
  const { recipeId } = useParams(); // Get recipe ID from route if editing
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipe);
  const [recipe, setRecipe] = useState({
    dishName: "",
    Price: "",
    shortDesc: "",
  });

  // Pre-fill form for editing
  useEffect(() => {
    if (recipeId) {
      const existingRecipe = recipes.find((r) => r.id === parseInt(recipeId));
      if (existingRecipe) setRecipe(existingRecipe);
    }
  }, [recipeId, recipes]);

  // Fetch recipes if not already loaded
  useEffect(() => {
    if (!recipes.length) dispatch(fetchRecipes());
  }, [dispatch, recipes]);

  function handleChange(event) {
    const { name, value } = event.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (recipeId) {
      // Edit existing recipe
      dispatch(editRecipe({ id: recipeId, updates: recipe }));
    } else {
      // Add new recipe
      dispatch(addRecipe(recipe));
    }

    navigate("/"); // Navigate back to the home page after saving
  }

  return (
    <>
      <h2>{recipeId ? "Edit Recipe" : "Add Recipe"}</h2>
      <hr />
      <section className="">
        <form onSubmit={handleSubmit}>
          <h3>Recipe Details</h3>
          <section className="row g-3">
            <div className="col-md-6">
              <label htmlFor="dishName" className="form-label">
                Dish Name
              </label>
              <input
                type="text"
                id="dishName"
                name="dishName"
                className="form-control"
                required
                onChange={handleChange}
                value={recipe.dishName || ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="text"
                id="Price"
                name="Price"
                className="form-control"
                required
                onChange={handleChange}
                value={recipe.Price || ""}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="shortDesc" className="form-label">
                Description
              </label>
              <textarea
                id="shortDesc"
                name="shortDesc"
                className="form-control"
                required
                onChange={handleChange}
                value={recipe.shortDesc || ""}
              />
            </div>
          </section>
          <button type="submit" className="btn btn-primary mt-3">
            {recipeId ? "Update Recipe" : "Add Recipe"}
          </button>
        </form>
      </section>
    </>
  );
}
