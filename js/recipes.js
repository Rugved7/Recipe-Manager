const RecipeManager = {
  // In-memory storage for all recipes and filtered results
  recipes: [],
  filteredRecipes: [],
  currentRecipe: null,
  editingRecipeId: null,

  // Initializes the recipe manager by loading default recipes and fetching from storage
  init() {
    Storage.initializeDefaultRecipes();
    this.loadRecipes();
  },

  // Syncs recipes from localStorage into memory and resets filtered view
  loadRecipes() {
    this.recipes = Storage.getAllRecipes();
    this.filteredRecipes = [...this.recipes];
  },

  // Filters recipes by title or description matching the search term
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

  // Filters recipes by difficulty level (Easy, Medium, Hard, or All)
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

  // Filters recipes by maximum preparation time in minutes
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

  // Applies multiple filters simultaneously (search term, difficulty, and prep time)
  applyAllFilters(searchTerm, difficulty, maxPrepTime) {
    let results = [...this.recipes];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.description.toLowerCase().includes(term)
      );
    }

    // Apply difficulty filter
    if (difficulty && difficulty !== "All") {
      results = results.filter((recipe) => recipe.difficulty === difficulty);
    }

    // Apply prep time filter
    if (maxPrepTime && maxPrepTime > 0) {
      results = results.filter((recipe) => recipe.prepTime <= maxPrepTime);
    }

    this.filteredRecipes = results;
    return this.filteredRecipes;
  },

  // Retrieves a single recipe by ID from storage
  getRecipe(id) {
    return Storage.getRecipeById(id);
  },

  // Creates a new recipe and refreshes the in-memory recipe list
  createRecipe(recipeData) {
    const recipe = Storage.addRecipe(recipeData);
    if (recipe) {
      this.loadRecipes();
      return recipe;
    }
    return null;
  },

  // Updates an existing recipe and refreshes the in-memory list
  updateRecipe(id, recipeData) {
    const success = Storage.updateRecipe(id, recipeData);
    if (success) {
      this.loadRecipes();
    }
    return success;
  },

  // Deletes a recipe and resets both recipes and filtered results
  deleteRecipe(id) {
    const success = Storage.deleteRecipe(id);
    if (success) {
      this.loadRecipes();
      this.filteredRecipes = [...this.recipes];
    }
    return success;
  },

  // Validates recipe data and returns validation errors if any
  validateRecipeData(data) {
    const errors = {};

    // Validate title length
    if (!data.title || data.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    // Validate description length
    if (!data.description || data.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    // Validate ingredients array
    if (!data.ingredients || data.ingredients.length === 0) {
      errors.ingredients = "At least one ingredient is required";
    }

    // Validate steps array
    if (!data.steps || data.steps.length === 0) {
      errors.steps = "At least one step is required";
    }

    // Validate prep time
    if (!data.prepTime || data.prepTime < 1) {
      errors.prepTime = "Prep time must be at least 1 minute";
    }

    // Validate cook time
    if (!data.cookTime || data.cookTime < 1) {
      errors.cookTime = "Cook time must be at least 1 minute";
    }

    // Validate servings
    if (!data.servings || data.servings < 1) {
      errors.servings = "Servings must be at least 1";
    }

    // Validate difficulty level
    if (
      !data.difficulty ||
      !["Easy", "Medium", "Hard"].includes(data.difficulty)
    ) {
      errors.difficulty = "Please select a difficulty level";
    }

    // Validate image URL format if provided
    if (data.image && !Utils.isValidUrl(data.image)) {
      errors.image = "Please enter a valid URL";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

