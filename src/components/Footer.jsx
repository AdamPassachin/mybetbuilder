import x from '../assets/icons/x.svg';
import email from '../assets/icons/email.svg';

function Footer() {
    return (
        <footer id='footer' className="footer bg-white text-neutral-600 p-10 border-t">
            <div className="max-w-4xl mx-auto w-full">
                {/* Main content container with flex */}
                <div className="flex justify-between items-start gap-x-64">
                    {/* Left side content */}
                    <div>
                        <a href="/" className="flex items-center cursor-pointer mb-4">
                            <img className="h-8" alt="mybetbuilder-logo" src="/logo.png" />
                        </a>
                        <p className="text-neutral-700">
                            Compare odds across multiple bookmakers.
                        </p>
                        <p className="text-neutral-700">
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
                            <a href="mailto:adam@mybetbuilder.com" target="_blank" rel="noopener noreferrer">
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