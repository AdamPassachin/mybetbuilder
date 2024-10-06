import './GamesListHeader.css';
import leaugeLogo from '../assets/leauge-logo/leauge-logo.svg';

// GamesListHeader component for the games list header
function GamesListHeader({ currentGameweek }) {

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