import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ForceGraph from '../components/ForceGraph';

export default function Home() {
  const [showFullGraph, setShowFullGraph] = useState(false);
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>boulder.codes | Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="The premier hackathon experience at Boulder Startup Week, hosted by boulder.codes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Script id="reb2b-script" strategy="afterInteractive">
        {`
          !function () {
            var reb2b = window.reb2b = window.reb2b || [];
            if (reb2b.invoked) return;
            reb2b.invoked = true;
            reb2b.methods = ["identify", "collect"];
            reb2b.factory = function (method) {
              return function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(method);
                reb2b.push(args);
                return reb2b;
              };
            };
            for (var i = 0; i < reb2b.methods.length; i++) {
              var key = reb2b.methods[i];
              reb2b[key] = reb2b.factory(key);
            }
            reb2b.load = function (key) {
              var script = document.createElement("script");
              script.type = "text/javascript";
              script.async = true;
              script.src = "https://s3-us-west-2.amazonaws.com/b2bjsstore/b/" + key + "/0OV0VHM8PV6Z.js.gz";
              var first = document.getElementsByTagName("script")[0];
              first.parentNode.insertBefore(script, first);
            };
            reb2b.SNIPPET_VERSION = "1.0.1";
            reb2b.load("0OV0VHM8PV6Z");
          }();
        `}
      </Script>
      
      <Navbar />
      
      <main className="pt-16">
        <Hero />
        
        {/* Explore the Universe Button */}
        {/* <div className="flex justify-center -mt-20 mb-10 relative z-30">
          <button 
            onClick={() => setShowFullGraph(true)}
            className="bg-slate-800/80 backdrop-blur-md hover:bg-slate-700/80 text-white font-medium py-3 px-5 rounded-full flex items-center gap-2 transition-all border border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
          >
            <span className="text-xl">🚀</span>
            <span>Explore the Full BSW Universe</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div> */}
        
        {/* Fullscreen Force Graph Modal */}
        {showFullGraph && (
          <ForceGraph 
            fullscreen={true} 
            onClose={() => setShowFullGraph(false)} 
          />
        )}
        
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 max-w-5xl mx-auto mb-12">
              <div className="flex-1">
                <div className="inline-block bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 font-semibold text-sm mb-4">
                  May 12-16, 2025
                </div>
                <h2 className="text-4xl font-bold mb-6">Startup Weekend Format with Boulder Startup Week Integration</h2>
                <div className="text-lg text-gray-300 mb-6">
                  The Builders&apos; Room is more than just a hackathon — it's a five-day startup experience where you'll 
                  go from idea to launch while being fully immersed in Boulder's vibrant startup ecosystem.
                </div>
                <div className="text-lg text-gray-300 mb-6">
                  We've designed a unique format that gives you <span className="text-blue-300 font-semibold">more building time</span> while still allowing 
                  you to attend Boulder Startup Week sessions that interest you.
                </div>
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
                      <span><span className="font-semibold">5-day format</span> - More time to build great products</span>
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
                <p className="text-gray-300 mb-4">Our unique format runs Monday-Friday during Boulder Startup Week, letting you build your project while attending valuable BSW sessions.</p>
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
        
        
        {/* Sponsors section hidden for now
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8">
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
        */}
        
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">5-Day Schedule Overview</h2>
            <div className="max-w-3xl mx-auto bg-slate-700 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">🚀 Day 1: Monday, May 12</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">10:00 AM</span>
                      <span className="text-white">🚀 Hackathon Kickoff</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">12:00 PM</span>
                      <span className="text-white">🍽️ Networking Lunch</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">5:00 PM</span>
                      <span className="text-white">✅ Team Check-in</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">💻 Day 2: Tuesday, May 13</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">9:00 AM</span>
                      <span className="text-white">☕ Morning Check-in</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">1:00 PM</span>
                      <span className="text-white">🧠 Mentor Office Hours</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">5:00 PM</span>
                      <span className="text-white">📢 Daily Standup</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">⚙️ Day 3: Wednesday, May 14</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">9:00 AM</span>
                      <span className="text-white">☕ Morning Check-in</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">1:00 PM</span>
                      <span className="text-white">🧠 Mentor Sessions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">5:00 PM</span>
                      <span className="text-white">📈 Progress Updates</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-300">🎭 Day 4: Thursday, May 15</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">9:00 AM</span>
                      <span className="text-white">☕ Breakfast</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">3:00 PM</span>
                      <span className="text-white">🎭 Project Presentations</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="font-mono text-gray-300 min-w-[4.5rem]">5:00 PM</span>
                      <span className="text-white">🏆 Awards & Recognition</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-blue-300">🌐 Day 5: Friday, May 16</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="font-mono text-gray-300 min-w-[8rem]">9:00 AM - 3:00 PM</span>
                    <span className="text-white">🌐 BSW Sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-mono text-gray-300 min-w-[4.5rem]">3:00 PM</span>
                    <span className="text-white">🎭 Project Showcase</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-mono text-gray-300 min-w-[4.5rem]">5:00 PM</span>
                    <span className="text-white">🎉 BSW Closing Party</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-8 bg-slate-800 p-4 rounded-lg border border-slate-700">
                <h3 className="font-bold text-blue-300 mb-2">Hackathon Locations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-left">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-white">Galvanize</p>
                      <p className="text-gray-400 text-sm">1023 Walnut St #100, Boulder</p>
                      <p className="text-gray-400 text-sm italic">Kickoff & closeout events</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-white">Canyon Center (BSW HQ)</p>
                      <p className="text-gray-400 text-sm">1881 9th Street, Boulder</p>
                      <p className="text-gray-400 text-sm italic">Lunches, mentoring, daily activities</p>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
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
            </div>
            
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg py-4 px-6">
                <div className="text-lg">
                  <span className="font-semibold text-blue-300">💡 Pro Tip:</span> The Builders' Room schedule is designed to let you attend Boulder Startup Week sessions while still working on your project.
                  <Link href="https://boulderstartupweek2025.sched.com/" className="ml-2 text-blue-400 hover:underline">
                    Check the full BSW schedule
                  </Link>
                </div>
                <div className="mt-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg shadow">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-[#0a8acd] mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 100 100" fill="currentColor">
                      <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm-.3 55.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7-7.5 16.7-16.7 16.7z"/>
                    </svg>
                    <div>
                      <span className="font-medium text-white">BSW Events Worth Attending:</span>
                      <p className="text-gray-300 text-sm mt-1">
                        Look for AI-focused events such as "Reinforcement Learning for Agents," "Building AI Products That Work," and the "AI Builders Meetup." These sessions are highlighted in our <Link href="/schedule" className="text-[#0a8acd] hover:underline font-medium">detailed schedule</Link> with the BSW logo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-b from-slate-800/90 to-slate-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center">Last Year's Magic ✨</h2>
            <div className="text-xl max-w-3xl mx-auto mb-6 text-center text-blue-300">
              Our inaugural hackathon sparked innovation, forged lasting connections, and launched incredible projects
            </div>
            
            {/* Success Stories Highlight */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Highlight 1 - 2024 Winner */}
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl overflow-hidden shadow-lg shadow-green-900/20 transform hover:scale-[1.02] transition-all">
                  <div className="h-52 relative overflow-hidden">
                    <img 
                      src="/images/BSW_Builders_Room%20-%2034.jpeg" 
                      alt="EcoBites Team" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 shadow-lg">2024 WINNER</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">EcoBites</h3>
                    <div className="mb-4 text-gray-300">Revolutionary platform providing transparent sustainability scores for local restaurants, empowering diners to make eco-conscious choices</div>
                  </div>
                </div>
                
                {/* Highlight 2 - Runner-Up */}
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/20 transform hover:scale-[1.02] transition-all">
                  <div className="h-52 relative overflow-hidden">
                    <img 
                      src="/images/BSW_Builders_Room%20-%2023.jpeg" 
                      alt="10-Minute Climate Team" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="bg-blue-500 text-black text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 shadow-lg">RUNNER-UP</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">10-Minute Climate</h3>
                    <div className="mb-4 text-gray-300">AI-powered climate newsletter delivering hyper-personalized, actionable sustainability tips tailored to your lifestyle and values</div>
                  </div>
                </div>
                
                {/* Highlight 3 - Best Effort */}
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 rounded-xl overflow-hidden shadow-lg shadow-purple-900/20 transform hover:scale-[1.02] transition-all">
                  <div className="h-52 relative overflow-hidden">
                    <img 
                      src="/images/BSW_Builders_Room%20-%2024.jpeg" 
                      alt="Spontaneous Team" 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <div className="bg-purple-500 text-black text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2 shadow-lg">BEST EFFORT</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">Spontaneous</h3>
                    <div className="mb-4 text-gray-300">Fostering meaningful connections through serendipitous encounters with nearby people in your network who share your interests</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">The Energy Was Electric!</h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From intense coding sessions to breakthrough moments, last year's event created magic that's still talked about in Boulder's tech circles
              </p>
            </div>
            
            {/* Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%201.jpeg" alt="Intense coding session at last year's hackathon" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2031.jpeg" alt="Team collaboration and brainstorming" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%203.jpeg" alt="Mentors providing guidance to teams" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2011.jpeg" alt="A team celebrating a breakthrough moment" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2022.jpeg" alt="Lunch break and networking opportunities" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2029.jpeg" alt="Participants enjoying community building activities" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2017.jpeg" alt="Final pitch and demo presentations" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-md shadow-blue-900/10">
                <img src="/images/BSW_Builders_Room%20-%2027.jpeg" alt="Awards ceremony and celebration" className="w-full h-full object-cover hover:scale-110 transition-all duration-500" />
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-slate-700/50 rounded-xl p-6 shadow-lg shadow-blue-900/5 border border-slate-700/80">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">This Year Will Be Even Better</h3>
                  <p className="text-gray-300 mb-4">
                    Building on our phenomenal inaugural event, we've enhanced everything from our mentorship program to our integration with Boulder Startup Week's premier events.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-block bg-blue-600/30 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 text-sm font-medium">Expanded Mentor Pool</span>
                    <span className="inline-block bg-purple-600/30 border border-purple-500/30 px-3 py-1 rounded-full text-purple-300 text-sm font-medium">New Sponsor Perks</span>
                    <span className="inline-block bg-green-600/30 border border-green-500/30 px-3 py-1 rounded-full text-green-300 text-sm font-medium">Enhanced Workshops</span>
                  </div>
                </div>
                <div className="md:flex-shrink-0">
                  <Link 
                    href="/register" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all inline-block shadow-lg hover:shadow-blue-900/30 transform hover:scale-105"
                  >
                    Join This Year's Experience
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Join Us?</h2>
            <div className="text-xl max-w-3xl mx-auto mb-10 text-gray-300">
              Secure your spot at Boulder's premier hackathon experience during Startup Week. 
              Limited spots available to ensure quality mentorship and resources for all participants.
            </div>
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
              <div className="text-lg text-gray-300">
                <span className="font-display text-xl text-blue-300">boulder.codes</span> is a fun, creative collective making the 
                <span className="font-fun text-pink-400 mx-2">developer experience</span> 
                more awesome across the Front Range!
                <Link href="/about" className="ml-2 text-blue-400 hover:underline">
                  Join the fun →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}