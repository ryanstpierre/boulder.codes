import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/BSW_Builders_Room%20-%2025.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/90 to-purple-900/90"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Abstract shapes */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div className="bg-blue-600/30 text-blue-200 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4 backdrop-blur-sm">
          May 12-15, 2024
        </div>
        
        <div className="inline-flex items-center space-x-2 mb-2">
          <span className="text-2xl md:text-3xl font-extrabold">
            <span className="text-blue-400">boulder</span><span className="text-white">.</span><span className="text-green-400">codes</span>
          </span>
          <span className="text-white text-opacity-50 text-2xl">presents</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3 text-white tracking-tight drop-shadow-lg">
          Boulder Startup Week
        </h1>
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-blue-300 tracking-tight drop-shadow-lg">
          Builders&apos; Room
        </h2>
        
        <p className="text-xl md:text-2xl font-light mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          The premier hackathon experience at Boulder Startup Week.
          <span className="block mt-2">
            4 days to build, learn, and launch your next big idea.
          </span>
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
          >
            Register Now
          </Link>
          <Link
            href="/schedule"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
          >
            View Schedule
          </Link>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-gray-300">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>4-Day Format</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Expert Mentors</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span>Network With BSW Attendees</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Cash Prizes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;