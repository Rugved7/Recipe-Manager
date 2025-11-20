const STORAGE_KEY = "recipes";

const storeManager = {
  // Method to get the saved Recipes
  getRecipes() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const recipes = JSON.parse(data);
      return Array.isArray(recipes) ? recipes : [];
    } catch (error) {
      console.log("Error reading from localStorage", error);
      this.saveRecipes([]);
      return [];
    }
  },

  //   Method to save the recipes to localStorage
  saveRecipes(recipes) {
    try {
      const data = JSON.stringify(recipes);
      localStorage.setItem(STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.log("Error saving to localStorage", error);

      if (error.name === "QuotaExceededError") {
        alert(
          "Storage limit exceeded! please delete some recipes or use shorter url images"
        );
      } else {
        alert("Failed to save recipe. Please try again.");
      }
      return true;
    }
  },

  //   Method to add the seed data
  initializWithSeedData() {
    const exisingRecipes = this.getRecipes();
    if (exisingRecipes && exisingRecipes.length > 1) {
      return exisingRecipes;
    }

    const seedRecipes = [
      {
        id: Date.now().toString(),
        title: "Paneer Butter Masala",
        description:
          "A rich and creamy North Indian curry made with soft paneer cubes in a tomato-based gravy with butter and cream. Perfect with naan or rice.",
        ingredients: [
          { item: "Paneer (cubed)", quantity: "400g" },
          { item: "Tomatoes", quantity: "4 large" },
          { item: "Onions", quantity: "2 medium" },
          { item: "Cashews", quantity: "10-12" },
          { item: "Butter", quantity: "3 tbsp" },
          { item: "Heavy Cream", quantity: "1/2 cup" },
          { item: "Ginger-Garlic Paste", quantity: "1 tbsp" },
          { item: "Red Chili Powder", quantity: "1 tsp" },
          { item: "Garam Masala", quantity: "1 tsp" },
          { item: "Kasuri Methi", quantity: "1 tsp" },
          { item: "Salt", quantity: "to taste" },
        ],
        steps: [
          "Soak cashews in warm water for 20 minutes.",
          "Blanch tomatoes in hot water, peel and puree them along with soaked cashews.",
          "Heat butter in a pan, add ginger-garlic paste and sauté until fragrant.",
          "Add the tomato-cashew puree and cook for 8-10 minutes until oil separates.",
          "Add red chili powder, salt, and garam masala. Mix well.",
          "Add cream and mix thoroughly. Let it simmer for 5 minutes.",
          "Add paneer cubes and crushed kasuri methi. Mix gently.",
          "Simmer for 2-3 minutes and serve hot with naan or rice.",
        ],
        prepTime: 20,
        cookTime: 30,
        difficulty: "medium",
        imageUrl:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: (Date.now() + 3).toString(),
        title: "Chocolate Lava Cake",
        description:
          "Decadent individual chocolate cakes with a molten center. Impressive dessert that's easier to make than it looks!",
        ingredients: [
          { item: "Dark Chocolate", quantity: "200g" },
          { item: "Butter", quantity: "100g" },
          { item: "Eggs", quantity: "2 large" },
          { item: "Egg Yolks", quantity: "2" },
          { item: "Sugar", quantity: "1/4 cup" },
          { item: "All-Purpose Flour", quantity: "2 tbsp" },
          { item: "Vanilla Extract", quantity: "1 tsp" },
          { item: "Cocoa Powder", quantity: "for dusting" },
        ],
        steps: [
          "Preheat oven to 220°C (425°F). Grease 4 ramekins with butter and dust with cocoa powder.",
          "Melt chocolate and butter together in a double boiler.",
          "In a separate bowl, whisk eggs, egg yolks, and sugar until thick and pale.",
          "Fold melted chocolate into egg mixture.",
          "Gently fold in flour and vanilla until just combined.",
          "Divide batter among prepared ramekins.",
          "Bake for 12-14 minutes until edges are set but center jiggles.",
          "Let rest for 1 minute, then invert onto plates. Serve with ice cream.",
        ],
        prepTime: 15,
        cookTime: 14,
        difficulty: "hard",
        imageUrl:
          "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    this.saveRecipes(seedRecipes);
    return seedRecipes;
  },

  //   Method to clear the localStorage
  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.log(error, "Error clearing localStorage");
      return false;
    }
  },

  //   Method to check if localtorage is avaliable on a browser
  isAvaliable() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      console.log("LocalStorage is not avaiable", error);
      alert(
        "Your browser does not support localStorage or it is disabled. The app may not work properly."
      );
      return false;
    }
  },
};

export default storeManager;
