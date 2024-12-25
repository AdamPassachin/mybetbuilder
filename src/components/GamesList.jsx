import React from 'react';
import GameItem from './GameItem';
import { useState, useEffect } from 'react';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek, onConvertTime}) {

    // Days of the week
    const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Months of the year
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [currentGames, setCurrentGames] = useState([]);

    // Fetch current fixture for current gameweek
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

    //Function to convert and format the date for the header
    function ConvertDateHeader(fullDate){
        const date = new Date(fullDate);
        const day = date.getDay();
        const dateDay = date.getDate();
        const month = date.getMonth();

        // Determine the ordinal suffix
        const suffix = (dateDay) => {
            if (dateDay > 3 && dateDay < 21) return 'th'; // Catch 11th-13th
            switch (dateDay % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };
        return `${daysOfWeek[day]}, ${dateDay}${suffix(dateDay)} ${months[month]}`;
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold m-1'>English Premier League 24/25</p>
                <p className='text-lg font-semibold m-1'>Gameweek {currentGameweek}</p>
            </div>
            <div className='flex justify-start'>
                <img src='/PL-logo.png' alt='league-logo' className='h-11 w-11' />
            </div>
            <div className='bg-white rounded-md p-4 mt-4 flex flex-col h-auto'>
                {currentGames.map((game, index) => {
                    const currentGameDate = ConvertDateHeader(game.fixture.date);
                    const showHeader = index === 0 || currentGameDate !== ConvertDateHeader(currentGames[index - 1].fixture.date);
                    
                    return (
                        <React.Fragment key={game.fixture.id}>
                            <div className='flex flex-col w-full'>
                              {showHeader && (
                                 <div className="flex flex-col p-1 mb-2 rounded-lg">
                                    <p className="text-base">{currentGameDate}</p>
                                    <div className="h-0.5 w-full opacity-50 bg-gray-300 mb-1"></div>
                                </div>
                              )}
                              <div className='flex items-center justify-between w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 active:bg-gray-700 transform active:scale-95' onClick={() => onGameItemClick(game)}>
                                <GameItem game={game} onConvertTime={onConvertTime}/>
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
