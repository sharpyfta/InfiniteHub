// =========================
// 🌟 GLOBAL SETTINGS & INIT
// =========================
const themes = ["theme-neon","theme-blue","theme-red","theme-purple","theme-orange","theme-cyber"];
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
const savedTheme = localStorage.getItem("theme");
if(savedTheme) document.body.className = savedTheme;
let games = []; // This will load from games.json

// =========================
// 🎨 THEME SWITCHER
// =========================
function setTheme(theme){
    if(!themes.includes(theme)) return;
    document.body.className = theme;
    localStorage.setItem("theme", theme);
}

// =========================
// 🕵️ TAB CLOAK SYSTEM
// =========================
function setCloak(type){
    const favIcons = {
        google: "https://www.google.com/favicon.ico",
        classroom: "https://ssl.gstatic.com/classroom/favicon.png",
        drive: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"
    };
    const titles = {
        google: "Google",
        classroom: "Google Classroom",
        drive: "My Drive - Google Drive"
    };
    document.title = titles[type] || "Unblocked Games Hub";
    setFavicon(favIcons[type]);
}

function setFavicon(url){
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.head.appendChild(link);
}

// =========================
// ⭐ FAVORITES SYSTEM
// =========================
function toggleFavorite(gameId){
    const index = favorites.indexOf(gameId);
    if(index>=0) favorites.splice(index,1);
    else favorites.push(gameId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderGames();
}

// =========================
// 🎮 LOAD GAMES FROM JSON
// =========================
async function loadGames(){
    try{
        const response = await fetch('games.json');
        games = await response.json();
        renderGames();
    }catch(e){
        console.error("Failed to load games.json:", e);
    }
}

// =========================
// 🖼 RENDER GAME HUB
// =========================
function renderGames(){
    const container = document.getElementById("game-container");
    if(!container) return;

    container.innerHTML = ""; // Clear previous

    games.forEach(game=>{
        const card = document.createElement("div");
        card.className = "card";

        // Game title
        const title = document.createElement("h3");
        title.textContent = game.name;
        card.appendChild(title);

        // Favorite button
        const fav = document.createElement("span");
        fav.innerHTML = "★";
        fav.className = "favorite";
        if(favorites.includes(game.id)) fav.classList.add("active");
        fav.onclick = ()=>toggleFavorite(game.id);
        card.appendChild(fav);

        // Play button
        const btn = document.createElement("button");
        btn.textContent = "Play Game";
        btn.onclick = ()=>{
            window.location.href = game.url;
        };
        card.appendChild(btn);

        container.appendChild(card);
    });
}

// =========================
// 🛠 SETTINGS MENU
// =========================
function openSettings(){
    const overlay = document.createElement("div");
    overlay.id = "settings-overlay";
    overlay.style = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        z-index:9999;color:white;font-family:Poppins,sans-serif;
    `;

    const container = document.createElement("div");
    container.style="padding:2rem;background:#111;border-radius:20px;max-width:500px;width:90%;text-align:center;";
    
    const h2 = document.createElement("h2");
    h2.textContent="Settings";
    container.appendChild(h2);

    // Theme selector
    const themeLabel = document.createElement("p");
    themeLabel.textContent="Select Theme:";
    container.appendChild(themeLabel);
    themes.forEach(t=>{
        const btn = document.createElement("button");
        btn.textContent=t.replace("theme-","");
        btn.onclick=()=>setTheme(t);
        container.appendChild(btn);
    });

    // Tab cloak selector
    const cloakLabel = document.createElement("p");
    cloakLabel.textContent="Tab Cloak:";
    container.appendChild(cloakLabel);
    ["google","classroom","drive"].forEach(c=>{
        const btn = document.createElement("button");
        btn.textContent=c.charAt(0).toUpperCase()+c.slice(1);
        btn.onclick=()=>setCloak(c);
        container.appendChild(btn);
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent="Close Settings";
    closeBtn.style="margin-top:1rem;background:red;color:white;";
    closeBtn.onclick=()=>overlay.remove();
    container.appendChild(closeBtn);

    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

// =========================
// 🌀 AUTO-GENERATE 100 GAME SLOTS (PLACEHOLDER)
// =========================
function generateDummyGames(){
    for(let i=1;i<=100;i++){
        games.push({
            id:"game"+i,
            name:"Game "+i,
            url:"game"+i+".html"
        });
    }
    renderGames();
}

// =========================
// 🚀 INIT
// =========================
window.onload = ()=>{
    generateDummyGames();
};
