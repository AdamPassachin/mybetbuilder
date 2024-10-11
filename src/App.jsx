import './App.css'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import GamesList from './components/GamesList'
import GamesListHeader from './components/GamesListHeader'
import HeroSection from './components/HeroSection'
import BetBuilder from './components/BetBuilder'


function App() {

  // State to control the visibility of the hero section
  const [showHeroSection, setShowHeroSection] = useState(true);

  // State to store the selected game
  const [selectedGame, setSelectedGame] = useState(null);

  // State to store current gameweek
  const [currentGameweek, setCurrentGameweek] = useState(null);

  const [currentGames, setCurrentGames] = useState([]);

  // Fetch current gameweek and corresponding games from API route in backend based on next 10 games
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/games`) 
      .then(response =>{
        if(!response.ok){
          throw new Error('Failed to fetch current gameweek and games');
        }
        return response.json();
      })
      .then(data => {
        if(data.response && data.response.length > 0){
          setCurrentGameweek(parseInt(data.response[0].league.round.split('-')[1].trim()));
          setCurrentGames(data.response);
        }
      })
      .catch(error => {
        console.error('Error fetching current gameweek:', error);
      });
  }, []);

  // Handle the click event on a game item and set the selected game
  function handleShowHeroSection(game) {
    setShowHeroSection(false);
    setSelectedGame(game);

  }

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='container-left'>
            <GamesListHeader currentGameweek={currentGameweek} />
            <div className='games-list-container'>
              <GamesList currentGames={currentGames} onGameItemClick={handleShowHeroSection} />
            </div>
        </div>
        <div className='container-right'>
          {showHeroSection ? (<HeroSection />) : (<BetBuilder game={selectedGame} />)}
        </div>
      </div>
    </>
  )
}

export default App
