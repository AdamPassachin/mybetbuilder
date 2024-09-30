import React from 'react';
import GameItem from './GameItem';
import './GameItem.css';
import liverpoolLogo from '../assets/team-logo/liverpool-logo.svg';
import manchesterUnitedLogo from '../assets/team-logo/manchester-united-logo.svg';
import fulhamLogo from '../assets/team-logo/fulham-logo.png';
import chelseaLogo from '../assets/team-logo/chelsea-logo.png';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick }) {

    //Example api call. Make api call here.
    const games = [
    { 
        id: 1, 
        homeTeam: { name: 'Liverpool', logo: liverpoolLogo },
        awayTeam: { name: 'Manchester United', logo: manchesterUnitedLogo },
        date: '2023-04-15',
        time: '15:00',
    },
    { 
        id: 2, 
        homeTeam: { name: 'Fulham', logo: fulhamLogo },
        awayTeam: { name: 'Chelsea', logo: chelseaLogo },
        date: '2023-04-16',
        time: '17:30',
      },
    ];

    // Render the games list - create a row for each game and pass the game data to the GameItem component.
  return (
    <>
        {games.map(game => (
        <div className='row' key={game.id} onClick={() => onGameItemClick(game)}>
            <GameItem game={game} />
        </div>
        ))}
    </>
  );
}

export default GamesList;