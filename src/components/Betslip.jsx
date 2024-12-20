import crown from '../assets/icons/crown.svg';
import closeIcon from '../assets/icons/close-button.svg';
import { useState } from 'react';

const Betslip = ({ selectedOdds, bookmakersList, replaceTeamNames, handleRemoveBet }) => {

    // State for betslip accordion
    const [isBetSlipOpen, setIsBetSlipOpen] = useState(true);

    const handleBetSlipToggle = () => {
        setIsBetSlipOpen(!isBetSlipOpen);
    };


    return (
        <div className="fixed bottom-10 left-40 right-40 rounded-lg bg-[#CFCFCF] border-t border-gray-200 z-50 overflow-hidden p-4">
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
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="table-fixed w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th className="p-1 text-sm w-8"></th>
                                        <th className="p-1 text-sm w-3/4"></th>
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
                                    {selectedOdds.length > 0 && (
                                        selectedOdds.map((betType, index) => (
                                            <tr key={`bet-${index}-${bookmakersList.join('-')}`}>
                                                <td className="p-1 w-8">
                                                    <img src={closeIcon} onClick={() => handleRemoveBet(index)} alt="Close" className="w-4 h-4" />
                                                </td>
                                                <td className="p-1 text-sm w-3/4">
                                                    <div className='text-sm font-bold'>
                                                        {replaceTeamNames(betType[0].bet)}  
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
                    </div>
                </div>
                {/* <div className="flex justify-center items-center">
                    <button className="btn btn-primary">Place bet</button>
                </div> */}      
            </div>
        </div>
    );
};

export default Betslip;
