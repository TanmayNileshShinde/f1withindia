import React, { useState } from 'react';
import { GitCommit, ArrowRight, ArrowLeftRight, RotateCw, Plus, Trash2, Play } from 'lucide-react';

interface LapItem {
  id: number;
  lap: number;
  time: string;
  tyre: 'SOFT' | 'MEDIUM' | 'HARD';
  event?: string;
}

export const LinkedListVisualizer: React.FC = () => {
  const [listType, setListType] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const [laps, setLaps] = useState<LapItem[]>([
    { id: 1, lap: 1, time: '1:36.421', tyre: 'SOFT', event: 'Race Start' },
    { id: 2, lap: 2, time: '1:32.115', tyre: 'SOFT' },
    { id: 3, lap: 3, time: '1:31.984', tyre: 'SOFT', event: 'Fastest Lap' },
    { id: 4, lap: 4, time: '1:45.320', tyre: 'HARD', event: 'Pit Stop' },
  ]);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null);
  const [isTraversing, setIsTraversing] = useState(false);

  const handleAppendLap = () => {
    const nextLapNumber = laps.length > 0 ? laps[laps.length - 1].lap + 1 : 1;
    const randomSec = (31 + Math.random() * 2).toFixed(3);
    const newLap: LapItem = {
      id: Date.now(),
      lap: nextLapNumber,
      time: `1:${randomSec}`,
      tyre: nextLapNumber > 4 ? 'HARD' : 'MEDIUM',
    };
    setLaps((prev) => [...prev, newLap]);
  };

  const handleInsertPitStop = () => {
    if (laps.length < 2) return;
    const insertIndex = Math.floor(laps.length / 2);
    const pitLap: LapItem = {
      id: Date.now(),
      lap: laps[insertIndex].lap,
      time: '1:48.512',
      tyre: 'HARD',
      event: 'Under-cut Pit',
    };
    const updated = [...laps];
    updated.splice(insertIndex, 0, pitLap);
    // re-index laps
    setLaps(updated.map((l, i) => ({ ...l, lap: i + 1 })));
  };

  const handleDeleteLap = (id: number) => {
    setLaps((prev) => prev.filter((l) => l.id !== id).map((l, i) => ({ ...l, lap: i + 1 })));
  };

  const handleTraverse = () => {
    if (isTraversing || laps.length === 0) return;
    setIsTraversing(true);
    let current = 0;
    const interval = setInterval(() => {
      setActiveNodeIndex(current);
      current++;
      if (current >= laps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setActiveNodeIndex(null);
          setIsTraversing(false);
        }, 800);
      }
    }, 600);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <GitCommit size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Race Lap History Linked List
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Pointer Chain</span>
            </h4>
            <p className="text-xs text-neutral-400">Dynamic node allocation with pointers in heap memory</p>
          </div>
        </div>

        {/* List Type Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setListType('singly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${listType === 'singly' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Singly Linked
          </button>
          <button
            onClick={() => setListType('doubly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${listType === 'doubly' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Doubly Linked (Prev/Next)
          </button>
          <button
            onClick={() => setListType('circular')}
            className={`px-3 py-1.5 rounded-lg transition-all ${listType === 'circular' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Circular (Circuit Loop)
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800">
        <div className="flex items-center gap-2">
          <button
            onClick={handleAppendLap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all active:scale-95 shadow"
          >
            <Plus size={14} />
            Append Lap Node
          </button>
          <button
            onClick={handleInsertPitStop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-semibold transition-all active:scale-95"
          >
            Insert Pit Stop Node
          </button>
        </div>

        <button
          onClick={handleTraverse}
          disabled={isTraversing || laps.length === 0}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow"
        >
          <Play size={13} />
          {isTraversing ? 'Traversing...' : 'Traverse Pointers'}
        </button>
      </div>

      {/* Linked List Canvas */}
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="flex items-center gap-3 min-w-max">
          {/* HEAD Indicator */}
          <div className="flex flex-col items-center shrink-0">
            <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 mb-1">
              HEAD
            </span>
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
          </div>

          {/* Nodes */}
          {laps.map((lap, index) => {
            const isActive = activeNodeIndex === index;
            const isTail = index === laps.length - 1;

            return (
              <React.Fragment key={lap.id}>
                {/* Node Box */}
                <div
                  className={`relative p-3 rounded-xl border flex flex-col justify-between w-44 shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-950/70 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105'
                      : 'bg-neutral-900 border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-white/5 mb-1.5">
                    <span className="font-bold text-xs text-white">Lap {lap.lap}</span>
                    <button
                      onClick={() => handleDeleteLap(lap.id)}
                      className="text-neutral-500 hover:text-red-400 p-0.5 transition-colors"
                      title="Delete Node (Free Memory)"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="font-mono text-sm font-bold text-cyan-300">{lap.time}</div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${lap.tyre === 'SOFT' ? 'bg-red-500/20 text-red-400' : lap.tyre === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-300'}`}>
                        {lap.tyre}
                      </span>
                      {lap.event && (
                        <span className="text-[9px] font-medium text-emerald-400 truncate">
                          {lap.event}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pointer Footer */}
                  <div className="mt-2 pt-1 border-t border-neutral-800 flex justify-between text-[9px] font-mono text-neutral-500">
                    <span>Data: Lap {lap.lap}</span>
                    <span className="text-emerald-400">Next ➔</span>
                  </div>
                </div>

                {/* Connecting Pointer Arrow */}
                {!isTail && (
                  <div className="flex flex-col items-center justify-center shrink-0 text-emerald-400">
                    {listType === 'doubly' ? (
                      <ArrowLeftRight size={18} className="text-cyan-400 animate-pulse" />
                    ) : (
                      <ArrowRight size={18} className="animate-pulse" />
                    )}
                    <span className="text-[8px] font-mono text-neutral-500 mt-0.5">
                      {listType === 'doubly' ? 'next / prev' : 'next'}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* End of list (NULL or Circular Arrow) */}
          <div className="flex items-center gap-2 shrink-0 pl-2">
            {listType === 'circular' ? (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <RotateCw size={14} className="animate-spin" />
                <span>Loops to HEAD (Closed Circuit)</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-dashed border-neutral-700 text-neutral-500 text-xs font-mono font-bold">
                NULL (Chequered Flag)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Memory C Note */}
      <div className="mt-4 p-3 rounded-xl bg-neutral-950 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">C Memory Concept:</span>
          <code>struct Node* newLap = (struct Node*)malloc(sizeof(struct Node));</code>
        </div>
        <span className="text-neutral-500">Deletes use <code>free(node)</code> to prevent leaks</span>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
