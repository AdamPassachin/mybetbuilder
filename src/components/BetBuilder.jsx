import './BetBuilder.css'
import Bookmakers from './Bookmakers';

function BetBuilder({ game }) {
    return (
        <div>
            <h1 className='game-header-style'>{game.homeTeam.name} vs {game.awayTeam.name}</h1>
            <div className="betbuilder">
                <p style={{fontSize: "16px"}}>Player Card</p>
                <div className='divider-betbuilder'></div>
                <div className='bookmakers'>
                    <Bookmakers />
                </div>
            </div>
        </div>
    )
}

export default BetBuilder;