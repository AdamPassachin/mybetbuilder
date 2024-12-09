import check from '../assets/icons/check.svg'
import checkgreen from '../assets/icons/check-green.svg'

function HowToTutorial(){

    return(
        <>
            <div className="flex">
                <div className="flex-1 p-4 h-full flex flex-col items-center justify-center">
                    {/* Column 1 content goes here */}
                </div>
                <div className="flex-1 p-4 h-full flex flex-col items-center justify-center">
                    <div className="flex items-center mb-2 text-white">
                        <img className='w-5 h-5 mr-2' src={check} alt="Check icon" />
                        Choose from any premier league fixture
                    </div>
                    <div className="flex items-center mb-2 text-white">
                        <img className='w-5 h-5 mr-2' src={check} alt="Check icon" />
                        Create your bet builder for yellow cards
                    </div>
                    <div className="flex items-center mb-2 text-white">
                        <img className='w-5 h-5 mr-2' src={check} alt="Check icon" />
                        Compare odds between Bet365, Betway,<br/> Unibet and more...
                    </div>
                    <div className="flex items-center mb-2" style={{ color: '#77BB41' }}>
                        <img className='w-5 h-5 mr-2' src={checkgreen} alt="Check icon" />
                        Directly bet on the best pre-game odds
                    </div>
                </div>
            </div>
        </>
    )
}

export default HowToTutorial;

