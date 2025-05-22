import { Login } from "../auth/login.js";

export function LoginForm() {
    const form = document.createElement("div");
    form.id = "form"
    form.innerHTML = /*html*/`
        <label for="username">Username Or Email
            <input type="text" name="username" id="username" required>
        </label>

        <label for="password">Password
            <input type="password" name="password" id="password">
        </label>

        <button id="LoginBtn">Login</button>
    `
    let button = form.querySelector('#LoginBtn')
    button.addEventListener("click", async () => {
        const username = form.querySelector("#username").value;
        const password = form.querySelector("#password").value;
        await Login(username, password)

    });


    return form
}