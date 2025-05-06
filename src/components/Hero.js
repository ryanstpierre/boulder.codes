import Link from 'next/link';
import Image from 'next/image';
import BSWLogo from './BSWLogo';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/BSW_Builders_Room%20-%2025.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--bsw-blue-dark),0.95)] via-[rgba(var(--bsw-blue),0.85)] to-[rgba(var(--bsw-blue-light),0.8)]"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Abstract shapes */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-[rgba(var(--bsw-blue),0.3)] rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-[rgba(var(--bsw-blue-light),0.2)] rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-[rgba(var(--fun-purple),0.15)] rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/4 top-1/4 w-40 h-40 bg-[rgba(var(--fun-green),0.1)] rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Boulder Startup Week Builders' Room Combined Logo */}
        <div className="flex flex-col items-center justify-center mb-14">
          <div className="fun-card py-8 px-10 sm:px-12 rounded-2xl mb-2 shadow-[0_0_30px_rgba(10,138,205,0.4)] border-[#478DCB] hover:border-[#5CBBF6] transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute -right-2 -top-3 text-yellow-400 text-xl sparkle sparkle-1">✨</div>
                <div className="text-center glow-text mb-3">
                  <span className="fun-text text-[#5CBBF6] text-4xl md:text-5xl transform -rotate-1 inline-block">
                    The Builders&apos; Room
                  </span>
                </div>
                
                <div className="flex items-center justify-center mb-1">
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  <div className="mx-3 text-white/90 font-semibold">@</div>
                  <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                </div>
                
                <div className="relative mb-1">
                  <Image 
                    src="/images/BSW-Header-Logo-White-LG.png" 
                    alt="Boulder Startup Week Logo" 
                    width={360} 
                    height={70} 
                    className="h-14 sm:h-16 w-auto mx-auto" 
                    priority
                  />
                  <div className="absolute -bottom-3 -left-1 text-pink-400 text-xl sparkle sparkle-3">✨</div>
                </div>
                
                <div className="text-gray-300 text-sm font-medium mt-3">
                  <span className="bg-[rgba(var(--bsw-blue),0.3)] px-3 py-1 rounded-full border border-[rgba(var(--bsw-blue),0.4)]">
                    May 12-15, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="font-medium mb-14 text-white max-w-3xl mx-auto leading-relaxed relative">
          <div className="mb-6 relative flex flex-wrap justify-center items-center">
            <div className="flex flex-wrap justify-center items-center">
              <span className="fun-text text-[#A8D8FF] text-4xl md:text-5xl transform rotate-1 inline-block drop-shadow-xl mb-2 sm:mb-0" style={{textShadow: "0 0 15px rgba(168, 216, 255, 0.6)"}}>Get Inspired</span><span className="text-white mx-1 mb-2 sm:mb-0">,</span> 
              <span className="fun-text text-[#DA9DF9] text-4xl md:text-5xl transform -rotate-1 inline-block ml-1 drop-shadow-xl mb-2 sm:mb-0" style={{textShadow: "0 0 15px rgba(218, 157, 249, 0.6)"}}>Build</span><span className="text-white mx-1 mb-2 sm:mb-0">,</span> 
              <span className="fun-text text-[#67E8B9] text-4xl md:text-5xl transform rotate-1 inline-block ml-1 drop-shadow-xl mb-2 sm:mb-0" style={{textShadow: "0 0 15px rgba(103, 232, 185, 0.6)"}}>Launch</span><span className="text-white mx-1 mb-2 sm:mb-0">,</span> 
            </div>
            <div className="flex justify-center items-center relative">
              <span className="fun-text text-[#FFCD5E] text-4xl md:text-5xl inline-block drop-shadow-xl" style={{textShadow: "0 0 15px rgba(255, 205, 94, 0.6)"}}>Repeat</span>
              <div className="absolute -right-14 sm:-right-12 text-[#FFCD5E] text-2xl repeat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 12V6h6M2 22v-6h6M21.5 12v6h-6"></path>
                  <path d="M22 6a14 14 0 0 0-14-4"></path>
                  <path d="M2 18a14 14 0 0 0 14 4"></path>
                </svg>
              </div>
            </div>
            <div className="absolute -top-3 -right-2 text-pink-400 text-xl sparkle sparkle-3">✨</div>
          </div>
          
          <div className="text-lg md:text-xl font-light mt-3 mx-auto max-w-2xl">
            A hackathon designed to pair perfectly with BSW — attend inspiring talks, make valuable connections, 
            <span className="text-[#5CBBF6] font-medium"> then immediately apply what you learn</span>!
            <div className="absolute -bottom-4 right-1/4 text-blue-400 text-xl sparkle sparkle-2">✨</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 mx-auto max-w-2xl md:max-w-3xl">
          <Link
            href="/register"
            className="primary-button w-full sm:w-auto"
          >
            Register Now! ✨
          </Link>
          <Link
            href="/schedule"
            className="secondary-button w-full sm:w-auto"
          >
            Hackathon Schedule 🚀
          </Link>
          <a
            href="https://boulderstartupweek.com/schedule"
            target="_blank"
            rel="noopener noreferrer"
            className="tertiary-button flex items-center justify-center w-full sm:w-auto"
          >
            <Image 
              src="/images/bsw.svg" 
              alt="Boulder Startup Week Logo" 
              width={28} 
              height={32} 
              className="h-6 w-auto mr-2"
            />
            BSW Events
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 text-sm text-white">
          <div className="flex items-center fun-card px-4 py-2 border-[#478DCB] shadow-[0_0_10px_rgba(10,138,205,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5CBBF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>4-Day Format</span>
          </div>
          
          <div className="flex items-center fun-card px-4 py-2 border-[#478DCB] shadow-[0_0_10px_rgba(10,138,205,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5CBBF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Expert Mentors</span>
          </div>
          
          <div className="flex items-center fun-card px-4 py-2 border-[#478DCB] shadow-[0_0_10px_rgba(10,138,205,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5CBBF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>Network With BSW Attendees</span>
          </div>
          
          <div className="flex items-center fun-card px-4 py-2 border-[#478DCB] shadow-[0_0_10px_rgba(10,138,205,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#5CBBF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Cash Prizes</span>
          </div>
        </div>
        
        {/* BSW Official Badge */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
          <div className="fun-card rounded-full px-4 py-2 flex items-center transform hover:rotate-0 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(10,138,205,0.3)] border-[#478DCB]">
            <Image 
              src="/images/bsw.svg" 
              alt="Boulder Startup Week Logo" 
              width={24} 
              height={28} 
              className="h-5 w-auto mr-2"
            />
            <span className="text-xs text-white font-semibold">A boulder.codes × BSW Event</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;