import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Clock, User, Globe, ArrowRight } from 'lucide-react';
import { F1NavPage } from '../../types/f1';

interface OfficialHeaderProps {
  currentPage: F1NavPage;
  onNavigate: (page: F1NavPage) => void;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 5, mins: 11, secs: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks: { id: F1NavPage; label: string }[] = [
    { id: 'latest', label: 'Latest' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'results', label: 'Results' },
    { id: 'standings', label: 'Standings' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'teams', label: 'Teams' },
    { id: 'timing', label: 'Live Timing' },
  ];

  return (
    <>
      {/* Top Corporate Strip */}
      <div className="bg-[#0b0b10] border-b border-white/5 text-[11px] font-mono text-neutral-400 py-1.5 px-4 sm:px-8 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-neutral-300 tracking-wider">FORMULA 1®</span>
          <span className="hover:text-white cursor-pointer transition-colors">F1 TV</span>
          <span className="hover:text-white cursor-pointer transition-colors">F1 Authentics</span>
          <span className="hover:text-white cursor-pointer transition-colors">F1 Experiences</span>
          <span className="hover:text-white cursor-pointer transition-colors">Tickets</span>
          <span className="hover:text-white cursor-pointer transition-colors">Store</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            F1 UNLOCKED
          </div>
          <button className="flex items-center gap-1 hover:text-white transition-colors">
            <User size={12} />
            <span>Sign In</span>
          </button>
        </div>
      </div>

      {/* Main Official F1 Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#15151e] border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Official F1 Curved Vector Logo */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('latest')}
                className="flex items-center gap-2 group transition-transform active:scale-95"
                title="Formula 1 Official Home"
              >
                <svg
                  className="h-8 w-auto text-[#e10600] fill-current"
                  viewBox="0 0 100 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Authentic stylized F1 logo */}
                  <path d="M79.2 0H63.6L52.8 12.4H68.4L79.2 0ZM39.6 0H14.4C10.8 0 7.2 2.4 6 6L0 24H9.6L13.2 13.2C13.8 11.4 15 10.2 16.8 10.2H36L39.6 0ZM42 7.2H24C22.2 7.2 21 8.4 20.4 10.2L15.6 24H25.2L27.6 16.8C28.2 15 29.4 13.8 31.2 13.8H49.2L42 7.2Z" />
                  <path d="M72 14.4H56.4L51.6 24H67.2L72 14.4Z" />
                  <path d="M84 4.8L74.4 24H84L93.6 4.8H84Z" />
                </svg>
              </button>

              {/* Navigation Links (Desktop) */}
              <nav className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => onNavigate(link.id)}
                      className={`relative px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                        isActive
                          ? 'text-white font-black'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-[-17px] left-0 right-0 h-[3px] bg-[#e10600]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right: Hamburger Menu & FIA Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/5 text-xs font-bold uppercase tracking-wider transition-all"
              >
                {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
                <span className="hidden sm:inline">{isMenuOpen ? 'Close' : 'Open menu'}</span>
              </button>

              <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />

              {/* White FIA Crest */}
              <div className="hidden sm:flex items-center font-serif text-[13px] font-black tracking-widest text-white border border-white/40 px-2 py-0.5 rounded leading-none uppercase">
                FIA
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Nav Bar */}
        <div className="lg:hidden flex overflow-x-auto px-4 py-2 gap-2 border-t border-white/5 scrollbar-none bg-[#121218]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`shrink-0 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                currentPage === link.id
                  ? 'bg-[#e10600] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Live Race Weekend Ticker Bar (Identical to Formula1.com) */}
        <div className="bg-[#0e0e14] border-t border-white/10 px-4 sm:px-8 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Left: Weekend & Session Countdown */}
            <div className="flex items-center gap-3">
              <span className="text-base">🇺🇸</span>
              <button
                onClick={() => onNavigate('schedule')}
                className="font-bold text-white uppercase tracking-wider hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                LAS VEGAS GRAND PRIX <ChevronRight size={14} className="text-[#e10600]" />
              </button>
              <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider animate-pulse">
                FP3 LIVE
              </span>
              <div className="text-neutral-300 font-bold hidden sm:inline">
                {String(countdown.hours).padStart(2, '0')}H {String(countdown.mins).padStart(2, '0')}M {String(countdown.secs).padStart(2, '0')}S
              </div>
            </div>

            {/* Right: TAG Heuer Timing Crest */}
            <div className="flex items-center gap-3 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-white uppercase">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white/20 inline-block" />
                <span>TAG HEUER</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">MY TIME <span className="text-white font-bold">00:48</span></span>
              <span className="hidden md:inline">TRACK TIME <span className="text-cyan-300 font-bold">11:18</span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer Modal (Full Official F1 Site Menu) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-[#15151e] h-full overflow-y-auto p-6 sm:p-8 space-y-6 border-l border-white/10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-black text-xl text-white uppercase tracking-wider">
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation List */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 text-white font-bold text-base uppercase tracking-wider transition-all"
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} className="text-[#e10600]" />
                  </button>
                ))}
              </div>

              {/* Corporate & Series */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-neutral-400">
                <div className="font-bold uppercase tracking-wider text-white">Championship Series</div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <span className="p-2 rounded bg-neutral-900 text-neutral-300">F2™ Championship</span>
                  <span className="p-2 rounded bg-neutral-900 text-neutral-300">F3™ Championship</span>
                  <span className="p-2 rounded bg-neutral-900 text-neutral-300">F1 ACADEMY™</span>
                  <span className="p-2 rounded bg-neutral-900 text-neutral-300">F1 Esports Series</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs font-mono text-neutral-500">
              © 2003-2026 Formula One World Championship Limited
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficialHeader;
