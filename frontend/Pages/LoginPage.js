import { Login } from "../auth/login.js";

/**
 * A function that returns the contents of the login page.
 * @returns html div
 */
export function LoginForm() {
    const form = document.createElement("form");
    form.id = "form"

    form.innerHTML = /*html*/`
        <label for="username">Username Or Email
            <input type="text" name="username" id="username" required autocomplete="username">
        </label>

        <label for="password">Password
            <input type="password" name="password" id="password" required autocomplete="current-password">
        </label>

        <button type="submit" id="LoginBtn">Login</button>
    `;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = form.querySelector("#username").value;
        const password = form.querySelector("#password").value;

        await Login(username, password);
    });

    return form;
};