import './GameItem.css';
import arrowForward from '../assets/icons/arrow-forward.svg';

// GameItem component for displaying a single game item
function GameItem({ game }) {

    // Convert the date to a more readable format in hours and minutes
    function convertTime(fullDate) {
        const date = new Date(fullDate);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Check if game is NS, FT or live
    function gameFinished(gameStatus){
        return gameStatus === "FT"
    }

    // Render the game item, filled with game data from API
    return (
        <div className="game-item">
            <div className="game-time">{gameFinished(game.fixture.status.short) ? game.fixture.status.short : convertTime(game.fixture.date)}</div>
            <div className="vertical-line"></div>
            {gameFinished(game.fixture.status.short) && (
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