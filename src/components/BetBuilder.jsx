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
              console.log(markets);
            }
          } catch (error) {
            console.error('Error fetching markets:', error);
          }
        };
        fetchMarkets();
      }, [fixture_id]);

    return (
        <>
            <div className="flex flex-col bg-gray-300 p-5 mt-4 rounded-lg">
                <div className='flex items-center justify-between mb-10'>
                    <div className='text-center mx-5'>
                        <img className='w-10 h-10 mx-auto' src={game.teams.home.logo} alt={`${game.teams.home.name} logo`} />
                        <p className='text-lg my-1'>{game.teams.home.name}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        {(gameStatus === "FT") && (
                            <div className='text-2xl flex'>
                                {game.score.fulltime.home}
                                -
                                {game.score.fulltime.away}
                            </div> 
                        )}    
                        {gameStatus === "FT" ? "FT" :  gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT"  ? "Live": onConvertTime(game.fixture.date)}
                    </div>
                    <div className='text-center mx-5'>
                        <img className='w-10 h-10 mx-auto' src={game.teams.away.logo} alt={`${game.teams.away.name} logo`} />
                        <p className='text-lg my-1'>{game.teams.away.name}</p>
                    </div>
                </div>
                <div className='bg-white rounded p-4'>
                    {markets.length > 0 ? (
                        markets.map((market, index) => (
                            <MarketAccordion key={index} market={market} />
                        ))
                    ) : (
                        <p>Loading markets...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default BetBuilder;
