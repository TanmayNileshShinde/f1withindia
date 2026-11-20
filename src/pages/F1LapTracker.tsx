import React, { useState } from 'react';
import { Flag, Play, RotateCcw, ArrowRight, ArrowLeft, GitCommit, Layers, Cpu, ShieldAlert } from 'lucide-react';
import { F1_LAP_EVENTS } from '../data/f1Data';
import { F1LapEvent } from '../types/f1';
import DsaBadge from '../components/f1/DsaBadge';
import LinkedListVisualizer from '../components/visualizers/LinkedListVisualizer';

interface F1LapTrackerProps {
  dsaMode: boolean;
}

export const F1LapTracker: React.FC<F1LapTrackerProps> = ({ dsaMode }) => {
  const [events, setEvents] = useState<F1LapEvent[]>(F1_LAP_EVENTS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [listType, setListType] = useState<'singly' | 'doubly' | 'circular'>('doubly');
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [memoryLog, setMemoryLog] = useState<string>('malloc(sizeof(LapNode)) allocated 7 initial track nodes');

  const activeEvent = events[currentIdx];

  const handleNextLap = () => {
    if (currentIdx < events.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setMemoryLog(`Traversed forward via current->next pointer to Lap ${events[currentIdx + 1].lap}`);
    } else if (listType === 'circular') {
      setCurrentIdx(0);
      setMemoryLog(`Circular Circuit Wrap: tail->next returned to head (Lap ${events[0].lap})`);
    }
  };

  const handlePrevLap = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
      setMemoryLog(`Doubly Linked List: Traversed backward via current->prev pointer to Lap ${events[currentIdx - 1].lap}`);
    } else if (listType === 'circular') {
      setCurrentIdx(events.length - 1);
      setMemoryLog(`Circular Circuit Wrap: head->prev looped to tail (Lap ${events[events.length - 1].lap})`);
    }
  };

  const insertSafetyCarLap = () => {
    const newLap: F1LapEvent = {
      id: Date.now(),
      lap: activeEvent.lap + 1,
      leader: 'VER',
      gapToSecond: '+0.150',
      eventTitle: 'Virtual Safety Car (VSC) Deployed',
      description: 'Stalled car at Turn 10 requires track marshal intervention. Speeds restricted to delta time.',
      tyreCompound: 'HARD',
      flag: 'SAFETY_CAR',
    };
    const updated = [...events.slice(0, currentIdx + 1), newLap, ...events.slice(currentIdx + 1)];
    setEvents(updated);
    setCurrentIdx(currentIdx + 1);
    setMemoryLog(`C malloc: LapNode* n = (LapNode*)malloc(sizeof(LapNode)); inserted node after Lap ${activeEvent.lap}`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            Race Event Sequence • Circuit de Monaco
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
            Lap-by-Lap History Tracker
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Chronological race progression modeled via dynamic pointer-chained Linked Lists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <GitCommit size={14} className="text-emerald-400" />
            <span>{showVisualizer ? 'Hide Pointer Core' : 'Inspect Linked List Core'}</span>
          </button>
        </div>
      </div>

      {dsaMode && (
        <DsaBadge
          module="2.4"
          structure="Linked List ADT (Singly, Doubly & Circular Loops)"
          complexity="Traversal O(n) • In-place Insertion O(1) with pointer"
          explanation="Race laps form a continuous sequence of nodes linked by memory pointers. Doubly Linked Lists allow pit engineers to scrub forwards/backwards instantly without recomputing all laps, while a Circular Linked List mirrors the closed loop circuit of a Grand Prix."
          active={dsaMode}
        />
      )}

      {/* Embedded visualizer if toggled */}
      {showVisualizer && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-2">
              <GitCommit size={14} /> Linked List Node & Pointer Visualizer (Syllabus Module 2)
            </span>
            <button
              onClick={() => setShowVisualizer(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <LinkedListVisualizer />
        </div>
      )}

      {/* Mode Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#0f0f15] border border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400 font-bold uppercase">List Mode:</span>
          <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-mono">
            {(['singly', 'doubly', 'circular'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setListType(mode)}
                className={`px-3 py-1 rounded-lg uppercase tracking-wider font-bold transition-colors ${
                  listType === mode
                    ? 'bg-[#e10600] text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={insertSafetyCarLap}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold transition-all"
          >
            + Dynamic Malloc Node
          </button>
          <button
            onClick={() => {
              setCurrentIdx(0);
              setEvents(F1_LAP_EVENTS);
              setMemoryLog('Reset linked list back to head node (Lap 1).');
            }}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
            title="Reset"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Dynamic Memory Allocation Indicator */}
      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-cyan-400 truncate">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-neutral-400">HEAP MEMORY LOG (2.3):</span>
          <span className="text-neutral-200">{memoryLog}</span>
        </div>
        <span className="text-neutral-500 shrink-0">Nodes: {events.length}</span>
      </div>

      {/* Active Lap Detail Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171722] via-[#15151c] to-[#121218] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-mono font-bold text-xs uppercase">
                LAP {activeEvent.lap} OF 78
              </span>
              <span className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase border ${
                activeEvent.flag === 'SAFETY_CAR'
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                  : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
              }`}>
                {activeEvent.flag} FLAG
              </span>
            </div>

            <div className="text-xs font-mono text-neutral-400">
              Pointer Address: <span className="text-cyan-300 font-bold">0x7ffd9{activeEvent.id.toString().slice(-4)}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight font-syne">
            {activeEvent.eventTitle}
          </h2>

          <p className="text-neutral-300 text-sm leading-relaxed max-w-2xl">
            {activeEvent.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Race Leader</span>
              <span className="text-white font-bold text-sm">{activeEvent.leader}</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Interval to P2</span>
              <span className="text-cyan-400 font-bold text-sm">{activeEvent.gapToSecond}</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Tyre Strat</span>
              <span className="text-amber-400 font-bold text-sm">{activeEvent.tyreCompound}</span>
            </div>
          </div>
        </div>

        {/* Step Forward / Backward Controls */}
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <button
            onClick={handlePrevLap}
            disabled={listType !== 'circular' && currentIdx === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono text-xs font-bold transition-all border border-neutral-800"
          >
            <ArrowLeft size={14} /> prev_pointer
          </button>

          <div className="text-xs font-mono text-neutral-400">
            Node <span className="text-white font-bold">{currentIdx + 1}</span> of {events.length}
          </div>

          <button
            onClick={handleNextLap}
            disabled={listType !== 'circular' && currentIdx === events.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e10600] hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-mono text-xs font-bold transition-all shadow-[0_0_12px_rgba(225,6,0,0.3)]"
          >
            next_pointer <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Node Pipeline View (Linked List Chain) */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold">
          Visualized Pointer Chain ({listType.toUpperCase()} LINKED LIST)
        </h3>

        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-3 min-w-max">
            {events.map((ev, idx) => {
              const isSelected = idx === currentIdx;
              return (
                <div key={ev.id} className="flex items-center">
                  {/* Node Box */}
                  <div
                    onClick={() => setCurrentIdx(idx)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between w-44 h-28 relative ${
                      isSelected
                        ? 'bg-gradient-to-b from-red-950/80 to-[#1a0b0b] border-red-500 shadow-[0_0_20px_rgba(225,6,0,0.3)] scale-105'
                        : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40 text-neutral-300">
                        Lap {ev.lap}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">
                        {ev.leader}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-white truncate font-sans">
                      {ev.eventTitle}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-1">
                      <span>{ev.gapToSecond}</span>
                      <span className="text-amber-400">{ev.tyreCompound[0]}</span>
                    </div>
                  </div>

                  {/* Pointer Arrow */}
                  {idx < events.length - 1 ? (
                    <div className="px-2 flex flex-col items-center text-neutral-500 font-mono text-[10px]">
                      {listType === 'doubly' ? (
                        <>
                          <span>⇄</span>
                          <span className="text-[8px]">next/prev</span>
                        </>
                      ) : (
                        <>
                          <span>➔</span>
                          <span className="text-[8px]">next</span>
                        </>
                      )}
                    </div>
                  ) : listType === 'circular' ? (
                    <div className="px-2 flex flex-col items-center text-[#e10600] font-mono text-[10px] font-bold">
                      <span>↺</span>
                      <span className="text-[8px]">to Head</span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1LapTracker;
