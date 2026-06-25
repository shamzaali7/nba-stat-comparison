import axios from 'axios';

const API_KEY = process.env.REACT_APP_NBA_API_KEY;
const BASE_URL = 'https://api.balldontlie.io/v1';

const headers = { Authorization: API_KEY };

// NBA uses start-year for season: 2025 = 2025-26 season
export function getCurrentSeason() {
  const year = new Date().getFullYear();
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

export async function getPlayerSeasonAverages(playerId) {
  const season = getCurrentSeason();

  for (const s of [season, season - 1]) {
    try {
      // Must use bracket notation so balldontlie parses it as an array
      const url = `${BASE_URL}/season_averages?season=${s}&player_ids[]=${playerId}`;
      const response = await axios.get(url, { headers });
      const data = response.data.data;
      if (data && data.length > 0) {
        return { stats: data[0], season: s };
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
