import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Simple admin authentication
const ADMIN_KEY = '7565488aab1fceabbf352454cee96b8e'; // This would normally be stored server-side

export default function AdminHome() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    pendingTags: 0,
    userCount: 0
  });

  // Check if admin is authenticated on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('adminKey');
    if (storedKey === ADMIN_KEY) {
      setIsAuthorized(true);
      setAdminKey(storedKey);
    }
  }, []);

  // Fetch stats when authorized
  useEffect(() => {
    if (isAuthorized) {
      fetchStats();
    }
  }, [isAuthorized]);

  // Fetch stats from API
  const fetchStats = async () => {
    try {
      // Get registrations count
      const regsResponse = await fetch('/api/registrations?limit=1', {
        headers: {
          'Authorization': `Bearer ${ADMIN_KEY}`
        }
      });
      
      if (!regsResponse.ok) {
        throw new Error('Failed to fetch registration data');
      }
      
      const regsData = await regsResponse.json();
      
      // Get tags data
      const tagsResponse = await fetch('/api/tags?approved=false', {
        headers: {
          'Authorization': `Bearer ${adminKey}`
        }
      });
      
      if (!tagsResponse.ok) {
        throw new Error('Failed to fetch tags data');
      }
      
      const tagsData = await tagsResponse.json();
      
      // Update stats
      setStats({
        totalRegistrations: regsData.meta?.total || 0,
        pendingTags: (tagsData.data || []).filter(tag => !tag.approved).length,
        userCount: 0 // This would require a separate endpoint
      });
      
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load admin statistics');
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
        <title>Admin: Dashboard | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Admin Dashboard</h1>
            
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
          
          {error && (
            <div className="bg-red-900/80 border border-red-700 text-white p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-blue-300">Registrations</h3>
              <div className="text-4xl font-bold">{stats.totalRegistrations}</div>
              <p className="mt-2 text-gray-400">Total hackathon registrations</p>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-2 text-yellow-300">Pending Tags</h3>
              <div className="text-4xl font-bold">{stats.pendingTags}</div>
              <p className="mt-2 text-gray-400">Tags awaiting approval</p>
            </div>
          </div>
          
          {/* Admin actions */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Admin Actions</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/admin/tags"
                className="flex flex-col items-center p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">Manage Tags</h3>
                <p className="text-sm text-center text-gray-300">
                  Approve, hide, or edit skill tags
                </p>
              </Link>
              
              <Link
                href="/api/registrations"
                className="flex flex-col items-center p-6 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">View Registrations</h3>
                <p className="text-sm text-center text-gray-300">
                  Access registration data
                </p>
              </Link>
              
              <div
                className="flex flex-col items-center p-6 bg-slate-700 cursor-not-allowed opacity-70 rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-bold mb-2">Event Management</h3>
                <p className="text-sm text-center text-gray-300">
                  Coming soon
                </p>
              </div>
            </div>
          </div>
          
          {/* Documentation */}
          <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Documentation</h2>
            
            <div className="prose prose-invert max-w-none">
              <p>
                Welcome to the Builders' Room admin dashboard. From here you can:
              </p>
              
              <ul>
                <li>Manage skill tags: approve user-submitted tags, hide inappropriate tags, and edit tag metadata</li>
                <li>View and export registration data</li>
                <li>Monitor event statistics</li>
              </ul>
              
              <h3>API Access</h3>
              <p>
                Registration data can be accessed via API using your admin key:
              </p>
              
              <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
                <code>
{`curl -X GET "https://buildersroom.boulder.codes/api/registrations" \\
  -H "Authorization: Bearer ${ADMIN_KEY}"`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}