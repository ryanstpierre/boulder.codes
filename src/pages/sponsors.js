import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Sponsors() {
  // 2025 Sponsors
  const sponsors2025 = [
    { name: "Zed", logo: "/images/sponsors/zed.png", url: "https://zed.dev" },
    { name: "Technical Integrity", logo: "/images/sponsors/technical-integrity.png", url: "https://technicalintegrity.com/" },
    { name: "Viget", logo: "/images/sponsors/viget.png", url: "https://www.viget.com/" },
    { name: "Moe's Bagel", logo: "/images/sponsors/moes-bagel.png", url: "https://moesbagel.com/" },
    { name: "Jot", logo: "/images/sponsors/jot.png", url: "https://jot.co/" },
    { name: "Freeplay", logo: "/images/sponsors/freeplay.png", url: "https://freeplay.ai/" },
    { name: "Webflow", logo: "/images/sponsors/webflow.png", url: "https://webflow.com/" },
    { name: "Keating & Lyden", logo: "/images/sponsors/keating-lyden.png", url: "https://www.keatingandlyden.com/" }
  ];
  const sponsorTiers = [
    {
      tier: "Platinum",
      price: "$5,000",
      color: "from-amber-900/90 to-amber-800/70",
      accentColor: "amber-500",
      benefits: [
        "Prominent logo placement on website and all event materials",
        "Dedicated booth space at the event",
        "5-minute speaking slot during opening ceremony",
        "Opportunity to provide judges and mentors",
        "First access to recruit participants",
        "Social media promotion (5 dedicated posts)",
        "Logo on event t-shirts (large)",
        "Ability to provide branded swag for all participants"
      ],
      sponsors: [
        { name: "Google", logo: "/placeholder-logo.png" },
        { name: "Techstars", logo: "/placeholder-logo.png" }
      ]
    },
    {
      tier: "Gold",
      price: "$2,500",
      color: "from-yellow-900/90 to-yellow-800/70",
      accentColor: "yellow-500",
      benefits: [
        "Logo on website and event materials",
        "Table space at the event",
        "Opportunity to provide mentors",
        "Social media promotion (3 dedicated posts)",
        "Logo on event t-shirts (medium)",
        "Ability to provide branded items for swag bags"
      ],
      sponsors: [
        { name: "CU Boulder", logo: "/placeholder-logo.png" },
        { name: "StartupCo", logo: "/placeholder-logo.png" }
      ]
    },
    {
      tier: "Silver",
      price: "$1,000",
      color: "from-gray-700/90 to-gray-800/70",
      accentColor: "gray-300",
      benefits: [
        "Logo on website",
        "Social media mention (1 dedicated post)",
        "Logo on event t-shirts (small)",
        "Promotional materials in swag bags"
      ],
      sponsors: [
        { name: "Foundry Group", logo: "/placeholder-logo.png" },
        { name: "Boulder.codes", logo: "/placeholder-logo.png" }
      ]
    },
    {
      tier: "Community",
      price: "$500 or in-kind",
      color: "from-blue-900/90 to-blue-800/70",
      accentColor: "blue-400",
      benefits: [
        "Logo on website",
        "Social media mention (group post)",
        "In-kind sponsors provide food, drinks, or other essential services"
      ],
      sponsors: [
        { name: "Local Coffee Shop", logo: "/placeholder-logo.png" },
        { name: "Pizza Place", logo: "/placeholder-logo.png" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Sponsors | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="Our amazing sponsors who make the Builders' Room hackathon possible, hosted by boulder.codes" />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <section className="mb-20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Our Amazing Sponsors</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The Builders&apos; Room hackathon is made possible by these incredible organizations 
              who are committed to supporting innovation in the Boulder community
            </p>
          </div>
          
          {/* 2025 Sponsors Section */}
          <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-700/50 rounded-2xl p-8 max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              <span className="font-fun text-pink-400 text-4xl transform rotate-1 inline-block mr-2">2025</span>
              <span className="text-white">Sponsors</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {sponsors2025.map((sponsor, index) => (
                <a 
                  key={index} 
                  href={sponsor.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 p-4 rounded-lg flex flex-col items-center justify-center group transition-all duration-300 border border-white/5 hover:border-white/20"
                >
                  <div className="bg-white rounded-lg p-4 h-32 w-full flex items-center justify-center mb-3 overflow-hidden">
                    <div className="relative h-20 w-full">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        style={{ objectFit: 'contain' }}
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  <span className="text-white group-hover:text-blue-300 font-medium text-sm transition-colors">
                    {sponsor.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-200">Previous Years</h2>
            <div className="mb-10 text-center text-sm text-gray-400">Examples of past sponsorship tiers and benefits</div>
            
            <h3 className="text-2xl font-bold mb-8 text-center text-blue-300">Platinum Sponsors</h3>
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-4 rounded-lg h-28 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-xl">Google</span>
              </div>
              <div className="bg-white p-4 rounded-lg h-28 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-xl">Techstars</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-8 text-center text-yellow-300">Gold Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-4 rounded-lg h-24 flex items-center justify-center">
                <span className="text-slate-800 font-bold">CU Boulder</span>
              </div>
              <div className="bg-white p-4 rounded-lg h-24 flex items-center justify-center">
                <span className="text-slate-800 font-bold">StartupCo</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 text-center text-gray-300">Silver & Community Sponsors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">Foundry Group</span>
              </div>
              <div className="bg-white p-3 rounded-lg h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">Boulder.codes</span>
              </div>
              <div className="bg-white p-3 rounded-lg h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">Local Coffee Shop</span>
              </div>
              <div className="bg-white p-3 rounded-lg h-20 flex items-center justify-center">
                <span className="text-slate-800 font-bold text-sm">Pizza Place</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Become a Sponsor</h2>
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold py-1 px-3 rounded-lg transform -rotate-1 mb-4">
              2025 Sponsorship Packages
            </div>
            <p className="text-xl text-gray-300 mx-auto mb-6">
              Support the Boulder tech community and gain visibility for your brand
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Sponsoring the Builders' Room hackathon during Boulder Startup Week connects your brand with 
              talented developers, designers, and entrepreneurs while demonstrating your commitment to 
              innovation in the local tech ecosystem.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/70 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-300">Why Sponsor?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300"><span className="text-white font-medium">Brand visibility</span> to Boulder's tech community and BSW attendees</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300"><span className="text-white font-medium">Recruitment opportunities</span> with motivated, talented participants</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300"><span className="text-white font-medium">Product feedback</span> from developers and users during the event</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-300"><span className="text-white font-medium">Community goodwill</span> by supporting the local tech ecosystem</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-sm border border-blue-800/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-blue-300">2025 Special Benefits</h3>
                <p className="text-gray-300 mb-4">
                  This year, sponsors get extra visibility through our integration with Boulder Startup Week:
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Exposure to the broader BSW audience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Cross-promotion in BSW materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Invitation to BSW networking events</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-center">
                <a 
                  href="mailto:builders@boulder.codes?subject=Sponsorship%20Inquiry"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Contact Us About Sponsorship
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              {sponsorTiers.map((tier, index) => (
                <div 
                  key={index} 
                  className={`bg-gradient-to-br ${tier.color} backdrop-blur-sm border border-${tier.accentColor}/30 rounded-xl overflow-hidden`}
                >
                  <div className="p-4 flex justify-between items-center border-b border-white/10">
                    <h3 className="text-xl font-bold">{tier.tier}</h3>
                    <span className={`font-mono text-${tier.accentColor} font-bold`}>{tier.price}</span>
                  </div>
                  
                  <div className="p-5">
                    <ul className="space-y-2 text-sm">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${tier.accentColor} mt-0.5 mr-2 flex-shrink-0`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Ready to support Boulder's tech innovation?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to discuss custom sponsorship packages or to learn more about 
              how your organization can get involved with the Builders' Room hackathon.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:builders@boulder.codes?subject=Sponsorship%20Inquiry"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors shadow"
              >
                Email the Sponsorship Team
              </a>
              <Link
                href="/register"
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-full font-medium transition-colors"
              >
                Register for the Event
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}