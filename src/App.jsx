import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import GamesList from './components/GamesList'
import BetBuilder from './components/BetBuilder'
import chevronLeft from './assets/icons/chevron-left.svg'
import Betslip from './components/Betslip'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import check from './assets/icons/check.svg'


function App() {

     // Bookmaker list
     const bookmakersList = [
      "NordicBet",
      "10Bet",
      "William Hill",
      "Bet365",
      "Marathonbet",
      "Unibet",
      "Betfair",
      "Betsson",
      "Fonbet",
      "Pinnacle",
      "SBO",
      "1xBet",
      "Betano",
      "Betway",
      "Tipico",
      "Dafabet"
  ];

  // Days of the week
  const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Months of the year
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
      }, 800); // Delay between each item
      return () => clearTimeout(timer);
    }
  }, [showPopup, visibleItems]);

  // Replace team names (helper function)
  const replaceTeamNames = (value, homeTeam, awayTeam) => {
    if (typeof value === 'string') {
        return value  
            .replace(/Home/g, homeTeam)
            .replace(/Away/g, awayTeam);
    }
    return value;
};

//Function to convert and format the date 
function convertDateHeader(fullDate){
  const date = new Date(fullDate);
  const day = date.getDay();
  const dateDay = date.getDate();
  const month = date.getMonth();

  // Determine the ordinal suffix
  const suffix = (dateDay) => {
      if (dateDay > 3 && dateDay < 21) return 'th'; // Catch 11th-13th
      switch (dateDay % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
      }
  };
  return `${daysOfWeek[day]}, ${dateDay}${suffix(dateDay)} ${months[month]}`;
}

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

  // Function to remove bet from betslip
  const handleRemoveBet = (index) => {
    setSelectedOdds(prevOdds => {
        const newOdds = [...prevOdds];
        newOdds.splice(index, 1);
        
        // Hide betslip if all bets are removed
        if (newOdds.length === 0) {
            setBetslipVisible(false);
        }
        
        return newOdds;
    });
};

  return (
    <>
      {/* Popup/Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-[90%] min-h-[400px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                Welcome to MyBetBuilder!
                <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-lg font-mono transform -rotate-3">beta</span>
              </h2>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-3 transition-all duration-500 ${
                      index < visibleItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <img 
                      src={check} 
                      alt="check" 
                      className="w-6 h-6"
                    />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 text-lg w-fit ml-auto"
            >
              Start your betbuilder now!
            </button>
          </div>
        </div>
      )}
      {/* Navbar */}
      <Navbar/>
      <div className='w-screen flex justify-center'>
        <div className='w-[90vw] flex flex-col'>
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
                      onGameItemClick={handleShowBetBuilderSection} 
                      onConvertTime={convertTime}
                      convertDateHeader={convertDateHeader}
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
                onConvertTime={convertTime}
                selectedOdds={selectedOdds}
                setSelectedOdds={setSelectedOdds}
                betslipVisible={betslipVisible}
                setBetslipVisible={setBetslipVisible}
                bookmakersList={bookmakersList}
                replaceTeamNames={(value) => replaceTeamNames(value, selectedGame.teams.home.name, selectedGame.teams.away.name)}
                convertDateHeader={convertDateHeader}
              />
            }
            {betslipVisible && (
              <Betslip 
                selectedOdds={selectedOdds}
                selectedGame={selectedGame}
                bookmakersList={bookmakersList}
                replaceTeamNames={replaceTeamNames}
                handleRemoveBet={handleRemoveBet}
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
