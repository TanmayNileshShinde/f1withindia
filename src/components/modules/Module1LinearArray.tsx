import React from 'react';
import { SYLLABUS_MODULES } from '../../data/syllabusData';
import StackVisualizer from '../visualizers/StackVisualizer';
import QueueVisualizer from '../visualizers/QueueVisualizer';
import { Layers, CheckCircle2, Code2, AlertCircle } from 'lucide-react';

interface Module1Props {
  viewMode: 'both' | 'visualizer' | 'theory';
}

export const Module1LinearArray: React.FC<Module1Props> = ({ viewMode }) => {
  const modData = SYLLABUS_MODULES.find((m) => m.id === 'module1')!;

  return (
    <div className="space-y-10">
      {/* Module Title Header */}
      <div className="border-l-4 border-[#e10600] pl-4 sm:pl-6 py-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-[#e10600] font-mono text-xs font-bold uppercase tracking-wider">
            Module 01 • {modData.hours} Hours • {modData.outcomes.join(', ')}
          </span>
          <span className="text-xs text-neutral-400 font-mono">Exam Unit: Linear Data Structures</span>
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#e10600]" />
                Interactive Telemetry Simulator 1: App Screen Stack (LIFO)
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topics 1.3 & 1.4</span>
            </div>
            <StackVisualizer />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Interactive Telemetry Simulator 2: Live Timing Queue & Circular Ring Buffer (FIFO)
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topics 1.5 & 1.6</span>
            </div>
            <QueueVisualizer />
          </div>
        </div>
      )}

      {/* Syllabus Theory & Case Studies */}
      {(viewMode === 'both' || viewMode === 'theory') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Layers size={18} className="text-[#e10600]" />
              Syllabus Coverage: Core Concepts & F1 Case Studies
            </h3>
            <span className="text-xs font-mono text-neutral-400">All 6 Subpoints Addressed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modData.topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/5 hover:border-red-500/30 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-[#e10600] px-2 py-0.5 rounded bg-red-600/10 border border-red-500/20">
                      Topic {topic.id}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Theory & Application</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {topic.theory}
                  </p>
                </div>

                {/* F1 Real-world Case Study */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
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

          {/* Quick Code Reference Card */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-2">
                <Code2 size={16} className="text-[#e10600]" />
                C Implementation: Circular Queue Modulo Logic
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">Topic 1.6</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#09090d] text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed border border-white/5">
{`// Circular Queue Enqueue in C (eliminates wasted array memory)
void enqueue(int telemetryPacket) {
    if ((rear + 1) % MAX == front) {
        printf("Queue Overflow! Rolling buffer full.\\n");
        return;
    }
    if (front == -1) front = 0; // First item
    rear = (rear + 1) % MAX;
    buffer[rear] = telemetryPacket;
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module1LinearArray;
