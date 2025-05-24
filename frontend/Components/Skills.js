{/* <div id="svg">
                <div id="skills">
                    <h1 id="title">Skills</h1>
                    <svg  width="100%" height="90%" id="graphSkills">
                      ${skills.map((skill, i) => {
                        const baseRadius = 30 * i;       
                        const spacing = 5;
                        const strokeWidth = 10;
                        const radius = (baseRadius - i * (strokeWidth + spacing))+10;                        
                        const circumference = 2 * Math.PI * radius;
                        const offset = circumference * (1 - skill.amount / 100);
                        const y = (i*30) + 10;
                        const color = generateRandomColor();
                    
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
                </div>
                <div id="progres">
                    <h1 id="title">progres</h1>
                    <svg width="80%" height="80%" id="graphProgress">
                      ${skills.map((project, i) => {

                      })}
                    </svg>
                </div>
            </div> */}