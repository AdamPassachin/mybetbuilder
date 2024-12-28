import { useEffect, useState } from 'react';
import MarketAccordion from './MarketAccordion';
import { 
    MARKET_CATEGORIES, 
    POPULAR_MARKETS, 
    WIN_MARKETS, 
    PLAYER_MARKETS,
    SCORE_MARKETS,
    HANDICAP_MARKETS,
    STATS_MARKETS,
    GOALS_MARKETS,
    OTHER_MARKETS
} from '../constants/marketCategories';

// Betbuilder that showcases bookmakers and their odds for specific fixture
function BetBuilder({ game, gameweek, onConvertTime, selectedOdds, setSelectedOdds, setBetslipVisible, bookmakersList, replaceTeamNames, convertDateHeader }) {

    // Constant to store team names
    const homeTeam = game.teams.home.name;
    const awayTeam = game.teams.away.name;
    // Constant to store game status
    const gameStatus = game.fixture.status.short;
    // Constant to store fixture id
    const fixture_id = game.fixture.id;
    // State to store available markets
    const [markets, setMarkets] = useState([]);
    // Store to store filter selection for market
    const [filterSelection, setFilterSelection] = useState(MARKET_CATEGORIES.ALL);


    // Function to filter markets based on category
    const filterMarkets = (betType) => {
        switch (filterSelection) {
            case MARKET_CATEGORIES.ALL:
                return true; 
            case MARKET_CATEGORIES.POPULAR:
                return POPULAR_MARKETS.includes(betType);
            case MARKET_CATEGORIES.WIN:
                return WIN_MARKETS.includes(betType);
            case MARKET_CATEGORIES.PLAYER:
                return PLAYER_MARKETS.includes(betType);
            case MARKET_CATEGORIES.SCORE:
                return SCORE_MARKETS.includes(betType);
            case MARKET_CATEGORIES.HANDICAP:
                return HANDICAP_MARKETS.includes(betType);
            case MARKET_CATEGORIES.STATS:
                return STATS_MARKETS.includes(betType);
            case MARKET_CATEGORIES.GOALS:
                return GOALS_MARKETS.includes(betType);
            case MARKET_CATEGORIES.OTHER:
                return OTHER_MARKETS.includes(betType);
            default:
                return true;
        }
    };

    // Fetch available markets and odds for the selected fixture
     useEffect(() => {
        const fetchMarkets = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/markets?fixture_id=${fixture_id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch markets');
            }
            const data = await response.json();
            if (data.response && data.response.length > 0) {
              setMarkets(data.response);
            }
          } catch (error) {
            console.error('Error fetching markets:', error);
          }
        };
        fetchMarkets();
      }, [fixture_id]);


    // Function to group bets by bet type
    const groupBetsByType = (markets) => {
        const groupedBets = {};

        markets.forEach(market => {
            market.bookmakers.forEach(bookmaker => {
                bookmaker.bets.forEach(bet => {
                    if (!groupedBets[bet.name]) {
                        groupedBets[bet.name] = [];
                    }
                    groupedBets[bet.name].push({ bookmakerId: bookmaker.id, bookmakerName: bookmaker.name, ...bet });
                });
            });
        });
        return groupedBets;
    };

    const groupedBets = groupBetsByType(markets);

    return (
        <>
            <div className="flex flex-col bg-gray-300 p-5 mt-4 rounded-lg">
                <div className='flex items-center justify-center mb-10 relative'>
                    <div className='absolute top-0 right-0 text-sm text-gray-600'>
                        <div className='flex items-center'>
                            <img 
                                className='w-4 h-4 mr-1' 
                                src={game.league.flag} 
                                alt={`${game.league.name} logo`} 
                            />
                            <p>{game.league.name} - Gameweek {gameweek || 'N/A'}</p>
                        </div>
                        <p>Venue: {game.fixture.venue.name || 'N/A'}</p>
                        <p>Referee: {game.fixture.referee || 'N/A'}</p>
                    </div>
                    
                    <div className='text-center'>
                        <img className='w-12 h-12 mx-auto' src={game.teams.home.logo} alt={`${game.teams.home.name} logo`} />
                        <p className='text-lg my-1'>{game.teams.home.name}</p>
                    </div>
                    <div className='flex flex-col items-center mx-20'>
                        {(gameStatus === "FT") && (
                            <div className='text-3xl flex'>
                                {game.score.fulltime.home}
                                -
                                {game.score.fulltime.away}
                            </div> 
                        )}    
                        <span className='text-xl'>
                            {gameStatus === "FT" ? "FT" :  gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT"  ? "Live": onConvertTime(game.fixture.date)}
                        </span>
                        <span className='text-sm text-gray-600'>
                            {convertDateHeader(game.fixture.date)}
                        </span>
                    </div>
                    <div className='text-center'>
                        <img className='w-12 h-12 mx-auto' src={game.teams.away.logo} alt={`${game.teams.away.name} logo`} />
                        <p className='text-lg my-1'>{game.teams.away.name}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {Object.values(MARKET_CATEGORIES).map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded-full ${
                                filterSelection === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                            onClick={() => setFilterSelection(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className='bg-white rounded p-4'>
                    {Object.keys(groupedBets).length > 0 ? (
                        Object.keys(groupedBets)
                            .filter(filterMarkets)
                            .map(betType => (
                                <MarketAccordion 
                                    key={betType}
                                    market={groupedBets[betType]}
                                    selectedOdds = {selectedOdds}
                                    bookmakersList={bookmakersList}
                                    replaceTeamNames = {replaceTeamNames}
                                    setSelectedOdds={setSelectedOdds}
                                    setBetslipVisible={setBetslipVisible}
                                    homeTeam = {homeTeam}
                                    awayTeam = {awayTeam}
                                />
                            ))
                    ) : (
                        <span className="loading loading-dots loading-md"></span>
                    )}
                </div>
            </div>
        </>
    )
}

export default BetBuilder;
