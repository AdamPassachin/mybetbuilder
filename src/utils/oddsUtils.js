// Function to find highest odds from specified bookmakers
export const findHighestOdds = (market, bookmakersList) => {
    return market.reduce((acc, bookmaker) => {
        // Only process if bookmaker is in the allowed list
        if (bookmakersList.includes(bookmaker.bookmakerName)) {
            bookmaker.values.forEach((entry) => {
                const odd = parseFloat(entry.odd);
                if (!acc[entry.value] || odd > acc[entry.value]) {
                    acc[entry.value] = odd;
                }
            });
        }
        return acc;
    }, {});
}; 