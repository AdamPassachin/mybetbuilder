import React from 'react';
import GameItem from './GameItem';
import { useState, useEffect } from 'react';
import { handleGameClick } from '../utils/betHandlers';
import { convertDateHeader } from '../utils/formatter';
import { getCachedData, setCachedData } from '../utils/cache';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek }) {

    // State to store current games
    const [currentGames, setCurrentGames] = useState([]);


    // Fetch current fixtures for current gameweek
    useEffect(() => {
      const fetchGames = async () => {
        try {
          // Check cache first
          const cachedGames = getCachedData(`games-${currentGameweek}`);
          const cachedStatus = getCachedData(`status-${currentGameweek}`);

          // If games cache is valid, use it initially to show something to the user
          if (cachedGames) {
            const initialGames = cachedStatus 
              ? cachedGames.map(game => ({
                  ...game,
                  fixture: { ...game.fixture, status: cachedStatus[game.fixture.id] }
                }))
              : cachedGames;
            setCurrentGames(initialGames);

            // If status is also valid, we can skip the API call
            if (cachedStatus) {
              return;
            }
            // Otherwise, continue to API call to at least update status
          }

          // Make API call for fresh data
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games?gameweek=${currentGameweek}`);
          if (!response.ok) {
            throw new Error('Failed to fetch games');
          }
          const data = await response.json();
          
          if (data.response && data.response.length > 0) {
            const sortedGames = data.response.sort((a, b) => 
              new Date(a.fixture.date) - new Date(b.fixture.date)
            );

            // Always cache the status as it's the most frequently changing part
            const statusData = Object.fromEntries(
              sortedGames.map(game => [game.fixture.id, game.fixture.status])
            );
            setCachedData(`status-${currentGameweek}`, statusData);

            // Only cache games if we don't have a valid games cache
            if (!cachedGames) {
              setCachedData(`games-${currentGameweek}`, sortedGames);
            }
            
            // If we had cached games, only update the status
            const finalGames = cachedGames 
              ? cachedGames.map(game => ({
                  ...game,
                  fixture: { ...game.fixture, status: statusData[game.fixture.id] }
                }))
              : sortedGames;
            
            setCurrentGames(finalGames);
          }
        } catch (error) {
          console.error('Error fetching current games:', error);
        }
      };
      fetchGames();
    }, [currentGameweek]);

    return (
        <>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    {currentGames.length > 0 && (
                        <>
                            <p className='text-lg font-semibold m-1'>
                                {currentGames[0].league.name} {`${currentGames[0].league.season.toString().slice(-2)}/${(currentGames[0].league.season + 1).toString().slice(-2)}`}
                            </p>
                            <img src={currentGames[0].league.flag} alt='league-logo' className='h-6 w-6' />
                        </>
                    )}
                </div>
                <p className='text-lg font-semibold m-1'>Gameweek {currentGameweek}</p>
            </div>
            <div className='flex justify-start'>
                {currentGames.length > 0 && (
                    <img src={currentGames[0].league.logo} alt='league-logo' className='h-11 w-11' />
                )}
            </div>
            <div className='bg-white rounded-md p-4 mt-4 flex flex-col h-auto'>
                {currentGames.map((game, index) => {
                    const currentGameDate = convertDateHeader(game.fixture.date);
                    const showHeader = index === 0 || currentGameDate !== convertDateHeader(currentGames[index - 1].fixture.date);
                    
                    return (
                        <React.Fragment key={game.fixture.id}>
                            <div className='flex flex-col w-full'>
                              {showHeader && (
                                 <div className="flex flex-col p-1 mb-2 rounded-lg">
                                    <p className="text-base">{currentGameDate}</p>
                                    <div className="h-0.5 w-full opacity-50 bg-gray-300 mb-1"></div>
                                </div>
                              )}
                              <div className='flex items-center justify-between w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 active:bg-gray-700 transform active:scale-95' 
                                   onClick={() => handleGameClick(game, onGameItemClick)}>
                                    <GameItem game={game} 
                                      onClick={() => handleGameClick(game, onGameItemClick)} 
                                    />
                              </div>
                            </div>
                        </React.Fragment>
                    );
                })} 
            </div>
        </>
    );
};

export default GamesList;
