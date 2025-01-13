// Adds a bet to the betslip
export const handleOddClick = ({ value, selectedOdds, market, homeTeam, awayTeam, setSelectedOdds, setBetslipVisible }) => {
    // Check if any existing bet is from the same market AND same fixture
    const sameMarketExists = selectedOdds.some(betGroup => 
        betGroup[0].market === market[0]?.name && 
        betGroup[0].fixture === `${homeTeam} vs ${awayTeam}`
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
            // Only mark as error if it's the same market AND same fixture
            if (betGroup[0].market === market[0]?.name && 
                betGroup[0].fixture === `${homeTeam} vs ${awayTeam}`) {
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

// Scrolls to the top of the page and calls the onGameItemClick function when bet is pressed
export const handleGameClick = (game, onGameItemClick) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    onGameItemClick(game);
};

// Handles bookmaker selection and calculates total odds
export const handleBookmakerSelect = ({ bookmaker, selectedBookmaker, selectedOdds, setSelectedBookmaker, setSelectedTotalOdds }) => {
    const newSelectedBookmaker = bookmaker === selectedBookmaker ? null : bookmaker;
    setSelectedBookmaker(newSelectedBookmaker);

    if (newSelectedBookmaker) {
        const totalOdds = selectedOdds.reduce((total, betType) => {
            const oddValue = betType.find((odd) => odd.bookmakerName === bookmaker);
            return total * (oddValue ? parseFloat(oddValue.odd) : 1);
        }, 1);
        setSelectedTotalOdds(totalOdds);
    } else {
        setSelectedTotalOdds(null);
    }
};

// Groups bets by their type/name
export const groupBetsByType = (markets) => {
    const groupedBets = {};

    markets.forEach(market => {
        market.bookmakers.forEach(bookmaker => {
            bookmaker.bets.forEach(bet => {
                if (!groupedBets[bet.name]) {
                    groupedBets[bet.name] = [];
                }
                groupedBets[bet.name].push({ 
                    bookmakerId: bookmaker.id, 
                    bookmakerName: bookmaker.name, 
                    ...bet 
                });
            });
        });
    });
    return groupedBets;
};

// Removes a bet from the betslip
export const handleRemoveBet = ({ index, setSelectedOdds, setBetslipVisible }) => {
    setSelectedOdds(prevOdds => {
        const newOdds = [...prevOdds];
        newOdds.splice(index, 1);
        
        // Hide betslip if all bets are removed
        if (newOdds.length === 0) {
            setBetslipVisible(false);
        }
        
        return newOdds;
    });
};

// Replaces Home/Away placeholders with actual team names
export const replaceTeamNames = (value, homeTeam, awayTeam) => {
    if (typeof value === 'string') {
        return value  
            .replace(/Home/g, homeTeam)
            .replace(/Away/g, awayTeam);
    }
    return value;
};


