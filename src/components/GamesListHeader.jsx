import './GamesListHeader.css';
import leaugeLogo from '../assets/leauge-logo/leauge-logo.svg';
import { useState, useEffect } from 'react';

// GamesListHeader component for the games list header
function GamesListHeader() {

  // State to store current gameweek
  const [currentGameweek, setCurrentGameweek] = useState(null);

  // Fetch current gameweek from backend
  useEffect(() => {
    fetch('http://localhost:3000/gameweek') 
      .then(response =>{
        if(!response.ok){
          throw new Error('Failed to fetch current gameweek');
        }
        return response.json();
      })
      .then(data => {
        if(data.response && data.response.length > 0){
          setCurrentGameweek(parseInt(data.response[0].split('-')[1].trim()));
        }
      })
      .catch(error => {
        console.error('Error fetching current gameweek:', error);
      });
  }, []);


  return (
    <>
    <div className='games-list-header'>
      Gameweek {currentGameweek}
    </div>
    <div className='divider'>
        <p className='league-name'>English Premier Leauge 24/25</p>
        <img src={leaugeLogo} alt='league-logo' className='league-logo' />
    </div>

    </>
  )
}

export default GamesListHeader