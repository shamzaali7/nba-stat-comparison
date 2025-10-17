import React from 'react';
import './PlayerSelectionModal.css';

function PlayerSelectionModal({ players, onSelect, onClose, playerNumber }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Select Player {playerNumber}</h2>
                <div className="player-options">
                    {players.map(player => (
                        <div 
                            key={player.id} 
                            className="player-option"
                            onClick={() => onSelect(player)}
                        >
                            <div className="player-info">
                                <h3>{player.first_name} {player.last_name}</h3>
                                <p>{player.team ? player.team.full_name : 'No Team'}</p>
                                <p>Position: {player.position || 'N/A'}</p>
                                {player.jersey_number && <p>#{player.jersey_number}</p>}
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="modal-close-btn">Cancel</button>
            </div>
        </div>
    );
}

export default PlayerSelectionModal;