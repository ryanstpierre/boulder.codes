import React from 'react';
import Image from 'next/image';

// This component provides both the full BSW logo and the mark
// Props:
// - variant: 'full' or 'mark' (default: 'full')
// - className: additional classes for styling
// - withGlow: adds a subtle glow effect (default: false)

const BSWLogo = ({ variant = 'full', className = '', withGlow = false }) => {
  const glowEffect = withGlow ? 'filter drop-shadow-[0_0_8px_rgba(10,138,205,0.6)]' : '';
  
  // The small mark for condensed spaces
  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Image 
          src="/images/bsw.svg" 
          alt="Boulder Startup Week Logo" 
          width={24} 
          height={28} 
          className={`h-6 w-auto transition-transform duration-300 ${glowEffect}`}
          priority={false}
        />
      </div>
    );
  }

  // Full BSW logo
  return (
    <div className={`inline-flex items-center group ${className}`}>
      <Image 
        src="/images/bsw.svg" 
        alt="Boulder Startup Week Logo" 
        width={30} 
        height={36} 
        className={`h-7 w-auto mr-2 transition-transform duration-300 group-hover:scale-110 ${glowEffect}`}
        priority={false}
      />
      
      {/* Text part of the logo */}
      <div className="font-bold text-sm md:text-base">
        <span className="text-[rgba(var(--bsw-blue),1)] glow-text">BOULDER</span>
        <span className="text-[rgba(var(--bsw-blue),1)] block -mt-1 glow-text">STARTUP WEEK</span>
      </div>
    </div>
  );
};

export default BSWLogo;