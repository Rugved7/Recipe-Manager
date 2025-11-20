import { loadRecipes, saveRecipes } from "./storage.js";

// recipesState -> in-memory array for all recipes
let recipesState = loadRecipes();

// getRecipes -> return a shallow copy of current recipes
export function getRecipes() {
  return [...recipesState];
}

// setRecipes -> replace in-memory recipes with given list
export function setRecipes(list) {
  recipesState = Array.isArray(list) ? [...list] : [];
}

// getRecipeById -> find a recipe object by its id
export function getRecipeById(id) {
  return recipesState.find((r) => r.id === id) || null;
}

// createId -> generate a simple unique id for new recipes
function createId() {
  return "r_" + Date.now() + "_" + Math.floor(Math.random() * 10000);
}

// addRecipe -> push a new recipe into state and persist it
export function addRecipe(data) {
  const now = new Date().toISOString();
  const recipe = {
    ...data,
    id: createId(),
    createdAt: now,
    updatedAt: now
  };
  recipesState.push(recipe);
  saveRecipes(recipesState);
  return recipe;
}

// updateRecipe -> merge changes into existing recipe and persist
export function updateRecipe(id, data) {
  const index = recipesState.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = recipesState[index];
  const updated = {
    ...current,
    ...data,
    id: current.id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString()
  };

  recipesState[index] = updated;
  saveRecipes(recipesState);
  return updated;
}

// deleteRecipe -> remove a recipe by id and persist
export function deleteRecipe(id) {
  const next = recipesState.filter((r) => r.id !== id);
  const changed = next.length !== recipesState.length;
  if (!changed) return false;
  recipesState = next;
  saveRecipes(recipesState);
  return true;
}

// filterRecipes -> filter recipes using search, difficulty and max prep time
export function filterRecipes(filters) {
  const search = (filters.search || "").trim().toLowerCase();
  const difficulty = filters.difficulty || "all";
  const maxPrep =
    filters.maxPrep !== "" && filters.maxPrep != null
      ? Number(filters.maxPrep)
      : null;

  return recipesState.filter((r) => {
    const titleOk = search
      ? r.title.toLowerCase().includes(search)
      : true;

    const diffOk =
      difficulty === "all" ? true : r.difficulty === difficulty;

    const prepOk =
      maxPrep == null ? true : Number(r.prepTime || 0) <= maxPrep;

    return titleOk && diffOk && prepOk;
  });
}
