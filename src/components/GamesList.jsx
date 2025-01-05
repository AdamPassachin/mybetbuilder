import React from 'react';
import GameItem from './GameItem';
import { useState, useEffect } from 'react';
import { handleGameClick } from '../utils/betHandlers';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek, onConvertTime, convertDateHeader}) {

    // State to store current games
    const [currentGames, setCurrentGames] = useState([]);

    // Fetch current fixtures for current gameweek
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/games?gameweek=${currentGameweek}`);
          if (!response.ok) {
            throw new Error('Failed to fetch games');
          }
          const data = await response.json();
          if (data.response && data.response.length > 0) {
            setCurrentGames(data.response);
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
                                      onConvertTime={onConvertTime}
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
