import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch Recipes
export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipesStatus",
  async () => {
    const response = await fetch("http://localhost:3000/recipes");
    return await response.json();
  }
);

// Add Recipe
export const addRecipe = createAsyncThunk(
  "recipe/addRecipeStatus",
  async (recipe) => {
    const response = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    return await response.json();
  }
);

// Delete Recipe
export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipeStatus",
  async (id) => {
    await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

// Edit Recipe
export const editRecipe = createAsyncThunk(
  "recipe/editRecipeStatus",
  async ({ id, updates }) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    return await response.json();
  }
);

const initialState = {
  recipes: [],
  loading: "idle",
};

const recipesSlice = createSlice({
  name: "recipe",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch Recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = "failed";
      })

      // Add Recipe
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })

      // Delete Recipe
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
      })

      // Edit Recipe
      .addCase(editRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex((recipe) => recipe.id === action.payload.id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      });
  },
});

export default recipesSlice.reducer;
