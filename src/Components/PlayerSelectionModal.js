import React from 'react';

function PlayerSelectionModal({ players, onSelect, onClose, playerNumber }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2>Select Player {playerNumber}</h2>
        <p className="modal-sub">Multiple players matched — choose the one you meant.</p>

        {players.map(player => (
          <div
            key={player.id}
            className="modal-option"
            onClick={() => onSelect(player)}
          >
            <div className="modal-option-info">
              <div className="player-name">{player.first_name} {player.last_name}</div>
              <div className="player-meta">
                {player.team ? player.team.full_name : 'Free Agent'} &middot; {player.position || 'N/A'}
                {player.jersey_number ? ` · #${player.jersey_number}` : ''}
              </div>
            </div>
          </div>
        ))}

        <button className="modal-close-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default PlayerSelectionModal;
