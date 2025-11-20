import { formatMinutes } from "./utils.js";

// cache -> small object to store DOM references
const cache = {
  listView: null,
  detailView: null,
  formView: null,
  grid: null,
  emptyMsg: null,
  detailBox: null,
  form: null,
  formErrors: null,
  inputs: {},
  searchInput: null,
  difficultyFilter: null,
  maxPrepFilter: null,
  addBtn: null,
  themeBtn: null,
  backFromDetail: null,
  backFromForm: null,
  cancelFormBtn: null,
};

// initUI -> grab DOM elements and wire basic handlers
export function initUI(handlers) {
  cache.listView = document.getElementById("view-list");
  cache.detailView = document.getElementById("view-detail");
  cache.formView = document.getElementById("view-form");

  cache.grid = document.getElementById("recipesGrid");
  cache.emptyMsg = document.getElementById("emptyState");
  cache.detailBox = document.getElementById("recipeDetail");

  cache.form = document.getElementById("recipeForm");
  cache.formErrors = document.getElementById("formErrors");

  cache.inputs = {
    title: document.getElementById("titleInput"),
    description: document.getElementById("descriptionInput"),
    prepTime: document.getElementById("prepTimeInput"),
    cookTime: document.getElementById("cookTimeInput"),
    difficulty: document.getElementById("difficultyInput"),
    imageUrl: document.getElementById("imageUrlInput"),
    ingredients: document.getElementById("ingredientsInput"),
    steps: document.getElementById("stepsInput"),
  };

  cache.searchInput = document.getElementById("searchInput");
  cache.difficultyFilter = document.getElementById("difficultyFilter");
  cache.maxPrepFilter = document.getElementById("maxPrepTimeFilter");

  cache.addBtn = document.getElementById("addRecipeBtn");
  cache.themeBtn = document.getElementById("themeToggleBtn");
  cache.backFromDetail = document.getElementById("backFromDetailBtn");
  cache.backFromForm = document.getElementById("backFromFormBtn");
  cache.cancelFormBtn = document.getElementById("cancelFormBtn");

  // search / filters
  cache.searchInput.addEventListener("input", () => {
    handlers.onFiltersChange(getCurrentFilters());
  });
  cache.difficultyFilter.addEventListener("change", () => {
    handlers.onFiltersChange(getCurrentFilters());
  });
  cache.maxPrepFilter.addEventListener("input", () => {
    handlers.onFiltersChange(getCurrentFilters());
  });

  // add button
  cache.addBtn.addEventListener("click", () => {
    handlers.onAddRecipe();
  });

  // theme toggle
  cache.themeBtn.addEventListener("click", () => {
    handlers.onToggleTheme();
  });

  // back buttons
  cache.backFromDetail.addEventListener("click", () => {
    handlers.onBackToList();
  });
  cache.backFromForm.addEventListener("click", () => {
    handlers.onBackToList();
  });
  cache.cancelFormBtn.addEventListener("click", () => {
    handlers.onBackToList();
  });

  // form submit
  cache.form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    handlers.onSubmitForm(getFormValues());
  });
}

// getCurrentFilters -> read search text and filter values from header
export function getCurrentFilters() {
  return {
    search: cache.searchInput.value,
    difficulty: cache.difficultyFilter.value,
    maxPrep: cache.maxPrepFilter.value,
  };
}

// renderRecipeList -> render list of cards into the grid
export function renderRecipeList(recipes, handlers) {
  cache.grid.innerHTML = "";

  if (!recipes.length) {
    cache.emptyMsg.classList.remove("hidden");
    return;
  }
  cache.emptyMsg.classList.add("hidden");

  recipes.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = recipe.id;

    // image
    const img = document.createElement("img");
    img.className = "card-img";
    if (recipe.imageUrl) {
      img.src = recipe.imageUrl;
    } else {
      img.src = "https://via.placeholder.com/300x200?text=No+Image";
    }
    card.appendChild(img);

    // title
    const title = document.createElement("div");
    title.className = "card-title";
    title.textContent = recipe.title;
    card.appendChild(title);

    // meta
    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.textContent =
      "Difficulty: " +
      recipe.difficulty +
      " · Total: " +
      formatMinutes(recipe.totalTime);
    card.appendChild(meta);

    // description
    const desc = document.createElement("div");
    desc.className = "card-desc";
    desc.textContent = recipe.description;
    card.appendChild(desc);

    card.addEventListener("click", () => {
      handlers.onOpenRecipe(recipe.id);
    });

    cache.grid.appendChild(card);
  });
}

