import './BetBuilder.css'
import Bookmakers from './Bookmakers';
import PlayerCard from './PlayerCard';
import bet365Logo from '../assets/bookmaker-logo/bet365.png';
import betfairLogo from '../assets/bookmaker-logo/betfair.png';
import unibetLogo from '../assets/bookmaker-logo/unibet.png';
import betLogo from '../assets/bookmaker-logo/888bet.png';
import betwayLogo from '../assets/bookmaker-logo/betway.png';


function BetBuilder({ game }) {

    // Example bookmakers data. TO-DO: Make api call here depending on game selected.
    const bookmakers = [
        { 
            id: 1, 
            name: 'Bet365',
            logo: bet365Logo,
            player: {
                name: 'Virgil van Dijk',
                odds: 2.60,
            },
        },
        { 
            id: 2, 
            name: 'Betfair',
            logo: betfairLogo,
            player: {
                name: 'Virgil van Dijk',
                odds: 2.64,
            },
        },
        {
            id: 3,
            name: 'Unibet',
            logo: unibetLogo,
            player: {
                name: 'Virgil van Dijk',
                odds: 2.73,
            },
        },
        {
            id: 4,
            name: '888bet',
            logo: betLogo,
            player: {
                name: 'Virgil van Dijk',
                odds: 2.69,
            },
        },
        {
            id: 5,
            name: 'Betway',
            logo: betwayLogo,
            player: {
                name: 'Virgil van Dijk',
                odds: 2.86,
            },
        },
        ];

        // Renders the betbuilder component. Loops through the bookmakers array and renders a bookmaker component for each bookmaker.
        // Renders a player card component for each player in the bookmakers array.
        // TO-DO: Fix rendering of players cards. Right now player name is static. Issue when more players are available.
    return (
        <div>
            <h1 className='game-header-style'>{game.homeTeam.name} vs {game.awayTeam.name}</h1>
            <div className="betbuilder">
                <h4>Player Card</h4>
                <div className='divider-betbuilder'></div>
                <div className='bookmakers-container'>
                    {bookmakers.map(bookmaker => (
                        <Bookmakers key={bookmaker.id} bookmaker={bookmaker} />
                    ))}
                </div>
                <div className='bookmakers-container'>
                    <p className='player-name'>{bookmakers[0].player.name}</p>
                    {bookmakers.map(bookmaker => (
                        <PlayerCard key={bookmaker.id} bookmaker={bookmaker}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BetBuilder;