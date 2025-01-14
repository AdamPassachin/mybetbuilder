import React from 'react';

function LeagueSelector({ leagues, selectedLeague, setSelectedLeague }) {
  return (
    <div className="flex justify-center gap-6 mb-8">
      {Object.entries(leagues).map(([leagueName, leagueId]) => (
        <button
          key={leagueId}
          onClick={() => setSelectedLeague(leagueId)}
          className={`w-14 h-14 rounded-full bg-white shadow-md hover:shadow-lg transition-all
            ${selectedLeague === leagueId ? 'ring-2 ring-black' : ''}
          `}
        >
          <img
            src={`https://media.api-sports.io/football/leagues/${leagueId}.png`}
            alt={leagueName}
            className="w-9 h-9 mx-auto"
          />
        </button>
      ))}
    </div>
  );
}

export default LeagueSelector; 