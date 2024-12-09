

// GamesListHeader component for the games list header
function GamesListHeader({ currentGameweek }) {

  return (
    <>
      <div className='flex justify-between items-center'>
        <p className='text-lg font-semibold m-1'>English Premier League 24/25</p>
        <p className='text-lg font-semibold m-1'>Gameweek {currentGameweek}</p>
      </div>
      <div className='flex justify-start'>
        <img src='/PL-logo.png' alt='league-logo' className='h-11 w-11' />
      </div>
    </>
  )
}

export default GamesListHeader
