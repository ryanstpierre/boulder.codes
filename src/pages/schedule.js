import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  
  const days = [
    {
      date: "Monday, May 12th, 2025",
      name: "Day 1: Kickoff & Team Formation",
      events: [
        { time: "10:00 AM", title: "Hackathon Kickoff", description: "Welcome presentation at Galvanize (1023 Walnut St), overview of the event format, and introduction to the available resources and mentors", highlight: true },
        { time: "11:00 AM - 5:00 PM", title: "Team Formation & Idea Sharing", description: "Meet potential teammates, pitch your ideas, and form teams while having the option to attend BSW sessions", flexible: true },
        { time: "12:00 PM", title: "Networking Lunch", description: "Lunch provided at Canyon Center (BSW HQ, 1881 9th St) with opportunity to meet other teams and mentors", muted: true },
        { time: "5:00 PM", title: "Team Check-in", description: "Teams share their project ideas and plans for the week with the group", highlight: false },
        { time: "5:00 PM onward", title: "Evening Social", description: "Optional social events with other BSW attendees around Boulder", muted: true },
        { time: "5:00 PM", title: "BSW Event: Colorado Product Happy Hour", description: "Network with product managers and startup leaders at Bohemian Biergarten", muted: true, bsw: true },
        { time: "5:30 PM", title: "BSW Event: AI Engineering Happy Hour", description: "Connect with AI engineers and enthusiasts at Avanti", muted: true, bsw: true },
      ]
    },
    {
      date: "Tuesday, May 13th, 2025",
      name: "Day 2: Building & Mentorship",
      events: [
        { time: "9:00 AM", title: "Morning Check-in", description: "Coffee and breakfast provided as teams gather to start the day", highlight: true },
        { time: "10:00 AM - 12:00 PM", title: "Work Session", description: "Dedicated time for teams to work on their projects, with option to attend BSW sessions", flexible: true },
        { time: "12:00 PM", title: "Lunch Break", description: "Lunch provided for all participants", muted: true },
        { time: "1:00 PM - 5:00 PM", title: "Afternoon Work Session", description: "Continued project development time with the option to attend BSW events", flexible: true },
        { time: "1:00 PM - 3:00 PM", title: "Mentor Office Hours", description: "Scheduled time when industry experts are available to provide feedback and guidance on your project", flexible: true, highlight: true },
        { time: "5:00 PM", title: "Daily Standup", description: "Brief team updates on progress and challenges", highlight: true },
        { time: "5:00 PM onward", title: "Evening Networking", description: "Optional social events with BSW attendees", muted: true },
        { time: "5:00 PM", title: "BSW Event: AI Builders Meetup", description: "Join the AI community at Canyon Center (BSW HQ) for demos and discussions", muted: true, bsw: true },
      ]
    },
    {
      date: "Wednesday, May 14th, 2025",
      name: "Day 3: Development & Feedback",
      events: [
        { time: "9:00 AM", title: "Morning Check-in", description: "Coffee and breakfast provided as teams gather to continue their work", highlight: true },
        { time: "10:00 AM - 12:00 PM", title: "Project Development", description: "Work on your project or attend relevant BSW sessions", flexible: true },
        { time: "12:00 PM", title: "Lunch Break", description: "Lunch provided with time to network with other teams", muted: true },
        { time: "1:00 PM - 5:00 PM", title: "Continued Development", description: "Focused work time with the option to attend BSW events", flexible: true },
        { time: "1:00 PM - 3:00 PM", title: "Mentor Sessions", description: "Get specific feedback from technical and business mentors to help refine your project", flexible: true, highlight: true },
        { time: "5:00 PM", title: "Progress Updates", description: "Teams share development progress and get feedback from the group", highlight: true },
        { time: "5:00 PM onward", title: "BSW Evening Events", description: "Optional social gatherings with the broader BSW community", muted: true },
        { time: "7:00 PM", title: "BSW Event: Startup Tales Networking", description: "Share stories and make connections with other builders at Galvanize", muted: true, bsw: true },
      ]
    },
    {
      date: "Thursday, May 15th, 2025",
      name: "Day 4: Final Touches & Presentations",
      events: [
        { time: "9:00 AM", title: "Breakfast", description: "Coffee and breakfast provided for the final full day of work", highlight: true },
        { time: "9:00 AM - 12:00 PM", title: "Final Development", description: "Last chance to complete core functionality and prepare for presentations", flexible: true },
        { time: "12:00 PM", title: "Lunch & Presentation Prep", description: "Lunch provided while teams finalize their presentation materials", highlight: true },
        { time: "12:00 PM onward", title: "Project Completion", description: "Final work time or option to attend BSW events", flexible: true },
        { time: "11:00 AM", title: "BSW Event: Building AI Products That Work", description: "Learn practical AI implementation strategies at Sovrn", muted: true, bsw: true },
        { time: "3:00 PM", title: "Project Presentations", description: "Teams present their completed projects to judges, mentors, and fellow participants", highlight: true, special: true },
        { time: "5:00 PM", title: "Awards & Recognition", description: "Hackathon projects will be recognized and awarded in multiple categories", highlight: true, special: true },
      ]
    },
    {
      date: "Friday, May 16th, 2025",
      name: "Day 5: BSW Integration",
      events: [
        { time: "9:00 AM - 3:00 PM", title: "BSW Sessions", description: "Attend Boulder Startup Week events and connect with the broader startup community", flexible: true },
        { time: "9:00 AM", title: "BSW Event: Reinforcement Learning for Agents", description: "Deep dive into RL techniques for AI applications at Sovrn", muted: true, bsw: true },
        { time: "3:00 PM", title: "Project Showcase", description: "Present your project to Boulder's tech community at a dedicated BSW session", highlight: true, special: true },
        { time: "5:00 PM onward", title: "BSW Closing Party", description: "Join the official Boulder Startup Week closing event with other participants, mentors, and the BSW community", highlight: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Schedule | boulder.codes × BSW - The Official Hackathon of Boulder Startup Week 2025</title>
        <meta name="description" content="Event schedule for the Builders' Room - the official hackathon of Boulder Startup Week 2025, presented by boulder.codes in partnership with BSW." />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-1 rounded-full bg-[#0a8acd]/20 text-[#0a8acd] text-sm font-medium mb-2">
            Official Boulder Startup Week 2025 Event
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Event Schedule</h1>
        <h2 className="text-xl font-medium mb-4 text-center text-[#0a8acd]">The Official Hackathon of Boulder Startup Week</h2>
        <p className="text-xl text-center max-w-3xl mx-auto mb-8">
          Join us for a 5-day startup experience as part of BSW's official programming
        </p>
        {/* <div className="bg-[#0a8acd]/10 border border-[#0a8acd]/30 rounded-lg p-6 mb-16 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium text-[#0a8acd] mb-2">💡 A Flexible Hackathon Experience with BSW Integration</h3>
          <p className="text-gray-300 mb-3">
            We've designed this event to accommodate 30-70 participants with a loose, adaptable structure. The schedule highlights 
            key moments while giving you freedom to build and explore BSW events throughout the week.
          </p>
          <p className="text-gray-300 mb-3">
            "We want to create an environment where you can meet people, build cool projects, and immerse yourself in the BSW community. 
            Float between teams, make new connections, and enjoy the full Boulder Startup Week experience."
          </p>
          

          
          <div className="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2 text-[#0a8acd]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm-.3 55.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7-7.5 16.7-16.7 16.7z"/>
              </svg>
              <h4 className="text-white font-medium">BSW Integration</h4>
            </div>
            <p className="text-gray-300 mt-2">
              Look for the <span className="inline-flex items-center px-2 py-0.5 rounded bg-white/80 text-slate-700 text-xs font-bold">
              <svg className="h-3 w-3 mr-1 text-[#0a8acd]" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm-.3 55.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7-7.5 16.7-16.7 16.7z"/>
              </svg>
              BSW Event</span> cards throughout the schedule. These optional Boulder Startup Week sessions complement the hackathon and provide excellent learning and networking opportunities.
            </p>
          </div>
        </div> */}
        <div className="bg-[#0a8acd]/10 border border-[#0a8acd]/30 rounded-lg p-6 mb-16 max-w-3xl mx-auto">
          <div className="relative mt-8 mb-8 transform -rotate-1 scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3CBD] via-[#FF9E3C] to-[#FFDE3C] rounded-xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-slate-800 border-2 border-[#FFDE3C] rounded-xl p-5 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-4xl md:text-6xl">🎯 💬 🎪</div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Want to attend lots of BSW talks? No problem!</h3>
                  <p className="text-blue-300 text-lg mb-2">Join the hackathon Discord and build while attending as many sessions as you like!</p>
                  <p className="text-gray-300">Our flexible format means you can pop in and out of the workspace, collaborate remotely, and still be fully part of the hackathon experience. The best of both worlds!</p>
                </div>
              </div>
              <div className="absolute -top-3 -right-2 text-3xl">✨</div>
              <div className="absolute -bottom-2 -left-3 text-3xl transform rotate-12">🚀</div>
            </div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <div className="bg-slate-800 inline-flex rounded-lg p-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm md:text-base md:px-4 ${
                    activeDay === index ? 'bg-[#0a8acd] text-white' : 'hover:bg-slate-700 text-gray-300'
                  }`}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2">
              {activeDay === 0 && "🚀 "}
              {activeDay === 1 && "💻 "}
              {activeDay === 2 && "⚙️ "}
              {activeDay === 3 && "🎭 "}
              {activeDay === 4 && "🌐 "}
              {days[activeDay].name}
            </h2>
            <h3 className="text-xl text-[#0a8acd] mb-8">{days[activeDay].date}</h3>
            
            <div className="relative border-l-4 border-[#0a8acd] pl-6 space-y-8">
              {days[activeDay].events.map((event, eventIndex) => (
                <div key={eventIndex} className="relative">
                  <div className={`absolute -left-10 mt-1.5 h-6 w-6 rounded-full ${event.bsw ? 'bg-white' : event.highlight ? 'bg-[#0a8acd]' : event.muted ? 'bg-slate-600' : 'bg-[#0a8acd]/70'} flex items-center justify-center`}>
                    {event.bsw ? (
                      <div className="h-4 w-4 text-[#0a8acd]">
                        <svg viewBox="0 0 100 100" fill="currentColor">
                          <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm-.3 55.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7-7.5 16.7-16.7 16.7z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className={`${event.bsw ? 'bg-white/10 backdrop-blur-sm hover:bg-white/15 transform hover:scale-[1.01] cursor-pointer transition-all shadow' : 'bg-slate-800'} p-6 rounded-lg ${event.highlight && !event.bsw ? 'border-l-4 border-[#0a8acd]' : ''} ${event.special ? 'border-2 border-[#0a8acd]/50' : ''} ${event.muted && !event.bsw ? 'opacity-80' : ''}`}>
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                      <span className={`text-xl font-bold mr-4 ${event.highlight ? 'text-[#0a8acd]' : event.muted ? 'text-[#0a8acd]/70' : 'text-[#0a8acd]'}`}>{event.time}</span>
                      <h4 className={`text-xl font-semibold ${event.bsw ? 'text-[#0a8acd]/90' : 'text-white'}`}>
                        {!event.bsw && event.title.includes("Kickoff") && "🚀 "}
                        {!event.bsw && event.title.includes("Team Formation") && "👥 "}
                        {!event.bsw && event.title.includes("Team Check") && "✅ "}
                        {!event.bsw && event.title.includes("Networking") && "🔄 "}
                        {!event.bsw && event.title.includes("Lunch") && "🍽️ "}
                        {!event.bsw && event.title.includes("Breakfast") && "☕ "}
                        {!event.bsw && event.title.includes("Mentor") && "🧠 "}
                        {!event.bsw && event.title.includes("Work Session") && "💻 "}
                        {!event.bsw && event.title.includes("Development") && "⚙️ "}
                        {!event.bsw && event.title.includes("Standup") && "📢 "}
                        {!event.bsw && event.title.includes("Progress") && "📈 "}
                        {!event.bsw && event.title.includes("Presentation") && "🎭 "}
                        {!event.bsw && event.title.includes("Award") && "🏆 "}
                        {event.title}
                      </h4>
                    </div>
                    <p className={`${event.muted ? 'text-gray-500' : 'text-gray-400'}`}>{event.description}</p>
                    {event.flexible && (
                      <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                        Flexible Time Block
                      </div>
                    )}
                    {event.title.includes("BSW") && !event.bsw && (
                      <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-[#0a8acd]/20 text-[#0a8acd] text-xs ml-2">
                        BSW Official Event
                      </div>
                    )}
                    {event.bsw && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-white/80 text-slate-700 text-xs font-bold ml-2 shadow-sm">
                        <svg className="h-3 w-3 mr-1 text-[#0a8acd]" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm-.3 55.6c-9.2 0-16.7-7.5-16.7-16.7s7.5-16.7 16.7-16.7 16.7 7.5 16.7 16.7-7.5 16.7-16.7 16.7z"/>
                        </svg>
                        BSW Event
                      </div>
                    )}
                    {event.special && (
                      <div className="mt-2 inline-block px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 text-xs ml-2">
                        Featured Event
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <section className="bg-slate-800 rounded-lg overflow-hidden border border-[#0a8acd]/30 h-full">
              <div className="p-6">
                <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm font-medium mb-4">
                  Judging Criteria
                </div>
                <h2 className="text-2xl font-bold mb-4">Project Evaluation</h2>
                <p className="mb-6 text-gray-300">
                  Teams will have <span className="text-yellow-300 font-medium">5 minutes</span> to demo their project. 
                  We're keeping the format casual and focused on what you can build in a short time. 
                  Projects will be evaluated on:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <h3 className="font-bold text-lg mb-1 text-yellow-300">Originality</h3>
                    <p className="text-gray-300">Creative approach, uniqueness of problem-solution, and innovative thinking</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-[#0a8acd]">
                    <h3 className="font-bold text-lg mb-1 text-[#0a8acd]">Execution</h3>
                    <p className="text-gray-300">Quality of implementation, technical achievement, and user experience</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-bold text-lg mb-1 text-green-400">Validation</h3>
                    <p className="text-gray-300">Evidence of user/market research, problem understanding, and potential impact</p>
                  </div>
                </div>
                
                <div className="mt-6 text-gray-400 text-sm italic">
                  Note: The focus is on learning and building, not perfection. We value progress over polish, 
                  especially given the time constraints.
                </div>
              </div>
            </section>
            
            <section className="bg-slate-800 rounded-lg overflow-hidden border border-[#0a8acd]/30 h-full">
              <div className="p-6">
                <div className="inline-block px-4 py-1 rounded-full bg-[#0a8acd]/20 text-[#0a8acd] text-sm font-medium mb-4">
                  BSW Integration
                </div>
                <h2 className="text-2xl font-bold mb-4">Flexible Format</h2>
                <p className="mb-6 text-gray-300">
                  As the <span className="text-[#0a8acd] font-medium">official hackathon of Boulder Startup Week</span>, we've created a 
                  flexible schedule that allows you to fully experience BSW while building something amazing. Key points:
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <span className="text-[#0a8acd] mr-2">•</span>
                    <p className="text-gray-300">Start with kickoff on Monday at 10am, and float between teams throughout the week</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#0a8acd] mr-2">•</span>
                    <p className="text-gray-300">Coffee, light breakfast, and lunch available each day at the venue</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#0a8acd] mr-2">•</span>
                    <p className="text-gray-300">Mentors will circulate from 1-3pm on Tuesday and Wednesday</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#0a8acd] mr-2">•</span>
                    <p className="text-gray-300">Attend BSW events throughout the day and join group outings in the evenings</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-[#0a8acd] mr-2">•</span>
                    <p className="text-gray-300">Thursday ends with internal kudos at noon, followed by pitches and showcase at 3pm</p>
                  </div>
                </div>
                
                <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 mt-4">
                  <h3 className="font-bold text-lg mb-2 text-purple-300">Tips for a Great Experience</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li><span className="text-green-400 mr-2">✓</span> Meet new people and form connections across teams</li>
                    <li><span className="text-green-400 mr-2">✓</span> Attend BSW sessions that interest you throughout the week</li>
                    <li><span className="text-green-400 mr-2">✓</span> Join evening outings and socials with the BSW community</li>
                    <li><span className="text-green-400 mr-2">✓</span> Build something you're excited about, no matter how small</li>
                    <li><span className="text-green-400 mr-2">✓</span> Share your experience and learnings at the Thursday showcase</li>
                  </ul>
                </div>
                
                <div className="mt-6 text-center">
                  <a 
                    href="https://boulderstartupweek.com/schedule" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#0a8acd] hover:text-[#0a8acd]/80 transition-colors"
                  >
                    <span>View the full BSW schedule</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mb-16 bg-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6">
                <div className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-4">
                  Venue Information
                </div>
                <h2 className="text-2xl font-bold mb-4">Hackathon Locations</h2>
                <p className="mb-4 text-gray-300">The hackathon will take place at two key locations:</p>
                <div className="space-y-4">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <p className="font-bold text-lg">Galvanize</p>
                    <p className="text-gray-300 mb-1">1023 Walnut St #100, Boulder, CO 80302, USA</p>
                    <p className="text-blue-300 text-sm">Kickoff and closeout events will be held here</p>
                  </div>
                  
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <p className="font-bold text-lg">Canyon Center (BSW HQ)</p>
                    <p className="text-gray-300 mb-1">1881 9th Street, Downtown Boulder, CO</p>
                    <p className="text-blue-300 text-sm">Hub for lunches, mentoring, and daily activities</p>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-purple-300">Workspace</h3>
                      <p className="text-gray-300">Flexible working environment with tables, chairs, power outlets, and high-speed WiFi</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-purple-300">Amenities</h3>
                      <p className="text-gray-300">Coffee, snacks, and some meals will be provided throughout the event</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-300 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h3 className="font-bold text-purple-300">Location</h3>
                      <p className="text-gray-300">Centrally located in Boulder for easy access to BSW events and networking opportunities</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-gray-400 italic text-sm">
                  * Teams will find spots to work between the two locations, and spaces will be allocated as needed during kickoff
                </div>
              </div>
              <div className="bg-slate-700">
                <img 
                  src="/images/BSW_Builders_Room%20-%2015.jpeg" 
                  alt="Event Space" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-[#0a8acd]/20 text-[#0a8acd] text-sm font-medium mb-4">
              Join Boulder's Premier Startup Week Hackathon
            </div>
            
            <div className="max-w-2xl mx-auto mb-8 text-gray-300">
              <p>
                This year's schedule emphasizes flexibility and community integration. Kickoff on Monday morning, 
                then flow between building, exploring BSW events, and making connections throughout the week. The 
                experience culminates with showcases on Thursday and Friday.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="inline-block bg-[#0a8acd] hover:bg-[#0a8acd]/80 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
              >
                Register for the Hackathon
              </Link>
              <a 
                href="https://boulderstartupweek.com/schedule/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
              >
                View BSW Schedule
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}