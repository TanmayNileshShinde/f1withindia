import React from 'react';
import { Flag, BookOpen, Layers, GitCommit, Network, Database } from 'lucide-react';
import { ModuleId } from '../types/dsa';

interface NavbarProps {
  activeModule: ModuleId;
  onSelectModule: (m: ModuleId) => void;
  activeView: 'both' | 'visualizer' | 'theory';
  onChangeView: (v: 'both' | 'visualizer' | 'theory') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  onSelectModule,
  activeView,
  onChangeView,
}) => {
  const navItems: { id: ModuleId; label: string; number: number; icon: React.ReactNode }[] = [
    { id: 'module1', label: 'Linear Arrays & Stacks', number: 1, icon: <Layers size={14} /> },
    { id: 'module2', label: 'Linked Lists & Memory', number: 2, icon: <GitCommit size={14} /> },
    { id: 'module3', label: 'Trees & Graphs', number: 3, icon: <Network size={14} /> },
    { id: 'module4', label: 'Searching & Hashing', number: 4, icon: <Database size={14} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0e0e14]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      {/* Top FIA red racing line */}
      <div className="h-1 bg-gradient-to-r from-[#e10600] via-red-500 to-[#e10600]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* F1 Logo Brand */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#e10600] flex items-center justify-center font-black text-white italic tracking-tighter text-xl shadow-[0_0_15px_rgba(225,6,0,0.5)] group-hover:scale-105 transition-transform">
                F1
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-wider leading-none uppercase">
                  Data Structures
                </span>
                <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">
                  Telemetry & Syllabus Hub
                </span>
              </div>
            </a>
          </div>

          {/* Module Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/80 p-1 rounded-2xl border border-neutral-800">
            {navItems.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectModule(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#e10600] text-white shadow-[0_0_12px_rgba(225,6,0,0.4)]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <span className="opacity-80">{item.icon}</span>
                  <span>Mod {item.number}</span>
                </button>
              );
            })}
          </nav>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => onChangeView('both')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${activeView === 'both' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => onChangeView('visualizer')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${activeView === 'visualizer' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                Pit Wall (Sims)
              </button>
              <button
                onClick={() => onChangeView('theory')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${activeView === 'theory' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                Theory
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-white/5 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`shrink-0 px-3 py-1 rounded-lg text-xs font-bold ${
                activeModule === item.id
                  ? 'bg-[#e10600] text-white'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Mod {item.number}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
