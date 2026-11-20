import React, { useState } from 'react';
import { Trophy, Search, Cpu, GitBranch, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { INITIAL_DRIVERS, F1_TEAMS } from '../data/f1Data';
import { F1Driver, F1Team } from '../types/f1';
import DsaBadge from '../components/f1/DsaBadge';
import TreeVisualizer from '../components/visualizers/TreeVisualizer';
import SearchVisualizer from '../components/visualizers/SearchVisualizer';

interface F1StandingsProps {
  dsaMode: boolean;
}

export const F1Standings: React.FC<F1StandingsProps> = ({ dsaMode }) => {
  const [standingsTab, setStandingsTab] = useState<'drivers' | 'constructors'>('drivers');
  const [showTreeInspector, setShowTreeInspector] = useState(false);
  const [showSearchInspector, setShowSearchInspector] = useState(false);

  // Speed Trap Search Demo
  const [searchTarget, setSearchTarget] = useState<number>(339.8);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Sort drivers by speed trap ascending for Binary Search
  const sortedBySpeed = [...INITIAL_DRIVERS].sort((a, b) => a.speedTrap - b.speedTrap);

  const runBinarySearch = () => {
    let low = 0;
    let high = sortedBySpeed.length - 1;
    let steps = 0;
    let found = false;

    while (low <= high) {
      steps++;
      const mid = Math.floor((low + high) / 2);
      const val = sortedBySpeed[mid].speedTrap;

      if (Math.abs(val - searchTarget) < 0.1) {
        setSearchResult(`Binary Search FOUND: ${sortedBySpeed[mid].name} (${val} km/h) in ${steps} comparison steps! O(log n) efficiency.`);
        found = true;
        break;
      }
      if (val < searchTarget) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (!found) {
      setSearchResult(`Target speed ${searchTarget} km/h not matched. Evaluated in ${steps} binary steps.`);
    }
  };

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
            Championship Standings & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Official Drivers' & Constructors' championship points with BST car indexing & binary search telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowSearchInspector(!showSearchInspector)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <Search size={14} className="text-amber-400" />
            <span>{showSearchInspector ? 'Hide Search' : 'Speed Trap Search (4.1)'}</span>
          </button>

          <button
            onClick={() => setShowTreeInspector(!showTreeInspector)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <GitBranch size={14} className="text-purple-400" />
            <span>{showTreeInspector ? 'Hide BST' : 'Driver Car BST (3.3)'}</span>
          </button>
        </div>
      </div>

      {dsaMode && (
        <DsaBadge
          module="3.3"
          structure="Binary Search Tree & Speed Trap Binary Search (Module 3 & 4)"
          complexity="Search O(log n) • Inorder Traversal O(n)"
          explanation="Driver car numbers (#1, #4, #16, #44, #55, #63, #81) form a height-balanced BST for instantaneous lookups. Standings and speed trap telemetry utilize Binary Search to locate performance benchmarks in O(log n) steps versus O(n) linear scans."
          active={dsaMode}
        />
      )}

      {/* Embedded Search Visualizer */}
      {showSearchInspector && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-2">
              <Search size={14} /> Telemetry Speed Trap Comparator: Linear vs Binary Search (4.1)
            </span>
            <button
              onClick={() => setShowSearchInspector(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <SearchVisualizer />
        </div>
      )}

      {/* Embedded Tree Visualizer */}
      {showTreeInspector && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-purple-400 flex items-center gap-2">
              <GitBranch size={14} /> Driver Car Number Binary Search Tree & AVL Rotations (Module 3)
            </span>
            <button
              onClick={() => setShowTreeInspector(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <TreeVisualizer />
        </div>
      )}

      {/* Speed Trap Quick Search Tool */}
      <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-[#e10600]" />
          <span className="text-xs font-mono font-bold text-white uppercase">Binary Search Speed Trap (km/h):</span>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={searchTarget}
            onChange={(e) => setSearchTarget(parseFloat(e.target.value))}
            className="bg-neutral-900 border border-neutral-700 text-white font-mono text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-500"
          >
            {sortedBySpeed.map((d) => (
              <option key={d.number} value={d.speedTrap}>
                {d.speedTrap} km/h - {d.name} ({d.code})
              </option>
            ))}
          </select>

          <button
            onClick={runBinarySearch}
            className="px-4 py-1.5 rounded-xl bg-[#e10600] hover:bg-red-700 text-white font-mono font-bold text-xs uppercase transition-all shadow-md"
          >
            Run Binary Search O(log n)
          </button>
        </div>

        {searchResult && (
          <div className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
            <span>{searchResult}</span>
          </div>
        )}
      </div>

      {/* Standings Category Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setStandingsTab('drivers')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            standingsTab === 'drivers'
              ? 'bg-[#e10600] text-white shadow-[0_0_15px_rgba(225,6,0,0.3)]'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <Trophy size={14} /> Drivers' Championship
        </button>

        <button
          onClick={() => setStandingsTab('constructors')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            standingsTab === 'constructors'
              ? 'bg-[#e10600] text-white shadow-[0_0_15px_rgba(225,6,0,0.3)]'
              : 'text-neutral-400 hover:text-white bg-neutral-900/60'
          }`}
        >
          <Trophy size={14} /> Constructors' Championship
        </button>
      </div>

      {/* Standings Tables */}
      {standingsTab === 'drivers' ? (
        <div className="rounded-3xl border border-white/10 bg-[#0f0f15] overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-3.5 px-4 font-bold">POS</th>
                <th className="py-3.5 px-3 font-bold">NO</th>
                <th className="py-3.5 px-4 font-bold">DRIVER</th>
                <th className="py-3.5 px-4 font-bold">NATIONALITY</th>
                <th className="py-3.5 px-4 font-bold">CAR / TEAM</th>
                <th className="py-3.5 px-4 font-bold text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INITIAL_DRIVERS.map((driver) => (
                <tr key={driver.number} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-3.5 px-4 font-black text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: driver.color }}
                      />
                      <span>{driver.pos}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-neutral-400">{driver.number}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white text-xs group-hover:text-red-400 transition-colors font-sans uppercase">
                      {driver.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 uppercase">{driver.country}</td>
                  <td className="py-3.5 px-4 text-neutral-300 font-sans">{driver.team}</td>
                  <td className="py-3.5 px-4 text-right font-black text-white text-sm">
                    {driver.points} <span className="text-[10px] text-neutral-500 font-normal">PTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-[#0f0f15] overflow-hidden shadow-2xl">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-3.5 px-4 font-bold">POS</th>
                <th className="py-3.5 px-4 font-bold">TEAM</th>
                <th className="py-3.5 px-4 font-bold">DRIVERS</th>
                <th className="py-3.5 px-4 font-bold text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {F1_TEAMS.map((team) => (
                <tr key={team.name} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-4 px-4 font-black text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: team.color }}
                      />
                      <span>{team.pos}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-white text-sm font-sans uppercase group-hover:text-red-400 transition-colors">
                    {team.name}
                  </td>
                  <td className="py-4 px-4 text-neutral-400 font-sans">
                    {team.drivers.join(' & ')}
                  </td>
                  <td className="py-4 px-4 text-right font-black text-white text-base">
                    {team.points} <span className="text-[10px] text-neutral-500 font-normal">PTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default F1Standings;
