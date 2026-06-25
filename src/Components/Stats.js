import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlayerHeadshotUrl } from '../services/nbaApi';
import PlayersJson from '../players.json';
import { PLAYER_NBA_ID_MAP } from '../data/topPlayers';

function getNbaId(first, last) {
  const full = `${first} ${last}`;
  if (PLAYER_NBA_ID_MAP[full]) return PLAYER_NBA_ID_MAP[full];
  if (PlayersJson[full]) return PlayersJson[full].PlayerID;
  return null;
}

function fmt(val, decimals = 1) {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return Number(val).toFixed(decimals);
}

function pct(val) {
  if (val === null || val === undefined || isNaN(val)) return '—';
  return (Number(val) * 100).toFixed(1) + '%';
}

// Returns { p1Class, p2Class } where winner gets 'winner', loser gets 'loser', tie gets 'tie'
function cmpClass(v1, v2, lowerIsBetter = false) {
  if (v1 === null || v1 === undefined || v2 === null || v2 === undefined) return { p1: 'tie', p2: 'tie' };
  const n1 = Number(v1);
  const n2 = Number(v2);
  if (n1 === n2) return { p1: 'tie', p2: 'tie' };
  const p1wins = lowerIsBetter ? n1 < n2 : n1 > n2;
  return p1wins
    ? { p1: 'winner', p2: 'loser' }
    : { p1: 'loser',  p2: 'winner' };
}

// Stat bar widths as % relative to the larger value
function barWidths(v1, v2) {
  const n1 = Number(v1) || 0;
  const n2 = Number(v2) || 0;
  const max = Math.max(n1, n2, 0.001);
  return { w1: `${(n1 / max) * 100}%`, w2: `${(n2 / max) * 100}%` };
}

function StatRow({ label, v1, v2, lowerIsBetter }) {
  const { p1, p2 } = cmpClass(v1, v2, lowerIsBetter);
  const { w1, w2 } = barWidths(
    typeof v1 === 'string' && v1.endsWith('%') ? parseFloat(v1) : v1,
    typeof v2 === 'string' && v2.endsWith('%') ? parseFloat(v2) : v2,
  );

  return (
    <div className="stat-row">
      <div className={`stat-value p1 ${p1}`}>{v1 ?? '—'}</div>
      <div className="stat-label-col">
        <span className="stat-label">{label}</span>
        <div className="stat-bars">
          <div className="stat-bar p1-bar" style={{ width: w1 }} />
          <div className="stat-bar p2-bar" style={{ width: w2 }} />
        </div>
      </div>
      <div className={`stat-value p2 ${p2}`}>{v2 ?? '—'}</div>
    </div>
  );
}

