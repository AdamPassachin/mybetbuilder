import React from 'react';
import GameItem from './GameItem';
import GameDayHeader from './GameDayHeader';
import './GameItem.css';
import { useState, useEffect } from 'react';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek}) {

    // State for the current games in the current gameweek
    const [currentGames, setCurrentGames] = useState([]);

    // Days of the week
    const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Months of the year
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Fetch the current games in the current gameweek from the backend
    useEffect(() => {
          fetch(`${import.meta.env.VITE_API_BASE_URL}/games?gameweek=${currentGameweek}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setCurrentGames(data.response);
          })
          .catch(error => {
            console.error('Error fetching games:', error);
          });
      }, [currentGameweek]);

    // Move this function outside of the return statement
    function ConvertDateHeader(fullDate){
        const date = new Date(fullDate);
        const day = date.getDay();
        const dateDay = date.getDate();
        const month = date.getMonth();
        return `${daysOfWeek[day]}, ${dateDay} ${months[month]}`;
    }

    return (
        <>
            {currentGames.map((game, index) => {
                const currentGameDate = ConvertDateHeader(game.fixture.date);
                const showHeader = index === 0 || currentGameDate !== ConvertDateHeader(currentGames[index - 1].fixture.date);
                
                return (
                    <React.Fragment key={game.fixture.id}>
                        <div className='row' onClick={() => onGameItemClick(game)}>
                          {showHeader && (
                            <GameDayHeader gameDate={currentGameDate} />
                        )}
                            <GameItem game={game} />
                        </div>
                    </React.Fragment>
                );
            })} 
        </>
    );
};

export default GamesList;