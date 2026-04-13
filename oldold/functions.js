var num = 0; // Default to light theme

// Set theme when page loads
(function() {
    var theme = localStorage.getItem('theme');
    if (theme) {
        document.getElementById("theme-link").href = theme;
        document.getElementById("light-dark").src = theme === "light.css" ? "sun.png" : "moon.png";
        num = theme === "light.css" ? 1 : 0; // Set num correctly based on theme
    }
})();

function changetheme() {
    var themeLink = document.getElementById("theme-link");
    if (num == 1) {
        // Switch to light mode
        document.getElementById("light-dark").src = "sun.png";
        themeLink.href = "light.css";
        localStorage.setItem('theme', 'light.css');
        num = 0;
    } else {
        // Switch to dark mode
        document.getElementById("light-dark").src = "moon.png";
        themeLink.href = "dark.css";
        localStorage.setItem('theme', 'dark.css');
        num = 1;
    }
}
