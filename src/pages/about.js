import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  const initiatives = [
    {
      title: "Build Jams & Hackathons",
      description: "Creating high-energy coding events where developers can flex their creative muscles and build amazing projects together, like our flagship Builders' Room hackathon!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "Dev Mentorship Matchmaking",
      description: "Playing tech cupid by connecting developers with mentors who share their passions and help them level up their skills in a supportive environment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Colorado Open Source Love",
      description: "Spreading the open source love by spotlighting local projects, hosting contribution parties, and helping Colorado-based innovations shine on the global stage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "Dev Experience Workshops",
      description: "Fun, hands-on sessions where we explore tools and techniques that make coding more joyful — from IDE tricks to AI pair programming to team workflows that don't suck.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: "Front Range Tech Friend-Up",
      description: "Bringing together all the awesome tech communities in Boulder, Denver, and beyond for cross-pollination, collaboration, and the occasional epic karaoke night.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
    },
    {
      title: "Tech For All Access Program",
      description: "Making the tech community more inclusive through creative workshops, scholarships, and partnerships that welcome everyone to the coding party.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
    },
  ];

  const partners = [
    "Boulder Startup Week", 
    "CU Boulder", 
    "Techstars", 
    "Google", 
    "Galvanize", 
    "Code for Boulder",
    "Front Range WICS"
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>boulder.codes | Elevating Code Quality Across the Front Range</title>
        <meta name="description" content="A community-driven organization dedicated to improving code quality and developer collaboration across Boulder and the Front Range." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/90 to-purple-900/90"></div>
            <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-10"></div>
            
            {/* Abstract shapes */}
            <div className="absolute right-0 top-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-green-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-lg font-display">
              <span className="text-blue-400">boulder</span>
              <span className="text-white">.</span>
              <span className="text-green-400">codes</span>
            </h1>
            
            <p className="text-xl md:text-3xl font-light mb-6 text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Elevating <span className="font-fun text-pink-400 text-2xl md:text-4xl transform -rotate-2 inline-block">developer experience</span> and community across the Front Range
            </p>
            
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-display">
              Because coding should be as fun as it is functional!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="#initiatives"
                className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
              >
                Our Initiatives
              </a>
              <Link
                href="/register"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
              >
                Join Builders&apos; Room
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 max-w-3xl mx-auto">
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Not just another meetup</div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Community-driven</div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Cross-language, cross-framework</div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Elevating the entire ecosystem</div>
              <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">Bridging companies and individuals</div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 text-center">
            <a
              href="#initiatives"
              className="inline-block animate-bounce"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-24 bg-slate-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 font-display">Our <span className="font-fun text-yellow-400">Mission</span></h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-10">
                boulder.codes is a loose, fun organization with a bold vision: to transform the developer experience
                across the Front Range! We're here to make coding more joyful, collaboration more energizing, 
                and tech communities more vibrant. We're not just another meetup — we're a creative collective 
                connecting diverse communities and amplifying what makes Boulder's tech scene special.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="bg-blue-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">Community <span className="font-fun text-blue-400 text-lg">Vibes</span></h3>
                  <p className="text-gray-300">
                    We build spaces where developers feel welcome, inspired, and connected. Our events spark friendships, collaborations, and the kind of creative energy that makes Boulder special.
                  </p>
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="bg-green-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">Developer <span className="font-fun text-green-400 text-lg">Joy</span></h3>
                  <p className="text-gray-300">
                    We're on a mission to make coding more enjoyable! Through creative events, skill-sharing, and developer-centered thinking, we're redefining what makes a great developer experience.
                  </p>
                </div>
                
                <div className="bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="bg-purple-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">Creative <span className="font-fun text-purple-400 text-lg">Cross-Pollination</span></h3>
                  <p className="text-gray-300">
                    We mix different technologies, communities, and perspectives to spark innovation. The magic happens when React devs meet Python data scientists and hardware hackers!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Initiatives */}
        <section id="initiatives" className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 font-display">Our <span className="font-fun text-pink-400">Epic</span> Initiatives</h2>
              <p className="text-xl text-gray-300">
                How we're making the dev experience awesome across the Front Range
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-slate-800 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-700/50 transition-colors group hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="mb-4 group-hover:scale-110 transition-transform">
                    {initiative.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">
                    {index % 2 === 0 ? 
                      <>{initiative.title}</> : 
                      <><span className="font-fun text-pink-400">{initiative.title.split(' ')[0]}</span> {initiative.title.split(' ').slice(1).join(' ')}</>
                    }
                  </h3>
                  <p className="text-gray-300 text-sm">{initiative.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Current Flagship: Builders' Room */}
        <section className="py-24 bg-slate-800/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl"></div>
            <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-green-500/30 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                  <img 
                    src="/images/BSW_Builders_Room%20-%2031.jpeg" 
                    alt="Builders' Room Hackathon" 
                    className="rounded-xl shadow-2xl shadow-blue-500/10"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold mb-6 font-display">Our <span className="font-fun text-yellow-400">Flagship</span> Event:<br/>Builders' Room Hackathon</h2>
                  <p className="text-gray-300 mb-6">
                    Join our epic 5-day code jam during Boulder Startup Week! It's where devs, designers, and idea 
                    people join forces to build cool stuff, make new friends, and have a blast while creating amazing projects. 
                    No boring hackathon vibes—just creativity, community, and the occasional coffee-fueled coding sprint.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-white">May 12-16, 2025</span>
                        <p className="text-sm text-gray-400">During Boulder Startup Week</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-white">Unique 5-day format</span>
                        <p className="text-sm text-gray-400">Build while attending BSW events</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-medium text-white">Showcase Opportunities</span>
                        <p className="text-sm text-gray-400">Present your project to the BSW community</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link 
                      href="/register" 
                      className="px-8 py-3 bg-blue-600 text-white rounded-full text-base font-semibold hover:bg-blue-700 transition-all inline-flex items-center group"
                    >
                      Register for Builders&apos; Room
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Partners */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Partners</h2>
              <p className="text-xl text-gray-300">
                Collaborating with organizations across the Front Range to strengthen our tech community
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <div className="flex flex-wrap justify-center gap-8">
                  {partners.map((partner, index) => (
                    <div key={index} className="bg-white/10 rounded-lg py-3 px-6 text-center backdrop-blur-sm">
                      <span className="font-medium text-white">{partner}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 text-center">
                  <p className="text-gray-400 mb-6">
                    Interested in partnering with boulder.codes to strengthen the developer community?
                  </p>
                  <a 
                    href="mailto:info@boulder.codes" 
                    className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full text-base font-medium transition-colors inline-block"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join the Community */}
        <section className="py-24 bg-gradient-to-br from-blue-900/50 to-indigo-900/50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-5"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 font-display">Join the <span className="font-fun text-blue-400">boulder.codes</span> Squad</h2>
              <p className="text-xl text-gray-300 mb-10">
                Be part of our movement to make the developer experience amazing and build a tech community that's 
                as vibrant and creative as the mountains around us!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <svg width="40" height="40" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-[#5865F2]">
                    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z" fill="currentColor"/>
                  </svg>
                  <h3 className="text-xl font-bold mb-3">Join Our Discord</h3>
                  <p className="text-gray-300 mb-6 text-sm">
                    Connect with developers, share knowledge, and stay updated on events.
                  </p>
                  <a 
                    href="https://discord.gg/JZFShvee" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#5865F2] hover:text-[#5865F2]/80 font-medium inline-flex items-center"
                  >
                    Join the Community
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-3">Newsletter</h3>
                  <p className="text-gray-300 mb-6 text-sm">
                    Monthly updates on events, initiatives, and community highlights.
                  </p>
                  <a 
                    href="#" 
                    className="text-green-400 hover:text-green-300 font-medium inline-flex items-center"
                  >
                    Subscribe
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-3">GitHub</h3>
                  <p className="text-gray-300 mb-6 text-sm">
                    Contribute to our open source projects and community resources.
                  </p>
                  <a 
                    href="#" 
                    className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                  >
                    View Projects
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}