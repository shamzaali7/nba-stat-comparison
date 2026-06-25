// Vercel serverless function — proxies stats.nba.com to avoid CORS
// No API key required. Called by the React app at /api/nba-stats?nbaId=203999

const NBA_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Connection': 'keep-alive',
  'Host': 'stats.nba.com',
  'Origin': 'https://www.nba.com',
  'Referer': 'https://www.nba.com/',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'x-nba-stats-origin': 'stats',
  'x-nba-stats-token': 'true',
};

function getCurrentSeason() {
  const year  = new Date().getFullYear();
  const month = new Date().getMonth();
  return month < 9 ? year - 1 : year;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { nbaId } = req.query;
  if (!nbaId) return res.status(400).json({ error: 'nbaId is required' });

  try {
    const url = `https://stats.nba.com/stats/playercareerstats?PlayerID=${nbaId}&PerMode=PerGame&LeagueID=00`;
    const nbaRes = await fetch(url, { headers: NBA_HEADERS });

    if (!nbaRes.ok) {
      return res.status(nbaRes.status).json({ error: `NBA API returned ${nbaRes.status}` });
    }

    const data = await nbaRes.json();

    const regularSet = data.resultSets?.find(r => r.name === 'SeasonTotalsRegularSeason');
    if (!regularSet || regularSet.rowSet.length === 0) {
      return res.status(404).json({ error: 'No stats found' });
    }

    const H   = regularSet.headers;
    const idx = name => H.indexOf(name);

    // Find current season row, fall back to most recent
    const currentSeason = getCurrentSeason();
    const seasonStr = `${currentSeason}-${String(currentSeason + 1).slice(-2)}`;
    let row = regularSet.rowSet.find(r => r[idx('SEASON_ID')] === seasonStr);
    if (!row) row = regularSet.rowSet[regularSet.rowSet.length - 1];

    const season = row[idx('SEASON_ID')]
      ? parseInt(row[idx('SEASON_ID')].split('-')[0], 10)
      : currentSeason;

    const stats = {
      pts:          row[idx('PTS')],
      reb:          row[idx('REB')],
      ast:          row[idx('AST')],
      stl:          row[idx('STL')],
      blk:          row[idx('BLK')],
      turnover:     row[idx('TOV')],
      fgm:          row[idx('FGM')],
      fga:          row[idx('FGA')],
      fg3m:         row[idx('FG3M')],
      fg3a:         row[idx('FG3A')],
      ftm:          row[idx('FTM')],
      fta:          row[idx('FTA')],
      fg_pct:       row[idx('FG_PCT')],
      fg3_pct:      row[idx('FG3_PCT')],
      ft_pct:       row[idx('FT_PCT')],
      min:          row[idx('MIN')] != null ? String(row[idx('MIN')]) : null,
      games_played: row[idx('GP')],
      season,
    };

    return res.status(200).json({ stats, season });
  } catch (err) {
    console.error('nba-stats handler error:', err);
    return res.status(500).json({ error: err.message });
  }
};
