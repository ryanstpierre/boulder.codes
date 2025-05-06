import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Simple admin authentication
const ADMIN_KEY = '7565488aab1fceabbf352454cee96b8e'; // This would normally be stored server-side

export default function AdminTags() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUnapproved, setShowUnapproved] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingTag, setEditingTag] = useState(null);
  const [newTagData, setNewTagData] = useState({
    name: '',
    category: 'custom'
  });

  // Check if admin is authenticated on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('adminKey');
    if (storedKey === ADMIN_KEY) {
      setIsAuthorized(true);
      setAdminKey(storedKey);
    }
  }, []);

  // Fetch tags when authorized
  useEffect(() => {
    if (isAuthorized) {
      fetchTags();
    }
  }, [isAuthorized, showUnapproved, showHidden]);

  // Filter tags based on search and category
  useEffect(() => {
    if (!tags.length) {
      setFilteredTags([]);
      return;
    }

    let filtered = [...tags];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tag => 
        tag.name.toLowerCase().includes(term) || 
        tag.category.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tag => tag.category === activeCategory);
    }

    // Sort by usage count and name
    filtered.sort((a, b) => {
      if (b.usage_count !== a.usage_count) {
        return b.usage_count - a.usage_count;
      }
      return a.name.localeCompare(b.name);
    });

    setFilteredTags(filtered);
  }, [tags, searchTerm, activeCategory]);

  // Fetch all tags from the API
  const fetchTags = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Build query parameters
      const params = new URLSearchParams();
      if (!showUnapproved) params.append('approved', 'true');
      if (showHidden) params.append('hidden', 'true');

      const response = await fetch(`/api/tags?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${adminKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tags');
      }

      const data = await response.json();

      if (data.success) {
        setTags(data.data || []);

        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(data.data.map(tag => tag.category))];
        setCategories(uniqueCategories);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error fetching tags:', err);
      setError('Failed to load tags: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle admin authentication
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminKey === ADMIN_KEY) {
      setIsAuthorized(true);
      localStorage.setItem('adminKey', adminKey);
    } else {
      setError('Invalid API key');
    }
  };

  // Handle tag update
  const updateTag = async (tagId, updates) => {
    try {
      setError('');
      
      const response = await fetch(`/api/tags?id=${tagId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify(updates)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update tag');
      }
      
      if (data.success) {
        // Update the tag in local state
        setTags(prevTags => 
          prevTags.map(tag => 
            tag.id === tagId ? { ...tag, ...updates } : tag
          )
        );
        setEditingTag(null);
      }
    } catch (err) {
      console.error('Error updating tag:', err);
      setError('Failed to update tag: ' + err.message);
    }
  };

  // Handle creating a new tag
  const createTag = async (e) => {
    e.preventDefault();
    
    if (!newTagData.name || !newTagData.category) {
      setError('Name and category are required');
      return;
    }
    
    try {
      setError('');
      
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminKey}`
        },
        body: JSON.stringify(newTagData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tag');
      }
      
      if (data.success) {
        // Add the new tag to local state
        setTags(prevTags => [...prevTags, data.data]);
        
        // Reset form
        setNewTagData({
          name: '',
          category: 'custom'
        });
      }
    } catch (err) {
      console.error('Error creating tag:', err);
      setError('Failed to create tag: ' + err.message);
    }
  };

  // Toggle tag approval status
  const toggleApproval = (tagId) => {
    const tag = tags.find(t => t.id === tagId);
    if (tag) {
      updateTag(tagId, { approved: !tag.approved });
    }
  };

  // Toggle tag visibility
  const toggleVisibility = (tagId) => {
    const tag = tags.find(t => t.id === tagId);
    if (tag) {
      updateTag(tagId, { hidden: !tag.hidden });
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <Head>
          <title>Admin | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
        </Head>
        
        <Navbar />
        
        <main className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
            
            {error && (
              <div className="bg-red-900/80 border border-red-700 text-white p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="bg-slate-800 p-6 rounded-lg shadow-lg">
              <div className="mb-6">
                <label htmlFor="adminKey" className="block mb-2 font-medium text-gray-200">Admin API Key</label>
                <input
                  type="password"
                  id="adminKey"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Admin: Tag Management | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Tag Management</h1>
            
            <div className="flex space-x-2">
              <Link 
                href="/admin" 
                className="py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Admin Home
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('adminKey');
                  setIsAuthorized(false);
                }}
                className="py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-900/80 border border-red-700 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left panel - Tag filters */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Filters</h2>
              
              <div className="mb-4">
                <label htmlFor="searchTerm" className="block mb-2 font-medium text-gray-200">Search</label>
                <input
                  type="text"
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tags..."
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 font-medium text-gray-200">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showUnapproved}
                    onChange={() => setShowUnapproved(!showUnapproved)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-200">Show unapproved tags</span>
                </label>
                
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHidden}
                    onChange={() => setShowHidden(!showHidden)}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-200">Show hidden tags</span>
                </label>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={fetchTags}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Refresh Tags
                </button>
              </div>
            </div>
            
            {/* Center panel - Tag list */}
            <div className="bg-slate-800 rounded-lg p-6 shadow-lg lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">Tags ({filteredTags.length})</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : filteredTags.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  {searchTerm ? 'No tags match your search.' : 'No tags found.'}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-slate-700">
                      <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Usage</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTags.map(tag => (
                        <tr key={tag.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                          <td className="p-3 font-medium">
                            {editingTag === tag.id ? (
                              <input
                                type="text"
                                value={tag.name}
                                onChange={(e) => setTags(prevTags => 
                                  prevTags.map(t => 
                                    t.id === tag.id ? { ...t, name: e.target.value } : t
                                  )
                                )}
                                className="w-full px-2 py-1 rounded bg-slate-700 border border-slate-600 text-white"
                              />
                            ) : (
                              tag.name
                            )}
                          </td>
                          <td className="p-3">
                            {editingTag === tag.id ? (
                              <select
                                value={tag.category}
                                onChange={(e) => setTags(prevTags => 
                                  prevTags.map(t => 
                                    t.id === tag.id ? { ...t, category: e.target.value } : t
                                  )
                                )}
                                className="w-full px-2 py-1 rounded bg-slate-700 border border-slate-600 text-white"
                              >
                                {categories.filter(c => c !== 'all').map(category => (
                                  <option key={category} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="px-2 py-1 text-xs rounded-full bg-slate-700">
                                {tag.category}
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-gray-400">{tag.usage_count}</td>
                          <td className="p-3">
                            <div className="flex flex-col space-y-1">
                              <span className={`text-xs ${tag.approved ? 'text-green-400' : 'text-yellow-400'}`}>
                                {tag.approved ? 'Approved' : 'Unapproved'}
                              </span>
                              {tag.hidden && (
                                <span className="text-xs text-red-400">Hidden</span>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              {editingTag === tag.id ? (
                                <>
                                  <button
                                    onClick={() => updateTag(tag.id, {
                                      name: tag.name,
                                      category: tag.category
                                    })}
                                    className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingTag(null)}
                                    className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-700 text-white rounded"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => setEditingTag(tag.id)}
                                    className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => toggleApproval(tag.id)}
                                    className={`px-2 py-1 text-xs ${
                                      tag.approved
                                        ? 'bg-yellow-600 hover:bg-yellow-700'
                                        : 'bg-green-600 hover:bg-green-700'
                                    } text-white rounded`}
                                  >
                                    {tag.approved ? 'Unapprove' : 'Approve'}
                                  </button>
                                  <button
                                    onClick={() => toggleVisibility(tag.id)}
                                    className={`px-2 py-1 text-xs ${
                                      tag.hidden
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-red-600 hover:bg-red-700'
                                    } text-white rounded`}
                                  >
                                    {tag.hidden ? 'Unhide' : 'Hide'}
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Create new tag form */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h3 className="text-lg font-bold mb-4">Create New Tag</h3>
                
                <form onSubmit={createTag} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tagName" className="block mb-1 font-medium text-gray-200">Tag Name</label>
                    <input
                      type="text"
                      id="tagName"
                      value={newTagData.name}
                      onChange={(e) => setNewTagData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter tag name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="tagCategory" className="block mb-1 font-medium text-gray-200">Category</label>
                    <select
                      id="tagCategory"
                      value={newTagData.category}
                      onChange={(e) => setNewTagData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      required
                    >
                      {categories.filter(c => c !== 'all').map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                      <option value="custom">Custom</option>
                      <option value="language">Language</option>
                      <option value="framework">Framework</option>
                      <option value="database">Database</option>
                      <option value="cloud">Cloud</option>
                      <option value="devops">DevOps</option>
                      <option value="design">Design</option>
                      <option value="mobile">Mobile</option>
                      <option value="ai">AI/ML</option>
                      <option value="technology">Technology</option>
                      <option value="business">Business</option>
                      <option value="process">Process</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Create Tag
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}