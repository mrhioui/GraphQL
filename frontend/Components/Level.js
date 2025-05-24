import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";
import { FormatBytes } from "../Utils/formatByte.js";

export async function Level() {
    const divParent = document.getElementById('divParent')
    const [level, err1] = await GetData(queries.level);
    const [xp, err2] = await GetData(queries.xp);
    if (err1 || err2) {
        if (err1) console.error("Error:", err1.message)
        if (err2) console.error("Error:", err2.message)
        divParent.innerHTML = `<h1>Error loading profile. Please try again.</h1>`;
    } else {
        const lvl = level.transaction_aggregate.aggregate.max.amount;
        const XP = xp.transaction_aggregate.aggregate.sum.amount;

        return `
        <h1 id="title">Level</h1>
        <h1 id="levelNbr">${lvl}</h1>
        <p id="xp">${FormatBytes(XP)}</p>
        `
    }
}