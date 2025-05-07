import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BSWLogo from './BSWLogo';

const BSWBanner = () => {
  return (
    <div className="bg-[#0078B8] text-white py-1 sm:py-2 shadow-lg relative overflow-hidden z-50">
      {/* Abstract shapes */}
      <div className="absolute left-1/4 -top-6 w-32 h-32 bg-[rgba(var(--bsw-blue-light),0.3)] rounded-full filter blur-3xl"></div>
      <div className="absolute right-1/4 -bottom-6 w-24 h-24 bg-[rgba(255,255,255,0.15)] rounded-full filter blur-2xl"></div>
      
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between relative z-10">
        <div className="flex items-center mb-2 sm:mb-0">
          <BSWLogo variant="mark" className="mr-2 rotate-hover" withGlow />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-bold mr-2 relative glow-text text-xs sm:text-sm md:text-base">
              <span className="hidden sm:inline">An Official</span>
              <span className="fun-text text-[#FFCD5E] mx-1 inline-block transform -rotate-1">Boulder Startup Week</span> 
              <span className="hidden sm:inline">Event</span>
              <span className="absolute -top-2 -right-1 text-yellow-300 text-xs sparkle sparkle-1">✨</span>
            </span>
            <span className="text-xs sm:text-sm bg-[rgba(var(--bsw-blue-dark),0.4)] px-2 sm:px-3 py-0.5 rounded-full backdrop-blur-sm border border-[rgba(255,255,255,0.25)] shadow-[0_0_10px_rgba(255,255,255,0.1)] font-medium">
              May 12-15, 2025
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="hidden sm:inline-block text-xs sm:text-sm mr-2 font-medium">Presented by</span>
          <span className="text-xs sm:text-base font-extrabold mr-1 sm:mr-2 rotate-hover inline-block">
            <span className="text-[#A8D8FF]">boulder</span><span className="text-white">.</span><span className="text-[#9EFFCF]">codes</span>
          </span>
          <a 
            href="https://boulderstartupweek.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm bg-white text-[#0078B8] hover:bg-white/90 ml-1 sm:ml-3 border-0 rounded-full font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex items-center"
          >
            Visit BSW
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BSWBanner;