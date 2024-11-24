import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editRecipe, fetchRecipes } from "../features/recipe/recipesSlice.js";

export default function EditRecipe() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipe = useSelector((state) =>
    state.recipe.recipes.find((item) => item.id === parseInt(id))
  );

  const [form, setForm] = useState({
    dishName: "",
    Price: "",
    shortDesc: "",
  });

  useEffect(() => {
    if (!recipe) {
      dispatch(fetchRecipes());
    } else {
      setForm(recipe);
    }
  }, [dispatch, recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRecipe({ id: parseInt(id), updates: form }));
    navigate("/");
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dish Name</label>
          <input
            type="text"
            name="dishName"
            value={form.dishName || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="text"
            name="Price"
            value={form.Price || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="shortDesc"
            value={form.shortDesc || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
