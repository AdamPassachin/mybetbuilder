import { useEffect, useState } from 'react';
import MarketAccordion from './MarketAccordion';

// Betbuilder that showcases bookmakers and their odds for specific fixture
function BetBuilder({ game, onConvertTime }) {

    // store gamestatus
    const gameStatus = game.fixture.status.short;
    // store fixture id
    const fixture_id = game.fixture.id;
    // state to store available markets
    const [markets, setMarkets] = useState([]);
    

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

    // Function to group bets by their name
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
                <div className='flex items-center justify-center mb-10'>
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
                    </div>
                    <div className='text-center'>
                        <img className='w-12 h-12 mx-auto' src={game.teams.away.logo} alt={`${game.teams.away.name} logo`} />
                        <p className='text-lg my-1'>{game.teams.away.name}</p>
                    </div>
                </div>
                <div className='bg-white rounded p-4'>
                    {Object.keys(groupedBets).length > 0 ? (
                        Object.keys(groupedBets).map(betType => (
                            <MarketAccordion 
                                key={betType} 
                                market={groupedBets[betType]} 
                                homeTeam={game.teams.home.name} 
                                awayTeam={game.teams.away.name} 
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
