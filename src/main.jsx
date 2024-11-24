import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store.js";

// Routes
import Root from "./routes/root.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import Recipe, { loader as recipeLoader } from "./pages/Recipe.jsx";
import Error from "./pages/Error.jsx";

// Bootstrap, Bootstrap Icons
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap-icons/font/bootstrap-icons.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/recipes/add",
        element: <Add />,
      },
      {
        path: "/recipes/:recipeId",
        element: <Recipe />,
        loader: recipeLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
