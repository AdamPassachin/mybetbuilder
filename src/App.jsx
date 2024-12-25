import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import GamesList from './components/GamesList'
import BetBuilder from './components/BetBuilder'
import chevronLeft from './assets/icons/chevron-left.svg'
import Betslip from './components/Betslip'


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

  // Replace team names (helper function)
  const replaceTeamNames = (value, homeTeam, awayTeam) => {
    if (typeof value === 'string') {
        return value  
            .replace(/Home/g, homeTeam)
            .replace(/Away/g, awayTeam);
    }
    return value;
};

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
      <Navbar/>
      <div className='w-screen flex justify-center'>
        <div className='w-[90vw] flex flex-col p-4 my-40 border-none bg-gray-200 rounded-md min-h-[600px] shadow-md'>
          {showBetBuilder && (
            <button className='flex justify-center items-center border-none bg-transparent w-9 h-9 hover:bg-gray-300' onClick={() => setShowBetBuilder(false)}>
              <img className='w-5 h-5' src={chevronLeft} alt='Return' />
            </button>
          )}
          {!showBetBuilder && (
            <>
              {currentGameweek ? (
                <>
                  <GamesList 
                    currentGameweek={currentGameweek} 
                    onGameItemClick={handleShowBetBuilderSection} 
                    onConvertTime={convertTime}  
                  />    
                </>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
            </>
          )}
          {showBetBuilder && 
            <BetBuilder 
              game={selectedGame} 
              onConvertTime={convertTime}
              selectedOdds={selectedOdds}
              setSelectedOdds={setSelectedOdds}
              betslipVisible={betslipVisible}
              setBetslipVisible={setBetslipVisible}
              bookmakersList={bookmakersList}
              replaceTeamNames={(value) => replaceTeamNames(value, selectedGame.teams.home.name, selectedGame.teams.away.name)}
            />
          }
          {betslipVisible && (
            <Betslip 
              selectedOdds={selectedOdds}
              bookmakersList={bookmakersList}
              replaceTeamNames={(value) => replaceTeamNames(value, selectedGame.teams.home.name, selectedGame.teams.away.name)}
              handleRemoveBet={handleRemoveBet}
            />
          )}
        </div>
      </div>
    </>
  )
} 

export default App
