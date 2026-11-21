import React from 'react';

interface CountryFlagProps {
  code: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ code, className = '', size = 'md' }) => {
  const c = code.toUpperCase();

  const dims = size === 'sm' ? 'w-4 h-3 text-[9px]' : size === 'lg' ? 'w-7 h-5 text-xs' : 'w-5 h-3.5 text-[10px]';

  // SVG Flags mapped to ISO code
  switch (c) {
    case 'NL': // Netherlands (Red, White, Blue)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#21468B" width="9" height="6" />
          <rect fill="#FFF" width="9" height="4" />
          <rect fill="#AE1C28" width="9" height="2" />
        </svg>
      );
    case 'GB': // Great Britain (Union Jack)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 60 30">
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      );
    case 'IT': // Italy (Green, White, Red)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#CE2B37" width="9" height="6" />
          <rect fill="#FFF" width="6" height="6" />
          <rect fill="#009246" width="3" height="6" />
        </svg>
      );
    case 'MC': // Monaco (Red, White)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#FFF" width="9" height="6" />
          <rect fill="#CE1126" width="9" height="3" />
        </svg>
      );
    case 'ES': // Spain (Red, Yellow, Red)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#AA151B" width="9" height="6" />
          <rect fill="#F1BF00" y="1.5" width="9" height="3" />
        </svg>
      );
    case 'FR': // France (Blue, White, Red)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#ED2939" width="9" height="6" />
          <rect fill="#FFF" width="6" height="6" />
          <rect fill="#002395" width="3" height="6" />
        </svg>
      );
    case 'AU': // Australia (Navy, Union Jack canton, 7-point star)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#00008B" width="9" height="6" />
          <rect fill="#002395" width="4.5" height="3" />
          <path d="M0 0 L4.5 3 M4.5 0 L0 3" stroke="#fff" strokeWidth="0.6" />
          <path d="M2.25 0 v3 M0 1.5 h4.5" stroke="#fff" strokeWidth="1" />
          <path d="M2.25 0 v3 M0 1.5 h4.5" stroke="#C8102E" strokeWidth="0.6" />
          <circle cx="2.25" cy="4.5" r="0.8" fill="#fff" />
          <circle cx="6.75" cy="3" r="0.5" fill="#fff" />
        </svg>
      );
    case 'DE': // Germany (Black, Red, Gold)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#FFCE00" width="9" height="6" />
          <rect fill="#DD0000" width="9" height="4" />
          <rect fill="#000" width="9" height="2" />
        </svg>
      );
    case 'BR': // Brazil (Green, Yellow rhombus, Blue circle)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#009739" width="9" height="6" />
          <polygon points="4.5,0.7 8.3,3 4.5,5.3 0.7,3" fill="#FEDD00" />
          <circle cx="4.5" cy="3" r="1.3" fill="#012169" />
        </svg>
      );
    case 'JP': // Japan (White with Red Sun)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm border border-neutral-700/50 ${className}`} viewBox="0 0 9 6">
          <rect fill="#FFF" width="9" height="6" />
          <circle cx="4.5" cy="3" r="1.8" fill="#BC002D" />
        </svg>
      );
    case 'CA': // Canada (Red, White with Leaf)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#D80621" width="9" height="6" />
          <rect fill="#FFF" x="2.25" width="4.5" height="6" />
          <polygon points="4.5,1.5 4.8,2.8 5.8,2.2 5.2,3.2 6.1,3.8 4.9,4.2 4.5,4.9 4.1,4.2 2.9,3.8 3.8,3.2 3.2,2.2 4.2,2.8" fill="#D80621" />
        </svg>
      );
    case 'US': // USA (Stripes & Blue Canton)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#B22234" width="9" height="6" />
          <rect fill="#FFF" y="0.92" width="9" height="0.46" />
          <rect fill="#FFF" y="1.84" width="9" height="0.46" />
          <rect fill="#FFF" y="2.76" width="9" height="0.46" />
          <rect fill="#FFF" y="3.68" width="9" height="0.46" />
          <rect fill="#FFF" y="4.60" width="9" height="0.46" />
          <rect fill="#3C3B6E" width="3.6" height="3.22" />
        </svg>
      );
    case 'TH': // Thailand (Red, White, Blue, White, Red)
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#A51931" width="9" height="6" />
          <rect fill="#F4F5F8" y="1" width="9" height="4" />
          <rect fill="#2D2A4A" y="2" width="9" height="2" />
        </svg>
      );
    case 'NZ': // New Zealand
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#00247D" width="9" height="6" />
          <rect fill="#00247D" width="4.5" height="3" />
          <path d="M0 0 L4.5 3 M4.5 0 L0 3" stroke="#fff" strokeWidth="0.6" />
          <path d="M2.25 0 v3 M0 1.5 h4.5" stroke="#fff" strokeWidth="1" />
          <path d="M2.25 0 v3 M0 1.5 h4.5" stroke="#CC142B" strokeWidth="0.6" />
          <circle cx="6.5" cy="2.5" r="0.4" fill="#CC142B" stroke="#fff" strokeWidth="0.1" />
          <circle cx="7.5" cy="3.5" r="0.4" fill="#CC142B" stroke="#fff" strokeWidth="0.1" />
        </svg>
      );
    case 'BH': // Bahrain
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#CE1126" width="9" height="6" />
          <polygon points="0,0 2.5,0 3.5,0.6 2.5,1.2 3.5,1.8 2.5,2.4 3.5,3 2.5,3.6 3.5,4.2 2.5,4.8 3.5,5.4 2.5,6 0,6" fill="#FFF" />
        </svg>
      );
    case 'SA': // Saudi Arabia
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#006C35" width="9" height="6" />
          <rect fill="#FFF" x="2" y="3.5" width="5" height="0.5" />
        </svg>
      );
    case 'AT': // Austria
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#ED2939" width="9" height="6" />
          <rect fill="#FFF" y="2" width="9" height="2" />
        </svg>
      );
    case 'HU': // Hungary
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#388D5E" width="9" height="6" />
          <rect fill="#FFF" width="9" height="4" />
          <rect fill="#CE2939" width="9" height="2" />
        </svg>
      );
    case 'BE': // Belgium
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#ED2939" width="9" height="6" />
          <rect fill="#FAE042" width="6" height="6" />
          <rect fill="#000" width="3" height="6" />
        </svg>
      );
    case 'AZ': // Azerbaijan
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#3F9C35" width="9" height="6" />
          <rect fill="#ED1B24" width="9" height="4" />
          <rect fill="#00B5E2" width="9" height="2" />
          <circle cx="4.5" cy="3" r="0.8" fill="#FFF" />
        </svg>
      );
    case 'SG': // Singapore
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#FFF" width="9" height="6" />
          <rect fill="#EE2536" width="9" height="3" />
        </svg>
      );
    case 'MX': // Mexico
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#CE1126" width="9" height="6" />
          <rect fill="#FFF" width="6" height="6" />
          <rect fill="#006847" width="3" height="6" />
        </svg>
      );
    case 'QA': // Qatar
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#8D1B3D" width="9" height="6" />
          <polygon points="0,0 2.5,0 3.5,0.6 2.5,1.2 3.5,1.8 2.5,2.4 3.5,3 2.5,3.6 3.5,4.2 2.5,4.8 3.5,5.4 2.5,6 0,6" fill="#FFF" />
        </svg>
      );
    case 'AE': // UAE
      return (
        <svg className={`${dims} rounded-xs overflow-hidden shrink-0 shadow-sm ${className}`} viewBox="0 0 9 6">
          <rect fill="#000" width="9" height="6" />
          <rect fill="#FFF" y="2" width="9" height="2" />
          <rect fill="#00732F" width="9" height="2" />
          <rect fill="#FF0000" width="2.5" height="6" />
        </svg>
      );
    default:
      return (
        <span className={`inline-flex items-center justify-center font-mono font-bold bg-neutral-800 text-neutral-300 rounded px-1 ${className}`}>
          {c}
        </span>
      );
  }
};

export default CountryFlag;
