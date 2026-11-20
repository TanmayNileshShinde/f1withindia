import React, { useState } from 'react';
import { Calendar, Network, Flag, MapPin, CheckCircle2, ChevronRight, Activity, ArrowRight } from 'lucide-react';
import { F1_CALENDAR } from '../data/f1Data';
import { F1Race } from '../types/f1';
import DsaBadge from '../components/f1/DsaBadge';
import GraphVisualizer from '../components/visualizers/GraphVisualizer';

interface F1ScheduleProps {
  dsaMode: boolean;
}

export const F1Schedule: React.FC<F1ScheduleProps> = ({ dsaMode }) => {
  const [selectedRace, setSelectedRace] = useState<F1Race>(F1_CALENDAR[4]); // Monaco
  const [showGraphInspector, setShowGraphInspector] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            2026 FIA Formula One World Championship
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
            Race Schedule & Track Networks
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            24 Grand Prix circuits modeled as vertex-edge graph networks with BFS routing, DFS safety checks, and DAG weekend scheduling.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGraphInspector(!showGraphInspector)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <Network size={14} className="text-orange-400" />
            <span>{showGraphInspector ? 'Hide Circuit Graph' : 'Inspect Circuit Graph (3.7-3.9)'}</span>
          </button>
        </div>
      </div>

      {dsaMode && (
        <DsaBadge
          module="3.7"
          structure="Graph ADT, BFS, DFS & Topological Sort (Syllabus 3.7 - 3.9)"
          complexity="BFS/DFS O(V + E) • TopoSort O(V + E)"
          explanation="Race tracks are represented as directed graphs via Adjacency Matrix and Adjacency Lists. BFS calculates the shortest emergency route for the Medical Car to reach an incident sector, DFS performs comprehensive track safety barrier checks, and Topological Sorting enforces the strict Race Weekend prerequisite DAG."
          active={dsaMode}
        />
      )}

      {/* Embedded Graph Visualizer Drawer */}
      {showGraphInspector && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-orange-400 flex items-center gap-2">
              <Network size={14} /> Silverstone Track Graph & Race Weekend DAG (Syllabus 3.7, 3.8, 3.9)
            </span>
            <button
              onClick={() => setShowGraphInspector(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <GraphVisualizer />
        </div>
      )}

      {/* Active Circuit Focus Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#171622] via-[#15151c] to-[#121218] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-xs font-bold uppercase">
                ROUND {selectedRace.round}
              </span>
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                <MapPin size={12} className="text-[#e10600]" /> {selectedRace.country}
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                selectedRace.status === 'LIVE'
                  ? 'bg-red-950 text-red-400 border border-red-500/50'
                  : selectedRace.status === 'COMPLETED'
                  ? 'bg-neutral-800 text-neutral-400'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
              }`}>
                {selectedRace.status}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight font-syne">
              {selectedRace.gpName}
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-sans">
              Circuit: <span className="text-white font-semibold">{selectedRace.circuit}</span> • Date: <span className="text-cyan-300 font-mono">{selectedRace.date}</span>
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/10 text-xs font-mono">
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Laps</span>
                <span className="text-white font-bold text-sm">{selectedRace.laps}</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Track Length</span>
                <span className="text-white font-bold text-sm">{selectedRace.lengthKm} km</span>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Graph Vertices</span>
                <span className="text-orange-400 font-bold text-sm">{selectedRace.turns} Corners</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2 text-xs font-mono min-w-[260px]">
            <span className="text-neutral-400 font-bold uppercase block text-[10px]">Track Topology Info</span>
            <div className="flex justify-between text-neutral-300">
              <span>DRS Detection Zones:</span>
              <span className="text-white font-bold">{selectedRace.drsZones}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Previous Winner:</span>
              <span className="text-amber-400 font-bold">{selectedRace.winner || 'TBD (Live Session)'}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span>Adjacency Matrix Size:</span>
              <span className="text-cyan-300 font-bold">{selectedRace.turns} × {selectedRace.turns}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2026 Calendar Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider font-syne flex items-center gap-2">
          <Calendar size={18} className="text-[#e10600]" />
          2026 Grand Prix Championship Calendar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {F1_CALENDAR.map((race) => {
            const isSelected = selectedRace.round === race.round;
            return (
              <div
                key={race.round}
                onClick={() => setSelectedRace(race)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between h-48 group ${
                  isSelected
                    ? 'bg-gradient-to-b from-red-950/80 to-[#170e0e] border-red-500 shadow-[0_0_20px_rgba(225,6,0,0.25)] scale-[1.02]'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[#e10600] uppercase tracking-wider">
                      ROUND {race.round}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                      race.status === 'LIVE'
                        ? 'bg-red-600 text-white animate-pulse'
                        : race.status === 'COMPLETED'
                        ? 'bg-neutral-800 text-neutral-400'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {race.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors uppercase leading-snug">
                    {race.country}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5 truncate">
                    {race.circuit}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{race.date}</span>
                  <span className="text-neutral-500">{race.turns} Corners</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default F1Schedule;