// renderRecipeDetail -> fill detail view with full information
export function renderRecipeDetail(recipe, handlers) {
  cache.detailBox.innerHTML = "";

  if (!recipe) {
    cache.detailBox.textContent = "Recipe not found.";
    return;
  }

  const header = document.createElement("div");
  header.className = "detail-header";

  const titleBlock = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.className = "detail-title";
  h2.textContent = recipe.title;

  const meta = document.createElement("div");
  meta.className = "detail-meta";
  meta.textContent =
    "Prep: " +
    formatMinutes(recipe.prepTime) +
    " · Cook: " +
    formatMinutes(recipe.cookTime) +
    " · Total: " +
    formatMinutes(recipe.totalTime) +
    " · Difficulty: " +
    recipe.difficulty;

  titleBlock.appendChild(h2);
  titleBlock.appendChild(meta);

  const buttonsBox = document.createElement("div");
  const editBtn = document.createElement("button");
  editBtn.className = "btn small";
  editBtn.textContent = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn small";
  deleteBtn.style.borderColor = "#dc2626";
  deleteBtn.style.color = "#dc2626";
  deleteBtn.textContent = "Delete";

  editBtn.addEventListener("click", () => {
    handlers.onEditRecipe(recipe.id);
  });
  deleteBtn.addEventListener("click", () => {
    handlers.onDeleteRecipe(recipe.id);
  });

  buttonsBox.appendChild(editBtn);
  buttonsBox.appendChild(deleteBtn);

  header.appendChild(titleBlock);
  header.appendChild(buttonsBox);

  const desc = document.createElement("p");
  desc.textContent = recipe.description;

  const listsWrapper = document.createElement("div");
  listsWrapper.className = "detail-lists";

  const ingBox = document.createElement("div");
  const ingTitle = document.createElement("h3");
  ingTitle.className = "detail-section-title";
  ingTitle.textContent = "Ingredients";
  const ingList = document.createElement("ul");
  recipe.ingredients.forEach((i) => {
    const li = document.createElement("li");
    li.textContent = i;
    ingList.appendChild(li);
  });
  ingBox.appendChild(ingTitle);
  ingBox.appendChild(ingList);

  const stepBox = document.createElement("div");
  const stepTitle = document.createElement("h3");
  stepTitle.className = "detail-section-title";
  stepTitle.textContent = "Steps";
  const stepList = document.createElement("ol");
  recipe.steps.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    stepList.appendChild(li);
  });
  stepBox.appendChild(stepTitle);
  stepBox.appendChild(stepList);

  listsWrapper.appendChild(ingBox);
  listsWrapper.appendChild(stepBox);

  cache.detailBox.appendChild(header);
  cache.detailBox.appendChild(desc);
  cache.detailBox.appendChild(listsWrapper);

  if (recipe.imageUrl) {
    const img = document.createElement("img");
    img.src = recipe.imageUrl;
    img.alt = recipe.title;
    img.style.marginTop = "10px";
    img.style.maxWidth = "100%";
    img.style.borderRadius = "8px";
    cache.detailBox.appendChild(img);
  }
}

// showView -> show one of: "list" | "detail" | "form"
export function showView(name) {
  cache.listView.classList.add("hidden");
  cache.detailView.classList.add("hidden");
  cache.formView.classList.add("hidden");

  if (name === "detail") {
    cache.detailView.classList.remove("hidden");
  } else if (name === "form") {
    cache.formView.classList.remove("hidden");
  } else {
    cache.listView.classList.remove("hidden");
  }
}

// fillFormForCreate -> clear form and heading for new recipe
export function fillFormForCreate() {
  cache.form.reset();
  cache.formErrors.classList.add("hidden");
  cache.formErrors.innerHTML = "";
  const heading = document.getElementById("formHeading");
  heading.textContent = "Add Recipe";
}

// fillFormForEdit -> set heading and populate fields from recipe
export function fillFormForEdit(recipe) {
  const heading = document.getElementById("formHeading");
  heading.textContent = "Edit Recipe";
  cache.formErrors.classList.add("hidden");
  cache.formErrors.innerHTML = "";

  cache.inputs.title.value = recipe.title || "";
  cache.inputs.description.value = recipe.description || "";
  cache.inputs.prepTime.value = recipe.prepTime ?? "";
  cache.inputs.cookTime.value = recipe.cookTime ?? "";
  cache.inputs.difficulty.value = recipe.difficulty || "";
  cache.inputs.imageUrl.value = recipe.imageUrl || "";
  cache.inputs.ingredients.value = (recipe.ingredients || []).join("\n");
  cache.inputs.steps.value = (recipe.steps || []).join("\n");
}

// getFormValues -> read current values from form inputs
export function getFormValues() {
  return {
    title: cache.inputs.title.value,
    description: cache.inputs.description.value,
    prepTime: cache.inputs.prepTime.value,
    cookTime: cache.inputs.cookTime.value,
    difficulty: cache.inputs.difficulty.value,
    imageUrl: cache.inputs.imageUrl.value,
    ingredients: cache.inputs.ingredients.value,
    steps: cache.inputs.steps.value,
  };
}

// showFormErrors -> show a small list of validation messages
export function showFormErrors(messages) {
  if (!messages || !messages.length) {
    cache.formErrors.classList.add("hidden");
    cache.formErrors.innerHTML = "";
    return;
  }
  cache.formErrors.classList.remove("hidden");
  cache.formErrors.innerHTML = "";
  const ul = document.createElement("ul");
  messages.forEach((msg) => {
    const li = document.createElement("li");
    li.textContent = msg;
    ul.appendChild(li);
  });
  cache.formErrors.appendChild(ul);
}

// applyTheme -> toggle body class and button label
export function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}
