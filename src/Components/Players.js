import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchPlayers, getPlayerSeasonAverages, getPlayerHeadshotUrl } from '../services/nbaApi';
import PlayersJson from '../players.json';
import { PLAYER_NBA_ID_MAP } from '../data/topPlayers';

function getNbaId(fullName) {
  // Check supplemental map first (newer players), then static JSON
  if (PLAYER_NBA_ID_MAP[fullName]) return PLAYER_NBA_ID_MAP[fullName];
  if (PlayersJson[fullName]) return PlayersJson[fullName].PlayerID;
  return null;
}

// ── Single player search box ───────────────────────────────
function PlayerSearchBox({ label, selectedPlayer, onSelect, prefillName }) {
  const [query, setQuery]       = useState(prefillName || '');
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [open, setOpen]         = useState(false);
  const wrapperRef              = useRef(null);
  const timerRef                = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Debounced search
  useEffect(() => {
    if (selectedPlayer) return; // already selected
    clearTimeout(timerRef.current);
    if (query.length < 2) { setResults([]); setOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      const data = await searchPlayers(query);
      setResults(data);
      setOpen(data.length > 0);
      setLoading(false);
    }, 450);
    return () => clearTimeout(timerRef.current);
  }, [query, selectedPlayer]);

  function handleSelect(player) {
    setOpen(false);
    setResults([]);
    setQuery(`${player.first_name} ${player.last_name}`);
    onSelect(player);
  }

  function handleClear() {
    setQuery('');
    setResults([]);
    setOpen(false);
    onSelect(null);
  }

  const nbaId = selectedPlayer
    ? getNbaId(`${selectedPlayer.first_name} ${selectedPlayer.last_name}`)
    : null;

  return (
    <div className="player-search-card">
      <h2>{label}</h2>

      <div className="search-wrapper" ref={wrapperRef}>
        <input
          className="search-input"
          type="text"
          placeholder="Search player name…"
          value={query}
          onChange={e => { setQuery(e.target.value); if (selectedPlayer) onSelect(null); }}
          onFocus={() => results.length > 0 && setOpen(true)}
          autoComplete="off"
        />
        {loading && <div className="search-spinner" />}

        {open && results.length > 0 && (
          <div className="search-dropdown">
            {results.map(p => (
              <div
                key={p.id}
                className="search-dropdown-item"
                onMouseDown={() => handleSelect(p)}
              >
                <div className="player-name">{p.first_name} {p.last_name}</div>
                <div className="player-meta">
                  {p.team ? p.team.full_name : 'Free Agent'} &middot; {p.position || 'N/A'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedPlayer && (
        <div className="selected-player-card">
          <img
            src={nbaId ? getPlayerHeadshotUrl(nbaId) : 'https://via.placeholder.com/80?text=🏀'}
            alt={`${selectedPlayer.first_name} ${selectedPlayer.last_name}`}
            onError={e => { e.target.src = 'https://via.placeholder.com/80?text=🏀'; }}
          />
          <div className="selected-player-info">
            <div className="player-name">{selectedPlayer.first_name} {selectedPlayer.last_name}</div>
            <div className="player-meta">
              {selectedPlayer.team ? selectedPlayer.team.full_name : 'Free Agent'} &middot; {selectedPlayer.position || 'N/A'}
            </div>
          </div>
          <button
            className="selected-player-check"
            onClick={handleClear}
            title="Clear selection"
            style={{ background: 'none', color: 'var(--orange)', fontSize: 18, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Players page ─────────────────────────────────────
function Players() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const prefill   = location.state || {};

  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState('');

  const bothSelected = p1 && p2;

  async function handleCompare() {
    setError('');
    setComparing(true);

    const [res1, res2] = await Promise.all([
      getPlayerSeasonAverages(p1),
      getPlayerSeasonAverages(p2),
    ]);

    setComparing(false);

    if (!res1 && !res2) {
      setError('Could not load stats for either player. They may not be in our player database.');
      return;
    }

    navigate('/stats', {
      state: {
        playerOne: p1,
        playerTwo: p2,
        playerOneStats: res1 ? res1.stats : null,
        playerTwoStats: res2 ? res2.stats : null,
        season: (res1 || res2).season,
      },
    });
  }

  return (
    <div className="compare-page">
      <h1 className="compare-title">Compare Players</h1>
      <p className="compare-subtitle">Search for two players to compare their season averages head-to-head.</p>

      <div className="compare-grid">
        <PlayerSearchBox
          label="Player 1"
          selectedPlayer={p1}
          onSelect={setP1}
          prefillName={prefill.prefillOne || ''}
        />

        <div className="vs-divider">VS</div>

        <PlayerSearchBox
          label="Player 2"
          selectedPlayer={p2}
          onSelect={setP2}
          prefillName={prefill.prefillTwo || ''}
        />
      </div>

      <div className="compare-action">
        <button
          className="btn-primary"
          onClick={handleCompare}
          disabled={!bothSelected || comparing}
          style={{ opacity: (!bothSelected || comparing) ? 0.5 : 1, cursor: (!bothSelected || comparing) ? 'not-allowed' : 'pointer' }}
        >
          {comparing ? '⏳ Loading Stats…' : '📊 Compare Stats'}
        </button>
        {!bothSelected && (
          <p>Select both players to compare</p>
        )}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}

export default Players;
