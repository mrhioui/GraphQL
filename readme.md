graphql-profile/
│
├── index.html                  # Main HTML file (includes login + profile UI)
├── style.css                   # Global styles (layout, fonts, graphs, etc.)
├── main.js                     # App entry point, routing, init logic
│
├── /auth                       # Authentication logic
│   ├── login.js                # Handles login requests, JWT storage
│   ├── logout.js               # Clears JWT, handles logout
│   └── auth-utils.js           # Helpers: base64 encoding, JWT parsing, etc.
│
├── /graphql                    # GraphQL query logic
│   ├── client.js               # Fetch wrapper with auth headers
│   ├── queries.js              # All GraphQL queries (user, transactions, etc.)
│   └── data-service.js         # Functions that return parsed GraphQL data
│
├── /components                 # UI rendering code
│   ├── profile.js              # Renders user data on the profile page
│   ├── dashboard.js            # Orchestrates all data display
│   ├── charts.js               # Calls graph rendering functions
│   └── error.js                # Error/alert messages
│
├── /charts                    # SVG graph rendering
│   ├── xpTimeline.js           # XP over time (line chart)
│   ├── xpByProject.js          # XP per project (bar chart)
│   └── passFailRatio.js        # PASS/FAIL pie or donut chart
│
├── /utils                     # Shared helper functions
│   └── formatters.js           # Date formatting, number formatting, etc.
│
└── README.md                   # Project overview and instructions
