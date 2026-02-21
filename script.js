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
