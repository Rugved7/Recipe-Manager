🍽️ Recipe Manager
A lightweight and functional Recipe Manager Web Application built entirely with HTML, CSS, and ES6 JavaScript—no frameworks required. All data is stored persistently in the browser's localStorage, so no backend or database is needed.


✨ Features
Category	Features
CRUD	Add, Edit, Delete recipes
Recipe Data	Ingredients, steps, timings, difficulty, and image
Views	List view - Detail view - Form view
Search & Filters	Search by title - Filter by difficulty - Max prep time filter
UI Enhancements	Dark/Light theme toggle - Responsive layout - Recipe images
Storage	100% client-side persistence via localStorage
Validation	Prevents invalid submission - Error messages
🧰 Tech Stack
Tool	Purpose
HTML5	Structure
CSS3	Styling + responsive design
JavaScript (ES6 Modules)	Logic, UI updates, event handling
localStorage	Data persistence
📂 Project Structure
text
recipe-manager/
│   index.html          → Main entry file
│
├── css/
│   └── styles.css      → Styling + responsiveness + theme
│
├── js/
│   ├── app.js          → App entrypoint (views + state management)
│   ├── storage.js      → localStorage and seeded data
│   ├── recipes.js      → CRUD + filtering logic
│   ├── ui.js           → DOM updates and event bindings
│   └── utils.js        → Validation and helpers
🥗 Seeded Recipes (On First Load)
On the first load, the app automatically inserts a few sample recipes into localStorage:

Recipe	Category
Paneer Butter Masala	Dinner / Curry
Masala Chai	Beverage
Poha	Breakfast
After seeding, you can freely create, edit, or delete recipes.

📌 Data Schema
Each recipe stored under localStorage["recipes"] looks like:

json
{
  "id": "unique id",
  "title": "Paneer Butter Masala",
  "description": "Rich and creamy tomato-based gravy...",
  "ingredients": ["Paneer cubes", "Butter", "Tomatoes", "..."],
  "steps": ["Heat oil", "Add puree", "..."],
  "prepTime": 20,
  "cookTime": 30,
  "totalTime": 50,
  "difficulty": "medium",
  "imageUrl": "https://example.com/paneer.jpg",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
🚀 Getting Started
Clone the Repository

bash
git clone https://github.com/your-username/recipe-manager.git
Navigate to Project

bash
cd recipe-manager
Run the App

Simply open index.html in your browser. No installation or server needed!

🔄 Resetting Data (Optional)
To reset to seeded recipes:

Open the browser console (F12)

Run:

js
localStorage.removeItem("recipes")
Reload the page.

📱 Responsiveness
Supports Desktop, Tablet, and Mobile layouts.

Recipe cards automatically resize based on screen width.