const RecipeManager = {
  recipes: [],
  filteredRecipes: [],
  currentRecipe: null,
  editingRecipeId: null,

  init() {
    Storage.initializeDefaultRecipes();
    this.loadRecipes();
  },

  loadRecipes() {
    this.recipes = Storage.getAllRecipes();
    this.filteredRecipes = [...this.recipes];
  },

  searchRecipes(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredRecipes = [...this.recipes];
      return this.filteredRecipes;
    }

    this.filteredRecipes = this.recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term)
    );

    return this.filteredRecipes;
  },

  filterByDifficulty(difficulty) {
    if (difficulty === "All") {
      this.filteredRecipes = [...this.recipes];
    } else {
      this.filteredRecipes = this.recipes.filter(
        (recipe) => recipe.difficulty === difficulty
      );
    }
    return this.filteredRecipes;
  },

  filterByMaxPrepTime(maxTime) {
    if (!maxTime || maxTime <= 0) {
      this.filteredRecipes = [...this.recipes];
      return this.filteredRecipes;
    }

    this.filteredRecipes = this.recipes.filter(
      (recipe) => recipe.prepTime <= maxTime
    );

    return this.filteredRecipes;
  },

  applyAllFilters(searchTerm, difficulty, maxPrepTime) {
    let results = [...this.recipes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term)
      );
    }

    if (difficulty && difficulty !== "All") {
      results = results.filter((recipe) => recipe.difficulty === difficulty);
    }

    if (maxPrepTime && maxPrepTime > 0) {
      results = results.filter((recipe) => recipe.prepTime <= maxPrepTime);
    }

    this.filteredRecipes = results;
    return this.filteredRecipes;
  },

  getRecipe(id) {
    return Storage.getRecipeById(id);
  },

  createRecipe(recipeData) {
    const recipe = Storage.addRecipe(recipeData);
    if (recipe) {
      this.loadRecipes();
      return recipe;
    }
    return null;
  },

  updateRecipe(id, recipeData) {
    const success = Storage.updateRecipe(id, recipeData);
    if (success) {
      this.loadRecipes();
    }
    return success;
  },

  deleteRecipe(id) {
    const success = Storage.deleteRecipe(id);
    if (success) {
      this.loadRecipes();
      this.filteredRecipes = [...this.recipes];
    }
    return success;
  },

  validateRecipeData(data) {
    const errors = {};

    if (!data.title || data.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (!data.description || data.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!data.ingredients || data.ingredients.length === 0) {
      errors.ingredients = "At least one ingredient is required";
    }

    if (!data.steps || data.steps.length === 0) {
      errors.steps = "At least one step is required";
    }

    if (!data.prepTime || data.prepTime < 1) {
      errors.prepTime = "Prep time must be at least 1 minute";
    }

    if (!data.cookTime || data.cookTime < 1) {
      errors.cookTime = "Cook time must be at least 1 minute";
    }

    if (!data.servings || data.servings < 1) {
      errors.servings = "Servings must be at least 1";
    }

    if (
      !data.difficulty ||
      !["Easy", "Medium", "Hard"].includes(data.difficulty)
    ) {
      errors.difficulty = "Please select a difficulty level";
    }

    if (data.image && !Utils.isValidUrl(data.image)) {
      errors.image = "Please enter a valid URL";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
