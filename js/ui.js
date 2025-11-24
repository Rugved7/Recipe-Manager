const UI = {
    views: {
        welcome: document.getElementById('welcome-view'),
        list: document.getElementById('list-view'),
        detail: document.getElementById('detail-view'),
        form: document.getElementById('form-view')
    },
    
    showView(viewName) {
        Object.values(this.views).forEach(view => view.classList.remove('active'));
        this.views[viewName].classList.add('active');
    },
    
    renderRecipeGrid(recipes) {
        const grid = document.getElementById('recipe-grid');
        
        if (recipes.length === 0) {
            grid.innerHTML = '<div class="no-recipes">No recipes found. Try adjusting your filters or add a new recipe!</div>';
            return;
        }
        
        grid.innerHTML = recipes.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                ${recipe.isFavorite ? '<div class="favorite-badge">⭐ FAVORITE</div>' : ''}
                ${recipe.image ? 
                    `<img src="${recipe.image}" alt="${Utils.escapeHtml(recipe.title)}" class="recipe-card-image">` :
                    `<div class="recipe-card-image">🍽️</div>`
                }
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${Utils.escapeHtml(recipe.title)}</h3>
                    <p class="recipe-card-description">${Utils.escapeHtml(recipe.description)}</p>
                    <div class="recipe-card-meta">
                        <div class="meta-item">⏱️ ${Utils.formatTime(recipe.prepTime + recipe.cookTime)}</div>
                        <div class="meta-item">👥 ${recipe.servings}</div>
                        <span class="difficulty-badge ${Utils.getDifficultyClass(recipe.difficulty)}">
                            ${recipe.difficulty}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
        
        grid.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                this.showRecipeDetail(id);
            });
        });
    },
    
    showRecipeDetail(id) {
        const recipe = RecipeManager.getRecipe(id);
        if (!recipe) return;
        
        RecipeManager.currentRecipe = recipe;
        
        const detailContainer = document.getElementById('recipe-detail');
        detailContainer.innerHTML = `
            <div class="recipe-detail">
                <div class="recipe-detail-header">
                    <div>
                        <h2>${recipe.isFavorite ? '⭐ ' : ''}${Utils.escapeHtml(recipe.title)}</h2>
                        <p>${Utils.escapeHtml(recipe.description)}</p>
                    </div>
                    <div class="recipe-detail-actions">
                        <button class="btn btn-primary" id="edit-recipe-btn">
                            ✏️ Edit
                        </button>
                        <button class="btn btn-danger" id="delete-recipe-btn">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
                
                ${recipe.image ? 
                    `<img src="${recipe.image}" alt="${Utils.escapeHtml(recipe.title)}" class="recipe-detail-image">` :
                    ''
                }
                
                <div class="recipe-detail-meta">
                    <div class="meta-item">⏱️ Prep: ${Utils.formatTime(recipe.prepTime)}</div>
                    <div class="meta-item">🍳 Cook: ${Utils.formatTime(recipe.cookTime)}</div>
                    <div class="meta-item">⏰ Total: ${Utils.formatTime(recipe.prepTime + recipe.cookTime)}</div>
                    <div class="meta-item">👥 Servings: ${recipe.servings}</div>
                    <span class="difficulty-badge ${Utils.getDifficultyClass(recipe.difficulty)}">
                        ${recipe.difficulty}
                    </span>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredients.map(ing => `<li>${Utils.escapeHtml(ing)}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Instructions</h3>
                    <ol>
                        ${recipe.steps.map(step => `<li>${Utils.escapeHtml(step)}</li>`).join('')}
                    </ol>
                </div>
            </div>
        `;
        
        document.getElementById('edit-recipe-btn').addEventListener('click', () => {
            this.showRecipeForm(recipe);
        });
        
        document.getElementById('delete-recipe-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this recipe?')) {
                RecipeManager.deleteRecipe(recipe.id);
                this.showView('list');
                this.renderRecipeGrid(RecipeManager.filteredRecipes);
            }
        });
        
        this.showView('detail');
    },
    
    showRecipeForm(recipe = null) {
        const form = document.getElementById('recipe-form');
        const formTitle = document.getElementById('form-title');
        
        if (recipe) {
            formTitle.textContent = 'Edit Recipe';
            RecipeManager.editingRecipeId = recipe.id;
            
            document.getElementById('recipe-title').value = recipe.title;
            document.getElementById('recipe-description').value = recipe.description;
            document.getElementById('recipe-ingredients').value = Utils.arrayToTextarea(recipe.ingredients);
            document.getElementById('recipe-steps').value = Utils.arrayToTextarea(recipe.steps);
            document.getElementById('recipe-prep-time').value = recipe.prepTime;
            document.getElementById('recipe-cook-time').value = recipe.cookTime;
            document.getElementById('recipe-servings').value = recipe.servings;
            document.getElementById('recipe-difficulty').value = recipe.difficulty;
            document.getElementById('recipe-image').value = recipe.image || '';
        } else {
            formTitle.textContent = 'Add New Recipe';
            RecipeManager.editingRecipeId = null;
            form.reset();
        }
        
        this.clearFormErrors();
        this.showView('form');
    },
    
    clearFormErrors() {
        document.querySelectorAll('.error').forEach(error => {
            error.textContent = '';
        });
    },
    
    showFormErrors(errors) {
        this.clearFormErrors();
        
        Object.keys(errors).forEach(field => {
            const errorElement = document.getElementById(`error-${field.replace(/([A-Z])/g, '-$1').toLowerCase()}`);
            if (errorElement) {
                errorElement.textContent = errors[field];
            }
        });
    },
    
    getFormData() {
        return {
            title: document.getElementById('recipe-title').value.trim(),
            description: document.getElementById('recipe-description').value.trim(),
            ingredients: Utils.parseTextareaToArray(document.getElementById('recipe-ingredients').value),
            steps: Utils.parseTextareaToArray(document.getElementById('recipe-steps').value),
            prepTime: parseInt(document.getElementById('recipe-prep-time').value),
            cookTime: parseInt(document.getElementById('recipe-cook-time').value),
            servings: parseInt(document.getElementById('recipe-servings').value),
            difficulty: document.getElementById('recipe-difficulty').value,
            image: document.getElementById('recipe-image').value.trim()
        };
    },
    
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.className = savedTheme === 'dark' ? 'dark-theme' : '';
        this.updateThemeIcon(savedTheme);
    },
    
    toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        
        if (isDark) {
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
        }
        
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    },
    
    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
};