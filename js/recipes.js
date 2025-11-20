import storeManager from "./storage";

const recipeManager = {
  // Method to get all recipes in localStorage
  getAllRecipes() {
    return storeManager.getRecipes();
  },

  // Get the recipe by its id
  getRecipeById(id) {
    const recipes = this.getAllRecipes();
    return recipes.find((recipe) => recipe.id === id) || null;
  },

  // Method to create a Recipe
  createRecipe(data) {
    try {
      const recipes = this.getAllRecipes();

      const newRecipe = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      recipes.push(newRecipe);

      if (storeManager.saveRecipes(recipes)) {
        return newRecipe;
      }
      return null;
    } catch (error) {
      console.log("Error creating recipe", error);
      return null;
    }
  },

  // function to update Recipe
  updateRecipe(id, data) {
    try {
      const recipes = this.getAllRecipes();
      const index = recipes.findIndex((recipe) => recipe.id === id);

      if (index === -1) {
        console.log("Recipe not found");
        return null;
      }

      const updatedRecipe = {
        ...recipes[index],
        ...recipeData,
        id: recipes[index].createdAt,
        updatedAt: new Date().toISOString(),
      };

      recipes[index] = updatedRecipe;

      if (storeManager.saveRecipes(recipes)) {
        return updatedRecipe;
      }
      return null;
    } catch (error) {
      console.log("Error updating your recipe", error);
      return null;
    }
  },

  // Function to delete the recipe
  deleteRecipe(id) {
    try {
      const recipes = this.getAllRecipes();
      const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

      if (filteredRecipes.length === recipes.length) {
        console.log("Recipe not found");
        return false;
      }
    } catch (error) {
      console.log("Error Deleting Recipe", error);
      return false;
    }
  },

  searchAndFilter(searchQuery, difficulty) {
    let recipes = this.getAllRecipes();

    if (searchQuery && searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase().trim();
      recipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(lowerQuery)
      );
    }

    if (difficulty && difficulty !== "all") {
      recipes = recipes.filter(
        (recipe) => recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    return recipes;
  },

  //   Method to getStats
  getStats() {
    const recipes = this.getAllRecipes();

    return {
      total: recipes.length,
      easy: recipes.filter((r) => r.difficulty === "easy").length,
      medium: recipes.filter((r) => r.difficulty === "medium").length,
      hard: recipes.filter((r) => r.difficulty === "hard").length,
      avgPrepTime:
        recipes.length > 0
          ? Math.round(
              recipes.reduce((sum, r) => sum + r.prepTime, 0) / recipes.length
            )
          : 0,
      avgCookTime:
        recipes.length > 0
          ? Math.round(
              recipes.reduce((sum, r) => sum + r.cookTime, 0) / recipes.length
            )
          : 0,
    };
  },
};

export default recipeManager;
