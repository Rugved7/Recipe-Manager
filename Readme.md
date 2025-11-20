# Recipe Manager

A lightweight Recipe Manager web app built with plain HTML, CSS and ES6 JavaScript. All data is stored in the browser's localStorage — no backend required.

## Features
- CRUD: Add, edit and delete recipes
- Recipe data: title, description, ingredients, steps, prep/cook/total time, difficulty, optional image
- Views: List view, Detail view, Form view
- Search & filters: search by title, filter by difficulty, max prep time
- UI: light/dark theme toggle, responsive layout
- Storage: persistent client-side storage using localStorage
- Validation: form validation before saving

## Tech stack
- HTML5 — [index.html](index.html)
- CSS3 — [css/styles.css](css/styles.css)
- JavaScript (ES6 modules) — core logic in [js/app.js](js/app.js) and supporting modules

## Project structure
- [index.html](index.html) — main entry
- [css/styles.css](css/styles.css) — styles and themes
- [js/app.js](js/app.js) — app entrypoint and state management
- [js/storage.js](js/storage.js) — localStorage helpers and seeding (see [`loadRecipes`](js/storage.js), [`seedRecipes`](js/storage.js), [`saveRecipes`](js/storage.js))
- [js/recipes.js](js/recipes.js) — in-memory state, CRUD and filtering (see [`getRecipes`](js/recipes.js), [`addRecipe`](js/recipes.js), [`updateRecipe`](js/recipes.js), [`deleteRecipe`](js/recipes.js), [`filterRecipes`](js/recipes.js))
- [js/ui.js](js/ui.js) — DOM rendering, event wiring and theme application (see [`initUI`](js/ui.js), [`applyTheme`](js/ui.js))
- [js/utils.js](js/utils.js) — validation and helpers (see [`validateRecipeForm`](js/utils.js))
- [.vscode/launch.json](.vscode/launch.json) — optional VS Code launch configuration for debugging in Chrome

## Seeded recipes
On first load the app seeds a few sample recipes (Paneer Butter Masala, Masala Chai, Poha) via [`seedRecipes`](js/storage.js). Subsequent loads read recipes from localStorage using [`loadRecipes`](js/storage.js).

## Data schema
Each recipe stored under the `recipes` key looks like:

```json
{
  "id": "unique id",
  "title": "Paneer Butter Masala",
  "description": "Rich and creamy tomato-based gravy...",
  "ingredients": ["Paneer cubes", "Butter", "Tomatoes"],
  "steps": ["Heat oil", "Add puree"],
  "prepTime": 20,
  "cookTime": 30,
  "totalTime": 50,
  "difficulty": "medium",
  "imageUrl": "https://example.com/paneer.jpg",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}