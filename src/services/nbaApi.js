import axios from 'axios';
import PlayersJson from '../players.json';
import { PLAYER_NBA_ID_MAP } from '../data/topPlayers';

const API_KEY = process.env.REACT_APP_NBA_API_KEY;
const BASE_URL = 'https://api.balldontlie.io/v1';
const headers  = { Authorization: API_KEY };

// ── Player search (free public endpoint) ────────────────────────────────────
export async function searchPlayers(query) {
  if (!query || query.trim().length < 2) return [];
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      params: { search: query.trim(), per_page: 10 },
      headers,
    });
    return response.data.data || [];
  } catch (err) {
    console.error('searchPlayers error:', err);
    return [];
  }
}

// ── NBA ID lookup (for headshots) ────────────────────────────────────────────
function normalize(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

export function getNbaId(firstName, lastName) {
  const full     = `${firstName} ${lastName}`;
  const normFull = normalize(full);

  if (PLAYER_NBA_ID_MAP[full]) return PLAYER_NBA_ID_MAP[full];
  for (const [k, v] of Object.entries(PLAYER_NBA_ID_MAP)) {
    if (normalize(k) === normFull) return v;
  }
  if (PlayersJson[full]) return PlayersJson[full].PlayerID;
  for (const [k, v] of Object.entries(PlayersJson)) {
    if (normalize(k) === normFull) return v.PlayerID;
  }
  return null;
}

// ── Season averages — balldontlie /stats (free tier) ────────────────────────
// Fetches per-game logs and computes averages manually.
// Requires a valid API key in REACT_APP_NBA_API_KEY.

function getCurrentSeason() {
  const year  = new Date().getFullYear();
  const month = new Date().getMonth();
  return month < 9 ? year - 1 : year;
}

function parseMinutes(minStr) {
  if (!minStr) return 0;
  const parts = String(minStr).split(':');
  if (parts.length === 2) return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
  return parseFloat(minStr) || 0;
}

function formatMinutes(decimal) {
  const m = Math.floor(decimal);
  const s = Math.round((decimal - m) * 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function calculateAverages(games, season) {
  const n = games.length;
  if (!n) return null;

  const KEYS = ['pts','reb','ast','stl','blk','turnover','fgm','fga','fg3m','fg3a','ftm','fta'];
  const totals = KEYS.reduce((a, k) => ({ ...a, [k]: 0 }), { minDec: 0 });

  games.forEach(g => {
    KEYS.forEach(k => { totals[k] += Number(g[k]) || 0; });
    totals.minDec += parseMinutes(g.min);
  });

  const avg = {};
  KEYS.forEach(k => { avg[k] = +(totals[k] / n).toFixed(2); });
  avg.min          = formatMinutes(totals.minDec / n);
  avg.fg_pct       = totals.fga  > 0 ? +(totals.fgm  / totals.fga).toFixed(3)  : 0;
  avg.fg3_pct      = totals.fg3a > 0 ? +(totals.fg3m / totals.fg3a).toFixed(3) : 0;
  avg.ft_pct       = totals.fta  > 0 ? +(totals.ftm  / totals.fta).toFixed(3)  : 0;
  avg.games_played = n;
  avg.season       = season;
  return avg;
}

export async function getPlayerSeasonAverages(player) {
  const season = getCurrentSeason();

  for (const s of [season, season - 1]) {
    try {
      const url = `${BASE_URL}/stats?seasons[]=${s}&player_ids[]=${player.id}&per_page=100&postseason=false`;
      const response = await axios.get(url, { headers });
      const games    = response.data.data;
      if (games && games.length > 0) {
        return { stats: calculateAverages(games, s), season: s };
      }
    } catch (err) {
      console.error(`getPlayerSeasonAverages error (season ${s}):`, err);
    }
  }
  return null;
}

export function getPlayerHeadshotUrl(nbaId) {
  return `https://cdn.nba.com/headshots/nba/latest/1040x760/${nbaId}.png`;
}
