import React from 'react';

function LeagueSelector({ leagues, selectedLeague, setSelectedLeague }) {

  return (
    <div className="flex justify-center gap-6 mb-8">
      {Object.entries(leagues).map(([leagueName, leagueId]) => (
        <button
          key={leagueId}
          onClick={() => setSelectedLeague(leagueId)}
          className={`w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all flex items-center justify-center
            ${selectedLeague === leagueId ? 'ring-2 ring-black' : ''}
          `}
        >
          <img
            src={`https://media.api-sports.io/football/leagues/${leagueId}.png`}
            alt={leagueName}
            className="w-8 h-8 object-contain"
          />
        </button>
      ))}
    </div>
  );
}

export default LeagueSelector; 