import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";

/**
 * A function that returns the user's data.
 */
export async function UserInfo() {
    const [data, err] = await GetData(queries.user);
    if (err) {
        console.error("Error:", err.message)
        return `<h1>Error loading user info. Please try again.</h1>`;
    } else {
        const user = data.user[0];

        return `
        <h1 id="title">User Info</h1>
        <div>
            <p id="key">Username :</p>
            <p>${user.login}</p>
        </div>
        <div>
            <p id="key">First Name :</p>
            <p>${user.attrs.firstName}</p>
        </div>                    
        <div>
            <p id="key">Last Name :</p>
            <p>${user.attrs.lastName}</p>
        </div>
        <div>
            <p id="key">Campus :</p>
            <p>${user.campus}</p>
        </div>
        <div>
            <p id="key">CIN :</p>
            <p>${user.attrs.cin}</p>
        </div>
        <div>
            <p id="key">Email :</p>
            <p>${user.attrs.email}</p>
        </div>
        <div>
            <p id="key">Number :</p>
            <p>${user.attrs.tel}</p>
        </div>`;
    };
};