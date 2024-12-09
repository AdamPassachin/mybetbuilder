import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import HowToTutorial from './components/HowToTutorial'
import GamesList from './components/GamesList'
import GamesListHeader from './components/GamesListHeader'
import BetBuilder from './components/BetBuilder'
import chevronLeft from './assets/icons/chevron-left.svg'


function App() {

  // Create a referene to the how-to section
  const howToRef = useRef(null);

  const scrollHowTo = () => {
    if(howToRef.current) {
      howToRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  // State to control the visibility of the betbuilder 
  const [showBetBuilder, setShowBetBuilder] = useState(false);

  // State to store the selected game
  const [selectedGame, setSelectedGame] = useState(null);

  // State to store current gameweek
  const [currentGameweek, setCurrentGameweek] = useState(null);

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
  function handleShowBetBuilderSection(game) {
    setShowBetBuilder(true);
    setSelectedGame(game);

  }

  
  return (
    <>
      <Navbar onScrollHowTo={scrollHowTo} />
      <div className='w-screen flex justify-center'>
        <div className='w-[80vw] flex flex-col p-4 my-40 border-none bg-gray-200 rounded-md min-h-[600px] shadow-md'>
          {showBetBuilder && (
            <button className='flex justify-center items-center border-none bg-transparent w-9 h-9 hover:bg-gray-300' onClick={() => setShowBetBuilder(false)}>
              <img className='w-5 h-5' src={chevronLeft} alt='Return' />
            </button>
          )}
          {showBetBuilder ? null : ( // Conditionally render the contents
            <>
              <GamesListHeader currentGameweek={currentGameweek} />
              <div className='bg-white rounded-md p-4 mt-4 flex flex-col h-auto'>
                <GamesList 
                  currentGameweek={currentGameweek} 
                  onGameItemClick={handleShowBetBuilderSection} 
                  onConvertTime={convertTime}  
                />
              </div>
            </>
          )}
          {showBetBuilder ? <BetBuilder game={selectedGame} onConvertTime={convertTime} /> : null}
        </div>
      </div>
      <div className='flex flex-col bg-[#06052c] text-gray-400 w-full h-auto' ref={howToRef}>
        <HowToTutorial/>
      </div>
    </>
  )
}

export default App
