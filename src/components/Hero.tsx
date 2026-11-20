import React from 'react';
import { Flag, Activity, Zap, Award, Layers, Terminal } from 'lucide-react';
import { ModuleId } from '../types/dsa';

interface HeroProps {
  onSelectModule: (m: ModuleId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectModule }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 border-b border-white/10 bg-gradient-to-b from-[#14141d] to-[#0c0c11]">
      {/* Background Racing speed lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#e10600_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/10 border border-red-500/20 text-[#e10600] text-xs font-mono font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
              Formula 1 Official App Case Study & DSA Syllabus
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] italic font-syne">
              Data Structures <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e10600] via-red-500 to-amber-500">
                At 350 KM/H
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Explore how Grand Prix race telemetry, live timing feeds, championship playoff brackets, and steering wheel displays rely on <span className="text-white font-semibold">Stacks, Queues, Linked Lists, Trees, Graphs, and Hashing</span>. Covers all 4 modules of the university curriculum with interactive pit wall simulations.
            </p>

            {/* Quick jump module badges */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => onSelectModule('module1')}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-red-500/50 text-xs font-bold text-white transition-all flex items-center gap-2"
              >
                <span className="text-red-500 font-mono">01</span>
                Array Stacks & Queues
              </button>
              <button
                onClick={() => onSelectModule('module2')}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-emerald-500/50 text-xs font-bold text-white transition-all flex items-center gap-2"
              >
                <span className="text-emerald-400 font-mono">02</span>
                Linked Lists & Heap
              </button>
              <button
                onClick={() => onSelectModule('module3')}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-purple-500/50 text-xs font-bold text-white transition-all flex items-center gap-2"
              >
                <span className="text-purple-400 font-mono">03</span>
                Trees & Track Graphs
              </button>
              <button
                onClick={() => onSelectModule('module4')}
                className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500/50 text-xs font-bold text-white transition-all flex items-center gap-2"
              >
                <span className="text-blue-400 font-mono">04</span>
                Speed Traps & Hashing
              </button>
            </div>
          </div>

          {/* Telemetry Stat Cards */}
          <div className="grid grid-cols-2 gap-3 lg:w-80 shrink-0">
            <div className="p-4 rounded-2xl bg-[#14141d]/90 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-red-500 mb-1">
                <Layers size={16} />
                <span className="text-[10px] font-mono uppercase text-neutral-400">Curriculum</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">4 Modules</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">CO1 through CO5 Mapped</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141d]/90 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Activity size={16} />
                <span className="text-[10px] font-mono uppercase text-neutral-400">Simulation</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">6 Live Sims</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Interactive Pit Wall</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141d]/90 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Zap size={16} />
                <span className="text-[10px] font-mono uppercase text-neutral-400">Case Study</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">24 Topics</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">F1 Engineering Real-World</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#14141d]/90 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Award size={16} />
                <span className="text-[10px] font-mono uppercase text-neutral-400">Project</span>
              </div>
              <div className="text-2xl font-black text-white font-mono">100% Match</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">Ready for Submission</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
