import { LoginForm } from "./Pages/LoginPage.js"
import { HomePage } from "./Pages/HomePage.js";
export { init }

/**
 * @param {string} [path=window.location.pathname] 
 * Entry point for the project.  
 */
async function init(path = window.location.pathname) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    let popUp = document.createElement('div');
    popUp.id = "popups";
    contentDiv.appendChild(popUp);

    const token = localStorage.getItem("jwt");

    if (path === "/Login" && token) {
        path = "/";
    } else if (path === "/" && !token) {
        path = "/Login";
    }

    window.history.pushState({}, "", path);

    switch (path) {
        case "/Login":
            contentDiv.appendChild(LoginForm());
            break;
        case "/":
            const page = await HomePage();
            contentDiv.appendChild(page);
            break;
        default:
            contentDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
    };
};


window.addEventListener("popstate", async () => {
    await init(window.location.pathname);
});

window.addEventListener('DOMContentLoaded', async () => { await init() });