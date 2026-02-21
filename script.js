const grid = document.getElementById("gameGrid");
const searchBar = document.getElementById("searchBar");
const categoriesDiv = document.getElementById("categories");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("closeBtn");

let games = [];

fetch("games.json")
.then(res => res.json())
.then(data => {
    games = data;
    displayGames(games);
    createCategories();
});

function displayGames(list) {
    grid.innerHTML = "";
    list.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.textContent = game.name;
        card.onclick = () => openGame(game.iframe);
        grid.appendChild(card);
    });
}

function createCategories() {
    const categories = ["All", ...new Set(games.map(g => g.category))];

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.onclick = () => {
            if (cat === "All") displayGames(games);
            else displayGames(games.filter(g => g.category === cat));
        };
        categoriesDiv.appendChild(btn);
    });
}

searchBar.addEventListener("keyup", () => {
    const value = searchBar.value.toLowerCase();
    const filtered = games.filter(g =>
        g.name.toLowerCase().includes(value)
    );
    displayGames(filtered);
});

function openGame(url) {
    frame.src = url;
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    frame.src = "";
    modal.style.display = "none";
};

{
  "theme_system": {
    "description": "Allows users to switch the website theme and remember the choice.",
    "default_class": "theme-neon",
    "script_instructions": [
      "Add function setTheme(theme) to script.js",
      "Inside setTheme: set document.body.className = theme and save theme to localStorage",
      "Check localStorage for savedTheme on page load and apply it if exists"
    ],
    "example_buttons": [
      {"label": "Neon", "action": "setTheme('theme-neon')"},
      {"label": "Blue", "action": "setTheme('theme-blue')"},
      {"label": "Red", "action": "setTheme('theme-red')"}
    ]
  },
  "tab_cloak_system": {
    "description": "Allows the page to mimic other websites in the tab title and favicon.",
    "script_instructions": [
      "Add function setCloak(type) to script.js",
      "Inside setCloak, check type and set document.title accordingly",
      "Call setFavicon(url) to update the page favicon dynamically",
      "Add function setFavicon(url) that creates or updates <link rel='icon'> in <head>"
    ],
    "example_buttons": [
      {"label": "Google Cloak", "action": "setCloak('google')"},
      {"label": "Classroom Cloak", "action": "setCloak('classroom')"},
      {"label": "Drive Cloak", "action": "setCloak('drive')"}
    ]
  },
  "favorites_system": {
    "description": "Allows users to favorite items and store them in localStorage.",
    "script_instructions": [
      "Initialize favorites array from localStorage or empty array",
      "Add function toggleFavorite(name)",
      "Inside toggleFavorite, check if name is already in favorites; add or remove accordingly",
      "Save updated favorites array to localStorage"
    ]
  }
}

