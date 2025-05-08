import Link from 'next/link';
import BSWLogo from './BSWLogo';

const Footer = () => {
  // Use a function to get current year to prevent hydration errors
  const currentYear = () => new Date().getFullYear();

  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800 relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute left-1/4 top-12 w-64 h-64 bg-[rgba(var(--bsw-blue),0.05)] rounded-full filter blur-3xl"></div>
      <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-[rgba(var(--fun-purple),0.03)] rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* BSW Partnership Banner */}
        <div className="mb-8 p-6 fun-card bg-gradient-to-br from-[rgba(var(--bsw-blue-dark),0.3)] to-[rgba(var(--bsw-blue),0.2)] border-[rgba(var(--bsw-blue),0.4)] rounded-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
              <div className="flex items-center mb-3">
                <span className="text-xl font-extrabold mr-3 rotate-hover">
                  <span className="text-blue-400">boulder</span><span className="text-white">.</span><span className="text-green-400">codes</span>
                </span>
                <span className="text-white/50 mx-1 relative">
                  presents
                  <span className="absolute -top-2 -right-2 text-yellow-300 text-xs sparkle sparkle-1">✨</span>
                </span>
              </div>
              <div className="flex items-center">
                <BSWLogo className="w-auto h-8 mr-2" withGlow />
                <h3 className="text-[rgba(var(--bsw-blue),1)] font-bold text-lg glow-text">Builders&apos; Room</h3>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="fun-card rounded-full px-4 py-2 inline-flex items-center mb-3">
                <BSWLogo variant="mark" className="h-5 w-auto mr-2" withGlow />
                <span className="text-sm text-white">Official BSW 2025 Event</span>
              </div>
              <div className="text-gray-300 max-w-md">
                The official hackathon of Boulder Startup Week 2025, bringing together developers, designers, and entrepreneurs.
              </div>
              <a 
                href="https://boulderstartupweek.com/schedule/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="tertiary-button inline-flex items-center mt-3 py-1.5 px-4"
              >
                View All BSW Events
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="mr-2 rotate-hover inline-block">
                <span className="text-blue-400">boulder</span><span className="text-white">.</span><span className="text-green-400">codes</span>
              </span>
              <span className="text-white/50 mx-2">×</span>
              <BSWLogo variant="mark" className="w-auto h-5" withGlow />
            </h3>
            <div className="text-gray-400">
              A collaboration between boulder.codes and Boulder Startup Week bringing you the official hackathon of BSW 2025.
            </div>
            <div className="text-gray-400 mt-2">
              Join us for 5 days of building, learning, and networking at Boulder's premier startup event.
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4 glow-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-[rgba(var(--bsw-blue),1)] transition-colors glow-text">Home</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-[rgba(var(--bsw-blue),1)] transition-colors glow-text">Register</Link></li>
              <li><Link href="/schedule" className="text-gray-400 hover:text-[rgba(var(--bsw-blue),1)] transition-colors glow-text">Schedule</Link></li>
              {/* Sponsors page hidden for now 
              <li><Link href="/sponsors" className="text-gray-400 hover:text-[rgba(var(--bsw-blue),1)] transition-colors glow-text">Sponsors</Link></li>
              */}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-4 glow-text">Contact Us</h3>
            <div className="text-gray-400 mb-4">
              Have questions about the hackathon or BSW partnership?
            </div>
            
            <a 
              href="mailto:hello@boulder.codes" 
              className="text-[rgba(var(--bsw-blue),1)] hover:text-blue-300 inline-flex items-center mb-4 glow-text"
            >
              hello@boulder.codes
            </a>
            
            <div className="fun-card p-3 w-full">
              <h4 className="text-white text-sm font-semibold mb-2 glow-text">Event Details</h4>
              <div className="text-gray-300">
                May 12-16, 2025<br />
                Downtown Boulder<br />
                Part of <a href="https://boulderstartupweek.com" target="_blank" rel="noopener noreferrer" className="text-[rgba(var(--bsw-blue),1)] hover:text-blue-300 inline-flex items-center glow-text">Boulder Startup Week </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <div className="flex items-center justify-center">
            <span>© {currentYear()}</span>
            <span className="mx-2 rotate-hover inline-block">
              <span className="text-blue-400">boulder</span><span className="text-gray-500">.</span><span className="text-green-400">codes</span>
            </span>
            <span className="text-gray-500 mx-2">×</span>
            <a href="https://boulderstartupweek.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <BSWLogo variant="mark" className="h-4 w-auto" withGlow />
            </a>
          </div>
          <div className="text-gray-500 mt-2">
            Builders&apos; Room: The Official Hackathon of Boulder Startup Week 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;