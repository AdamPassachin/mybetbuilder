import './App.css'
import { useState } from 'react'
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
            <GamesListHeader />
            <GamesList onGameItemClick={handleShowHeroSection} />
        </div>
        <div className='container-right'>
          {showHeroSection ? (<HeroSection />) : (<BetBuilder game={selectedGame} />)}
        </div>
      </div>
    </>
  )
}

export default App
