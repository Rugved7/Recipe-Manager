// Wait for DOM to be fully loaded before initializing the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize application state and load recipes from storage
  RecipeManager.init();
  UI.initTheme();
  UI.renderRecipeGrid(RecipeManager.filteredRecipes);

  // Cache DOM element references for better performance
  const searchInput = document.getElementById('search-input');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const maxPrepTimeInput = document.getElementById('max-prep-time');
  const addRecipeBtn = document.getElementById('add-recipe-btn');
  const backToListBtn = document.getElementById('back-to-list');
  const cancelFormBtn = document.getElementById('cancel-form');
  const recipeForm = document.getElementById('recipe-form');
  const themeToggleBtn = document.getElementById('theme-toggle');

  // Applies all active filters and re-renders the recipe grid
  const applyFilters = () => {
    const searchTerm = searchInput.value;
    const difficulty = difficultyFilter.value;
    const maxPrepTime = parseInt(maxPrepTimeInput.value) || 0;

    RecipeManager.applyAllFilters(searchTerm, difficulty, maxPrepTime);
    UI.renderRecipeGrid(RecipeManager.filteredRecipes);
  };

  // Debounced version to prevent excessive filtering during rapid input
  const debouncedFilter = Utils.debounce(applyFilters, 300);

  // Attach filter event listeners with debouncing for text inputs
  searchInput.addEventListener('input', debouncedFilter);
  difficultyFilter.addEventListener('change', applyFilters);
  maxPrepTimeInput.addEventListener('input', debouncedFilter);

  // Opens form view for creating a new recipe
  addRecipeBtn.addEventListener('click', () => {
    UI.showRecipeForm();
  });

  // Returns to list view from detail view
  backToListBtn.addEventListener('click', () => {
    UI.showView('list');
    UI.renderRecipeGrid(RecipeManager.filteredRecipes);
  });

  // Cancels form editing and returns to list view without saving
  cancelFormBtn.addEventListener('click', () => {
    UI.showView('list');
    UI.renderRecipeGrid(RecipeManager.filteredRecipes);
  });

  // Toggles between light and dark theme
  themeToggleBtn.addEventListener('click', () => {
    UI.toggleTheme();
  });

  // Handles form submission for both creating and updating recipes
  recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = UI.getFormData();
    const validation = RecipeManager.validateRecipeData(formData);

    // Display validation errors if data is invalid
    if (!validation.isValid) {
      UI.showFormErrors(validation.errors);
      return;
    }

    // Update existing recipe if editing, otherwise create new one
    if (RecipeManager.editingRecipeId) {
      const success = RecipeManager.updateRecipe(RecipeManager.editingRecipeId, formData);
      if (success) {
        UI.showView('list');
        applyFilters();
        alert('Recipe updated successfully!');
      } else {
        alert('Failed to update recipe. Please try again.');
      }
    } else {
      const newRecipe = RecipeManager.createRecipe(formData);
      if (newRecipe) {
        UI.showView('list');
        applyFilters();
        alert('Recipe added successfully!');
      } else {
        alert('Failed to add recipe. Please try again.');
      }
    }
  });
});
