import axios from 'axios';

const API_KEY = process.env.REACT_APP_NBA_API_KEY;
const BASE_URL = 'https://api.balldontlie.io/v1';

const headers = { Authorization: API_KEY };

// NBA uses start-year for season: 2025 = 2025-26 season
export function getCurrentSeason() {
  const year  = new Date().getFullYear();
  const month = new Date().getMonth(); // 0-indexed; Oct = 9
  return month < 9 ? year - 1 : year;
}

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

// ── Helpers for computing averages from per-game stats ──────────────────────

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
  if (n === 0) return null;

  const KEYS = ['pts', 'reb', 'ast', 'stl', 'blk', 'turnover',
                'fgm', 'fga', 'fg3m', 'fg3a', 'ftm', 'fta'];

  const totals = KEYS.reduce((acc, k) => ({ ...acc, [k]: 0 }), { minDecimal: 0 });

  games.forEach(g => {
    KEYS.forEach(k => { totals[k] += Number(g[k]) || 0; });
    totals.minDecimal += parseMinutes(g.min);
  });

  const avg = {};
  KEYS.forEach(k => { avg[k] = +(totals[k] / n).toFixed(2); });
  avg.min          = formatMinutes(totals.minDecimal / n);
  avg.fg_pct       = totals.fga  > 0 ? +(totals.fgm  / totals.fga).toFixed(3)  : 0;
  avg.fg3_pct      = totals.fg3a > 0 ? +(totals.fg3m / totals.fg3a).toFixed(3) : 0;
  avg.ft_pct       = totals.fta  > 0 ? +(totals.ftm  / totals.fta).toFixed(3)  : 0;
  avg.games_played = n;
  avg.season       = season;

  return avg;
}

// ── Main export ─────────────────────────────────────────────────────────────
// Uses /stats (free tier) instead of /season_averages (paid tier)

export async function getPlayerSeasonAverages(playerId) {
  const season = getCurrentSeason();

  for (const s of [season, season - 1]) {
    try {
      // Fetch all regular-season games for this player in this season
      const url = `${BASE_URL}/stats?seasons[]=${s}&player_ids[]=${playerId}&per_page=100&postseason=false`;
      const response = await axios.get(url, { headers });
      const games = response.data.data;

      if (games && games.length > 0) {
        const stats = calculateAverages(games, s);
        return { stats, season: s };
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
