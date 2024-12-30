import arrowFeedback from '../assets/icons/arrow-link.svg';

function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-2 h-15 bg-white overflow-hidden border-b border-gray-200">
        <div className="flex items-center justify-between max-w-full px-8 h-12 text-gray-200">
          {/* Left Section: Logo */}
          <div className="flex items-center h-full cursor-pointer">
            <svg viewBox="0 0 200 50" className="h-10">
              <path
                id="curve"
                fill="transparent"
                d="M10,45 Q100,20 190,45"
              />
              <text className="font-bebas">
                <textPath href="#curve" startOffset="50%" textAnchor="middle" className="text-4xl font-bold">
                  MyBetBuilder
                </textPath>
              </text>
            </svg>
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
        </div>
      </nav>
      {/* Static Banner */}
      <div className="fixed top-[60px] w-full bg-black z-50 text-white py-2 text-center overflow-hidden">
        🎉 MyBetBuilder is in Beta! 
      </div>
    </>
  );
}

export default Navbar;


