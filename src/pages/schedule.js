import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  
  const days = [
    {
      date: "Monday, May 12th",
      name: "Day 1: Kickoff",
      events: [
        { time: "1:00 PM", title: "Check-in & Welcome", description: "Registration opens, networking, and refreshments" },
        { time: "2:00 PM", title: "Welcome & Keynote", description: "Official opening and inspiring keynote from local entrepreneur" },
        { time: "2:45 PM", title: "Builders' Room Overview", description: "Explanation of the format, judging criteria, and resources available" },
        { time: "3:30 PM", title: "BSW Featured Talk", description: "Attend a featured Boulder Startup Week session - recommended talk highlighted" },
        { time: "4:30 PM", title: "Team Formation & Pitches", description: "60-second idea pitches and team formation" },
        { time: "5:30 PM", title: "Networking & Dinner", description: "Connect with potential teammates over dinner" },
        { time: "6:30 PM", title: "Building Begins", description: "Teams start working on their projects" },
        { time: "8:30 PM", title: "Optional: After Hours", description: "Venue remains open until 10PM for teams wanting to continue working" },
      ]
    },
    {
      date: "Tuesday, May 13th",
      name: "Day 2: Build Day",
      events: [
        { time: "9:00 AM", title: "Breakfast & Morning Check-in", description: "Coffee, breakfast, and team progress check-ins" },
        { time: "10:00 AM", title: "Building Continues", description: "Teams deep dive into their projects" },
        { time: "12:00 PM", title: "Lunch & BSW Sessions", description: "Lunch provided; option to attend Boulder Startup Week talks" },
        { time: "2:00 PM", title: "Mentor Sessions", description: "Expert mentors available for 20-minute consultations" },
        { time: "4:00 PM", title: "Workshop: Effective Pitching", description: "Learn techniques for pitching your project effectively" },
        { time: "5:00 PM", title: "Check-in & Adjustments", description: "Teams share progress and get feedback" },
        { time: "6:00 PM", title: "Dinner", description: "Take a break and refuel" },
        { time: "7:00 PM", title: "Building Continues", description: "Evening work session" },
        { time: "10:00 PM", title: "Venue Closes", description: "Building for the day concludes" },
      ]
    },
    {
      date: "Wednesday, May 14th",
      name: "Day 3: Build & Refine",
      events: [
        { time: "9:00 AM", title: "Breakfast & Progress Updates", description: "Morning fuel and quick team standups" },
        { time: "10:00 AM", title: "Building Continues", description: "Focused work time" },
        { time: "12:00 PM", title: "Lunch & BSW Sessions", description: "Lunch provided; opportunity to attend Boulder Startup Week talks" },
        { time: "2:00 PM", title: "Final Mentor Sessions", description: "Last chance to get expert guidance" },
        { time: "4:00 PM", title: "Presentation Prep Workshop", description: "Tips for creating compelling demos" },
        { time: "5:00 PM", title: "Progress Check-in", description: "Teams share their status and get final feedback" },
        { time: "6:00 PM", title: "Dinner", description: "Take a break and connect with other participants" },
        { time: "7:00 PM", title: "Evening Build Sprint", description: "Final evening to work on projects" },
        { time: "10:00 PM", title: "Venue Closes", description: "Last full building day concludes" },
      ]
    },
    {
      date: "Thursday, May 15th",
      name: "Day 4: Demo Day",
      events: [
        { time: "9:00 AM", title: "Breakfast & Final Preparations", description: "Last-minute refinements and practice time" },
        { time: "11:00 AM", title: "Submission Deadline", description: "All code freezes; final project submissions due" },
        { time: "12:00 PM", title: "Lunch", description: "Final lunch before presentations" },
        { time: "1:00 PM", title: "Demo Preparation", description: "Setup time for presentations" },
        { time: "2:00 PM", title: "Public Demo Showcase", description: "Teams present their projects to judges and Boulder Startup Week attendees" },
        { time: "4:00 PM", title: "Judges Deliberation", description: "Judges confer while participants network" },
        { time: "4:30 PM", title: "Awards Ceremony", description: "Winners announced across multiple categories" },
        { time: "5:30 PM", title: "Closing Reception", description: "Celebrate accomplishments and continue networking" },
        { time: "7:00 PM", title: "Official After Party", description: "Continue celebrating at a local venue (optional)" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Schedule | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="Event schedule for the Builders' Room hackathon at Boulder Startup Week, hosted by boulder.codes" />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-4 text-center">Event Schedule</h1>
        <p className="text-xl text-center max-w-3xl mx-auto mb-8">
          Join us for a 4-day startup experience during Boulder Startup Week
        </p>
        <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-4 mb-16 max-w-3xl mx-auto">
          <h3 className="text-lg font-medium text-blue-300 mb-2">💡 Startup Weekend... with a twist!</h3>
          <p className="text-gray-300">
            We've adapted the classic Startup Weekend format to span Monday afternoon through Thursday evening, 
            giving you more building time while still allowing you to participate in the amazing Boulder Startup Week sessions.
            The schedule includes suggested times to attend BSW talks, but you're free to manage your time to maximize your experience.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            <div className="bg-slate-800 inline-flex rounded-lg p-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeDay === index ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-gray-300'
                  }`}
                >
                  Day {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2">{days[activeDay].name}</h2>
            <h3 className="text-xl text-blue-400 mb-8">{days[activeDay].date}</h3>
            
            <div className="relative border-l-4 border-blue-600 pl-6 space-y-8">
              {days[activeDay].events.map((event, eventIndex) => (
                <div key={eventIndex} className="relative">
                  <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                  </div>
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center mb-2">
                      <span className="text-xl font-bold mr-4">{event.time}</span>
                      <h4 className="text-xl font-semibold text-white">{event.title}</h4>
                    </div>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <section className="mb-16 bg-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2 p-6">
                <h2 className="text-2xl font-bold mb-4">Boulder Startup Week Integration</h2>
                <p className="mb-6 text-gray-300">
                  One of the unique benefits of our format is the ability to participate in Boulder Startup Week sessions 
                  while still building your project. We've purposely scheduled flexibility to allow you to attend talks 
                  that interest you. <a href="https://boulderstartupweek.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View the full BSW schedule</a>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Recommended Sessions</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li><span className="text-blue-300">▸</span> Tuesday 10AM: Funding Your Startup</li>
                      <li><span className="text-blue-300">▸</span> Tuesday 2PM: Marketing for Early-Stage Startups</li>
                      <li><span className="text-blue-300">▸</span> Wednesday 11AM: User Experience Design</li>
                      <li><span className="text-blue-300">▸</span> Wednesday 3PM: Customer Development</li>
                    </ul>
                  </div>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Tips for Success</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li><span className="text-green-400">✓</span> Coordinate with teammates to cover different talks</li>
                      <li><span className="text-green-400">✓</span> Apply learnings immediately to your project</li>
                      <li><span className="text-green-400">✓</span> Network with BSW attendees for feedback</li>
                      <li><span className="text-green-400">✓</span> Take advantage of BSW networking events</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="relative hidden md:block">
                <img 
                  src="/images/BSW_Builders_Room%20-%209.jpeg" 
                  alt="Networking at Boulder Startup Week" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/60"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-blue-800/80 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">Connect & Learn</h3>
                    <p className="text-blue-100 text-sm">
                      Make the most of both the hackathon and Boulder Startup Week's incredible networking opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="mt-12 mb-16 bg-slate-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <p className="mb-4">All Builders' Room events will take place at:</p>
                <div className="bg-slate-700 p-4 rounded-lg mb-4">
                  <p className="font-bold text-lg">Boulder Tech Hub</p>
                  <p>1234 Innovation Way</p>
                  <p>Boulder, CO 80302</p>
                </div>
                <p className="text-gray-400 mb-6">
                  Parking is available in the adjacent garage. The venue is also accessible 
                  via public transportation with bus stops nearby.
                </p>
                <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Get directions</span>
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
            <Link 
              href="/register" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all"
            >
              Register Now
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}