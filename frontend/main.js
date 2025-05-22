import { LoginForm } from "./Pages/LoginPage.js"
import { ProfilePage } from "./Pages/ProfilePage.js";
export { init }

async function init(path = window.location.pathname) {

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    let popUp = document.createElement('div')
    popUp.id = "popups"
    contentDiv.appendChild(popUp)

    const token = sessionStorage.getItem("jwt");

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
            const page = await ProfilePage();
            contentDiv.appendChild(page);
            break;
        default:
            contentDiv.innerHTML = "<h1>404 - Page Not Found</h1>";
    }
}

window.addEventListener("popstate", () => {
    init(window.location.pathname);
});


init()