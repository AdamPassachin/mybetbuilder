
function GameDayHeader({ gameDate }) {
    return (
        <div className="flex flex-col p-1 mb-2 rounded-lg">
            <p className="text-base">{gameDate}</p>
            <div className="h-0.5 w-full opacity-50 bg-gray-300 mb-1"></div>
        </div>
    );
}

export default GameDayHeader;