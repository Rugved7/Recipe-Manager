const Storage = {
  STORAGE_KEY: "recipes",

  getAllRecipes() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  saveRecipes(recipes) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recipes));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  },

  addRecipe(recipe) {
    const recipes = this.getAllRecipes();
    recipe.id = Date.now();
    recipe.createdAt = new Date().toISOString();
    recipes.push(recipe);
    return this.saveRecipes(recipes) ? recipe : null;
  },

  updateRecipe(id, updatedRecipe) {
    const recipes = this.getAllRecipes();
    const index = recipes.findIndex((r) => r.id === id);

    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updatedRecipe, id };
      return this.saveRecipes(recipes);
    }
    return false;
  },

  deleteRecipe(id) {
    const recipes = this.getAllRecipes();
    const filtered = recipes.filter((r) => r.id !== id);
    return this.saveRecipes(filtered);
  },

  getRecipeById(id) {
    const recipes = this.getAllRecipes();
    return recipes.find((r) => r.id === id);
  },

  removeAllRecipes() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error removing all recipes:", error);
      return false;
    }
  },

  initializeDefaultRecipes() {
    const existing = this.getAllRecipes();
    if (existing.length > 0) return;

    const defaultRecipes = [
      {
        id: Date.now(),
        title: "Paneer Butter Masala",
        description:
          "Rich and creamy North Indian curry with soft paneer cubes in a tomato-based gravy. My absolute favorite dish that never fails to impress!",
        ingredients: [
          "400g paneer (cottage cheese), cubed",
          "4 large tomatoes, roughly chopped",
          "2 medium onions, chopped",
          "1 cup cashew nuts, soaked in warm water for 20 minutes",
          "4-5 garlic cloves",
          "1 inch ginger piece",
          "2 green cardamom pods",
          "2-3 cloves",
          "1 inch cinnamon stick",
          "1 bay leaf",
          "1 tsp cumin seeds",
          "2 tbsp butter",
          "2 tbsp oil",
          "1 tsp red chili powder",
          "1 tsp coriander powder",
          "1/2 tsp garam masala",
          "1/2 tsp kasuri methi (dried fenugreek leaves)",
          "1/4 cup fresh cream",
          "1 tbsp sugar",
          "Salt to taste",
          "Fresh coriander leaves for garnish",
        ],
        steps: [
          "Heat 1 tbsp oil in a pan and lightly fry paneer cubes until golden. Set aside on paper towels",
          "In the same pan, add 1 tbsp butter and whole spices (bay leaf, cardamom, cloves, cinnamon)",
          "Add cumin seeds and let them splutter",
          "Add chopped onions and sauté until golden brown (8-10 minutes)",
          "Add ginger-garlic paste and cook for 2 minutes until raw smell disappears",
          "Add chopped tomatoes and cook until they become soft and mushy (10-12 minutes)",
          "Turn off heat and let the mixture cool down completely",
          "Remove whole spices and transfer the mixture to a blender",
          "Add soaked cashew nuts and blend into a smooth paste, adding water if needed",
          "Heat remaining butter in the same pan",
          "Pour the blended gravy through a strainer for extra smoothness",
          "Add red chili powder, coriander powder, and salt. Mix well",
          "Cook the gravy on medium heat for 5-7 minutes, stirring occasionally",
          "Add sugar to balance the tanginess of tomatoes",
          "Crush kasuri methi between your palms and add to the gravy",
          "Add fresh cream and mix gently",
          "Add the fried paneer cubes and mix carefully",
          "Sprinkle garam masala and cook for 2-3 minutes",
          "Garnish with fresh coriander leaves and a drizzle of cream",
          "Serve hot with naan, roti, or jeera rice",
        ],
        prepTime: 25,
        cookTime: 35,
        servings: 4,
        difficulty: "Medium",
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800",
        isFavorite: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 1,
        title: "Adrak Chai (Ginger Tea)",
        description:
          "Warming and aromatic Indian ginger tea, perfect for cold evenings or when you need a comforting pick-me-up.",
        ingredients: [
          "2 cups water",
          "1 cup full-fat milk",
          "2 tsp loose black tea leaves (or 2 tea bags)",
          "2 inch fresh ginger, crushed or grated",
          "2-3 tsp sugar (adjust to taste)",
          "2 green cardamom pods, lightly crushed (optional)",
          "4-5 black peppercorns (optional for extra warmth)",
          "1 small cinnamon stick (optional)",
          "Fresh mint leaves (optional)",
        ],
        steps: [
          "Wash and crush or grate the fresh ginger to release its flavors",
          "In a saucepan, add 2 cups of water and bring to a boil",
          "Add the crushed ginger to the boiling water",
          "If using optional spices (cardamom, peppercorns, cinnamon), add them now",
          "Let the ginger and spices boil for 2-3 minutes to infuse the water",
          "Add the tea leaves or tea bags to the ginger-infused water",
          "Let it boil for 1-2 minutes until the water turns deep brown",
          "Add 1 cup of milk to the pan",
          "Bring the mixture to a rolling boil, watching carefully to prevent overflow",
          "When it starts rising, reduce heat slightly and let it simmer for 1 minute",
          "Add sugar according to your taste preference",
          "Boil for another 30 seconds, stirring to dissolve the sugar",
          "Turn off the heat and let it sit for 30 seconds for flavors to meld",
          "Strain the chai through a fine mesh strainer into cups or a teapot",
          "Garnish with a small piece of fresh ginger or mint leaves if desired",
          "Serve hot with biscuits, namkeen, or pakoras",
        ],
        prepTime: 5,
        cookTime: 10,
        servings: 2,
        difficulty: "Easy",
        image:
          "https://images.unsplash.com/photo-1683533699004-7f6b9e5a073f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isFavorite: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: Date.now() + 2,
        title: "Poha (Flattened Rice)",
        description:
          "Light and fluffy Maharashtrian breakfast dish made with flattened rice, peanuts, and aromatic spices. Quick, healthy, and absolutely delicious!",
        ingredients: [
          "2 cups thick poha (flattened rice)",
          "1/4 cup raw peanuts",
          "2 medium potatoes, peeled and diced into small cubes",
          "2 medium onions, finely chopped",
          "2 green chilies, finely chopped",
          "1 tsp mustard seeds",
          "1 tsp cumin seeds",
          "8-10 curry leaves",
          "1/4 tsp turmeric powder",
          "1/2 tsp red chili powder (optional)",
          "1 tsp sugar",
          "2 tbsp oil",
          "Salt to taste",
          "2 tbsp lemon juice",
          "Fresh coriander leaves, chopped",
          "Grated coconut for garnish (optional)",
          "Sev for topping (optional)",
        ],
        steps: [
          "Place poha in a large colander and rinse gently under running water 2-3 times",
          "Drain completely and let it sit for 10-15 minutes to soften",
          "The poha should be soft but not mushy. Test by pressing between fingers",
          "Sprinkle turmeric powder, salt, and sugar over the poha and mix gently. Set aside",
          "Heat oil in a large pan or kadhai on medium heat",
          "Add mustard seeds and let them splutter",
          "Add cumin seeds and curry leaves, fry for a few seconds",
          "Add raw peanuts and roast until golden and crunchy (3-4 minutes)",
          "Add diced potatoes with a pinch of salt, cover and cook until tender (5-7 minutes)",
          "Add chopped onions and green chilies, sauté until onions turn translucent",
          "Add red chili powder if using and mix well",
          "Add the prepared poha and mix gently but thoroughly",
          "Cover and cook on low heat for 2-3 minutes to warm through",
          "Turn off heat and add fresh lemon juice",
          "Mix gently and garnish with fresh coriander leaves",
          "Top with grated coconut and sev if desired",
          "Serve hot with yogurt or as is for breakfast",
        ],
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: "Easy",
        image:
          "https://images.pexels.com/photos/13041628/pexels-photo-13041628.jpeg",
        isFavorite: false,
        createdAt: new Date().toISOString(),
      },
    ];

    this.saveRecipes(defaultRecipes);
  },
};
