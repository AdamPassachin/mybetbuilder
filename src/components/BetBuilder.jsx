import './BetBuilder.css'
import { useEffect } from 'react';
import Bookmakers from './Bookmakers';
import PlayerCard from './PlayerCard';


// Betbuilder that showcases bookmakers, players and their odds
function BetBuilder({ game, onConvertTime, gameStatus, setGameStatus }) {

    useEffect(() => {
        setGameStatus(game.fixture.status.short);
    }, [game.fixture.status.short]);

    return (
        <div>
            <div className="betbuilder">
                <div className='team-header-container'>
                    <div className='teamprofile'>
                        <img className='team-header-logo' src={game.teams.home.logo} alt={`${game.teams.home.name} logo`} />
                        <p className='team-header-name'>{game.teams.home.name}</p>
                    </div>
                    <div className='team-header-status'>
                        {(gameStatus === "FT") && (
                            <div className='team-header-score'>
                                {game.score.fulltime.home}
                                -
                                {game.score.fulltime.away}
                            </div> 
                        )}    
                        {gameStatus === "FT" ? "FT" :  gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT"  ? "Live": onConvertTime(game.fixture.date)}
                    </div>
                    <div className='teamprofile'>
                        <img className='team-header-logo' src={game.teams.away.logo} alt={`${game.teams.away.name} logo`} />
                        <p className='team-header-name'>{game.teams.away.name}</p>
                    </div>
                </div>
                <p>Player booked</p>
                <div className='divider-betbuilder'></div>
                <div className='bookmakers-container'>
                    {/* {bookmakers.map(bookmaker => (
                        <Bookmakers key={bookmaker.id} bookmaker={bookmaker} />
                    ))} */}
                </div>
                <div className='bookmakers-container'>
                    {/* <p className='player-name'>{bookmakers[0].player.name}</p>
                    {/* {bookmakers.map(bookmaker => (
                        <PlayerCard key={bookmaker.id} bookmaker={bookmaker}/>
                    ))} */} 
                </div>
            </div>
        </div>
    )
}

export default BetBuilder;
