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
                <table className="table-fixed w-full border-collapse ">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="p-1 text-sm w-1/4"></th>
                            {market.map((bookmaker) => (
                                <th key={bookmaker.id} className="p-1 text-sm w-1/4">
                                    <div className="h-28 flex items-center justify-center">
                                        <span className="block whitespace-nowrap transform  text-center mx-auto px-4">
                                            {bookmaker.bookmakerName}
                                        </span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {market[0]?.values.map((value) => (
                            <tr key={value.value} className="border-b border-gray-200">
                                <td className="p-1 text-sm truncate">
                                    {replaceTeamNames(value.value)}
                                </td>
                                {market.map((bookmaker) => {
                                    const oddValue = bookmaker.values.find((v) => v.value === value.value);
                                    return (
                                        <td key={bookmaker.id} className="text-center p-4 text-sm w-1/4">
                                            {oddValue ? (
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <div className="bg-[#DFFAFF] border rounded w-full h-full shadow-md p-2 transition-transform transform hover:scale-104 hover:shadow-lg">
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

