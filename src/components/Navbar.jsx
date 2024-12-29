function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 py-2 h-15 bg-white overflow-hidden border-b border-gray-200">
        <div className="flex items-center justify-between max-w-full px-8 h-12 text-gray-200">
          {/* Left Section: Logo */}
          <div className="flex items-center h-full cursor-pointer">
            <a href="/" className="flex items-center cursor-pointer">
              <img className="h-8" alt="mybetbuilder-logo" src="/logo.png" />
            </a>
          </div>

          {/* Center Section: Links */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex justify-center items-center list-none m-0 p-0">
              <li className="mx-5">
                <a
                  href="#"
                  className="text-black font-medium no-underline text-sm tracking-wide hover:underline"
                >
                  CONTACT
                </a>
              </li>
              <li className="mx-5">
                <a
                  href="#"
                  className="text-black font-medium no-underline text-sm tracking-wide hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Static Banner */}
      <div className="fixed top-[60px] w-full bg-blue-500 text-white py-2 text-center">
        🎉 MyBetBuilder is in Beta! 
      </div>
    </>
  );
}

export default Navbar;


