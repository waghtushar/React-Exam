import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "../features/recipe/recipesSlice.js";

export default configureStore({
  reducer: {
    recipe: recipeReducer,
  },
});
