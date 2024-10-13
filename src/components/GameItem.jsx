import './GameItem.css';
import arrowForward from '../assets/icons/arrow-forward.svg';
import { useEffect, useState } from 'react';

// GameItem component for displaying a single game item
function GameItem({ game, onConvertTime, gameStatus, setGameStatus }) {

    // Update GameStatus whenever the game prop changes
    useEffect(() => {
        setGameStatus(game.fixture.status.short);
    }, [game.fixture.status.short]);

    // Render the game item, filled with game data from API
    return (
        <div className="game-item">
            <div className={`game-status ${gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT" ? 'live-status' : '' }`}>
                {gameStatus === "FT" ? "FT" :  gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT"  ? "Live": onConvertTime(game.fixture.date)}
            </div>
            {(gameStatus === "FT") && (
                <div className='game-score'>
                    <div className='game-score-team'>{game.score.fulltime.home}</div>
                    <div className='game-score-team'>{game.score.fulltime.away}</div>
                </div>
            )}
            <div className="teams-container">
                <div className="team-info">
                    <img src={game.teams.home.logo} alt={game.teams.home.name} className="team-logo" />
                    <span>{game.teams.home.name}</span>
                </div>
                <div className="team-info">
                    <img src={game.teams.away.logo} alt={game.teams.away.name} className="team-logo" />
                    <span>{game.teams.away.name}</span>
                </div>
            </div>
            <button className="game-button">
                <img src={arrowForward} alt="Details" className="button-icon" />
            </button>
        </div>
    );
}

export default GameItem;