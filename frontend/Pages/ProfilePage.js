import { GetData } from "../graphql/data-service.js";
import { query } from "../graphql/queries.js";
import { init } from "../main.js";
import { formatBytes } from "../Utils/formatByte.js";

export async function ProfilePage() {
    const div = document.createElement("div");

    const [data, err] = await GetData(query);
    if (err) {
        div.innerHTML = `<h1>Error loading profile. Please try again.</h1>`;
        console.error("Error:", err.message)
    } else {

        const user = data.user[0];
        console.log(user);
        const auditsDone = user.totalUp;
        const auditsReceived = user.totalDown;
        const maxValue = Math.max(auditsDone, auditsReceived, 1);

        const doneWidth = (auditsDone / maxValue) * 280;
        const receivedWidth = (auditsReceived / maxValue) * 280;

        div.innerHTML = /*html*/`
            <nav>
                <h2 id="logo">GraphQL</h2>
                <button id="logoutBtn">Logout</button>
            </nav>
            <h1>Welcome, ${user.attrs.firstName} ${user.attrs.lastName}!</h1>
            <div id="componemts">
                <div id="info">
                    <h1>User Info</h1>
                    <p>Username : ${user.login}</p>
                    <p>First Name : ${user.attrs.firstName}</p>
                    <p>Last Name : ${user.attrs.lastName}</p>
                    <p>CIN : ${user.attrs.cin}</p>
                    <p>Email : ${user.attrs.email}</p>
                    <p>Number : ${user.attrs.tel}</p>
                </div>
                <div id="auditRatio">
                    <h1>Audits ratio</h1>
                    <div id="up">
                        <p>Done</p>
                        <svg height="20" width="280" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="10" x2="${doneWidth}" y2="10" class="audit-line done" />
                        </svg>
                        <p>${formatBytes(auditsDone)}</p>
                    </div>
                    <div id="down">
                        <p>Received</p>
                        <svg height="20" width="280" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="10" x2="${receivedWidth}" y2="10" class="audit-line received" />
                        </svg>
                        <p>${formatBytes(auditsReceived)}</p>
                    </div>
                    <div id="ratio">
                        <h1>${(user.auditRatio).toFixed(1)}</h1>
                        <p>${((user.auditRatio).toFixed(1)) < 1 ? `Make more audits!` : `You qre good!`}</p>

                    </div>
                </div>
                <div id="level">
                    level
                </div>
            </div>
            <div id="svg">
                <div id="skills">
                    skills
                </div>
                <div id="progres">
                    progres
                </div>
            </div>
        `;
    }



    div.querySelector("#logoutBtn")?.addEventListener("click", () => {
        sessionStorage.removeItem("jwt");
        init('/Login');
    });

    return div;
}
