import crown from '../assets/icons/crown.svg';

function MarketAccordion({ market, homeTeam, awayTeam, selectedOdds, setSelectedOdds, setBetslipVisible, bookmakersList, replaceTeamNames }) {

    // Function to add bet to bet (selectedOdd)
    const handleOddClick = (value) => {
        const oddsForValue = market.flatMap(bookmaker => 
            bookmaker.values.filter(v => v.value === value).map(v => ({ 
                bookmakerName: bookmaker.bookmakerName, 
                odd: v.odd, 
                bet: value,
                market: market[0]?.name,
                fixture: `${homeTeam} vs ${awayTeam}`
            })));
        
        // Check if this bet already exists in any of the nested arrays
        const betExists = selectedOdds.flat().some(odd => odd.bet === value);

        // Only add the bet if it doesn't already exist
        if (!betExists) {
            setSelectedOdds(prevOdds => {
                const newOdds = [...prevOdds, oddsForValue];
                return newOdds;
            });
            setBetslipVisible(true);
        }
    };


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
                            <th className="p-1 text-sm w-3/4 border-b border-gray-200"></th>
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
                                <td className="p-1 text-sm w-3/4 border-b border-gray-200">
                                    {replaceTeamNames(value.value)}
                                </td>
                                {bookmakersList.map((bookmaker) => {
                                    const oddValue = market.find((b) => b.bookmakerName === bookmaker)?.values.find((v) => v.value === value.value);
                                    const isHighest = oddValue && parseFloat(oddValue.odd) === highestOdds[value.value];
                                    return (
                                        <td key={bookmaker} className="text-center text-sm w-1/4">
                                            {oddValue ? (
                                                <div className="flex justify-center items-center w-full h-full relative transition-transform transform hover:scale-10 hover:shadow-lg" onClick={() => handleOddClick(value.value)}>
                                                    {isHighest && (
                                                        <img src={crown} alt="Crown" className="absolute top-0 left-0 w-4 h-4 z-10" />
                                                    )}
                                                    <div className={`bg-white rounded w-full h-full flex items-center justify-center shadow-sm p-2 ${isHighest ? 'border-4 border-[#26FFBE]' : ''}`}>
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

