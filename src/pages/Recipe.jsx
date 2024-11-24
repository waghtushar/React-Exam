import { Link, useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const response = await fetch(
    `http://localhost:3000/recipes/${params.recipeId}`
  );
  if (!response.ok) throw new Error(response.statusText);
  const recipe = await response.json();
  return { recipe };
}

export default function Recipe() {
  const { recipe } = useLoaderData();
  console.log(recipe);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2>{recipe.dishName}</h2>
        <div className="hstack gap-2">
          <Link to="edit" className="btn btn-secondary">
            Edit
          </Link>
          <Link to="delete" className="btn btn-danger">
            Delete
          </Link>
        </div>
      </div>
      <hr />
      <section>
        <h3 className="text-secondary fst-italic">{recipe.Price}</h3>
        <p>{recipe.shortDesc}</p>
      </section>
    </>
  );
}
