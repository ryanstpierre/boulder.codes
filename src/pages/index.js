import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>boulder.codes | Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="The premier hackathon experience at Boulder Startup Week, hosted by boulder.codes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 max-w-5xl mx-auto mb-12">
              <div className="flex-1">
                <div className="inline-block bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 font-semibold text-sm mb-4">
                  May 12-15, 2024
                </div>
                <h2 className="text-4xl font-bold mb-6">Startup Weekend Format with Boulder Startup Week Integration</h2>
                <p className="text-lg text-gray-300 mb-6">
                  The Builders&apos; Room is more than just a hackathon — it's a four-day startup experience where you'll 
                  go from idea to launch while being fully immersed in Boulder's vibrant startup ecosystem.
                </p>
                <p className="text-lg text-gray-300 mb-6">
                  We've designed a unique format that gives you <span className="text-blue-300 font-semibold">more building time</span> while still allowing 
                  you to attend Boulder Startup Week sessions that interest you.
                </p>
                <div className="mt-6">
                  <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all inline-block">
                    Register Now
                  </Link>
                </div>
              </div>
              <div className="flex-1 mt-8 md:mt-0">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-300">What Makes Us Unique</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">4-day format</span> - More time to build great products</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">BSW Integration</span> - Attend talks while still building</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">Expert Mentors</span> - Get guidance from successful founders</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">Network Access</span> - Connect with Boulder's tech community</span>
                    </li>
                    <li className="flex">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">Mentor Access</span> - Connect with industry experts and startup founders</span>
                    </li>
                    <li className="flex mb-3">
                      <span className="text-green-400 mr-2">✓</span>
                      <span><span className="font-semibold">Team Formation</span> - Find the perfect teammates or bring your own</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-stretch max-w-4xl mx-auto mt-16">
              <div className="flex-1 bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-800/30 rounded-xl p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-blue-300">Build & Learn</h3>
                <p className="text-gray-300 mb-4">Our unique format runs Monday-Thursday during Boulder Startup Week, letting you build your project while attending valuable BSW sessions.</p>
                <div className="mt-auto pt-4">
                  <Link href="/schedule" className="text-blue-400 hover:text-blue-300 font-medium flex items-center">
                    See the Schedule
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-800/30 rounded-xl p-6 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-purple-300">Connect & Collaborate</h3>
                <p className="text-gray-300 mb-4">Form cross-functional teams, get mentorship from industry experts, and connect with Boulder's vibrant startup community.</p>
                <div className="mt-auto pt-4">
                  <a href="https://boulderstartupweek.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-medium flex items-center">
                    Boulder Startup Week
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Past Success Stories</h2>
            <p className="text-center text-gray-400 mb-8">(Made up by AI)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Success Story 1 */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/images/BSW_Builders_Room%20-%2031.jpeg" 
                    alt="MountainView AI Team" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded inline-block mb-2">WINNER 2023</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">MountainView AI</h3>
                  <p className="mb-4">AI-powered trail condition monitoring platform that helps hikers plan safer trips</p>
                  <div className="bg-slate-800/60 p-3 rounded-lg mt-4">
                    <p className="text-sm"><span className="font-semibold text-blue-300">Founded startup</span> after the hackathon and raised $1.2M in seed funding</p>
                  </div>
                </div>
              </div>
              
              {/* Success Story 2 */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/images/BSW_Builders_Room%20-%207.jpeg" 
                    alt="EcoTrack Team" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="bg-blue-500 text-black text-xs font-semibold px-2 py-1 rounded inline-block mb-2">RUNNER-UP 2023</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">EcoTrack</h3>
                  <p className="mb-4">Sustainability tracking platform for local businesses to measure and improve their environmental impact</p>
                  <div className="bg-slate-800/60 p-3 rounded-lg mt-4">
                    <p className="text-sm"><span className="font-semibold text-blue-300">Acquired</span> by a larger sustainability platform in late 2023</p>
                  </div>
                </div>
              </div>
              
              {/* Success Story 3 */}
              <div className="bg-slate-700 rounded-lg overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="/images/BSW_Builders_Room%20-%2017.jpeg" 
                    alt="BoulderBites Team" 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <div className="bg-green-500 text-black text-xs font-semibold px-2 py-1 rounded inline-block mb-2">COMMUNITY CHOICE 2022</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">BoulderBites</h3>
                  <p className="mb-4">Local restaurant discovery app that helps users find hidden gems and special menu items</p>
                  <div className="bg-slate-800/60 p-3 rounded-lg mt-4">
                    <p className="text-sm">Now has <span className="font-semibold text-blue-300">15,000+ active users</span> in the Boulder area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {/* Placeholder for sponsor logos */}
              <div className="bg-white p-4 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold">Vercel (hopefully)</span>
              </div>
              <div className="bg-white p-4 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold">Keating and Lyden, LLC (hopefully)</span>
              </div>
              <div className="bg-white p-4 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold">Ozo (hopefully)</span>
              </div>
              <div className="bg-white p-4 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold">Upslope (hopefully)</span>
              </div>
              <div className="bg-white p-4 rounded w-40 h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold">Techstars (hopefully)</span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/sponsors" className="text-blue-400 hover:underline">
                View all sponsors and sponsorship opportunities →
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">4-Day Schedule Overview</h2>
            <div className="max-w-3xl mx-auto bg-slate-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">Day 1: Monday, May 20</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">1:00 PM</span>
                      <span>Check-in & Welcome</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">4:30 PM</span>
                      <span>Team Formation & Pitches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">6:30 PM</span>
                      <span>Building Begins</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">Day 2: Tuesday, May 21</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">9:00 AM</span>
                      <span>Morning Check-ins</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">2:00 PM</span>
                      <span>Mentor Sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">4:00 PM</span>
                      <span>Pitch Workshop</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">Day 3: Wednesday, May 22</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">9:00 AM</span>
                      <span>Progress Updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">2:00 PM</span>
                      <span>Final Mentor Sessions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">7:00 PM</span>
                      <span>Evening Build Sprint</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">Day 4: Thursday, May 23</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">11:00 AM</span>
                      <span>Code Freeze</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">2:00 PM</span>
                      <span>Public Demo Showcase</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold w-16 text-gray-400">4:30 PM</span>
                      <span>Awards Ceremony</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link 
                  href="/schedule" 
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                >
                  View detailed schedule
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg py-4 px-6">
                <p className="text-lg">
                  <span className="font-semibold text-blue-300">💡 Pro Tip:</span> The Builders' Room schedule is designed to let you attend Boulder Startup Week sessions while still working on your project.
                  <Link href="https://boulderstartupweek2025.sched.com/" className="ml-2 text-blue-400 hover:underline">
                    Check the full BSW schedule
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Event Highlights</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 text-center text-gray-300">
              Take a look at what makes the Builders' Room an unforgettable experience
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%201.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%203.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2011.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2022.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2029.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2019.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2018.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img src="/images/BSW_Builders_Room%20-%2027.jpeg" alt="Event Photo" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Join Us?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-10 text-gray-300">
              Secure your spot at Boulder's premier hackathon experience during Startup Week. 
              Limited spots available to ensure quality mentorship and resources for all participants.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/register" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-xl transition-all inline-block"
              >
                Register Now
              </Link>
              <Link 
                href="/about" 
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-10 rounded-full text-xl transition-all inline-block"
              >
                Learn About boulder.codes
              </Link>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-blue-900/30 border border-blue-700/30 rounded-lg p-5">
              <p className="text-lg text-gray-300">
                <span className="font-display text-xl text-blue-300">boulder.codes</span> is a fun, creative collective making the 
                <span className="font-fun text-pink-400 mx-2">developer experience</span> 
                more awesome across the Front Range!
                <Link href="/about" className="ml-2 text-blue-400 hover:underline">
                  Join the fun →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}