function Stats() {
  const location = useLocation();
  const navigate = useNavigate();
  const state    = location.state;

  if (!state || !state.playerOne || !state.playerTwo) {
    return (
      <div className="stats-page">
        <p className="error-msg">No comparison data found. Please select two players first.</p>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn-primary" onClick={() => navigate('/players')}>← Go Compare Players</button>
        </div>
      </div>
    );
  }

  const { playerOne, playerTwo, playerOneStats: s1, playerTwoStats: s2, season } = state;

  const p1Name  = `${playerOne.first_name} ${playerOne.last_name}`;
  const p2Name  = `${playerTwo.first_name} ${playerTwo.last_name}`;
  const p1NbaId = getNbaId(playerOne.first_name, playerOne.last_name);
  const p2NbaId = getNbaId(playerTwo.first_name, playerTwo.last_name);

  // Precompute percentage stats
  const fg1  = s1 ? fmt(s1.fg_pct  !== undefined ? s1.fg_pct  * 100 : (s1.fgm  && s1.fga  ? s1.fgm  / s1.fga  * 100 : null)) + (s1.fg_pct !== undefined || (s1.fgm && s1.fga) ? '%' : '') : '—';
  const fg2  = s2 ? fmt(s2.fg_pct  !== undefined ? s2.fg_pct  * 100 : (s2.fgm  && s2.fga  ? s2.fgm  / s2.fga  * 100 : null)) + (s2.fg_pct !== undefined || (s2.fgm && s2.fga) ? '%' : '') : '—';
  const tp1  = s1 ? fmt(s1.fg3_pct !== undefined ? s1.fg3_pct * 100 : (s1.fg3m && s1.fg3a ? s1.fg3m / s1.fg3a * 100 : null)) + (s1.fg3_pct !== undefined || (s1.fg3m && s1.fg3a) ? '%' : '') : '—';
  const tp2  = s2 ? fmt(s2.fg3_pct !== undefined ? s2.fg3_pct * 100 : (s2.fg3m && s2.fg3a ? s2.fg3m / s2.fg3a * 100 : null)) + (s2.fg3_pct !== undefined || (s2.fg3m && s2.fg3a) ? '%' : '') : '—';
  const ft1  = s1 ? fmt(s1.ft_pct  !== undefined ? s1.ft_pct  * 100 : (s1.ftm  && s1.fta  ? s1.ftm  / s1.fta  * 100 : null)) + (s1.ft_pct !== undefined || (s1.ftm && s1.fta) ? '%' : '') : '—';
  const ft2  = s2 ? fmt(s2.ft_pct  !== undefined ? s2.ft_pct  * 100 : (s2.ftm  && s2.fta  ? s2.ftm  / s2.fta  * 100 : null)) + (s2.ft_pct !== undefined || (s2.ftm && s2.fta) ? '%' : '') : '—';

  // Count wins for banner highlight
  const statsToCompare = [
    { v1: s1?.pts,      v2: s2?.pts,      lower: false },
    { v1: s1?.reb,      v2: s2?.reb,      lower: false },
    { v1: s1?.ast,      v2: s2?.ast,      lower: false },
    { v1: s1?.stl,      v2: s2?.stl,      lower: false },
    { v1: s1?.blk,      v2: s2?.blk,      lower: false },
    { v1: s1?.turnover, v2: s2?.turnover, lower: true  },
  ];

  let p1Wins = 0, p2Wins = 0;
  statsToCompare.forEach(({ v1, v2, lower }) => {
    const { p1, p2 } = cmpClass(v1, v2, lower);
    if (p1 === 'winner') p1Wins++;
    if (p2 === 'winner') p2Wins++;
  });

  return (
    <div className="stats-page">
      <button className="back-btn" onClick={() => navigate('/players')}>← Back to Compare</button>

      <div className="stats-header">
        <h1>Season Averages</h1>
        {season && <span className="season-badge">{season}–{String(season + 1).slice(-2)} Season</span>}
      </div>

      {/* Player banners */}
      <div className="stats-players-row">
        <div className={`stats-player-banner ${p1Wins > p2Wins ? 'winner' : ''}`}>
          <img
            src={p1NbaId ? getPlayerHeadshotUrl(p1NbaId) : 'https://via.placeholder.com/100?text=🏀'}
            alt={p1Name}
            onError={e => { e.target.src = 'https://via.placeholder.com/100?text=🏀'; }}
          />
          <div className="stats-player-name">{p1Name}</div>
          <div className="stats-player-meta">
            {playerOne.team ? playerOne.team.full_name : 'Free Agent'} &middot; {playerOne.position || 'N/A'}
          </div>
          {s1 && <span className="season-badge">{s1.games_played} GP</span>}
        </div>

        <div className="stats-vs">VS</div>

        <div className={`stats-player-banner ${p2Wins > p1Wins ? 'winner' : ''}`}>
          <img
            src={p2NbaId ? getPlayerHeadshotUrl(p2NbaId) : 'https://via.placeholder.com/100?text=🏀'}
            alt={p2Name}
            onError={e => { e.target.src = 'https://via.placeholder.com/100?text=🏀'; }}
          />
          <div className="stats-player-name">{p2Name}</div>
          <div className="stats-player-meta">
            {playerTwo.team ? playerTwo.team.full_name : 'Free Agent'} &middot; {playerTwo.position || 'N/A'}
          </div>
          {s2 && <span className="season-badge">{s2.games_played} GP</span>}
        </div>
      </div>

      {/* Stats rows */}
      <div className="stats-table">
        <StatRow label="Points"       v1={fmt(s1?.pts)} v2={fmt(s2?.pts)} />
        <StatRow label="Rebounds"     v1={fmt(s1?.reb)} v2={fmt(s2?.reb)} />
        <StatRow label="Assists"      v1={fmt(s1?.ast)} v2={fmt(s2?.ast)} />
        <StatRow label="Steals"       v1={fmt(s1?.stl)} v2={fmt(s2?.stl)} />
        <StatRow label="Blocks"       v1={fmt(s1?.blk)} v2={fmt(s2?.blk)} />
        <StatRow label="Turnovers"    v1={fmt(s1?.turnover)} v2={fmt(s2?.turnover)} lowerIsBetter />
        <StatRow label="FG%"          v1={fg1} v2={fg2} />
        <StatRow label="3P%"          v1={tp1} v2={tp2} />
        <StatRow label="FT%"          v1={ft1} v2={ft2} />
        <StatRow label="Minutes"      v1={s1?.min ?? '—'} v2={s2?.min ?? '—'} />
      </div>

      {(!s1 || !s2) && (
        <p className="error-msg" style={{ marginTop: 24 }}>
          {!s1 && !s2 ? 'No stats found for either player.' : `No stats found for ${!s1 ? p1Name : p2Name}.`}
        </p>
      )}
    </div>
  );
}

export default Stats;
