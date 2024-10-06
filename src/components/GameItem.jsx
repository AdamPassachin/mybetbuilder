import './GameItem.css';

// GameItem component for displaying a single game item
function GameItem({ game }) {
    return (
        <div className="game-item">
            <div className="game-time">{game.timezone}</div>
            <div className="vertical-line"></div>
            <div className="teams-container">
                <div className="team-info">
                    <img src={game.homeTeam.logo} alt={game.homeTeam.name} className="team-logo" />
                    <span>{game.homeTeam.name}</span>
                </div>
                <div className="team-info">
                    <img src={game.awayTeam.logo} alt={game.awayTeam.name} className="team-logo" />
                    <span>{game.awayTeam.name}</span>
                </div>
            </div>
        </div>
    );
}

export default GameItem;