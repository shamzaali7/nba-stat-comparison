import axios from 'axios';
import PlayersJson from '../players.json';
import { PLAYER_NBA_ID_MAP } from '../data/topPlayers';

const API_KEY  = process.env.REACT_APP_NBA_API_KEY;
const BDL_URL  = 'https://api.balldontlie.io/v1';

// ── Player search — balldontlie (free public endpoint) ──────────────────────
export async function searchPlayers(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const response = await axios.get(`${BDL_URL}/players`, {
      params:  { search: query.trim(), per_page: 10 },
      headers: { Authorization: API_KEY },
    });
    return response.data.data || [];
  } catch (err) {
    console.error('searchPlayers error:', err);
    return [];
  }
}

// ── NBA ID lookup ────────────────────────────────────────────────────────────
// Strips diacritics so "Luka Dončić" matches "Luka Doncic"
function normalize(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function getNbaId(firstName, lastName) {
  const full = `${firstName} ${lastName}`;

  // 1. Supplemental map (current stars, exact)
  if (PLAYER_NBA_ID_MAP[full]) return PLAYER_NBA_ID_MAP[full];

  // 2. Diacritic-insensitive check on supplemental map
  const normFull = normalize(full);
  for (const [key, val] of Object.entries(PLAYER_NBA_ID_MAP)) {
    if (normalize(key) === normFull) return val;
  }

  // 3. players.json (historical + many current players)
  if (PlayersJson[full]) return PlayersJson[full].PlayerID;
  for (const [key, val] of Object.entries(PlayersJson)) {
    if (normalize(key) === normFull) return val.PlayerID;
  }

  return null;
}

// ── Season averages — NBA Stats API via Vercel serverless proxy ─────────────
// No balldontlie API key needed for stats.
export async function getPlayerSeasonAverages(player) {
  const nbaId = getNbaId(player.first_name, player.last_name);

  if (!nbaId) {
    console.warn(`No NBA ID found for ${player.first_name} ${player.last_name}`);
    return null;
  }

  try {
    // /api/nba-stats is the Vercel serverless function in api/nba-stats.js
    const response = await axios.get(`/api/nba-stats?nbaId=${nbaId}`);
    return response.data; // { stats, season }
  } catch (err) {
    console.error('getPlayerSeasonAverages error:', err);
    return null;
  }
}

export function getPlayerHeadshotUrl(nbaId) {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`;
}

export function getCurrentSeason() {
  const year  = new Date().getFullYear();
  const month = new Date().getMonth();
  return month < 9 ? year - 1 : year;
}
