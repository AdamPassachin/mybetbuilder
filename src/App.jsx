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

  // Store state status of game to render based on game's status NS, FT or Live
  const [gameStatus, setGameStatus] = useState(null);

  // Convert the date to a more readable format in hours and minutes
  function convertTime(fullDate) {
      const date = new Date(fullDate);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
  }

  // Fetch current gameweek from backend
  useEffect(() => {
    const fetchGameweek = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gameweek`);
        if (!response.ok) {
          throw new Error('Failed to fetch current gameweek');
        }
        const data = await response.json();
        if (data.response && data.response.length > 0) {
          setCurrentGameweek(parseInt(data.response[0].split('-')[1].trim()));
        }
      } catch (error) {
        console.error('Error fetching current gameweek:', error);
      }
    };

    fetchGameweek();
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
            <GamesList currentGameweek={currentGameweek} onGameItemClick={handleShowHeroSection} onConvertTime={convertTime} gameStatus = {gameStatus} setGameStatus = {setGameStatus}  />
            </div>
        </div>
        <div className='container-right'>
          {showHeroSection ? (<HeroSection />) : (<BetBuilder game={selectedGame} onConvertTime={convertTime} gameStatus = {gameStatus} setGameStatus = {setGameStatus}  />)}
        </div>
      </div>
    </>
  )
}

export default App
