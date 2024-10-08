import React from 'react';
import GameItem from './GameItem';
import GameDayHeader from './GameDayHeader';
import './GameItem.css';
import { useState, useEffect } from 'react';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek}) {

    // State for the current games in the current gameweek
    const [currentGames, setCurrentGames] = useState([]);

    // State for last unique gamedate
    const [lastGameDate, setLastGameDate] = useState(null);

    // Days of the week
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

      function ConvertDateHeader(fullDate){
        const date = new Date(fullDate);
        const day = date.getDay();
        const dateDay = date.getDate();
        const month = date.getMonth();
        return `${daysOfWeek[day]}, ${dateDay} ${months[month]}`;
    }
    

    // Render the games list - create a row for each game and pass the game data to the GameItem component.
  return (
    <>
        {currentGames.map(game => (
          <>
            {game.fixture.date !== lastGameDate ? (
              <GameDayHeader gameweek={ConvertDateHeader(game.fixture.date)} />
            ) : null}
            <div className='row' key={game.fixture.id} onClick={() => onGameItemClick(game)}>
              <GameItem game={game} />
            </div>
          </> 
        ))} 
    </>
  );
}

export default GamesList;