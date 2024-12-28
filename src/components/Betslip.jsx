import crown from '../assets/icons/crown.svg';
import closeIcon from '../assets/icons/close-button.svg';
import { useState, useEffect } from 'react';

const Betslip = ({ selectedOdds, bookmakersList, replaceTeamNames, handleRemoveBet }) => {

    // State for betslip accordion
    const [isBetSlipOpen, setIsBetSlipOpen] = useState(true);

    // State for stake amount
    const [stakeAmount, setStakeAmount] = useState('');

    // State for selected bookmaker and its odds
    const [selectedBookmaker, setSelectedBookmaker] = useState(null);
    const [selectedTotalOdds, setSelectedTotalOdds] = useState(null);

    const [userCurrency, setUserCurrency] = useState('USD'); // Default currency

    // Detect user's currency from IP
    useEffect(() => {
        fetch('https://ipapi.co/currency/')
            .then(response => response.text())
            .then(currency => {
                // Validate that the currency is a 3-letter code
                const validCurrency = /^[A-Z]{3}$/.test(currency) ? currency : 'USD';
                setUserCurrency(validCurrency);
            })
            .catch(() => {
                setUserCurrency('USD');
            });
    }, []);

    // Helper function for currency formatting
    const formatCurrency = (amount) => {
        try {
            return new Intl.NumberFormat(undefined, {
                style: 'currency',
                currency: userCurrency,
            }).format(amount);
        } catch (error) {
            // Fallback to USD if there's any formatting error
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount);
        }
    };

    // Function to toggle betslip accordion
    const handleBetSlipToggle = () => {
        setIsBetSlipOpen(!isBetSlipOpen);
    };

    // Function to handle bookmaker selection and calculate total odds
    const handleBookmakerSelect = (bookmaker) => {
        setSelectedBookmaker(bookmaker === selectedBookmaker ? null : bookmaker);

        if(bookmaker !== selectedBookmaker){
            const totalOdds = selectedOdds.reduce((total, betType) => {
                const oddValue = betType.find((odd) => odd.bookmakerName === bookmaker);
                return total * (oddValue ? parseFloat(oddValue.odd) : 1);
            }, 1);
            setSelectedTotalOdds(totalOdds);
        } else {
            setSelectedTotalOdds(null);
        }
    };

    return (
        <div className={`fixed ${
            isBetSlipOpen 
                ? 'bottom-10 left-40 right-40' 
                : 'bottom-10 left-1/2 -translate-x-1/2 w-[350px]'
                } rounded-lg bg-[#CFCFCF] border-t border-gray-200 z-50 overflow-hidden p-4`}>
            <div className="collapse collapse-arrow">
                <input 
                    type="checkbox" 
                    className="peer" 
                    id="accordion-betslip" 
                    checked={isBetSlipOpen}
                    onChange={handleBetSlipToggle}
                />
                <div className="collapse-title text-lg font-medium flex items-center justify-between" htmlFor="accordion-betslip">
                    <span className="flex items-center">
                        <span className="inline-flex items-center justify-center bg-[#26FFBE] rounded-full w-6 h-6 mr-2">
                            {selectedOdds.length}
                        </span>
                        Selections
                    </span>
                </div>
                <div className="collapse-content">
                    <div className="bg-[#D9D9D9] rounded-lg p-4">
                        <div className="max-h-[400px] overflow-y-auto">
                            <table className="table-fixed w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-1 text-sm w-8"></th>
                                        <th className="p-1 text-sm w-3/4"></th>
                                        {bookmakersList.map((bookmaker) => (
                                        <th key={bookmaker} className="p-1 text-sm w-1/4">
                                            <button 
                                                className={`h-28 w-full flex items-center justify-center ${
                                                    selectedBookmaker === bookmaker 
                                                        ? 'bg-gray-300' 
                                                        : 'bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                                } rounded-lg shadow-sm transition-colors duration-75 border active:bg-gray-300`}
                                                onClick={() => handleBookmakerSelect(bookmaker)}
                                            >
                                                <span className="block whitespace-nowrap transform text-center mx-auto px-4 rotate-90 font-medium text-gray-700">
                                                    {bookmaker}
                                                </span>
                                            </button>
                                        </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOdds.length > 0 && (
                                        selectedOdds.map((betType, index) => (
                                            <tr key={`bet-${index}-${bookmakersList.join('-')}`}>
                                                <td className="p-1 w-8">
                                                    <img 
                                                        src={closeIcon} 
                                                        onClick={() => handleRemoveBet(index)} 
                                                        alt="Close" 
                                                        className="w-5 h-5 cursor-pointer hover:opacity-70 hover:[filter:invert(15%)_sepia(95%)_saturate(6932%)_hue-rotate(359deg)_brightness(103%)_contrast(113%)] transition-all" 
                                                    />
                                                </td>
                                                <td className="p-1 text-sm w-3/4">
                                                        <div className='text-sm font-bold'>
                                                            {replaceTeamNames(
                                                                betType[0].bet,
                                                                betType[0].homeTeam,
                                                                betType[0].awayTeam
                                                            )}  
                                                        </div>
                                                    <div className="text-sm">
                                                        {betType[0].market}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {betType[0].fixture}
                                                    </div>
                                                </td>
                                                {bookmakersList.map((bookmaker) => {
                                                    const oddValue = betType.find((odd) => odd.bookmakerName === bookmaker);
                                                    const highestOdd = Math.max(...betType.map(odd => parseFloat(odd.odd)));
                                                    const isHighest = oddValue && parseFloat(oddValue.odd) === highestOdd;
                                                    return (
                                                        <td key={bookmaker} className="text-center text-sm w-1/4">
                                                            {oddValue ? (
                                                                <div className="flex justify-center items-center w-full h-full relative transition-transform transform hover:scale-10 hover:shadow-lg">
                                                                    {isHighest && (
                                                                        <img src={crown} alt="Crown" className="absolute top-0 left-0 w-4 h-4 z-10" />
                                                                    )}
                                                                    <div className={`bg-white rounded w-full flex items-center justify-center shadow-sm p-2 ${isHighest ? 'border-4 border-[#26FFBE]' : ''}`}>
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
                                        ))
                                    )}
                                    {selectedOdds.length > 1 && (
                                        <tr>
                                            <td className="p-1 w-8"></td>
                                            <td className="p-1 text-sm w-3/4">
                                                <div className='text-sm font-bold'> 
                                                    {selectedOdds.length === 1 ? 'Single' :
                                                    selectedOdds.length === 2 ? 'Double' :
                                                    selectedOdds.length === 3 ? 'Triple' :
                                                    `${selectedOdds.length}-fold`}
                                                </div>
                                            </td>
                                            {bookmakersList.map((bookmaker) => {
                                                // Calculate total odds for each bookmaker
                                                const totalOdds = selectedOdds.reduce((total, betType) => {
                                                    const oddValue = betType.find(odd => odd.bookmakerName === bookmaker);
                                                    return total * (oddValue ? parseFloat(oddValue.odd) : 1);
                                                }, 1);

                                                // Find the highest total odds across all bookmakers
                                                const allBookmakerTotals = bookmakersList.map(bm => {
                                                    return selectedOdds.reduce((total, betType) => {
                                                        const odd = betType.find(o => o.bookmakerName === bm);
                                                        return total * (odd ? parseFloat(odd.odd) : 1);
                                                    }, 1);
                                                });
                                                const highestTotal = Math.max(...allBookmakerTotals);
                                                const isHighest = totalOdds === highestTotal;

                                                return (
                                                    <td key={bookmaker} className="text-center text-sm w-1/4">
                                                        {totalOdds !== 1 ? (
                                                            <div className="flex justify-center items-center w-full h-full relative transition-transform transform hover:scale-10 hover:shadow-lg">
                                                                {isHighest && (
                                                                    <img src={crown} alt="Crown" className="absolute top-0 left-0 w-4 h-4 z-10" />
                                                                )}
                                                                <div className={`bg-white rounded w-full flex items-center justify-center shadow-sm p-2 ${isHighest ? 'border-4 border-[#26FFBE]' : ''}`}>
                                                                    {totalOdds.toFixed(2)}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="h-full w-full"></div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {/* Stake amount input */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-end items-center mt-4 pr-1">
                                <input 
                                    type="text"
                                    placeholder={
                                        selectedBookmaker 
                                            ? (selectedTotalOdds > 1 ? "Stake" : "No available odds")
                                            : "Select a bookmaker"
                                    } 
                                    value={stakeAmount ? Number(stakeAmount).toLocaleString() : ''}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/,/g, '');
                                        // Only update if empty or valid number
                                        if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
                                            setStakeAmount(value);
                                        }
                                    }}
                                    className="input bg-white border-black border w-full max-w-xs text-right placeholder:text-right pr-8" 
                                />
                            </div>
                        </div>
                    </div>
                    {stakeAmount && selectedTotalOdds && selectedTotalOdds > 1 && (
                        <div className="bg-[#26FFBE] p-6 rounded-lg font-bold mt-4 flex justify-between items-center hover:bg-[#1ee5aa] active:bg-[#1ad199] cursor-pointer transition-all">
                            <div className="flex items-center gap-4">
                                <span>Place bet</span>
                                <span>{formatCurrency(Number(stakeAmount))}</span>
                            </div>
                            <span>Potential returns: {formatCurrency(Number(stakeAmount) * selectedTotalOdds)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Betslip;
