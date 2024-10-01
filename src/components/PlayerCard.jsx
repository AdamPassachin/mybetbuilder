import './BetBuilder.css';

function PlayerCard({ bookmaker }) {
    return (
        <div className='player-odds-container'>
            <p className='player-odds-text'>{bookmaker.player.odds}</p>
        </div>
    )
}

export default PlayerCard;