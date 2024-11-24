import { Link, NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header className="navbar sticky-top bg-light shadow">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Recipe Book
          </Link>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="recipes/add" className="nav-link">
                Add Recipe
              </NavLink>
            </li>
          </ul>
        </div>
      </header>
      <main className="container mt-3">
        <Outlet />
      </main>
    </>
  );
}
