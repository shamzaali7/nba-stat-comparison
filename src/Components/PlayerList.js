import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOP_NBA_PLAYERS } from '../data/topPlayers';
import { getPlayerHeadshotUrl } from '../services/nbaApi';

function PlayerList() {
  const navigate = useNavigate();

  function handlePlayerClick(player) {
    navigate('/players', {
      state: { prefillOne: player.name },
    });
  }

  return (
    <div className="playerlist-page">
      <h1>Top Players</h1>
      <p className="subtitle">
        2024–25 season stars. Click any player to start a comparison.
      </p>

      <div className="players-grid">
        {TOP_NBA_PLAYERS.map(player => (
          <div
            key={player.nbaId}
            className="player-card"
            onClick={() => handlePlayerClick(player)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && handlePlayerClick(player)}
          >
            <img
              src={getPlayerHeadshotUrl(player.nbaId)}
              alt={player.name}
              onError={e => { e.target.src = 'https://via.placeholder.com/80?text=🏀'; }}
            />
            <div className="player-card-name">{player.name}</div>
            <div className="player-card-team">{player.team}</div>
            <span className="player-card-pos">{player.position}</span>
            <div className="player-card-hover-cta">Compare →</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerList;
