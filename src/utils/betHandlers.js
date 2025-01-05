export const handleOddClick = ({ value, selectedOdds, market, homeTeam, awayTeam, setSelectedOdds, setBetslipVisible }) => {
    // Check if any existing bet is from the same market
    const sameMarketExists = selectedOdds.some(betGroup => 
        betGroup[0].market === market[0]?.name
    );
    
    const oddsForValue = market.flatMap(bookmaker => 
        bookmaker.values.filter(v => v.value === value).map(v => ({ 
            bookmakerName: bookmaker.bookmakerName, 
            odd: v.odd, 
            bet: value,
            market: market[0]?.name,
            fixture: `${homeTeam} vs ${awayTeam}`,
            homeTeam,
            awayTeam,
            error: sameMarketExists
        })));

    if (sameMarketExists) {
        const updatedOdds = selectedOdds.map(betGroup => {
            if (betGroup[0].market === market[0]?.name) {
                return betGroup.map(bet => ({ ...bet, error: true }));
            }
            return betGroup;
        });
        setSelectedOdds(updatedOdds);
    } else {
        setSelectedOdds(prevOdds => {
            const newOdds = [...prevOdds, oddsForValue];
            return newOdds;
        });
        setBetslipVisible(true);
    }
};
