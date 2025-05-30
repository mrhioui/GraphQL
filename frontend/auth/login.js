import { init } from "../main.js";
import { showPopup } from "../Utils/popup.js";

/**
 * sfdfd
 * @param {*} usernameOrEmail 
 * @param {*} password 
 * @returns fdsfd
 */
export async function Login(usernameOrEmail, password) {
    const credentials = btoa(`${usernameOrEmail}:${password}`);

    try {
        const response = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`
            }
        });

        if (!response.ok) {
            throw new Error("Invalid login credentials");
        }
        
        
        // console.log(await response.json());
        const token = await response.json();
        if (token) {
            localStorage.setItem("jwt", token);
            init('/');
        }

    } catch (error) {
        showPopup(error.message)
    }
}
