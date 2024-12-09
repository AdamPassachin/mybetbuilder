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
                {market.map((bookmaker) => (
                    <div key={bookmaker.id}>

                        <ul>
                            <p>{bookmaker.bookmakerName}</p>
                            {bookmaker.values.map((value) => (
                                <li key={value.value}>
                                    {replaceTeamNames(value.value)}: {value.odd}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    )
}

export default MarketAccordion;