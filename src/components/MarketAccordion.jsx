import crown from '../assets/icons/crown.svg';

function MarketAccordion({ market, homeTeam, awayTeam }) {
    // Replace team names (helper function)
    const replaceTeamNames = (value) => {
        if (typeof value === 'string') {
            return value
                .replace(/Home/g, homeTeam)
                .replace(/Away/g, awayTeam);
        }
        return value;
    };

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

    // Find the highest odd for each value
    const highestOdds = market.reduce((acc, bookmaker) => {
        bookmaker.values.forEach((entry) => {
            const odd = parseFloat(entry.odd);
            if (!acc[entry.value] || odd > acc[entry.value]) {
                acc[entry.value] = odd; // Update if odd is higher
            }
        });
        return acc;
    }, {});

    return (
        <div className="collapse collapse-arrow bg-white text-black">
            <input type="radio" name="accordion" id="accordion-market" />
            <div className="collapse-title text-xl font-medium" htmlFor="accordion-market">
                {market[0]?.name}
            </div>
            <div className="collapse-content">
                <table className="table-fixed w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-1 text-sm w-1/4 border-b border-gray-200"></th>
                            <th className="p-1 text-sm w-1/4 border-b border-gray-200"></th> {/* Empty column to offset */}
                            {bookmakersList.map((bookmaker) => (
                                <th key={bookmaker} className="p-1 text-sm w-1/4">
                                    <div className="h-28 flex items-center justify-center">
                                        <span className="block whitespace-nowrap transform text-center mx-auto px-4 rotate-90">
                                            {bookmaker}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {market[0]?.values.map((value) => (
                            <tr key={value.value}>
                                <td className="p-1 text-sm border-b border-gray-200">
                                    {replaceTeamNames(value.value)}
                                </td>
                                <td className="p-1 text-sm border-b border-gray-200"></td> {/* Empty cell to offset */}
                                {bookmakersList.map((bookmaker) => {
                                    const oddValue = market.find((b) => b.bookmakerName === bookmaker)?.values.find((v) => v.value === value.value);
                                    const isHighest = oddValue && parseFloat(oddValue.odd) === highestOdds[value.value];
                                    return (
                                        <td key={bookmaker} className="text-center text-sm w-1/4">
                                            {oddValue ? (
                                                <div className="flex justify-center items-center w-full h-full relative">
                                                    {isHighest && (
                                                        <img src={crown} alt="Crown" className="absolute top-0 left-0 w-4 h-4 z-10" />
                                                    )}
                                                    <div className={`bg-[#DFFAFF] rounded w-full h-full flex items-center justify-center shadow-md p-2 transition-transform transform hover:scale-110 hover:shadow-lg ${isHighest ? ' border-4 border-[#26FFBE]' : ''}`}>
                                                        {oddValue.odd}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full w-full"></div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
        </div>
    );
}

export default MarketAccordion;

