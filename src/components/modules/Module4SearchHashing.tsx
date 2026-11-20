import React from 'react';
import { SYLLABUS_MODULES } from '../../data/syllabusData';
import SearchVisualizer from '../visualizers/SearchVisualizer';
import HashVisualizer from '../visualizers/HashVisualizer';
import { Database, Search, Gauge, Code2 } from 'lucide-react';

interface Module4Props {
  viewMode: 'both' | 'visualizer' | 'theory';
}

export const Module4SearchHashing: React.FC<Module4Props> = ({ viewMode }) => {
  const modData = SYLLABUS_MODULES.find((m) => m.id === 'module4')!;

  return (
    <div className="space-y-10">
      {/* Module Title Header */}
      <div className="border-l-4 border-blue-500 pl-4 sm:pl-6 py-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
            Module 04 • {modData.hours} Hours • {modData.outcomes.join(', ')}
          </span>
          <span className="text-xs text-neutral-400 font-mono">Exam Unit: Searching & Hashing</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          {modData.title}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-1">
          {modData.tagline}
        </p>
      </div>

      {/* Visualizers Section */}
      {(viewMode === 'both' || viewMode === 'visualizer') && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                Interactive Telemetry Simulator 6: Speed Trap Search (Linear vs Binary)
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topic 4.1</span>
            </div>
            <SearchVisualizer />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                Interactive Telemetry Simulator 7: Pit Lane Telemetry Hash Table & Collision Arena
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topics 4.2 & 4.3</span>
            </div>
            <HashVisualizer />
          </div>
        </div>
      )}

      {/* Theory & F1 Case Studies */}
      {(viewMode === 'both' || viewMode === 'theory') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Database size={18} className="text-blue-400" />
              Syllabus Coverage: Core Concepts & F1 Case Studies
            </h3>
            <span className="text-xs font-mono text-neutral-400">All 3 Subpoints Addressed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modData.topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      Topic {topic.id}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Search & Hash</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {topic.theory}
                  </p>
                </div>

                {/* F1 Real-world Case Study */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                    <span className="text-sm">🏎️</span>
                    <span>F1 Official App Real-World Use:</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {topic.f1Analogy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Hashing Formulas Card */}
          <div className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/10 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>Topic 4.2 & 4.3: Hash Functions & Collision Resolution Formulas</span>
              <span className="text-xs text-blue-400 font-mono">(Key Exam Theory)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <span className="text-blue-400 font-bold block">1. Division Modulo Method</span>
                <code className="text-white block">h(k) = k mod m</code>
                <p className="text-neutral-400 text-[11px] font-sans">
                  m is chosen as a prime number not close to powers of 2 for uniform distribution.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <span className="text-blue-400 font-bold block">2. Linear Probing</span>
                <code className="text-white block">h(k, i) = (h'(k) + i) mod m</code>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Checks sequential slots when collision occurs. Easy to implement, but prone to Primary Clustering.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <span className="text-blue-400 font-bold block">3. Separate Chaining</span>
                <code className="text-white block">Table[h(k)] ➔ [Node] ➔ [Node]</code>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Table never fills up; collisions are resolved by appending nodes to a dynamic linked list.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module4SearchHashing;
