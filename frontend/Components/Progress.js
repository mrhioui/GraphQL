import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";

export async function Progress() {
    const divParent = document.getElementById('divParent')
    const [data, err] = await GetData(queries.projects);
    if (err) {
        console.error("Error:", err.message)
        divParent.innerHTML = `<h1>Error loading profile. Please try again.</h1>`;
        return
    } else {
        console.log(data);
        return `
        <div id="progres">
            <h1 id="title">progres</h1>
            <svg width="80%" height="80%" id="graphProgress">
               ${skills.map((project, i) => {

                })}
            </svg>
        </div>
       `
    }
}