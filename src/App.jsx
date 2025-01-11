import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import GamesList from './components/GamesList'
import BetBuilder from './components/BetBuilder'
import Betslip from './components/Betslip'
import PopupModal from './components/PopupModal'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import chevronLeft from './assets/icons/chevron-left.svg'
import { setCachedData, getCachedData } from './utils/cache'


function App() {

     // Bookmaker list
     const bookmakersList = [
      "NordicBet",
      "10Bet",
      "William Hill",
      "Bet365",
      "Unibet",
      "Betfair",
      "Betsson",
      "1xBet",
      "Betano",
      "Betway"
  ];

  // State to control the visibility of the betbuilder 
  const [showBetBuilder, setShowBetBuilder] = useState(false);

  // State to store the selected game
  const [selectedGame, setSelectedGame] = useState(null);

  // State to store current gameweek
  const [currentGameweek, setCurrentGameweek] = useState(null);

  // State to store selected odds
  const [selectedOdds, setSelectedOdds] = useState([]); 

  // State to store betslip visibility
  const [betslipVisible, setBetslipVisible] = useState(false);

  // Add state for popup
  const [showPopup, setShowPopup] = useState(true);

  // Add new state for visible items
  const [visibleItems, setVisibleItems] = useState(0);

  // State to store odds format
  const [oddsFormat, setOddsFormat] = useState('decimal');


  // Add list of features
  const features = [
    "Choose any Premier League fixture",
    "Create your BetBuilder by combining top markets from selected events into one bet",
    "Compare odds between Bet365, Unibet, William Hill and many more...",
    "Place your bets directly to secure the best pre-game odds"
  ];

  // Add useEffect for animation
  useEffect(() => {
    if (showPopup && visibleItems < features.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, 400); // Delay between each item
      return () => clearTimeout(timer);
    }
  }, [showPopup, visibleItems]);


  // Fetch current gameweek from backend
  useEffect(() => {
    const fetchGameweek = async () => {
      const cachedGameweek = getCachedData('gameweek');
      if (cachedGameweek) {
        console.log('🎯 Browser Cache HIT: Gameweek data retrieved from cache');
        setCurrentGameweek(parseInt(cachedGameweek))
        return;
      }
      
      console.log('❌ Browser Cache MISS: Fetching gameweek data from API');
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/gameweek`);
        if (!response.ok) {
          throw new Error('Failed to fetch current gameweek');
        }
        const data = await response.json();
        if (data.response && data.response.length > 0) {
          const gameweek = data.response[0].split('-')[1].trim();
         
          setCurrentGameweek(parseInt(gameweek));
          setCachedData('gameweek', gameweek);
        }
      } catch (error) {
        console.error('❌ Error fetching current gameweek:', error);
      }
    };

    fetchGameweek();
  }, []);


  return (
    <>
      {/* Popup */}
      {showPopup && (
        <PopupModal
          features={features}
          visibleItems={visibleItems}
          onClose={() => setShowPopup(false)}
        />
      )}
      {/* Navbar */}
      <Navbar
        oddsFormat={oddsFormat}
        setOddsFormat={setOddsFormat}
      />
      {/* Main content for GamesList */}
      <div className='w-screen flex justify-center'>
        <div className='w-[80vw] flex flex-col'>
          <div className='p-4 my-40 border-none bg-gray-200 rounded-md min-h-[600px] shadow-md'>
            {showBetBuilder && (
              <button className='flex justify-center items-center border-none bg-transparent w-9 h-9 hover:bg-gray-300' onClick={() => setShowBetBuilder(false)}>
                <img className='w-5 h-5' src={chevronLeft} alt='Return' />
              </button>
            )}
            {!showBetBuilder && (
              <>
                {currentGameweek ? (
                  <>
                    {/* GamesList */}
                    <GamesList 
                      currentGameweek={currentGameweek} 
                      onGameItemClick={(game) => {
                        setShowBetBuilder(true);
                        setSelectedGame(game);
                      }} 
                    />    
                  </>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                )}
              </>
            )}
            {/* BetBuilder */}
            {showBetBuilder && 
              <BetBuilder 
                game={selectedGame}
                gameweek={currentGameweek}
                selectedOdds={selectedOdds}
                setSelectedOdds={setSelectedOdds}
                betslipVisible={betslipVisible}
                setBetslipVisible={setBetslipVisible}
                bookmakersList={bookmakersList}
                oddsFormat={oddsFormat}
              />
            }
            {betslipVisible && (
              <Betslip 
                selectedOdds={selectedOdds}
                setSelectedOdds={setSelectedOdds}
                setBetslipVisible={setBetslipVisible}
                selectedGame={selectedGame}
                bookmakersList={bookmakersList}
                oddsFormat={oddsFormat}
              />
            )}
          </div>
          {/* FAQ */}
          <FAQ />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
} 

export default App
