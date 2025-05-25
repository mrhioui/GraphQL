import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";
import { FormatBytes } from "../Utils/formatByte.js";

/**
 * A function that returns the audit ratio.
 */
export async function AuditRatio() {
    const [data, err] = await GetData(queries.user);
    if (err) {
        console.error("Error:", err.message);
        return`<h1>Error loading audit ratio. Please try again.</h1>`;
    } else {
        const user = data.user[0];

        const auditsDone = user.totalUp;
        const auditsReceived = user.totalDown;
        const maxValue = Math.max(auditsDone, auditsReceived, 1);

        const doneWidth = (auditsDone / maxValue) * 200;
        const receivedWidth = (auditsReceived / maxValue) * 200;
        return `
        <h1 id="title">Audits ratio</h1>
        <div id="up">
            <p>Done</p>
            <div id="Ratio">
                <svg height="10" width="200">
                    <line x1="0" y1="5" x2="${doneWidth}" y2="5" class="audit-line done" />
                </svg>
                <p>${FormatBytes(auditsDone)}</p>
            </div>
        </div>
        <div id="down">
            <p>Received</p>
            <div id="Ratio">
                <svg height="10" width="200">
                  <line x1="0" y1="5" x2="${receivedWidth}" y2="5" class="audit-line received" />
                </svg>
                <p>${FormatBytes(auditsReceived)}</p>
            </div>
        </div>
        <div id="RatioNbr">
            <h1>${(user.auditRatio).toFixed(1)}</h1>
            <p>${((user.auditRatio).toFixed(1)) < 1 ? `Make more audits!` : `You are good!`}</p>
        </div>`
    };
};