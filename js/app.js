import { loadTheme, saveTheme } from "./storage.js";
import {
  getRecipes,
  setRecipes,
  getRecipeById,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  filterRecipes
} from "./recipes.js";
import {
  validateRecipeForm
} from "./utils.js";
import {
  initUI,
  getCurrentFilters,
  renderRecipeList,
  renderRecipeDetail,
  showView,
  fillFormForCreate,
  fillFormForEdit,
  getFormValues,
  showFormErrors,
  applyTheme
} from "./ui.js";

// state -> simple object to remember current selection and view
const state = {
  currentId: null,
  theme: "light"
};

// init -> main entry: load data, set theme, init UI and render list
function init() {
  // recipes already loaded in recipes.js via loadRecipes()
  setRecipes(getRecipes());

  state.theme = loadTheme();
  applyTheme(state.theme);

  initUI({
    onFiltersChange: handleFiltersChange,
    onAddRecipe: handleAddRecipe,
    onToggleTheme: handleToggleTheme,
    onBackToList: handleBackToList,
    onSubmitForm: handleSubmitForm,
    onOpenRecipe: handleOpenRecipe,
    onEditRecipe: handleEditRecipe,
    onDeleteRecipe: handleDeleteRecipe
  });

  renderListWithCurrentFilters();
  showView("list");
}

// handleFiltersChange -> called when search or filters change
function handleFiltersChange(filtersFromUI) {
  renderListWithCurrentFilters(filtersFromUI);
}

// handleAddRecipe -> open empty form for creating a new recipe
function handleAddRecipe() {
  state.currentId = null;
  fillFormForCreate();
  showView("form");
}

// handleToggleTheme -> switch between light and dark theme
function handleToggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  applyTheme(state.theme);
  saveTheme(state.theme);
}

// handleBackToList -> show list view again
function handleBackToList() {
  showView("list");
  renderListWithCurrentFilters();
}

// handleSubmitForm -> validate and either create or update a recipe
function handleSubmitForm(rawValues) {
  const result = validateRecipeForm(rawValues);
  if (!result.ok) {
    showFormErrors(result.errors);
    return;
  }
  showFormErrors([]);

  let recipe;
  if (state.currentId) {
    recipe = updateRecipe(state.currentId, result.data);
  } else {
    recipe = addRecipe(result.data);
  }

  renderListWithCurrentFilters();
  if (recipe) {
    state.currentId = recipe.id;
    renderRecipeDetail(recipe, {
      onEditRecipe: handleEditRecipe,
      onDeleteRecipe: handleDeleteRecipe
    });
    showView("detail");
  } else {
    showView("list");
  }
}

// handleOpenRecipe -> show detail page for selected recipe
function handleOpenRecipe(id) {
  const recipe = getRecipeById(id);
  if (!recipe) return;
  state.currentId = id;
  renderRecipeDetail(recipe, {
    onEditRecipe: handleEditRecipe,
    onDeleteRecipe: handleDeleteRecipe
  });
  showView("detail");
}

// handleEditRecipe -> load recipe into form for editing
function handleEditRecipe(id) {
  const recipe = getRecipeById(id);
  if (!recipe) return;
  state.currentId = id;
  fillFormForEdit(recipe);
  showView("form");
}

// handleDeleteRecipe -> confirm and delete recipe, then go back to list
function handleDeleteRecipe(id) {
  const ok = window.confirm("Delete this recipe?");
  if (!ok) return;
  const removed = deleteRecipe(id);
  if (!removed) return;
  if (state.currentId === id) {
    state.currentId = null;
  }
  renderListWithCurrentFilters();
  showView("list");
}

// renderListWithCurrentFilters -> read filters from UI and render list
function renderListWithCurrentFilters(optionalFilters) {
  const filters = optionalFilters || getCurrentFilters();
  const recipes = filterRecipes(filters);
  renderRecipeList(recipes, {
    onOpenRecipe: handleOpenRecipe
  });
}

// kick things off when DOM is ready
document.addEventListener("DOMContentLoaded", init);
