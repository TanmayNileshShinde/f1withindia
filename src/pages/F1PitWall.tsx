import React, { useState } from 'react';
import { Radio, Database, Search, Cpu, RefreshCw, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import DsaBadge from '../components/f1/DsaBadge';
import HashVisualizer from '../components/visualizers/HashVisualizer';

interface F1PitWallProps {
  dsaMode: boolean;
}

export const F1PitWall: React.FC<F1PitWallProps> = ({ dsaMode }) => {
  const [showHashInspector, setShowHashInspector] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            Pit Lane Telemetry Frequency Allocation
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
            Pit Wall Telemetry Directory
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Instantaneous O(1) channel indexing using Hash Tables with Linear Probing & Separate Chaining collision handling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHashInspector(!showHashInspector)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <Database size={14} className="text-pink-400" />
            <span>{showHashInspector ? 'Hide Hash Core' : 'Inspect Hash Core (4.2 & 4.3)'}</span>
          </button>
        </div>
      </div>

      {dsaMode && (
        <DsaBadge
          module="4.2"
          structure="Hash Table ADT & Collision Resolution (Syllabus 4.2 & 4.3)"
          complexity="Average O(1) • Worst O(n)"
          explanation="Pit wall radio frequencies and sensor feeds are keyed by 3-letter driver codes (VER, NOR, LEC). Using the hash function h(key) = sum(ASCII) mod 8, telemetry packets map instantly to garage channels, resolving hash collisions via Linear Probing or Separate Chaining linked lists."
          active={dsaMode}
        />
      )}

      {/* Embedded Hash Visualizer Drawer */}
      {showHashInspector && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-pink-400 flex items-center gap-2">
              <Database size={14} /> 8-Slot Hash Table Engine Visualizer (Syllabus 4.2 & 4.3)
            </span>
            <button
              onClick={() => setShowHashInspector(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <HashVisualizer />
        </div>
      )}

      {/* Full-featured interactive Hash Table Directory directly in page */}
      <div className="rounded-3xl border border-white/10 bg-[#0f0f15] p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider font-syne flex items-center gap-2">
            <Radio size={18} className="text-[#e10600]" />
            Live Garage Telemetry Channels (8-Slot Table)
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Test hashing formulas and collision resolution strategies directly with team radio keys.
          </p>
        </div>

        <HashVisualizer />
      </div>
    </div>
  );
};

export default F1PitWall;
