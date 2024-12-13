// Navbar component for the navigation bar
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-2 h-15 bg-black overflow-hidden">
      <div className="flex items-center justify-start max-w-full m-0 px-8 h-12 text-gray-200">
        <div className='flex justify-center items-center h-full cursor-pointer'>
          <a href="/">
            <img className='w-auto h-12' alt='mybetbuilder-logo' src='/logo2.png'></img>
          </a>
        </div>
        <ul className="flex list-none m-0 p-0">
          <li className="ml-10">
            <a href="#" className="text-gray-200 no-underline text-sm tracking-wide hover:underline">HOW-TO</a>
          </li>
          <li className="ml-10">
            <a href="#" className="text-gray-200 no-underline text-sm tracking-wide hover:underline">ABOUT US</a>
          </li>
          <li className="ml-10">
            <a href="#" className="text-gray-200 no-underline text-sm tracking-wide hover:underline">CONTACT</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
