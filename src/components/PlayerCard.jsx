import './BetBuilder.css';

// Renders a player card component for each player in the bookmakers array.
function PlayerCard({ bookmaker }) {
    return (
        <div className='player-odds-container'>
            <p className='player-odds-text'>{bookmaker.player.odds}</p>
        </div>
    )
}

export default PlayerCard;