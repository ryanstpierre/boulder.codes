import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';

const ForceGraph = ({ fullscreen = false, onClose, forceGraphRef: providedRef = null, currentPhase: providedPhase = null, showUniverse: providedShowUniverse = null }) => {
  const [currentPhase, setCurrentPhase] = useState(providedPhase !== null ? providedPhase : 0);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);
  const localForceGraphRef = useRef(null);
  const forceGraphRef = providedRef || localForceGraphRef;
  const frameRef = useRef(null);
  
  // If the component is being controlled by parent, update local state
  useEffect(() => {
    if (providedPhase !== null) {
      setCurrentPhase(providedPhase);
    }
  }, [providedPhase]);
  
  // If the component is being controlled by parent, update local showLabels state
  useEffect(() => {
    if (providedShowUniverse !== null) {
      setShowLabels(providedShowUniverse);
    }
  }, [providedShowUniverse]);
  
  // Node data structure - moved from inline JSX to data objects for better management
  const phaseData = useMemo(() => [
    {
      name: "Inspire",
      color: "#BEE3FF",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      nodes: [
        { id: "inspire-1", label: "The Boulder Thesis", size: "medium", top: "25%", left: "30%" },
        { id: "inspire-2", label: "Investor Mega Panel", size: "small", top: "20%", left: "70%" },
        { id: "inspire-3", label: "Coffee with Founders", size: "large", top: "30%", left: "20%" },
        { id: "inspire-4", label: "First Time Founder Fails", size: "small", top: "60%", left: "25%" },
        { id: "inspire-5", label: "Take Notes", size: "medium", top: "80%", left: "65%" },
        { id: "inspire-6", label: "Startup Variety Show", size: "small", top: "22%", left: "28%" },
        { id: "inspire-7", label: "Mind & Entrepreneurship", size: "medium", top: "65%", left: "75%" },
        { id: "inspire-8", label: "Meet Your Team", size: "small", top: "18%", left: "18%" }
      ],
      connections: [
        { from: "inspire-1", to: "inspire-3", width: "10%", rotation: "45deg" },
        { from: "inspire-1", to: "inspire-2", width: "45%", rotation: "-15deg" },
        { from: "inspire-2", to: "inspire-4", width: "50%", rotation: "120deg" },
        { from: "inspire-3", to: "inspire-6", width: "32%", rotation: "30deg" },
        { from: "inspire-5", to: "inspire-7", width: "20%", rotation: "-60deg" },
        { from: "inspire-6", to: "inspire-8", width: "50%", rotation: "75deg" },
        { from: "inspire-7", to: "inspire-4", width: "28%", rotation: "-30deg" },
        { from: "inspire-8", to: "inspire-1", width: "14%", rotation: "15deg" }
      ],
      description: "The inspiration phase is where ideas begin. Attend talks, connect with mentors, and absorb knowledge from experienced founders and investors. This is your opportunity to find your spark.",
      events: [
        { name: "The Boulder Thesis", description: "Learn about Brad Feld's framework for startup communities", time: "Monday, 10:00 AM", location: "Main Stage" },
        { name: "Investor Mega Panel", description: "Hear from top VCs about what they're looking for", time: "Monday, 2:00 PM", location: "Venture Hall" },
        { name: "Coffee with Founders", description: "Casual networking with successful entrepreneurs", time: "Tuesday, 9:00 AM", location: "Startup Cafe" }
      ]
    },
    {
      name: "Build",
      color: "#E5B8FF",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 7l-9 9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      nodes: [
        { id: "build-1", label: "AI Workshop", size: "large", top: "40%", left: "60%" },
        { id: "build-2", label: "Vibe Code", size: "medium", top: "50%", left: "25%" },
        { id: "build-3", label: "API Integration", size: "small", top: "15%", left: "55%" },
        { id: "build-4", label: "Grab Coffee", size: "medium", top: "55%", left: "55%" },
        { id: "build-5", label: "Late Night Coding", size: "small", top: "75%", left: "85%" },
        { id: "build-6", label: "Pair Programming", size: "medium", top: "38%", left: "12%" },
        { id: "build-7", label: "Builders' Lounge", size: "small", top: "70%", left: "40%" },
        { id: "build-8", label: "Brainstorm Session", size: "medium", top: "42%", left: "80%" }
      ],
      connections: [
        { from: "build-1", to: "build-3", width: "40%", rotation: "30deg" },
        { from: "build-2", to: "build-6", width: "32%", rotation: "-45deg" },
        { from: "build-3", to: "build-8", width: "35%", rotation: "165deg" },
        { from: "build-4", to: "build-7", width: "30%", rotation: "20deg" },
        { from: "build-5", to: "build-8", width: "25%", rotation: "-60deg" },
        { from: "build-6", to: "build-2", width: "50%", rotation: "-20deg" },
        { from: "build-7", to: "build-4", width: "30%", rotation: "65deg" },
        { from: "build-8", to: "build-1", width: "38%", rotation: "10deg" }
      ],
      description: "During the build phase, you'll transform ideas into reality. Work alongside fellow builders, access mentorship, and develop your concept. Get hands-on and create something amazing.",
      events: [
        { name: "AI Workshop", description: "Practical implementation of AI in your projects", time: "Tuesday, 1:00 PM", location: "Tech Lab" },
        { name: "Builders' Lounge", description: "Open workspace with mentors on hand", time: "All Week, 9:00 AM - 10:00 PM", location: "Collaboration Hub" },
        { name: "Pair Programming", description: "Get matched with another developer to solve challenges", time: "Wednesday, 3:00 PM", location: "Code Café" }
      ]
    },
    {
      name: "Launch",
      color: "#8AEFD2",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 11.5A7 7 0 0 1 12 4a7 7 0 0 1 6 11.5"></path>
          <path d="M12 20v-4"></path>
          <path d="M6 20l3-3"></path>
          <path d="M18 20l-3-3"></path>
          <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
        </svg>
      ),
      nodes: [
        { id: "launch-1", label: "BSW Pitch Competition", size: "large", top: "33%", left: "45%" },
        { id: "launch-2", label: "Demo your MVP", size: "small", top: "75%", left: "15%" },
        { id: "launch-3", label: "Pitch Rehearsal", size: "medium", top: "65%", left: "25%" },
        { id: "launch-4", label: "Deploy to Production", size: "small", top: "17%", left: "80%" },
        { id: "launch-5", label: "High Fives", size: "medium", top: "60%", left: "65%" },
        { id: "launch-6", label: "Community Demo", size: "small", top: "28%", left: "62%" },
        { id: "launch-7", label: "Meet Investors", size: "medium", top: "68%", left: "42%" },
        { id: "launch-8", label: "Product Hunt Launch", size: "small", top: "76%", left: "55%" }
      ],
      connections: [
        { from: "launch-1", to: "launch-6", width: "38%", rotation: "45deg" },
        { from: "launch-2", to: "launch-3", width: "42%", rotation: "-75deg" },
        { from: "launch-3", to: "launch-7", width: "25%", rotation: "15deg" },
        { from: "launch-4", to: "launch-6", width: "55%", rotation: "-30deg" },
        { from: "launch-5", to: "launch-8", width: "28%", rotation: "100deg" },
        { from: "launch-6", to: "launch-1", width: "35%", rotation: "55deg" },
        { from: "launch-7", to: "launch-8", width: "28%", rotation: "-15deg" },
        { from: "launch-8", to: "launch-5", width: "25%", rotation: "22deg" }
      ],
      description: "The launch phase is where your hard work pays off. Practice your pitch, demo your creation, and connect with potential users and investors. This is your time to shine.",
      events: [
        { name: "BSW Pitch Competition", description: "Present your startup idea for showcase opportunities and recognition", time: "Thursday, 5:00 PM", location: "Main Stage" },
        { name: "Pitch Rehearsal", description: "Get feedback from experienced founders before the big day", time: "Wednesday, 2:00 PM", location: "Pitch Room" },
        { name: "Community Demo", description: "Showcase your project to the Boulder tech community", time: "Thursday, 1:00 PM", location: "Exhibition Hall" }
      ]
    },
    {
      name: "Repeat",
      color: "#FFE08A",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 12V6h6M2 22v-6h6M21.5 12v6h-6"></path>
          <path d="M22 6a14 14 0 0 0-14-4"></path>
          <path d="M2 18a14 14 0 0 0 14 4"></path>
        </svg>
      ),
      nodes: [
        { id: "repeat-1", label: "Follow Up Emails", size: "medium", top: "85%", left: "45%" },
        { id: "repeat-2", label: "Join a Startup", size: "large", top: "50%", left: "10%" },
        { id: "repeat-3", label: "Startup Hike", size: "small", top: "45%", left: "32%" },
        { id: "repeat-4", label: "LinkedIn Connections", size: "medium", top: "20%", left: "10%" },
        { id: "repeat-5", label: "Iterate on Feedback", size: "small", top: "30%", left: "78%" },
        { id: "repeat-6", label: "Startup Crawl", size: "medium", top: "62%", left: "15%" },
        { id: "repeat-7", label: "Women Founders Networking", size: "small", top: "35%", left: "8%" },
        { id: "repeat-8", label: "Plan Next Hackathon", size: "medium", top: "10%", left: "40%" }
      ],
      connections: [
        { from: "repeat-1", to: "repeat-8", width: "45%", rotation: "135deg" },
        { from: "repeat-2", to: "repeat-6", width: "32%", rotation: "-30deg" },
        { from: "repeat-3", to: "repeat-2", width: "28%", rotation: "80deg" },
        { from: "repeat-4", to: "repeat-7", width: "35%", rotation: "15deg" },
        { from: "repeat-5", to: "repeat-8", width: "40%", rotation: "-45deg" },
        { from: "repeat-6", to: "repeat-1", width: "38%", rotation: "60deg" },
        { from: "repeat-7", to: "repeat-4", width: "30%", rotation: "-15deg" },
        { from: "repeat-8", to: "repeat-5", width: "42%", rotation: "45deg" }
      ],
      description: "The repeat phase is about leveraging your momentum. Follow up with connections, iterate on your project, and plan your next steps. The end of BSW is just the beginning.",
      events: [
        { name: "Startup Crawl", description: "Visit multiple Boulder startups in one evening", time: "Friday, 6:00 PM", location: "Various Locations" },
        { name: "Women Founders Networking", description: "Connect with female entrepreneurs in the community", time: "Thursday, 4:00 PM", location: "Diversity Hub" },
        { name: "Plan Next Hackathon", description: "Join the planning committee for future events", time: "Friday, 12:00 PM", location: "Community Room" }
      ]
    }
  ], []);

  // Cross-phase connections
  const crossPhaseConnections = useMemo(() => [
    { from: "inspire-6", to: "launch-3", label: "prepares for", top: "22%", left: "28%", width: "60%", rotation: "40deg" },
    { from: "build-8", to: "launch-8", label: "evolves into", top: "42%", left: "80%", width: "50%", rotation: "-25deg" },
    { from: "launch-7", to: "repeat-2", label: "leads to", top: "68%", left: "42%", width: "45%", rotation: "-135deg" },
    { from: "repeat-3", to: "inspire-7", label: "inspires", top: "45%", left: "20%", width: "40%", rotation: "-70deg" },
    { from: "build-1", to: "repeat-5", label: "informs", top: "40%", left: "60%", width: "65%", rotation: "170deg" },
    { from: "inspire-8", to: "build-4", label: "strengthens", top: "18%", left: "18%", width: "45%", rotation: "45deg" },
    { from: "repeat-7", to: "inspire-1", label: "contributes to", top: "35%", left: "8%", width: "38%", rotation: "-15deg" },
  ], []);

  // Background "star" nodes - useMemo for performance
  const backgroundStars = useMemo(() => Array(30).fill().map((_, i) => {
    const types = ["inspire", "build", "launch", "repeat"];
    const type = types[Math.floor(Math.random() * types.length)];
    return {
      id: `star-${i}`,
      type,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 95}%`
    };
  }), []);

  // Handle animation cycle with requestAnimationFrame for better performance
  useEffect(() => {
    if (!autoPlay) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }
    
    // Cycle through phases using requestAnimationFrame for smoother animation
    const cycleDuration = 12000; // 12 seconds for full cycle in fullscreen mode
    const phaseDuration = cycleDuration / 4; // 3 seconds per phase
    const totalPhases = 4;
    
    // Initialize with phase 0 (Inspire)
    setCurrentPhase(0);
    
    let lastTime = 0;
    let elapsedTime = 0;
    
    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      elapsedTime += deltaTime;
      
      if (elapsedTime >= phaseDuration) {
        setCurrentPhase(prev => (prev + 1) % totalPhases);
        elapsedTime = 0;
      }
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [autoPlay]);
  
  // Optimize DOM updates with debounced RAF
  const updateNodeStates = useCallback(() => {
    if (!forceGraphRef.current) return;
    
    // Get all nodes
    const allNodes = forceGraphRef.current.querySelectorAll('.node');
    const allLabels = forceGraphRef.current.querySelectorAll('.node-label');
    const allConnections = forceGraphRef.current.querySelectorAll('.node-connection');
    
    // Batch DOM operations for better performance
    // Add enhanced styling to all labels when labels are shown
    if (showLabels) {
      allLabels.forEach(label => {
        label.classList.add('universe-mode');
      });
    } else {
      allLabels.forEach(label => {
        label.classList.remove('universe-mode');
      });
    }
    
    // Deactivate all nodes in a batch
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
    
    // Only activate labels when showing labels
    const currentLabels = showLabels 
      ? forceGraphRef.current.querySelectorAll(`.label-phase-${currentPhase}`)
      : [];
    
    // Always activate nodes
    currentNodes.forEach(node => {
      node.classList.add('node-active');
    });
    
    // Only show labels when showLabels is true
    if (showLabels) {
      currentLabels.forEach(label => {
        label.classList.add('node-label-active');
      });
    }
    
    // Always activate connections
    currentConnections.forEach(connection => {
      connection.classList.add('node-connection-active');
    });

    // Handle selected node (highlight it and its connections)
    if (selectedNode) {
      const selectedNodeElement = forceGraphRef.current.querySelector(`#${selectedNode}`);
      if (selectedNodeElement) {
        selectedNodeElement.classList.add('node-selected');
      }

      // Create connection lookup map for faster checks
      const connectionMap = new Map();
      allConnections.forEach(connection => {
        const from = connection.dataset.from;
        const to = connection.dataset.to;
        
        if (from === selectedNode || to === selectedNode) {
          connection.classList.add('node-connection-selected');
          
          // Map connected nodes for faster lookup
          if (from === selectedNode) {
            connectionMap.set(to, true);
          } else {
            connectionMap.set(from, true);
          }
        } else {
          connection.classList.remove('node-connection-selected');
        }
      });

      // Find and highlight connected nodes using the lookup map
      allNodes.forEach(node => {
        const nodeId = node.id;
        if (connectionMap.has(nodeId)) {
          node.classList.add('node-connected');
        } else if (nodeId !== selectedNode) {
          node.classList.remove('node-connected');
        }
      });
    } else {
      // Remove any previous selections in batches
      forceGraphRef.current.querySelectorAll('.node-selected').forEach(node => {
        node.classList.remove('node-selected');
      });
      forceGraphRef.current.querySelectorAll('.node-connected').forEach(node => {
        node.classList.remove('node-connected');
      });
      forceGraphRef.current.querySelectorAll('.node-connection-selected').forEach(conn => {
        conn.classList.remove('node-connection-selected');
      });
    }
  }, [currentPhase, showLabels, selectedNode]);
  
  // Apply the optimized DOM updates
  useEffect(() => {
    // Use requestAnimationFrame for smoother visual updates
    if (typeof window !== 'undefined') {
      requestAnimationFrame(updateNodeStates);
    }
  }, [updateNodeStates]);

  // Handler for node click - memoized to prevent recreation on each render
  const handleNodeClick = useCallback((nodeId) => {
    if (selectedNode === nodeId) {
      setSelectedNode(null); // Deselect if already selected
    } else {
      setSelectedNode(nodeId); // Select the node
    }
  }, [selectedNode]);

  // Handler for phase button click - memoized to prevent recreation on each render
  const handlePhaseClick = useCallback((phaseIndex) => {
    setCurrentPhase(phaseIndex);
    setAutoPlay(false); // Stop auto-cycling when user selects a phase
  }, []);

  return (
    <div className={`force-graph-container ${fullscreen ? 'fullscreen' : ''}`}>
      {fullscreen && (
        <div className="force-graph-controls">
          <div className="phase-selector">
            {phaseData.map((phase, index) => (
              <button 
                key={index}
                className={`phase-button phase-${index} ${currentPhase === index ? 'active' : ''}`}
                onClick={() => handlePhaseClick(index)}
                style={{
                  '--phase-color': phase.color,
                  '--phase-name': `"${phase.name}"`
                }}
              >
                <span className="phase-icon">{phase.icon}</span>
                <span className="phase-name">{phase.name}</span>
              </button>
            ))}
            <button 
              className={`auto-play-button ${autoPlay ? 'active' : ''}`}
              onClick={() => setAutoPlay(!autoPlay)}
              title={autoPlay ? "Pause animation" : "Resume animation"}
            >
              {autoPlay ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>
          
          <div className="viewing-options">
            <button 
              className={`toggle-labels ${showLabels ? 'active' : ''}`}
              onClick={() => setShowLabels(!showLabels)}
            >
              {showLabels ? 'Hide Labels' : 'Show Labels'}
            </button>
            
            <div className="zoom-controls">
              <button 
                onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
                disabled={zoom <= 0.5}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <span>{Math.round(zoom * 100)}%</span>
              <button 
                onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
                disabled={zoom >= 2}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <button className="close-button" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
      
      {fullscreen && selectedNode && (
        <div className="node-details-panel">
          {useMemo(() => {
            // Find the selected node data
            let selectedNodeData = null;
            let selectedPhase = null;
            let selectedPhaseIndex = null;
            
            // More efficient lookup
            for (let i = 0; i < phaseData.length; i++) {
              const phase = phaseData[i];
              const node = phase.nodes.find(n => n.id === selectedNode);
              if (node) {
                selectedNodeData = node;
                selectedPhase = phase;
                selectedPhaseIndex = i;
                break;
              }
            }
            
            if (!selectedNodeData) return null;
            
            const nodeEvent = selectedPhase.events.find(event => event.name === selectedNodeData.label);
            
            // Pre-calculate connections
            const relevantConnections = [...selectedPhase.connections, ...crossPhaseConnections]
              .filter(conn => conn.from === selectedNode || conn.to === selectedNode);
              
            // Create a lookup map for connected nodes
            const connectedNodesData = [];
            
            relevantConnections.forEach(conn => {
              const connectedNodeId = conn.from === selectedNode ? conn.to : conn.from;
              
              // Find connected node more efficiently
              for (let i = 0; i < phaseData.length; i++) {
                const phase = phaseData[i];
                const foundNode = phase.nodes.find(n => n.id === connectedNodeId);
                if (foundNode) {
                  connectedNodesData.push({
                    node: foundNode,
                    phase: i,
                    connection: conn
                  });
                  break;
                }
              }
            });
            
            return (
              <div className={`node-details phase-${selectedPhaseIndex}`}>
                <h3>{selectedNodeData.label}</h3>
                {nodeEvent && (
                  <div className="event-details">
                    <p>{nodeEvent.description}</p>
                    <p className="event-time">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {nodeEvent.time}
                    </p>
                    <p className="event-location">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {nodeEvent.location}
                    </p>
                    
                    <Link href="/schedule" className="event-link">
                      View on Schedule
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                )}
                
                <h4>Connected Activities</h4>
                <ul className="connected-nodes">
                  {connectedNodesData.map(({ node, phase, connection }) => (
                    <li 
                      key={node.id}
                      className={`connected-node phase-${phase}`}
                      onClick={() => handleNodeClick(node.id)}
                    >
                      <span className="connection-type">
                        {connection.label || (connection.from === selectedNode ? "leads to" : "follows from")}
                      </span>
                      <span className="connected-node-name">{node.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }, [selectedNode, phaseData, crossPhaseConnections, handleNodeClick])}
        </div>
      )}
      
      {fullscreen && !selectedNode && (
        <div className="phase-info-panel">
          {useMemo(() => {
            const currentPhaseData = phaseData[currentPhase];
            
            return (
              <>
                <h2 className={`phase-title phase-${currentPhase}`}>
                  <span className="phase-icon">{currentPhaseData.icon}</span>
                  {currentPhaseData.name} Phase
                </h2>
                <p className="phase-description">{currentPhaseData.description}</p>
                
                <div className="phase-events">
                  <h3>Key Events</h3>
                  <ul>
                    {currentPhaseData.events.map((event, index) => (
                      <li key={index} className="phase-event">
                        <h4>{event.name}</h4>
                        <p>{event.description}</p>
                        <div className="event-meta">
                          <span className="event-time">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {event.time}
                          </span>
                          <span className="event-location">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {event.location}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link href="/schedule" className="view-all-events">
                    View Full Schedule
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </>
            );
          }, [currentPhase, phaseData])}
        </div>
      )}
      
      <div 
        ref={forceGraphRef} 
        className={`force-graph ${fullscreen ? 'interactive' : ''}`}
        style={{ transform: fullscreen ? `scale(${zoom})` : 'none' }}
      >
        {useMemo(() => (
          <>
            {/* Background Star Field - always visible */}
            {backgroundStars.map((star, index) => (
              <div 
                key={index}
                className={`node node-tiny node-${star.type}`} 
                style={{ top: star.top, left: star.left }}
              ></div>
            ))}
            
            {/* Phase-specific nodes */}
            {phaseData.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="phase-group">
                {/* Nodes */}
                {phase.nodes.map((node, nodeIndex) => (
                  <div key={nodeIndex} className="node-wrapper">
                    <div
                      id={node.id}
                      className={`node node-${node.size} node-${phase.name.toLowerCase()} phase-${phaseIndex} node-${nodeIndex + 1}`}
                      style={{ top: node.top, left: node.left }}
                      onClick={() => fullscreen && handleNodeClick(node.id)}
                      onMouseEnter={() => fullscreen && setHoveredNode(node.id)}
                      onMouseLeave={() => fullscreen && setHoveredNode(null)}
                    ></div>
                    <div 
                      className={`node-label label-phase-${phaseIndex}`} 
                      style={{ top: node.top, left: node.left }}
                    >
                      {node.label}
                    </div>
                  </div>
                ))}
                
                {/* Connections within this phase */}
                {phase.connections.map((connection, connIndex) => {
                  // Find the nodes this connection connects
                  const fromNode = phase.nodes.find(n => n.id === connection.from);
                  const toNode = phase.nodes.find(n => n.id === connection.to);
                  
                  if (fromNode && toNode) {
                    return (
                      <div 
                        key={`${phaseIndex}-${connIndex}`}
                        className={`node-connection connection-phase-${phaseIndex}`}
                        data-from={connection.from}
                        data-to={connection.to}
                        style={{ 
                          top: fromNode.top, 
                          left: fromNode.left, 
                          width: connection.width, 
                          transform: `rotate(${connection.rotation})` 
                        }}
                      ></div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            
            {/* Cross-phase connections */}
            {crossPhaseConnections.map((connection, index) => (
              <div key={`cross-${index}`} className="cross-phase-connection">
                <div 
                  className="node-connection" 
                  style={{ 
                    top: connection.top, 
                    left: connection.left, 
                    width: connection.width, 
                    transform: `rotate(${connection.rotation})`,
                    opacity: 0.25 
                  }}
                  data-from={connection.from}
                  data-to={connection.to}
                ></div>
                {connection.label && (
                  <div 
                    className="node-label cross-phase-label" 
                    style={{ 
                      top: `calc(${connection.top} + ${connection.rotation.includes('-') ? '-' : ''}15%)`, 
                      left: `calc(${connection.left} + ${connection.rotation.includes('45') ? '10%' : '20%'})`,
                      fontSize: '9px', 
                      color: 'rgba(255,255,255,0.6)' 
                    }}
                  >
                    {connection.label}
                  </div>
                )}
              </div>
            ))}
          </>
        ), [backgroundStars, phaseData, crossPhaseConnections, fullscreen, handleNodeClick, setHoveredNode])}
      </div>
      
      {fullscreen && (
        <div className="interaction-hint">
          {selectedNode ? (
            <p>Click on another node to explore its connections, or click the same node to deselect.</p>
          ) : (
            <p>Click on any node to see details and connections.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForceGraph;