# NBA Stat Comparison

A professional React web app for comparing NBA player season averages head-to-head. Search any active player, pull their latest stats, and compare them side by side with visual stat bars and winner highlighting.

**Repo:** [github.com/shamzaali7/nba-stat-comparison](https://github.com/shamzaali7/nba-stat-comparison)  
**Live site:** [nba-stat-comparison-gkoi.vercel.app](https://nba-stat-comparison-gkoi.vercel.app/)

---

## Features

- **Live player search** — autocomplete powered by the BallDontLie API; no need to know exact spellings
- **Season averages comparison** — PTS, REB, AST, STL, BLK, TOV, FG%, 3P%, FT%, and minutes
- **Visual stat bars** — orange/blue bars show relative performance at a glance; winner highlighted in orange
- **Top Players page** — curated grid of 24 current NBA stars (2024–25 season) with NBA CDN headshots; click any card to pre-fill the comparison
- **Responsive dark theme** — Barlow Condensed + Inter typography, full CSS variable system

---

## Tech Stack

- **React 18** (functional components + hooks)
- **React Router v6** — comparison state passed via router navigation state, no prop drilling
- **Axios** — all API calls centralized in `src/services/nbaApi.js`
- **BallDontLie API v1** — player search and season averages
- **NBA CDN** — player headshots via official `cdn.nba.com` URLs

---

## Getting Started

### Prerequisites

- Node.js ≥ 16
- A free BallDontLie API key — sign up at [balldontlie.io](https://www.balldontlie.io)

### Setup

```bash
git clone https://github.com/shamzaali7/nba-stat-comparison.git
cd nba-stat-comparison
npm install
```

Create a `.env` file in the project root:

```
REACT_APP_NBA_API_KEY=your_api_key_here
```

```bash
npm start
```

---

## Project Structure

```
src/
├── services/
│   └── nbaApi.js           # Centralized API layer (search, season averages)
├── data/
│   └── topPlayers.js       # Curated top-player list with NBA IDs for headshots
├── Components/
│   ├── Header.js            # Fixed navbar with active-link highlighting
│   ├── Footer.js
│   ├── Home.js              # Hero page — video background + feature cards
│   ├── Players.js           # Dual autocomplete search + compare trigger
│   ├── Stats.js             # Side-by-side stat comparison with visual bars
│   ├── PlayerList.js        # Top players grid, clickable to pre-fill compare
│   └── PlayerSelectionModal.js
├── Assets/
│   └── AnkleBreaker.mp4
├── players.json             # NBA player ID lookup for headshots
├── index.css                # Global dark theme + all component styles
└── App.js                   # Router setup
```

---

## API Notes

All requests go to `https://api.balldontlie.io/v1` with your key in the `Authorization` header.

- **Player search:** `GET /players?search={query}&per_page=10`
- **Season averages:** `GET /season_averages?season={year}&player_ids[]={id}`
  - Season uses start-year convention: `2025` = 2025–26 season
  - Automatically falls back to the previous season if no data is available

---

## Author

Built by **Hamza Ali**
