import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../features/recipe/recipesSlice.js";


function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/recipes/edit/${recipe.id}`); // Redirect to edit page
  };

  return (
    <div className="card">
      <img
        src="https://www.gayacentre.com/wp-content/uploads/2017/09/gayacentre-hotel-food-40.jpg"
        alt={recipe.dishName}
        className="card-img-top img-fluid"
        style={{ objectFit: "cover", height: "200px" }} // Consistent size
      />
      <div className="card-body">
        <h5 className="card-title">
          {recipe.dishName}{" "}
          <i className="text-secondary d-block mt-2">Rs {recipe.Price}</i>
        </h5>
        <p className="card-text">
          Explore curated lists of top restaurants, cafes, pubs, and bars in
          Surat, based on trends.
        </p>
        <div className="d-flex justify-content-between">
          <Link to={`recipes/${recipe.id}`} className="btn btn-primary">
            Read More
          </Link>
          <button onClick={handleEdit} className="btn btn-secondary">
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeList({ list, onDelete }) {
  return (
    <div className="row g-2">
      {list.map((item) => (
        <div className="col-12 col-md-6 col-lg-4" key={item.id}>
          <RecipeCard recipe={item} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { recipes, loading } = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRecipe(id)); // Dispatch delete action
  };

  return (
    <>
      <h2>Recipes</h2>
      <hr />
      {loading === "pending" ? (
        <p>Loading...</p>
      ) : (
        <RecipeList list={recipes} onDelete={handleDelete} />
      )}
    </>
  );
}
