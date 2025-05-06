import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showUniverse, setShowUniverse] = useState(true); // Default to true (show starfield with labels)
  const forceGraphRef = useRef(null);
  
  // Automatically show details after a delay
  useEffect(() => {
    // First, show the universe
    setShowUniverse(true);
    
    // Then, after a delay, show details by turning off universe mode
    const timer = setTimeout(() => {
      setShowDetails(true);
      setShowUniverse(false);
    }, 4500); // Show details after 4.5 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle animation cycle - faster than before
  useEffect(() => {
    // Total 8 seconds for full cycle (faster than before)
    const cycleDuration = 8000; 
    const phaseDuration = cycleDuration / 4; // 2 seconds per phase
    const totalPhases = 4; // Get Inspired, Build, Launch, Repeat
    
    // Initialize with phase 0 (Inspire)
    setCurrentPhase(0);
    
    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % totalPhases);
    }, phaseDuration);
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle force graph node activation
  useEffect(() => {
    if (forceGraphRef.current) {
      // Get all nodes
      const allNodes = forceGraphRef.current.querySelectorAll('.node');
      const allLabels = forceGraphRef.current.querySelectorAll('.node-label');
      const allConnections = forceGraphRef.current.querySelectorAll('.node-connection');
      
      // Add enhanced styling to all labels when in universe mode
      if (showUniverse) {
        allLabels.forEach(label => {
          label.classList.add('universe-mode');
        });
      } else {
        allLabels.forEach(label => {
          label.classList.remove('universe-mode');
        });
      }
      
      // Deactivate all nodes
      allNodes.forEach(node => {
        node.classList.remove('node-active');
      });
      
      allLabels.forEach(label => {
        label.classList.remove('node-label-active');
      });
      
      allConnections.forEach(connection => {
        connection.classList.remove('node-connection-active');
      });
      
      // Activate current phase nodes
      const currentNodes = forceGraphRef.current.querySelectorAll(`.phase-${currentPhase}`);
      const currentConnections = forceGraphRef.current.querySelectorAll(`.connection-phase-${currentPhase}`);
      
      // Only activate labels when in universe mode
      const currentLabels = showUniverse 
        ? forceGraphRef.current.querySelectorAll(`.label-phase-${currentPhase}`)
        : [];
      
      // Always activate nodes
      currentNodes.forEach(node => {
        node.classList.add('node-active');
      });
      
      // Only show labels when in universe mode
      if (showUniverse) {
        currentLabels.forEach(label => {
          label.classList.add('node-label-active');
        });
      }
      
      // Always activate connections
      currentConnections.forEach(connection => {
        connection.classList.add('node-connection-active');
      });
    }
  }, [currentPhase, showUniverse]);
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/BSW_Builders_Room%20-%2025.jpeg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--bsw-blue-dark),0.95)] via-[rgba(var(--bsw-blue),0.85)] to-[rgba(var(--bsw-blue-light),0.8)]"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Abstract shapes */}
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-[rgba(var(--bsw-blue),0.3)] rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-[rgba(var(--bsw-blue-light),0.2)] rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 w-48 h-48 bg-[rgba(var(--fun-purple),0.15)] rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/4 top-1/4 w-40 h-40 bg-[rgba(var(--fun-green),0.1)] rounded-full filter blur-3xl"></div>
        
        {/* Force Graph */}
        <div ref={forceGraphRef} className="force-graph">
          {/* Background Star Field - always visible */}
          <div className="node node-tiny node-inspire" style={{ top: '10%', left: '8%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '15%', left: '22%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '5%', left: '35%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '8%', left: '52%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '12%', left: '65%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '18%', left: '78%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '3%', left: '88%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '95%', left: '12%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '88%', left: '26%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '92%', left: '38%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '85%', left: '55%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '90%', left: '72%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '94%', left: '85%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '25%', left: '5%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '35%', left: '3%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '45%', left: '6%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '55%', left: '4%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '65%', left: '7%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '75%', left: '2%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '25%', left: '95%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '35%', left: '97%' }}></div>
          <div className="node node-tiny node-build" style={{ top: '45%', left: '94%' }}></div>
          <div className="node node-tiny node-launch" style={{ top: '55%', left: '96%' }}></div>
          <div className="node node-tiny node-repeat" style={{ top: '65%', left: '93%' }}></div>
          <div className="node node-tiny node-inspire" style={{ top: '75%', left: '98%' }}></div>

          {/* Dispersed Inspire Phase Nodes - Spread across the entire visual space */}
          <div className="node node-medium node-inspire phase-0 node-1" style={{ top: '25%', left: '30%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '25%', left: '30%' }}>The Boulder Thesis</div>
          <div className="node node-small node-inspire phase-0 node-2" style={{ top: '20%', left: '70%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '20%', left: '70%' }}>Investor Mega Panel</div>
          <div className="node node-large node-inspire phase-0 node-3" style={{ top: '30%', left: '20%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '30%', left: '20%' }}>Coffee with Founders</div>
          <div className="node node-small node-inspire phase-0 node-4" style={{ top: '60%', left: '25%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '60%', left: '25%' }}>First Time Founder Fails</div>
          <div className="node node-medium node-inspire phase-0 node-5" style={{ top: '80%', left: '65%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '80%', left: '65%' }}>Take Notes</div>
          <div className="node node-small node-inspire phase-0 node-6" style={{ top: '22%', left: '28%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '22%', left: '28%' }}>Startup Variety Show</div>
          <div className="node node-medium node-inspire phase-0 node-7" style={{ top: '65%', left: '75%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '65%', left: '75%' }}>Mind & Entrepreneurship</div>
          <div className="node node-small node-inspire phase-0 node-8" style={{ top: '18%', left: '18%' }}></div>
          <div className="node-label label-phase-0" style={{ top: '18%', left: '18%' }}>Meet Your Team</div>
          
          {/* Adjusted Inspire Phase Connections */}
          <div className="node-connection connection-phase-0" style={{ top: '25%', left: '30%', width: '10%', transform: 'rotate(45deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '25%', left: '30%', width: '45%', transform: 'rotate(-15deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '20%', left: '70%', width: '50%', transform: 'rotate(120deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '30%', left: '20%', width: '32%', transform: 'rotate(30deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '80%', left: '65%', width: '20%', transform: 'rotate(-60deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '22%', left: '28%', width: '50%', transform: 'rotate(75deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '65%', left: '75%', width: '28%', transform: 'rotate(-30deg)' }}></div>
          <div className="node-connection connection-phase-0" style={{ top: '18%', left: '18%', width: '14%', transform: 'rotate(15deg)' }}></div>
          
          {/* Dispersed Build Phase Nodes */}
          <div className="node node-large node-build phase-1 node-1" style={{ top: '40%', left: '60%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '40%', left: '60%' }}>AI Workshop</div>
          <div className="node node-medium node-build phase-1 node-2" style={{ top: '50%', left: '25%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '50%', left: '25%' }}>Vibe Code</div>
          <div className="node node-small node-build phase-1 node-3" style={{ top: '15%', left: '55%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '15%', left: '55%' }}>API Integration</div>
          <div className="node node-medium node-build phase-1 node-4" style={{ top: '55%', left: '55%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '55%', left: '55%' }}>Grab Coffee</div>
          <div className="node node-small node-build phase-1 node-5" style={{ top: '75%', left: '85%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '75%', left: '85%' }}>Late Night Coding</div>
          <div className="node node-medium node-build phase-1 node-6" style={{ top: '38%', left: '12%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '38%', left: '12%' }}>Pair Programming</div>
          <div className="node node-small node-build phase-1 node-7" style={{ top: '70%', left: '40%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '70%', left: '40%' }}>Builders' Lounge</div>
          <div className="node node-medium node-build phase-1 node-8" style={{ top: '42%', left: '80%' }}></div>
          <div className="node-label label-phase-1" style={{ top: '42%', left: '80%' }}>Brainstorm Session</div>
          
          {/* Adjusted Build Phase Connections */}
          <div className="node-connection connection-phase-1" style={{ top: '40%', left: '60%', width: '40%', transform: 'rotate(30deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '50%', left: '25%', width: '32%', transform: 'rotate(-45deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '15%', left: '55%', width: '35%', transform: 'rotate(165deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '55%', left: '55%', width: '30%', transform: 'rotate(20deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '75%', left: '85%', width: '25%', transform: 'rotate(-60deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '38%', left: '12%', width: '50%', transform: 'rotate(-20deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '70%', left: '40%', width: '30%', transform: 'rotate(65deg)' }}></div>
          <div className="node-connection connection-phase-1" style={{ top: '42%', left: '80%', width: '38%', transform: 'rotate(10deg)' }}></div>
          
          {/* Dispersed Launch Phase Nodes */}
          <div className="node node-large node-launch phase-2 node-1" style={{ top: '33%', left: '45%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '33%', left: '45%' }}>BSW Pitch Competition</div>
          <div className="node node-small node-launch phase-2 node-2" style={{ top: '75%', left: '15%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '75%', left: '15%' }}>Demo your MVP</div>
          <div className="node node-medium node-launch phase-2 node-3" style={{ top: '65%', left: '25%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '65%', left: '25%' }}>Pitch Rehearsal</div>
          <div className="node node-small node-launch phase-2 node-4" style={{ top: '17%', left: '80%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '17%', left: '80%' }}>Deploy to Production</div>
          <div className="node node-medium node-launch phase-2 node-5" style={{ top: '60%', left: '65%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '60%', left: '65%' }}>High Fives</div>
          <div className="node node-small node-launch phase-2 node-6" style={{ top: '28%', left: '62%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '28%', left: '62%' }}>Community Demo</div>
          <div className="node node-medium node-launch phase-2 node-7" style={{ top: '68%', left: '42%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '68%', left: '42%' }}>Meet Investors</div>
          <div className="node node-small node-launch phase-2 node-8" style={{ top: '76%', left: '55%' }}></div>
          <div className="node-label label-phase-2" style={{ top: '76%', left: '55%' }}>Product Hunt Launch</div>
          
          {/* Adjusted Launch Phase Connections */}
          <div className="node-connection connection-phase-2" style={{ top: '33%', left: '45%', width: '38%', transform: 'rotate(45deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '75%', left: '15%', width: '42%', transform: 'rotate(-75deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '65%', left: '25%', width: '25%', transform: 'rotate(15deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '17%', left: '80%', width: '55%', transform: 'rotate(-30deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '60%', left: '65%', width: '28%', transform: 'rotate(100deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '28%', left: '62%', width: '35%', transform: 'rotate(55deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '68%', left: '42%', width: '28%', transform: 'rotate(-15deg)' }}></div>
          <div className="node-connection connection-phase-2" style={{ top: '76%', left: '55%', width: '25%', transform: 'rotate(22deg)' }}></div>
          
          {/* Dispersed Repeat Phase Nodes */}
          <div className="node node-medium node-repeat phase-3 node-1" style={{ top: '85%', left: '45%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '85%', left: '45%' }}>Follow Up Emails</div>
          <div className="node node-large node-repeat phase-3 node-2" style={{ top: '50%', left: '10%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '50%', left: '10%' }}>Join a Startup</div>
          <div className="node node-small node-repeat phase-3 node-3" style={{ top: '45%', left: '32%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '45%', left: '32%' }}>Startup Hike</div>
          <div className="node node-medium node-repeat phase-3 node-4" style={{ top: '20%', left: '10%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '20%', left: '10%' }}>LinkedIn Connections</div>
          <div className="node node-small node-repeat phase-3 node-5" style={{ top: '30%', left: '78%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '30%', left: '78%' }}>Iterate on Feedback</div>
          <div className="node node-medium node-repeat phase-3 node-6" style={{ top: '62%', left: '15%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '62%', left: '15%' }}>Startup Crawl</div>
          <div className="node node-small node-repeat phase-3 node-7" style={{ top: '35%', left: '8%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '35%', left: '8%' }}>Women Founders Networking</div>
          <div className="node node-medium node-repeat phase-3 node-8" style={{ top: '10%', left: '40%' }}></div>
          <div className="node-label label-phase-3" style={{ top: '10%', left: '40%' }}>Plan Next Hackathon</div>
          
          {/* Adjusted Repeat Phase Connections */}
          <div className="node-connection connection-phase-3" style={{ top: '85%', left: '45%', width: '45%', transform: 'rotate(135deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '50%', left: '10%', width: '32%', transform: 'rotate(-30deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '45%', left: '32%', width: '28%', transform: 'rotate(80deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '20%', left: '10%', width: '35%', transform: 'rotate(15deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '30%', left: '78%', width: '40%', transform: 'rotate(-45deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '62%', left: '15%', width: '38%', transform: 'rotate(60deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '35%', left: '8%', width: '30%', transform: 'rotate(-15deg)' }}></div>
          <div className="node-connection connection-phase-3" style={{ top: '10%', left: '40%', width: '42%', transform: 'rotate(45deg)' }}></div>
          
          {/* Cross-phase connections - Connecting activities across different phases */}
          
          {/* Startup Variety Show (Inspire) to Pitch Rehearsal (Launch) */}
          <div className="node-connection" style={{ top: '22%', left: '28%', width: '60%', transform: 'rotate(40deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '40%', left: '45%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>prepares for</div>
          
          {/* Brainstorm Session (Build) to Product Hunt Launch (Launch) */}
          <div className="node-connection" style={{ top: '42%', left: '80%', width: '50%', transform: 'rotate(-25deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '58%', left: '60%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>evolves into</div>
          
          {/* Meet Investors (Launch) to Join a Startup (Repeat) */}
          <div className="node-connection" style={{ top: '68%', left: '42%', width: '45%', transform: 'rotate(-135deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '60%', left: '30%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>leads to</div>
          
          {/* Startup Hike (Repeat) to Mind & Entrepreneurship (Inspire) */}
          <div className="node-connection" style={{ top: '45%', left: '20%', width: '40%', transform: 'rotate(-70deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '35%', left: '28%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>inspires</div>
          
          {/* AI Workshop (Build) to Iterate on Feedback (Repeat) */}
          <div className="node-connection" style={{ top: '40%', left: '60%', width: '65%', transform: 'rotate(170deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '35%', left: '35%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>informs</div>
          
          {/* Meet Your Team (Inspire) to Grab Coffee (Build) */}
          <div className="node-connection" style={{ top: '18%', left: '18%', width: '45%', transform: 'rotate(45deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '35%', left: '35%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>strengthens</div>
          
          {/* Women Founders Networking (Repeat) to The Boulder Thesis (Inspire) */}
          <div className="node-connection" style={{ top: '35%', left: '8%', width: '38%', transform: 'rotate(-15deg)', opacity: 0.25 }}></div>
          <div className="node-label" style={{ top: '28%', left: '20%', fontSize: '9px', color: 'rgba(255,255,255,0.6)' }}>contributes to</div>
        </div>
      </div>
      
      <div className="relative z-20 text-center px-4 max-w-5xl">
        {/* Main tagline first, always visible */}
        <div className="font-medium mb-14 text-white max-w-3xl mx-auto leading-relaxed relative">
          <div className="mb-6 relative flex flex-wrap justify-center items-center min-h-[150px]">
            {/* Phase 0: Get Inspired */}
            <div className={`absolute left-0 right-0 transition-all duration-700 flex justify-center items-center ${currentPhase === 0 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              <span className="fun-text text-[#A8D8FF] text-4xl md:text-5xl transform rotate-1 inline-block drop-shadow-xl" style={{textShadow: "0 0 15px rgba(168, 216, 255, 0.6)"}}>
                Get Inspired
              </span>
              <div className="absolute -right-14 sm:-right-12 text-[#A8D8FF] text-2xl" style={{animation: "icon-inspire 3s infinite ease-in-out"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -top-3 -right-2 text-blue-400 text-xl sparkle sparkle-1">✨</div>
            </div>
            
            {/* Phase 1: Build */}
            <div className={`absolute left-0 right-0 transition-all duration-700 flex justify-center items-center ${currentPhase === 1 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              <span className="fun-text text-[#DA9DF9] text-4xl md:text-5xl transform -rotate-1 inline-block drop-shadow-xl" style={{textShadow: "0 0 15px rgba(218, 157, 249, 0.6)"}}>
                Build
              </span>
              <div className="absolute -right-14 sm:-right-12 text-[#DA9DF9] text-2xl" style={{animation: "icon-build 3s infinite ease-in-out"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 7l-9 9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <div className="absolute -top-3 -right-2 text-purple-400 text-xl sparkle sparkle-2">✨</div>
            </div>
            
            {/* Phase 2: Launch */}
            <div className={`absolute left-0 right-0 transition-all duration-700 flex justify-center items-center ${currentPhase === 2 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              <span className="fun-text text-[#67E8B9] text-4xl md:text-5xl transform rotate-1 inline-block drop-shadow-xl" style={{textShadow: "0 0 15px rgba(103, 232, 185, 0.6)"}}>
                Launch
              </span>
              <div className="absolute -right-14 sm:-right-12 text-[#67E8B9] text-2xl" style={{animation: "icon-launch 3s infinite ease-in-out"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 11.5A7 7 0 0 1 12 4a7 7 0 0 1 6 11.5"></path>
                  <path d="M12 20v-4"></path>
                  <path d="M6 20l3-3"></path>
                  <path d="M18 20l-3-3"></path>
                  <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                </svg>
              </div>
              <div className="absolute -top-3 -right-2 text-green-400 text-xl sparkle sparkle-3">✨</div>
            </div>
            
            {/* Phase 3: Repeat */}
            <div className={`absolute left-0 right-0 transition-all duration-700 flex justify-center items-center ${currentPhase === 3 ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
              <span className="fun-text text-[#FFCD5E] text-4xl md:text-5xl inline-block drop-shadow-xl" style={{textShadow: "0 0 15px rgba(255, 205, 94, 0.6)"}}>
                Repeat
              </span>
              <div className="absolute -right-14 sm:-right-12 text-[#FFCD5E] text-2xl repeat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 12V6h6M2 22v-6h6M21.5 12v6h-6"></path>
                  <path d="M22 6a14 14 0 0 0-14-4"></path>
                  <path d="M2 18a14 14 0 0 0 14 4"></path>
                </svg>
              </div>
              <div className="absolute -top-3 -right-2 text-yellow-400 text-xl sparkle sparkle-3">✨</div>
            </div>
          </div>
        </div>
            
        {/* Event details - hidden in universe mode, visible otherwise, with animation */}
        <div className={`transition-all duration-1000 transform ${!showUniverse && showDetails ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          {/* Boulder Startup Week Builders' Room Combined Logo */}
          {/* Unified simplified card layout that's shorter */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-10">
            <div className="relative inline-block mt-0">
              <div className="absolute -right-2 -top-3 text-yellow-400 text-xl sparkle sparkle-1 z-10">✨</div>
              <div className="fun-card py-4 sm:py-5 px-5 sm:px-8 rounded-xl shadow-[0_0_30px_rgba(10,138,205,0.4)] border-[#478DCB] hover:border-[#5CBBF6] transition-all duration-300 transform hover:scale-105 hover:-rotate-1">
                <div className="text-center">
                  <div className="text-center glow-text mb-2">
                    <span className="fun-text text-[#5CBBF6] text-2xl sm:text-3xl md:text-4xl transform -rotate-1 inline-block">
                      The Builders&apos; Room
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center my-1">
                    <div className="h-0.5 w-8 sm:w-10 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    <div className="mx-2 sm:mx-3 text-white/90 font-semibold">@</div>
                    <div className="h-0.5 w-8 sm:w-10 bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                  </div>
                  
                  <div className="relative">
                    <Image 
                      src="/images/BSW-Header-Logo-White-LG.png" 
                      alt="Boulder Startup Week Logo" 
                      width={280} 
                      height={55} 
                      className="h-10 sm:h-12 md:h-14 w-auto mx-auto" 
                      priority
                    />
                    <div className="absolute -bottom-2 -left-1 text-pink-400 text-base sm:text-lg sparkle sparkle-3">✨</div>
                  </div>
                  
                  <div className="text-gray-300 text-xs font-medium mt-2">
                    <span className="bg-[rgba(var(--bsw-blue),0.3)] px-2 py-0.5 rounded-full border border-[rgba(var(--bsw-blue),0.4)]">
                      May 12-15, 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-lg md:text-xl font-light mt-3 mx-auto max-w-2xl">
            A hackathon designed to pair perfectly with BSW — attend inspiring talks, make valuable connections, 
            <span className="text-[#5CBBF6] font-medium"> then immediately apply what you learn</span>!
            <div className="absolute -bottom-4 right-1/4 text-blue-400 text-xl sparkle sparkle-2">✨</div>
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
        </div>
        
        {/* Universe Toggle Button - Top Right Fixed Position */}
        <div className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 z-40">
          <button 
            onClick={() => setShowUniverse(!showUniverse)}
            className="fun-card rounded-full px-3 py-2 flex items-center transform hover:scale-110 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] border-white/40 hover:border-white/60"
          >
            <span className="text-xs text-white font-medium flex items-center">
              {showUniverse ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <span className="whitespace-nowrap hidden sm:inline">Show Event Details</span>
                  <span className="whitespace-nowrap sm:hidden">Details</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 13.5a1 1 0 11-2 0 1 1 0 012 0zm-1-5a1 1 0 00-1 1v1a1 1 0 102 0v-1a1 1 0 00-1-1zm-1-5a1 1 0 011-1 1 1 0 110 2 1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="whitespace-nowrap hidden sm:inline">Show Universe</span>
                  <span className="whitespace-nowrap sm:hidden">Universe</span>
                </>
              )}
              <span className="ml-1 text-yellow-300 text-xs sparkle">✨</span>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;