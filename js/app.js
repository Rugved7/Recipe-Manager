document.addEventListener('DOMContentLoaded', () => {
    RecipeManager.init();
    UI.initTheme();
    UI.renderRecipeGrid(RecipeManager.filteredRecipes);
    
    const searchInput = document.getElementById('search-input');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const maxPrepTimeInput = document.getElementById('max-prep-time');
    const addRecipeBtn = document.getElementById('add-recipe-btn');
    const backToListBtn = document.getElementById('back-to-list');
    const cancelFormBtn = document.getElementById('cancel-form');
    const recipeForm = document.getElementById('recipe-form');
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    const applyFilters = () => {
        const searchTerm = searchInput.value;
        const difficulty = difficultyFilter.value;
        const maxPrepTime = parseInt(maxPrepTimeInput.value) || 0;
        
        RecipeManager.applyAllFilters(searchTerm, difficulty, maxPrepTime);
        UI.renderRecipeGrid(RecipeManager.filteredRecipes);
    };
    
    const debouncedFilter = Utils.debounce(applyFilters, 300);
    
    searchInput.addEventListener('input', debouncedFilter);
    difficultyFilter.addEventListener('change', applyFilters);
    maxPrepTimeInput.addEventListener('input', debouncedFilter);
    
    addRecipeBtn.addEventListener('click', () => {
        UI.showRecipeForm();
    });
    
    backToListBtn.addEventListener('click', () => {
        UI.showView('list');
        UI.renderRecipeGrid(RecipeManager.filteredRecipes);
    });
    
    cancelFormBtn.addEventListener('click', () => {
        UI.showView('list');
        UI.renderRecipeGrid(RecipeManager.filteredRecipes);
    });
    
    themeToggleBtn.addEventListener('click', () => {
        UI.toggleTheme();
    });
    
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = UI.getFormData();
        const validation = RecipeManager.validateRecipeData(formData);
        
        if (!validation.isValid) {
            UI.showFormErrors(validation.errors);
            return;
        }
        
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