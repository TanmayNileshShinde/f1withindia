import React, { useState } from 'react';
import { Gauge, Search, Play, RotateCcw, Zap } from 'lucide-react';
import { F1_DRIVERS } from '../../data/syllabusData';

export const SearchVisualizer: React.FC = () => {
  // Sorted by speed for binary search
  const sortedDrivers = [...F1_DRIVERS].sort((a, b) => a.speed - b.speed);
  const [targetSpeed, setTargetSpeed] = useState<number>(339.8);
  const [linearSteps, setLinearSteps] = useState<number[]>([]);
  const [binarySteps, setBinarySteps] = useState<{ low: number; mid: number; high: number }[]>([]);
  const [linearCount, setLinearCount] = useState<number | null>(null);
  const [binaryCount, setBinaryCount] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const runSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setLinearSteps([]);
    setBinarySteps([]);

    // 1. Run Linear Search Simulation
    const lSteps: number[] = [];
    let lFound = false;
    for (let i = 0; i < sortedDrivers.length; i++) {
      lSteps.push(i);
      setLinearSteps([...lSteps]);
      await new Promise((r) => setTimeout(r, 120));
      if (Math.abs(sortedDrivers[i].speed - targetSpeed) < 0.05) {
        lFound = true;
        break;
      }
    }
    setLinearCount(lSteps.length);

    // 2. Run Binary Search Simulation
    const bSteps: { low: number; mid: number; high: number }[] = [];
    let low = 0;
    let high = sortedDrivers.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      bSteps.push({ low, mid, high });
      setBinarySteps([...bSteps]);
      await new Promise((r) => setTimeout(r, 300));

      if (Math.abs(sortedDrivers[mid].speed - targetSpeed) < 0.05) {
        break;
      } else if (sortedDrivers[mid].speed < targetSpeed) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    setBinaryCount(bSteps.length);
    setIsSearching(false);
  };

  const handleReset = () => {
    setLinearSteps([]);
    setBinarySteps([]);
    setLinearCount(null);
    setBinaryCount(null);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
            <Gauge size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Speed Trap: Linear vs Binary Search
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">O(n) vs O(log n)</span>
            </h4>
            <p className="text-xs text-neutral-400">Comparing sequential scan with interval halving on telemetry leaderboards</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-all"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      {/* Target Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 mb-6">
        <div>
          <label className="text-xs font-bold uppercase text-neutral-400 block mb-1.5">
            Select Target Top Speed to Search:
          </label>
          <div className="flex flex-wrap gap-2">
            {sortedDrivers.map((d) => (
              <button
                key={d.code}
                onClick={() => { setTargetSpeed(d.speed); handleReset(); }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  targetSpeed === d.speed
                    ? 'bg-[#e10600] text-white shadow-[0_0_12px_rgba(225,6,0,0.3)]'
                    : 'bg-neutral-950 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {d.code}: {d.speed} km/h
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={runSearch}
          disabled={isSearching}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-lg transition-all active:scale-95"
        >
          <Play size={14} />
          Run Head-to-Head Search
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Linear Search */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div>
              <span className="font-bold text-sm text-white block">Linear Search (Sequential)</span>
              <span className="text-[10px] font-mono text-neutral-500">Time Complexity: O(n)</span>
            </div>
            {linearCount !== null && (
              <span className="px-2.5 py-1 rounded bg-neutral-900 text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
                {linearCount} Steps Taken
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            {sortedDrivers.map((d, index) => {
              const isChecking = linearSteps[linearSteps.length - 1] === index;
              const hasChecked = linearSteps.includes(index);
              const isFound = hasChecked && Math.abs(d.speed - targetSpeed) < 0.05;

              return (
                <div
                  key={d.code}
                  className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border transition-all ${
                    isFound
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                      : isChecking
                      ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                      : hasChecked
                      ? 'bg-neutral-900/40 border-neutral-800/40 text-neutral-500 opacity-60'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <span>[{index}] {d.code} ({d.name})</span>
                  <span>{d.speed} km/h</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Binary Search */}
        <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
            <div>
              <span className="font-bold text-sm text-white block">Binary Search (Interval Halving)</span>
              <span className="text-[10px] font-mono text-neutral-500">Time Complexity: O(log n)</span>
            </div>
            {binaryCount !== null && (
              <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/20">
                Only {binaryCount} Steps! ⚡
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            {sortedDrivers.map((d, index) => {
              const lastStep = binarySteps[binarySteps.length - 1];
              const isMid = lastStep && lastStep.mid === index;
              const inRange = lastStep && index >= lastStep.low && index <= lastStep.high;
              const isFound = isMid && Math.abs(d.speed - targetSpeed) < 0.05;

              return (
                <div
                  key={d.code}
                  className={`p-2 rounded-lg font-mono text-xs flex items-center justify-between border transition-all ${
                    isFound
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : isMid
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-200 font-bold'
                      : inRange
                      ? 'bg-neutral-900 border-neutral-700 text-neutral-200'
                      : 'bg-neutral-950/40 border-neutral-900 text-neutral-700 line-through'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>[{index}] {d.code}</span>
                    {isMid && <span className="text-[9px] px-1 bg-cyan-500 text-black font-bold rounded">MID</span>}
                  </div>
                  <span>{d.speed} km/h</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchVisualizer;
