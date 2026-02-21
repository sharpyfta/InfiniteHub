const container = document.getElementById("gameContainer");
const searchBar = document.getElementById("searchBar");
const modal = document.getElementById("gameModal");
const frame = document.getElementById("gameFrame");

let games = [];

// Load JSON file
fetch("games.json")
    .then(response => response.json())
    .then(data => {
        games = data;
        displayGames(games);
    });

function displayGames(list) {
    container.innerHTML = "";

    list.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";

        const title = document.createElement("h3");
        title.textContent = game.name;

        const button = document.createElement("button");
        button.textContent = "Play";
        button.onclick = () => openGame(game.iframe);

        card.appendChild(title);
        card.appendChild(button);
        container.appendChild(card);
    });
}

// Search
searchBar.addEventListener("keyup", () => {
    const value = searchBar.value.toLowerCase();
    const filtered = games.filter(game =>
        game.name.toLowerCase().includes(value)
    );
    displayGames(filtered);
});

function openGame(url) {
    frame.src = url;
    modal.style.display = "block";
}

function closeGame() {
    frame.src = "";
    modal.style.display = "none";
}

window.onclick = function(e) {
    if (e.target === modal) {
        closeGame();
    }
};
