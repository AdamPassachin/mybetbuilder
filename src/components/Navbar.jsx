function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-2 h-15 bg-black overflow-hidden">
      <div className="flex items-center justify-between max-w-full px-8 h-12 text-gray-200">
        {/* Left Section: Logo */}
        <div className="flex items-center h-full cursor-pointer">
          <a href="/" className="flex items-center">
            <img className="w-12 h-12" alt="mybetbuilder-logo" src="/icon.png" />
            <span className="ml-2 text-lg text-gray-200 font-extrabold">MyBetBuilder</span>
          </a>
        </div>

        {/* Center Section: Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex justify-center items-center list-none m-0 p-0">
            <li className="mx-5">
              <a
                href="#"
                className="text-gray-200 no-underline text-sm tracking-wide hover:underline"
              >
                CONTACT
              </a>
            </li>
            <li className="mx-5">
              <a
                href="#"
                className="text-gray-200 no-underline text-sm tracking-wide hover:underline"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


