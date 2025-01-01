import arrowFeedback from '../assets/icons/arrow-link.svg';


function Navbar({ oddsFormat, handleOddsFormatChange }) {


  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[70] py-2 h-15 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between max-w-full px-8 h-12 text-gray-200">
          {/* Left Section: Logo */}
          <div className="flex items-center h-full cursor-pointer">
            <a href="/" className="no-underline">
              <svg viewBox="0 0 200 50" className="h-10">
                <path
                  id="curve"
                  fill="transparent"
                  d="M10,40 Q100,25 190,40"
                />
                <text className="font-bebas">
                  <textPath href="#curve" startOffset="50%" textAnchor="middle" className="text-4xl font-bold">
                    MyBetBuilder
                  </textPath>
                </text>
              </svg>
            </a>
          </div>
          {/* Center Section: Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex justify-center items-center list-none m-0 p-0">
              <li className="mx-5">
                <a
                  href="#footer"
                  className="text-black font-medium no-underline text-sm tracking-wide hover:underline"
                >
                  CONTACT
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#faq"
                  className="text-black font-medium no-underline text-sm tracking-wide hover:underline"
                >
                  FAQ
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="https://insigh.to/b/mybetbuilder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black font-medium no-underline text-sm tracking-wide hover:underline flex items-center gap-1"
                >
                  GIVE FEEDBACK
                  <img src={arrowFeedback} alt="feedback" className="h-3 inline-block" />
                </a>
              </li>
            </ul>
          </div>
          {/* Right Section: Odds Format Selector */}
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="flex items-center gap-1 px-2 py-1 text-sm text-black hover:bg-gray-50 rounded cursor-pointer"
              >
                <span>{oddsFormat === 'decimal' ? 'Decimal' : 'Fractional'} Odds</span>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[100] w-52 p-2 shadow mt-2">
                <li>
                  <a 
                    className={oddsFormat === 'decimal' ? 'active' : ''} 
                    onClick={() => handleOddsFormatChange('decimal')}
                  >
                    Decimal Odds
                  </a>
                </li>
                <li>
                  <a 
                    className={oddsFormat === 'fractional' ? 'active' : ''} 
                    onClick={() => handleOddsFormatChange('fractional')}
                  >
                    Fractional Odds
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* Static Banner */}
      <div className="fixed top-[60px] w-full bg-black z-[60] text-white py-2 text-center overflow-hidden">
        🎉 MyBetBuilder is in Beta! 
      </div>
    </>
  );
}

export default Navbar;


