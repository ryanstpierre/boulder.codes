import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchRegistrations } from '../../utils/api';

export default function CommunityDirectory() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Fetch community members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // In a real implementation, this would make an API call with proper auth
        // We're simulating the API call for now
        const result = await fetchRegistrations(); 
        
        // Filter to only show community members (not hackathon registrations)
        const communityMembers = result.filter(member => member.registrationType === 'community');
        setMembers(communityMembers);
        
        // Extract all unique skills across members
        const skills = new Set();
        communityMembers.forEach(member => {
          if (member.tags && Array.isArray(member.tags)) {
            member.tags.forEach(tag => skills.add(tag.name));
          }
        });
        
        setAvailableSkills(Array.from(skills).sort());
      } catch (err) {
        console.error('Error fetching community members:', err);
        setError('Failed to load community members. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMembers();
  }, []);

  // Filter members based on search term and filters
  useEffect(() => {
    if (!members.length) return;
    
    let filtered = [...members];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(member => 
        member.firstName.toLowerCase().includes(term) ||
        member.lastName.toLowerCase().includes(term) ||
        member.company?.toLowerCase().includes(term) ||
        member.skills?.toLowerCase().includes(term) ||
        member.interests?.toLowerCase().includes(term) ||
        member.bio?.toLowerCase().includes(term) ||
        (member.tags && member.tags.some(tag => tag.name.toLowerCase().includes(term)))
      );
    }
    
    // Apply specialty filter
    if (selectedFilter !== 'all') {
      switch (selectedFilter) {
        case 'hiring':
          filtered = filtered.filter(member => member.lookingToHire);
          break;
        case 'looking-for-work':
          filtered = filtered.filter(member => member.lookingForWork);
          break;
        case 'collaboration':
          filtered = filtered.filter(member => member.openToCollaboration);
          break;
        case 'remote':
          filtered = filtered.filter(member => member.remote);
          break;
      }
    }
    
    // Apply skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(member => 
        selectedSkills.every(skill => 
          member.tags && member.tags.some(tag => tag.name === skill)
        )
      );
    }
    
    setFilteredMembers(filtered);
  }, [members, searchTerm, selectedFilter, selectedSkills]);

  // Toggle a skill in the filter
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedFilter('all');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Community Directory | boulder.codes</title>
        <meta name="description" content="Browse boulder.codes community members, find collaborators, and connect with Boulder's tech ecosystem." />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-[#0a8acd]/20 text-[#0a8acd] text-sm font-medium mb-4">
              boulder.codes Community
            </div>
            <h1 className="text-4xl font-bold mb-4">Developer Directory</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find and connect with tech professionals in Boulder
            </p>
          </div>
          
          {/* Call to action card */}
          <div className="mb-12 bg-gradient-to-br from-slate-800 to-slate-900 border border-[#0a8acd]/30 rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="p-8 md:flex-1">
                <h2 className="text-2xl font-bold text-[#0a8acd] mb-2">Join Our Community</h2>
                <p className="text-gray-300 mb-5">
                  Showcase your skills, find collaborators for side projects, or connect with potential employers.
                  Add your profile to our community directory today!
                </p>
                <Link href="/community" className="inline-block bg-[#0a8acd] hover:bg-[#0a8acd]/80 text-white font-bold py-2 px-6 rounded-full transition-all">
                  Create Your Profile
                </Link>
              </div>
              <div className="md:w-1/3 bg-slate-800">
                <img 
                  src="/images/BSW_Builders_Room%20-%2013.jpeg" 
                  alt="Boulder Tech Community" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          
          {/* Filters Section */}
          <div className="mb-10 bg-slate-800 rounded-lg p-6 border border-slate-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center mb-6 gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input 
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search by name, skills, or company..." 
                    className="block w-full pl-10 pr-4 py-2 border border-slate-600 rounded-lg bg-slate-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a8acd]/50"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  value={selectedFilter}
                  onChange={e => setSelectedFilter(e.target.value)}
                  className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0a8acd]/50"
                >
                  <option value="all">All Members</option>
                  <option value="hiring">Hiring/Recruiting</option>
                  <option value="looking-for-work">Looking for Work</option>
                  <option value="collaboration">Open to Collaboration</option>
                  <option value="remote">Working Remotely</option>
                </select>
                
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white rounded-lg px-4 py-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear Filters
                </button>
              </div>
            </div>
            
            {/* Skills Filters */}
            <div>
              <h3 className="text-lg font-medium text-gray-200 mb-3">Filter by Skills</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {availableSkills.slice(0, 20).map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedSkills.includes(skill)
                        ? 'bg-[#0a8acd] text-white'
                        : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                
                {availableSkills.length > 20 && (
                  <span className="px-3 py-1 text-sm rounded-full bg-slate-700 text-gray-300">
                    +{availableSkills.length - 20} more
                  </span>
                )}
              </div>
              
              {/* Selected skills display */}
              {selectedSkills.length > 0 && (
                <div className="flex items-center gap-2 mb-1 text-sm text-gray-400">
                  <span>Selected skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSkills.map(skill => (
                      <span key={skill} className="bg-[#0a8acd]/20 text-[#0a8acd] px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6 text-gray-300 flex justify-between items-center">
            <span>
              {isLoading 
                ? 'Loading members...' 
                : `Showing ${filteredMembers.length} of ${members.length} community members`
              }
            </span>
            
            {filteredMembers.length === 0 && !isLoading && (
              <button
                onClick={clearFilters}
                className="text-[#0a8acd] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
          
          {/* Members Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <svg className="animate-spin h-10 w-10 text-[#0a8acd]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-900/30 border border-red-700 text-white p-6 rounded-lg text-center">
              <p className="text-lg font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-300 mb-2">No members found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search filters or clearing them to see all community members.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-[#0a8acd] hover:bg-[#0a8acd]/80 text-white rounded-full font-medium transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredMembers.map(member => (
                <div key={member.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700/50 transition-transform hover:scale-[1.02]">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-gray-400">{member.role}</p>
                        {member.company && (
                          <p className="text-[#0a8acd]">{member.company}</p>
                        )}
                      </div>
                      
                      <div className="h-12 w-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-[#0a8acd]">
                        {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                      </div>
                    </div>
                    
                    {/* Member badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.lookingForWork && (
                        <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          Looking for Work
                        </span>
                      )}
                      {member.lookingToHire && (
                        <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                          Hiring
                        </span>
                      )}
                      {member.openToCollaboration && (
                        <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                          Open to Collaboration
                        </span>
                      )}
                      {member.remote && (
                        <span className="inline-block px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                    
                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.tags?.slice(0, 6).map(tag => (
                          <span key={tag.id} className="text-xs px-2 py-1 bg-slate-700 text-gray-300 rounded-full">
                            {tag.name}
                          </span>
                        ))}
                        {member.tags?.length > 6 && (
                          <span className="text-xs px-2 py-1 bg-slate-700 text-gray-400 rounded-full">
                            +{member.tags.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Bio */}
                    {member.bio && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">About</h4>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {member.bio}
                        </p>
                      </div>
                    )}
                    
                    {/* Side projects */}
                    {member.sideProjects && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-1">Projects & Collaboration</h4>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {member.sideProjects}
                        </p>
                      </div>
                    )}
                    
                    {/* Social links */}
                    <div className="flex gap-2 mt-4">
                      {member.githubUsername && (
                        <a
                          href={`https://github.com/${member.githubUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="GitHub"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                          </svg>
                        </a>
                      )}
                      {member.personalWebsite && (
                        <a
                          href={member.personalWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Personal Website"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </a>
                      )}
                      {member.twitterHandle && (
                        <a
                          href={`https://twitter.com/${member.twitterHandle}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="Twitter/X"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {member.linkedInProfile && (
                        <a
                          href={member.linkedInProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          aria-label="LinkedIn"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-700 px-6 py-4 bg-slate-800/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">
                        Joined {new Date(member.created_at).toLocaleDateString()}
                      </span>
                      
                      <Link
                        href={`/community/profile/${member.id}`}
                        className="inline-flex items-center text-[#0a8acd] hover:text-[#0a8acd]/80"
                      >
                        <span>View Profile</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Join CTA */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-[#0a8acd]/20 to-slate-800 p-8 rounded-lg border border-[#0a8acd]/30">
              <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Connect with like-minded developers, showcase your skills, and discover collaboration opportunities
                by creating your profile on boulder.codes
              </p>
              <Link href="/community" className="inline-block px-6 py-3 bg-[#0a8acd] hover:bg-[#0a8acd]/80 text-white font-bold rounded-full transition-all">
                Create Your Profile
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}