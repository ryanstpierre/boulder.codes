import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900 shadow-lg fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-extrabold text-white">
              <span className="text-blue-400">boulder</span><span className="text-white">.</span><span className="text-green-400">codes</span>
            </span>
            <span className="ml-2 text-gray-400">/</span>
            <span className="ml-2 text-lg font-bold text-white">Builders&apos; Room</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </Link>
            
            <Link
              href="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              About boulder.codes
            </Link>
            
            <Link
              href="/schedule"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Schedule
            </Link>

            <Link
              href="/sponsors"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Sponsors
            </Link>

            {/* Register button */}
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4`}>
          <div className="flex flex-col space-y-4">
            <div className="pb-2 mb-2 border-b border-slate-700/50">
              <span className="text-lg font-bold block">
                <span className="text-blue-400">boulder</span><span className="text-white">.</span><span className="text-green-400">codes</span>
              </span>
            </div>
            <Link
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link
              href="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About boulder.codes
            </Link>
            
            <Link
              href="/schedule"
              className="text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </Link>

            <Link
              href="/sponsors"
              className="text-gray-300 hover:text-blue-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sponsors
            </Link>

            {/* Mobile Register Now button */}
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Register Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;