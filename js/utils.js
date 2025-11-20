// splitLines -> convert textarea text into non-empty trimmed lines
export function splitLines(text) {
  return (text || "")
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

// formatMinutes -> display minutes in a simple human-friendly way
export function formatMinutes(min) {
  const m = Number(min) || 0;
  if (m <= 0) return "0 min";
  if (m < 60) return m + " min";
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (rest === 0) return h + " h";
  return h + " h " + rest + " min";
}

// looksLikeUrl -> quick check whether string starts with http/https
export function looksLikeUrl(str) {
  if (!str) return false;
  return /^https?:\/\//i.test(str);
}

// validateRecipeForm -> validate raw form values and return normalized data or errors
export function validateRecipeForm(values) {
  const errors = [];

  const title = (values.title || "").trim();
  const description = (values.description || "").trim();
  const difficulty = (values.difficulty || "").trim().toLowerCase();
  const imageUrl = (values.imageUrl || "").trim();

  const ingredients = splitLines(values.ingredients || "");
  const steps = splitLines(values.steps || "");

  const prepTime = Number(values.prepTime);
  const cookTime = Number(values.cookTime);

  if (!title) errors.push("Title is required.");
  if (!description) errors.push("Description is required.");
  if (!["easy", "medium", "hard"].includes(difficulty)) {
    errors.push("Select a valid difficulty.");
  }

  if (!ingredients.length) errors.push("Add at least one ingredient.");
  if (!steps.length) errors.push("Add at least one step.");

  if (Number.isNaN(prepTime) || prepTime < 0) {
    errors.push("Prep time must be a non-negative number.");
  }
  if (Number.isNaN(cookTime) || cookTime < 0) {
    errors.push("Cook time must be a non-negative number.");
  }

  if (imageUrl && !looksLikeUrl(imageUrl)) {
    errors.push("Image URL should start with http:// or https://");
  }

  if (errors.length) {
    return { ok: false, errors, data: null };
  }

  const normalized = {
    title,
    description,
    difficulty,
    imageUrl,
    ingredients,
    steps,
    prepTime,
    cookTime,
    totalTime: prepTime + cookTime
  };

  return { ok: true, errors: [], data: normalized };
}
