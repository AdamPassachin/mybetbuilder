import React from 'react';

function MarketAccordion({ market, homeTeam, awayTeam }) {

    const replaceTeamNames = (value) => {
        if (typeof value === 'string') {
            return value
                .replace(/Home/g, homeTeam)
                .replace(/Away/g, awayTeam);
        }
        return value;
    };

    return (
        <div className="collapse collapse-arrow bg-white text-black">
            <input type="radio" name="accordion" id="accordion-market" />
            <div className="collapse-title text-xl font-medium" htmlFor="accordion-market">
                {market[0]?.name}
            </div>
            <div className="collapse-content">
                <div className="grid grid-cols-1 gap-1">
                    {/* Headers */}
                    <div className="flex items-center border-b border-gray-200">
                        <div className="p-2 text-sm font-medium w-32"></div>
                        {market.map((bookmaker) => (
                            <div key={bookmaker.id} className="p-2 text-sm font-medium w-1/4 text-center">
                                <div className="h-20 flex items-center justify-center">
                                    <span className="block transform -rotate-90 whitespace-nowrap">
                                        {bookmaker.bookmakerName}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Rows */}
                    {market[0]?.values.map((value) => (
                        <div key={value.value} className="flex items-center border-b border-gray-200">
                            <div className="p-2 text-sm truncate w-1/4">
                                {replaceTeamNames(value.value)}
                            </div>
                            {market.map((bookmaker) => {
                                const oddValue = bookmaker.values.find((v) => v.value === value.value);
                                return (
                                    <div key={bookmaker.id} className="text-center p-2 text-sm w-1/4">
                                        <div className="flex justify-center items-center border rounded w-full">
                                            {oddValue ? oddValue.odd : "-"}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <hr />
        </div>
    );
}

export default MarketAccordion;
