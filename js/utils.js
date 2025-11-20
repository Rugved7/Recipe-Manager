const Utils = {
  validateRecipe(data) {
    const errors = {};

    if (!data.title || data.title.trim() === "") {
      errors.title = "Title is required";
    } else if (data.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters long";
    } else if (data.title.trim().length > 100) {
      errors.title = "Title must not exceed 100 characters";
    }

    if (!data.description || data.description.trim() === "") {
      errors.description = "Description is required";
    } else if (data.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters long";
    } else if (data.description.trim().length > 500) {
      errors.description = "Description must not exceed 500 characters";
    }

    if (!data.ingredients || data.ingredients.length === 0) {
      errors.ingredients = "At least one ingredient is required";
    } else {
      const hasEmptyIngredient = data.ingredients.some(
        (ing) =>
          !ing.item ||
          !ing.quantity ||
          ing.item.trim() === "" ||
          ing.quantity.trim() === ""
      );
      if (hasEmptyIngredient) {
        errors.ingredients = "All ingredient fields must be filled";
      }
    }

    if (!data.steps || data.steps.length === 0) {
      errors.steps = "At least one step is required";
    } else {
      const hasEmptyStep = data.steps.some(
        (step) => !step || step.trim() === ""
      );
      if (hasEmptyStep) {
        errors.steps = "All step fields must be filled";
      }
    }

    if (
      data.prepTime === undefined ||
      data.prepTime === null ||
      data.prepTime === ""
    ) {
      errors.prepTime = "Prep time is required";
    } else if (isNaN(data.prepTime) || data.prepTime < 0) {
      errors.prepTime = "Prep time must be a positive number";
    } else if (data.prepTime > 1440) {
      errors.prepTime = "Prep time seems too long (max 24 hours)";
    }

    if (
      data.cookTime === undefined ||
      data.cookTime === null ||
      data.cookTime === ""
    ) {
      errors.cookTime = "Cook time is required";
    } else if (isNaN(data.cookTime) || data.cookTime < 0) {
      errors.cookTime = "Cook time must be a positive number";
    } else if (data.cookTime > 1440) {
      errors.cookTime = "Cook time seems too long (max 24 hours)";
    }

    if (!data.difficulty || data.difficulty === "") {
      errors.difficulty = "Difficulty level is required";
    } else if (
      !["easy", "medium", "hard"].includes(data.difficulty.toLowerCase())
    ) {
      errors.difficulty = "Invalid difficulty level";
    }

    if (data.imageUrl && data.imageUrl.trim() !== "") {
      if (!this.isValidUrl(data.imageUrl)) {
        errors.imageUrl =
          "Please enter a valid URL starting with http:// or https://";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },

  isValidUrl(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  },

  escapeHtml(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
  },

  formatTime(minutes) {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  },

  getDifficultyClass(difficulty) {
    const difficultyMap = {
      easy: "difficulty-easy",
      medium: "difficulty-medium",
      hard: "difficulty-hard",
    };
    return difficultyMap[difficulty.toLowerCase()] || "difficulty-medium";
  },

  getPlaceholderImage(title) {
    return `https://via.placeholder.com/600x400/e5e7eb/4b5563?text=${encodeURIComponent(
      title
    )}`;
  },

  getRecipeImage(imageUrl, title) {
    if (imageUrl && imageUrl.trim() !== "") {
      return imageUrl;
    }
    return this.getPlaceholderImage(title);
  },

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  },

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  showSuccess(message) {
    alert(message);
  },

  showError(message) {
    alert("Error: " + message);
  },

  formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
};

export default Utils;
