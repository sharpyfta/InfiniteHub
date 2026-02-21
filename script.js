const grid = document.getElementById("gameGrid");
const searchBar = document.getElementById("searchBar");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");
const closeBtn = document.getElementById("closeBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const categoriesDiv = document.getElementById("categories");

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
        card.innerHTML = `
            <img src="${game.thumbnail}" alt="">
            <h3>${game.name}</h3>
        `;
        card.onclick = () => openGame(game.iframe);
        grid.appendChild(card);
    });
}

function openGame(url) {
    frame.src = url;
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    frame.src = "";
    modal.style.display = "none";
};

fullscreenBtn.onclick = () => {
    frame.requestFullscreen();
};

searchBar.addEventListener("keyup", () => {
    const value = searchBar.value.toLowerCase();
    const filtered = games.filter(g =>
        g.name.toLowerCase().includes(value)
    );
    displayGames(filtered);
});

function createCategories() {
    const categories = [...new Set(games.map(g => g.category))];

    categories.unshift("All");

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
