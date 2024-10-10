import './GameDayHeader.css';

function GameDayHeader({ gameDate }) {
    return (
        <div className="game-day-header">
            <p className="game-day-header-text">{gameDate}</p>
            <div className="game-day-divider"></div>
        </div>
    );
}

export default GameDayHeader;