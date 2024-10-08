import './GameItem.css';
import arrowForward from '../assets/icons/arrow-forward.svg';

// GameItem component for displaying a single game item
function GameItem({ game }) {

    // Convert the date to a more readable format
    function convertTime(fullDate) {
        const date = new Date(fullDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Render the game item, filled with game data from API
    return (
        <div className="game-item">
            <div className="game-time">{convertTime(game.fixture.date)}</div>
            <div className="vertical-line"></div>
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