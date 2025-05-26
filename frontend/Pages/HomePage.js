import { AuditRatio } from "../Components/AuditRatio.js";
import { Level } from "../Components/Level.js";
import { Progress } from "../Components/Progress.js";
import { Skills } from "../Components/Skills.js";
import { UserInfo } from "../Components/UserInfo.js";
import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";
import { init } from "../main.js";

/**
 *  A function that returns the contents of the home page
 * @returns html div
 */
export async function HomePage() {
    const div = document.createElement("div");
    div.id = "divParent";

    const [data, err] = await GetData(queries.user);

    if (err) {
        div.innerHTML = `<h1>Error loading profile. Please try again.</h1>`;
        console.error("Error:", err.message);
        return div;
    };

    const user = data.user[0];

    div.innerHTML = /*html*/`
        <nav>
            <h2 id="logo">GraphQL</h2>
            <button id="logoutBtn">Logout</button>
        </nav>

        <h1 id="welcome">Welcome, ${user.attrs.firstName} ${user.attrs.lastName}!</h1>

        <div id="componemts">
            <div id="info">${await UserInfo()}</div>
            <div id="auditRatio">${await AuditRatio()}</div>
            <div id="level">${await Level()}</div>
        </div>

        <div id="componemts">
            <div id="skills">${await Skills()}</div>
            <div id="progress">${await Progress()}</div>
        </div>
    `;

    div.querySelector("#logoutBtn")?.addEventListener("click", async () => {
        localStorage.removeItem("jwt");
        await init('/Login');
    });

    return div;
};
