import React from 'react';
import GameItem from './GameItem';
import './GameItem.css';
import { useState, useEffect } from 'react';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGameweek}) {

    const [currentGames, setCurrentGames] = useState([]);

    useEffect(() => {
        // Update the URL to match your backend API structure
        fetch(`http://localhost:3000/games?gameweek=${currentGameweek}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setCurrentGames(data.response);
            console.log(data.response);
          })
          .catch(error => {
            console.error('Error fetching games:', error);
          });
      }, [currentGameweek]);
    

    // Render the games list - create a row for each game and pass the game data to the GameItem component.
  return (
    <>
        {currentGames.map(game => (
        <div className='row' key={game.fixture.id} onClick={() => onGameItemClick(game)}>
            <GameItem game={game} />
        </div>
        ))}
    </>
  );
}

export default GamesList;