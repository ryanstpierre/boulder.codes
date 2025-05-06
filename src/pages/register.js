import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TagSelector from '../components/TagSelector';
import { registerWithTags } from '../utils/api';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    githubUsername: '',
    role: '',
    hackathonExperience: '',
    pastAttendance: false,
    hasTeam: false,
    teamSize: '',
    projectIdea: '',
    skills: '',
    interests: '',
    dietaryRestrictions: '',
    additionalNotes: '',
    tags: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Use our API utility to register user with tags
      const result = await registerWithTags(formData);
      
      // Success!
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        githubUsername: '',
        role: '',
        hackathonExperience: '',
        pastAttendance: false,
        hasTeam: false,
        teamSize: '',
        projectIdea: '',
        skills: '',
        interests: '',
        dietaryRestrictions: '',
        additionalNotes: '',
        tags: []
      });
      
      // Save registration ID in localStorage for reference
      if (result.registrationId) {
        localStorage.setItem('builders_room_registration_id', result.registrationId);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific errors
      if (error.message.includes('already registered')) {
        setSubmitError('This email address is already registered. Please use a different email.');
      } else {
        setSubmitError(error.message || 'There was an error submitting your registration. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Head>
        <title>Register | boulder.codes - Boulder Startup Week Builders&apos; Room</title>
        <meta name="description" content="Register for the premier hackathon at Boulder Startup Week, hosted by boulder.codes" />
      </Head>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Register for Builders&apos; Room</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join us for an exciting 4-day hackathon experience during Boulder Startup Week
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-2 bg-blue-900/30 border border-blue-700/30 rounded-lg p-5">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-medium text-blue-300 mb-2">Registration Information</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Event runs Monday, May 12th through Thursday, May 15th</li>
                    <li>• Registration fee: $50 (waived for students with valid ID)</li>
                    <li>• Space is limited to 100 participants</li>
                    <li>• All meals and snacks included</li>
                    <li>• You'll receive a confirmation email after registering</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="h-60 md:h-auto rounded-lg overflow-hidden">
              <img 
                src="/images/BSW_Builders_Room%20-%2020.jpeg" 
                alt="Hackathon Participants" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {submitSuccess ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-green-900/80 to-blue-900/80 backdrop-blur-sm p-8 rounded-lg text-center shadow-xl border border-green-700/50 mb-8">
              <div className="h-20 w-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
              <p className="mb-6 text-gray-300">
                Thank you for registering for the Builders' Room hackathon. We've sent a confirmation email to your inbox with all the details you'll need.
              </p>
              <p className="text-green-300 mb-8">We can't wait to see what you'll build!</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Link href="/schedule" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors">
                  View Event Schedule
                </Link>
                <a href="https://boulderstartupweek.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors">
                  Explore BSW Events
                </a>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-center mb-6">What to Expect at the Hackathon</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              <img src="/images/BSW_Builders_Room%20-%204.jpeg" alt="Hackathon Experience" className="w-full h-40 object-cover rounded-lg" />
              <img src="/images/BSW_Builders_Room%20-%2010.jpeg" alt="Hackathon Experience" className="w-full h-40 object-cover rounded-lg" />
              <img src="/images/BSW_Builders_Room%20-%2023.jpeg" alt="Hackathon Experience" className="w-full h-40 object-cover rounded-lg" />
              <img src="/images/BSW_Builders_Room%20-%2024.jpeg" alt="Hackathon Experience" className="w-full h-40 object-cover rounded-lg" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-slate-800/70 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-slate-700/50">
            {submitError && (
              <div className="bg-red-900/80 border border-red-700 text-white p-4 rounded-lg mb-6">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              </div>
            )}
            
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-blue-300 mb-4 pb-2 border-b border-slate-700">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block mb-2 font-medium text-gray-200">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 font-medium text-gray-200">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-gray-200">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="githubUsername" className="block mb-2 font-medium text-gray-200">GitHub Username (Optional)</label>
                  <input
                    type="text"
                    id="githubUsername"
                    name="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            
            {/* Professional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-blue-300 mb-4 pb-2 border-b border-slate-700">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="role" className="block mb-2 font-medium text-gray-200">Your Role *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  >
                    <option value="">Select your role</option>
                    <option value="developer">Developer</option>
                    <option value="designer">Designer</option>
                    <option value="product">Product Manager</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="skills" className="block mb-2 font-medium text-gray-200">Your Skills</label>
                  <TagSelector 
                    selectedTags={formData.tags}
                    onChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                  />
                  <p className="mt-1 text-xs text-gray-400">Select or add your skills and technologies</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="interests" className="block mb-2 font-medium text-gray-200">Areas of Interest</label>
                <input
                  type="text"
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="AI, Web3, Climate Tech, etc."
                  className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
            </div>
            
            {/* Hackathon Experience */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-blue-300 mb-4 pb-2 border-b border-slate-700">Hackathon Experience</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="hackathonExperience" className="block mb-2 font-medium text-gray-200">Hackathon Experience</label>
                  <select
                    id="hackathonExperience"
                    name="hackathonExperience"
                    value={formData.hackathonExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  >
                    <option value="">Select your experience level</option>
                    <option value="first">This is my first hackathon</option>
                    <option value="few">I've participated in a few hackathons</option>
                    <option value="experienced">I'm a hackathon veteran</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pastAttendance"
                    name="pastAttendance"
                    checked={formData.pastAttendance}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <label htmlFor="pastAttendance" className="ml-3 text-gray-200">
                    I've attended Boulder Startup Week Builders' Room before
                  </label>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="hasTeam"
                  name="hasTeam"
                  checked={formData.hasTeam}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-opacity-50"
                />
                <label htmlFor="hasTeam" className="ml-3 text-gray-200">
                  I'm signing up on behalf of a team
                </label>
              </div>
              
              {formData.hasTeam && (
                <div className="mb-6 ml-8">
                  <label htmlFor="teamSize" className="block mb-2 font-medium text-gray-200">How many people are on your team?</label>
                  <input
                    type="number"
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleChange}
                    min="2"
                    className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="projectIdea" className="block mb-2 font-medium text-gray-200">Project Idea or Concept</label>
                <textarea
                  id="projectIdea"
                  name="projectIdea"
                  value={formData.projectIdea}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  placeholder="Briefly describe your project idea or areas of interest, if you have any"
                ></textarea>
              </div>
            </div>
            
            {/* Event Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-blue-300 mb-4 pb-2 border-b border-slate-700">Event Details</h3>
              <div className="mb-6">
                <label htmlFor="dietaryRestrictions" className="block mb-2 font-medium text-gray-200">Dietary Restrictions</label>
                <input
                  type="text"
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  placeholder="Vegetarian, Vegan, Gluten-free, etc."
                  className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                />
              </div>
              
              <div>
                <label htmlFor="additionalNotes" className="block mb-2 font-medium text-gray-200">Additional Notes (Optional)</label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700/70 border border-slate-600 text-white focus:border-blue-500 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none"
                  placeholder="Anything else you'd like us to know..."
                ></textarea>
              </div>
            </div>
            
            <div className="flex items-center mb-8 bg-slate-700/40 p-4 rounded-lg border border-slate-600/50">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-5 h-5 text-blue-600 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-opacity-50"
              />
              <label htmlFor="terms" className="ml-3 text-gray-300">
                I agree to the <a href="#" className="text-blue-400 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-400 hover:underline">Code of Conduct</a>
              </label>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 py-3 px-4 text-center font-bold rounded-lg text-white transition-all ${
                  isSubmitting 
                    ? 'bg-blue-800 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-600/20'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Register for the Hackathon'}
              </button>
              
              <a 
                href="https://boulderstartupweek.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 text-center font-bold rounded-lg text-white bg-slate-700 hover:bg-slate-600 transition-all text-center"
              >
                View BSW Schedule
              </a>
            </div>
          </form>
        )}
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-gray-400">
            Questions about registration? Contact us at{' '}
            <a href="mailto:builders@boulder.codes" className="text-blue-400 hover:underline">builders@boulder.codes</a>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}