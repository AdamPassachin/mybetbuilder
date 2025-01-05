import x from '../assets/icons/x.svg';
import email from '../assets/icons/email.svg';

// Footer component for the footer
function Footer() {

    return (
        <footer id='footer' className="footer bg-black text-neutral-300 p-10 border-t">
            <div className="max-w-4xl mx-auto w-full">
                {/* Main content container with flex */}
                <div className="flex justify-between items-start gap-x-64">
                    {/* Left side content */}
                    <div>
                        <svg viewBox="0 0 200 50" className="h-10">
                            <path
                                id="curve"
                                fill="transparent"
                                d="M10,45 Q100,20 190,45"
                            />
                            <text className="font-bebas" fill="white">
                            <textPath href="#curve" startOffset="50%" textAnchor="middle" className="text-4xl font-bold">
                            MyBetBuilder
                                </textPath>
                            </text>
                        </svg>
                        <p className="text-neutral-300 mt-4 ml-4">
                            Compare odds across multiple bookmakers.
                        </p>
                        <p className="text-neutral-300 ml-4">
                            Copyright © 2024 MyBetBuilder - All rights reserved.
                        </p>
                    </div>
                    
                    {/* Right side content */}
                    <div>
                        <h6 className="footer-title">Contact</h6>
                        <div className="flex justify-start items-center space-x-4">
                            <a href="https://x.com/adampassachin" target="_blank" rel="noopener noreferrer">
                                <img className="h-6" src={x} alt="X Icon" />
                            </a>
                            <a href="mailto:mybetbuilder@hotmail.com" target="_blank" rel="noopener noreferrer">
                                <img className="h-6" src={email} alt="Email Icon" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;