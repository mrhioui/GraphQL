import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";
import { GenerateRandomColor } from "../Utils/GenerateColor.js";

export async function Skills() {
  const [data, err] = await GetData(queries.skills);
  if (err) {
    console.error("Error:", err.message)
    return `<h1>Error loading profile. Please try again.</h1>`;
  } else {
    const skills = data.transaction

    return `
    <h1 id="title">Skills</h1>
    <svg id="graphSkills">
    ${skills.map((skill, i) => {
      const baseRadius = 30 * i;
      const spacing = 5;
      const strokeWidth = 10;
      const radius = (baseRadius - i * (strokeWidth + spacing)) + 10;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference * (1 - skill.amount / 100);
      const y = (i * 30) + 10;
      const color = GenerateRandomColor();
      return `
          <!-- Background Circle -->
          <circle
            cx="280"
            cy="230"
            r="${radius}"
            stroke="#eee"
            stroke-width="${strokeWidth}"
            fill="none"
          />
          <!-- Progress Circle -->
          <circle
            cx="280"
            cy="230"
            r="${radius}"
            stroke="${color}"
            stroke-width="${strokeWidth}"
            fill="none"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
            transform="rotate(-90 280 230)"
            stroke-linecap="round"
          />
          <rect width="30" height="20" x="20" y="${y}" fill="${color}"/>
          `;
    }).join('')}
      </svg>
    `
  }
}
requestAnimationFrame(() => {
  const svg = document.getElementById("graphSkills");
  if (svg) {
    const bbox = svg.getBBox();
    svg.setAttribute("viewBox", `0 0 ${bbox.width} ${bbox.height}`);
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  }
});