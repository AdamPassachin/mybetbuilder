import './GamesListHeader.css';
import leaugeLogo from '../assets/leauge-logo/leauge-logo.svg';

// GamesListHeader component for the games list header
function GamesListHeader({ currentGameweek }) {

  return (
    <>
      <div className='games-list-header'>
        <p className='league-name'>English Premier Leauge 24/25</p>
        <p className='gameweek'>Gameweek {currentGameweek}</p>
    </div>
    <div className='image-container'>
      <img src={leaugeLogo} alt='league-logo' className='league-logo' />
      </div>
    </>
  )
}

export default GamesListHeader