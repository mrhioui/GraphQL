import { GetData } from "../graphql/data-service.js";
import { queries } from "../graphql/queries.js";
import { GenerateRandomColor } from "../Utils/GenerateColor.js";

/**
 * A function that returns data about the user's skills in SVG.
 * @returns html div
 */
export async function Skills() {
  const [data, err] = await GetData(queries.skills);

  if (err) {
    console.error("Error:", err.message);
    return `<h1>Error loading profile. Please try again.</h1>`;
  }
  const skills = data.transaction;

  return /*html*/`
    <h1 id="title">Skills</h1>

    <div id="graphContainer">
      <svg id="graphSkills" viewBox="0 0 800 ${skills.length * 38}" width="100%" height="100%">
        ${skills.map((skill, i) => {
          const strokeWidth = 10;
          const spacing = 5;
          const baseRadius = 60;
          const radius = baseRadius + i * (strokeWidth + spacing);
          const circumference = 2 * Math.PI * radius;
          const offset = circumference * (1 - skill.amount / 100);
          const color = GenerateRandomColor();

          const legendX = 20;
          const legendY = i * 30 + 40;
          const legendHeight = 20;
          const legendWidth = 30;

          return /*html*/`
            <!-- Progress Circle Background -->
            <circle
              cx="500"
              cy="300"
              r="${radius}"
              stroke="#eee"
              stroke-width="${strokeWidth}"
              fill="none"/>

            <!-- Progress Circle -->
            <circle
              cx="500"
              cy="300"
              r="${radius}"
              stroke="${color}"
              stroke-width="${strokeWidth}"
              fill="none"
              stroke-dasharray="${circumference}"
              stroke-dashoffset="${offset}"
              transform="rotate(-90 500 300)"
              stroke-linecap="round"/>

            <!-- Skill Legend -->
            <rect x="${legendX}" y="${legendY}" width="${legendWidth}" height="${legendHeight}" fill="${color}" />

            <text x="${legendX + legendWidth + 10}" y="${legendY + 15}" fill="white" font-size="18" font-family="sans-serif">
              ${(skill.type).replace('skill_', '').toUpperCase()}
              ${skill.amount + '%'}
            </text>
          `;
        }).join('')}
      </svg>
    </div>`;
};

