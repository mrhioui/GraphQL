import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";

/**
 * A function that returns the Progress of the user.
 */
export async function Progress() {
    const divParent = document.getElementById('divParent');
    const [data, err] = await GetData(queries.projects);

    if (err) {
        console.error("Error:", err.message);
        divParent.innerHTML = `<h1>Error loading profile. Please try again.</h1>`;
        return;
    };

    const projects = data.transaction;

    // Sort by date
    projects.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    let cumulativeTotals = [];
    let runningTotal = 0;
    
    projects.forEach(p => {
        runningTotal += p.amount;
        cumulativeTotals.push(runningTotal);
    });

    const minTotal = Math.min(...cumulativeTotals);
    const maxTotal = Math.max(...cumulativeTotals);

    const times = projects.map(p => new Date(p.createdAt).getTime());
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    const width = 800;
    const height = Math.max(400, projects.length * 30);
    const padding = 50;

    const mapX = time => padding + ((time - minTime) / (maxTime - minTime)) * (width - 2 * padding);
    const mapY = total => height - padding - ((total - minTotal) / (maxTotal - minTotal)) * (height - 2 * padding);

    const lines = projects.slice(1).map((project, i) => {
        const prevProject = projects[i];
        const x1 = mapX(new Date(prevProject.createdAt).getTime());
        const y1 = mapY(cumulativeTotals[i]);

        const x2 = mapX(new Date(project.createdAt).getTime());
        const y2 = mapY(cumulativeTotals[i + 1]);

        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ff0000c0" stroke-width="4" stroke-linecap="round" />`;
    }).join('');

    const circles = projects.map((project, i) => {
        const x = mapX(new Date(project.createdAt).getTime());
        const y = mapY(cumulativeTotals[i]);
        const label = project.path.split("/").pop();

        return `
        <circle r="6" cx="${x}" cy="${y}" fill="red" stroke="white" stroke-width="1.5" style="cursor:pointer;">
            <title>${label}</title>
        </circle>`;
    }).join('');

    return /*html*/`
    <h1 id="title">Progress</h1>
    <div id="graphContainer">
        <svg id="graphProjects" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
            ${lines}
            ${circles}
        </svg>
    </div>
    `;
}
