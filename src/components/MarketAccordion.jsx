function MarketAccordion({market, homeTeam, awayTeam}){

    const replaceTeamNames = (value) => {
        if (typeof value === 'string') {
            return value
                .replace(/Home/g, homeTeam)
                .replace(/Away/g, awayTeam)
        }
        return value;
    };
    
    return(
        <div className="collapse collapse-arrow bg-white text-black">
            <input type="radio" name="accordion" id="accordion-market" />
            <div className="collapse-title text-xl font-medium" htmlFor="accordion-market">
                {market[0]?.name}
            </div>
            <div className="collapse-content">
                <table className="table">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th></th>
                            {market.map((bookmaker) => (
                                <th key={bookmaker.id} className="text-center">{bookmaker.bookmakerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {market[0]?.values.map((value) => (
                            <tr key={value.value} className="border-b border-gray-200">
                                <td>{replaceTeamNames(value.value)}</td>
                                {market.map((bookmaker) => {
                                    const oddValue = bookmaker.values.find(v => v.value === value.value);
                                    return (
                                        <td key={bookmaker.id} className="text-center">
                                            <div className="flex justify-center">
                                                <div className="w-12 rounded-lg border border-black p-1">
                                                    {oddValue ? oddValue.odd : 'N/A'}
                                                </div>
                                            </div>
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
    )
}

export default MarketAccordion;