import chevronRight from '../assets/icons/chevron-right.svg';

// GameItem component for displaying a single game item
function GameItem({ game, onConvertTime }) {
    // Use the game status directly from the game prop
    const gameStatus = game.fixture.status.short;

    return (
        <div className="flex items-center justify-between w-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-400 active:bg-gray-700 focus:bg-gray-700 p-2">
            <div className={`flex items-center justify-center h-10 w-10 mr-2 ${gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT" ? 'bg-green-500' : ''}`}>
                {gameStatus === "FT" ? "FT" : gameStatus === "PST" ? "PST" : gameStatus === "1H" || gameStatus === "2H" || gameStatus === "HT" ? "Live" : onConvertTime(game.fixture.date)}
            </div>
            {(gameStatus === "FT") && (
                <div className='flex flex-col items-center justify-center mr-2 w-12 h-full bg-gray-300 p-0.5'>
                    <div className='text-center'>{game.score.fulltime.home}</div>
                    <div className='text-center'>{game.score.fulltime.away}</div>
                </div>
            )}
            <div className="flex flex-col flex-grow">
                <div className="flex items-center">
                    <img src={game.teams.home.logo} alt={game.teams.home.name} className="w-5 h-5 mr-2" />
                    <span>{game.teams.home.name}</span>
                </div>
                <div className="flex items-center">
                    <img src={game.teams.away.logo} alt={game.teams.away.name} className="w-5 h-5 mr-2" />
                    <span>{game.teams.away.name}</span>
                </div>
            </div>
            <button className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center">
                <img src={chevronRight} alt="Details" className="w-4 h-4 opacity-60" />
            </button>
        </div>
    );
}

export default GameItem;
