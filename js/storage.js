
const STORAGE_KEY = "recipes";
const THEME_KEY = "recipeTheme";

// loadRecipes -> read recipes from localStorage, handle corrupted data, seed on first load
export function loadRecipes() {
  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    const seeded = seedRecipes();
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("not an array");
    }
    return parsed;
  } catch (e) {
    console.warn("Corrupted recipes in localStorage, reseeding.", e);
    const seeded = seedRecipes();
    return seeded;
  }
}

// saveRecipes -> stringify and write recipes array to localStorage
export function saveRecipes(recipes) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// seedRecipes -> create default recipes (Paneer Butter Masala, Masala Chai, Poha) and persist them
export function seedRecipes() {
  const now = new Date().toISOString();

  const seeded = [
    {
      id: "seed_paneer_butter_masala",
      title: "Paneer Butter Masala",
      description: "Rich and creamy paneer curry cooked in buttery tomato gravy.",
      ingredients: [
        "200 g paneer cubes",
        "2 tbsp butter",
        "2 tbsp oil",
        "2 medium onions (finely chopped)",
        "3 medium tomatoes (pureed)",
        "1 tsp ginger-garlic paste",
        "1/2 cup cream",
        "1 tsp red chilli powder",
        "1 tsp garam masala",
        "Salt to taste"
      ],
      steps: [
        "Heat oil and butter in a pan, add onions and sauté till golden.",
        "Add ginger-garlic paste and cook for a minute.",
        "Add tomato puree and spices, cook till oil separates.",
        "Add paneer cubes, mix gently and cook for 3–4 minutes.",
        "Stir in cream, adjust salt and serve hot with roti or naan."
      ],
      prepTime: 15,
      cookTime: 25,
      totalTime: 40,
      difficulty: "medium",
      imageUrl: "",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "seed_masala_chai",
      title: "Masala Chai",
      description: "Spiced Indian milk tea with cardamom, ginger and cloves.",
      ingredients: [
        "1 cup water",
        "1 cup milk",
        "2 tsp tea leaves",
        "2–3 cardamom pods (crushed)",
        "1 small piece ginger (crushed)",
        "1–2 cloves",
        "Sugar to taste"
      ],
      steps: [
        "Add water, ginger, cardamom and cloves to a pan and bring to a boil.",
        "Simmer for 2 minutes so the spices release flavour.",
        "Add tea leaves and boil for another minute.",
        "Add milk and sugar, bring to a gentle boil.",
        "Strain into cups and serve hot."
      ],
      prepTime: 5,
      cookTime: 8,
      totalTime: 13,
      difficulty: "easy",
      imageUrl: "",
      createdAt: now,
      updatedAt: now
    },
    {
      id: "seed_poha",
      title: "Poha",
      description: "Light, savoury flattened rice breakfast with onions and peanuts.",
      ingredients: [
        "2 cups thick poha (flattened rice)",
        "1 medium onion (chopped)",
        "1 green chilli (chopped)",
        "1/4 cup peanuts",
        "1/2 tsp mustard seeds",
        "1/2 tsp turmeric",
        "Salt, lemon juice, coriander leaves"
      ],
      steps: [
        "Rinse poha in water, drain and keep aside.",
        "Heat oil, fry peanuts, then keep them aside.",
        "In the same pan, add mustard seeds, onion and green chilli, sauté till soft.",
        "Add turmeric, salt and soaked poha, mix gently.",
        "Top with peanuts, lemon juice and coriander, then serve warm."
      ],
      prepTime: 10,
      cookTime: 10,
      totalTime: 20,
      difficulty: "easy",
      imageUrl: "",
      createdAt: now,
      updatedAt: now
    }
  ];

  saveRecipes(seeded);
  return seeded;
}

// loadTheme -> read theme from localStorage, default to "light"
export function loadTheme() {
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "dark" ? "dark" : "light";
}

// saveTheme -> write theme string into localStorage
export function saveTheme(theme) {
  window.localStorage.setItem(THEME_KEY, theme);
}
