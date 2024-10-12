import React from 'react';
import GameItem from './GameItem';
import GameDayHeader from './GameDayHeader';
import './GameItem.css';
import { useState, useEffect } from 'react';


// GamesList component for the games list. We make api call here and pass the data to the Game component. Create row for each game.
function GamesList({ onGameItemClick, currentGames}) {

    // Days of the week
    const daysOfWeek = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Months of the year
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    //Function to convert and format the date for the header
    function ConvertDateHeader(fullDate){
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

    return (
        <>
            {currentGames.map((game, index) => {
                const currentGameDate = ConvertDateHeader(game.fixture.date);
                const showHeader = index === 0 || currentGameDate !== ConvertDateHeader(currentGames[index - 1].fixture.date);
                
                return (
                    <React.Fragment key={game.fixture.id}>
                        <div className='row' onClick={() => onGameItemClick(game)}>
                          {showHeader && (
                            <GameDayHeader gameDate={currentGameDate} />
                        )}
                            <GameItem game={game} />
                        </div>
                    </React.Fragment>
                );
            })} 
        </>
    );
};

export default GamesList;
