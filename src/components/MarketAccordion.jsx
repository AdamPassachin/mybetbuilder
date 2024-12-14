function MarketAccordion({ market, homeTeam, awayTeam }) {
    console.log(market);

    const replaceTeamNames = (value) => {
        if (typeof value === 'string') {
            return value
                .replace(/Home/g, homeTeam)
                .replace(/Away/g, awayTeam);
        }
        return value;
    };

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
                                    return (
                                        <td key={bookmaker} className="text-center text-sm w-1/4">
                                            {oddValue ? (
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <div className="bg-[#DFFAFF] border rounded w-full h-full flex items-center justify-center shadow-md p-2 transition-transform transform hover:scale-110 hover:shadow-lg">
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
