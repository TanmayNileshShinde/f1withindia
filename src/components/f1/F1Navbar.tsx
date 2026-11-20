import React from 'react';
import { ArrowLeft, Radio } from 'lucide-react';
import { F1Page } from '../../types/f1';

interface F1NavbarProps {
  currentPage: F1Page;
  onNavigate: (page: F1Page) => void;
  onGoBack: () => void;
  canGoBack: boolean;
  historyStackCount: number;
}

export const F1Navbar: React.FC<F1NavbarProps> = ({
  currentPage,
  onNavigate,
  onGoBack,
  canGoBack,
  historyStackCount,
}) => {
  const navItems: { id: F1Page; label: string; icon: string }[] = [
    { id: 'home', label: 'Latest', icon: '🏠' },
    { id: 'timing', label: 'Live Timing', icon: '⏱️' },
    { id: 'laps', label: 'Lap Tracker', icon: '🔄' },
    { id: 'standings', label: 'Standings', icon: '🏆' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'pitwall', label: 'Pit Directory', icon: '🏎️' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0c11]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Top FIA Red racing border line */}
      <div className="h-1 bg-gradient-to-r from-[#e10600] via-red-500 to-[#e10600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Back Navigation (Stack LIFO) */}
          <div className="flex items-center gap-3">
            {canGoBack && (
              <button
                onClick={onGoBack}
                title={`Back (${historyStackCount} in stack)`}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-mono font-bold transition-all shadow-sm active:scale-95 group"
              >
                <ArrowLeft size={14} className="text-[#e10600] group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline">Back</span>
                <span className="px-1.5 py-0.2 rounded bg-black/50 text-[10px] text-neutral-400">
                  {historyStackCount}
                </span>
              </button>
            )}

            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left"
            >
              <div className="w-10 h-8 rounded-lg bg-[#e10600] flex items-center justify-center font-black text-white italic tracking-tighter text-xl shadow-[0_0_15px_rgba(225,6,0,0.5)] group-hover:scale-105 transition-transform">
                F1
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-base tracking-wider uppercase leading-none font-syne">
                  Formula 1
                </span>
                <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                  Official App & Telemetry
                </span>
              </div>
            </button>
          </div>

          {/* Center: F1 Main Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-neutral-900/80 p-1 rounded-2xl border border-neutral-800">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#e10600] text-white shadow-[0_0_12px_rgba(225,6,0,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Live Session Status Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider">LIVE</span>
              <span className="text-neutral-400 hidden sm:inline">• MONACO GP</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-white/5 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                currentPage === item.id
                  ? 'bg-[#e10600] text-white'
                  : 'text-neutral-400 hover:text-white bg-neutral-900/60'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default F1Navbar;
