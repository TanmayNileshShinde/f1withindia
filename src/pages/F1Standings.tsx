import React, { useState } from 'react';
import { Trophy, Search, Cpu, GitBranch, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { ALL_20_DRIVERS, ALL_10_TEAMS } from '../data/f1OfficialData';

export const F1Standings: React.FC = () => {
  const [standingsTab, setStandingsTab] = useState<'drivers' | 'constructors'>('drivers');
  const [showTelemetryTool, setShowTelemetryTool] = useState(false);

  // Speed Trap Search Tool (Powered by O(log n) Binary Search)
  const [targetSpeed, setTargetSpeed] = useState<number>(341.2);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const speedRankings = [
    { name: 'Kimi Antonelli', number: 12, speed: 342.5, team: 'Mercedes-AMG' },
    { name: 'Max Verstappen', number: 1, speed: 341.2, team: 'Red Bull Racing' },
    { name: 'Charles Leclerc', number: 16, speed: 340.5, team: 'Ferrari' },
    { name: 'Lando Norris', number: 4, speed: 339.8, team: 'McLaren' },
    { name: 'Lewis Hamilton', number: 44, speed: 339.1, team: 'Ferrari' },
    { name: 'George Russell', number: 63, speed: 338.4, team: 'Mercedes-AMG' },
    { name: 'Carlos Sainz', number: 55, speed: 337.9, team: 'Williams' },
    { name: 'Fernando Alonso', number: 14, speed: 336.2, team: 'Aston Martin' },
  ].sort((a, b) => a.speed - b.speed);

  const handleRunSearch = () => {
    let low = 0;
    let high = speedRankings.length - 1;
    let iterations = 0;
    let matched = null;

    while (low <= high) {
      iterations++;
      const mid = Math.floor((low + high) / 2);
      if (Math.abs(speedRankings[mid].speed - targetSpeed) < 0.1) {
        matched = speedRankings[mid];
        break;
      }
      if (speedRankings[mid].speed < targetSpeed) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    if (matched) {
      setSearchFeedback(`TELEMETRY MATCH: ${matched.name} (#${matched.number}, ${matched.team}) registered ${matched.speed} km/h on the Las Vegas main straight (Identified in ${iterations} search cycles).`);
    } else {
      setSearchFeedback(`No benchmark recorded at exactly ${targetSpeed} km/h.`);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
            2026 Championship Standings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
            OFFICIAL FIA FORMULA ONE WORLD CHAMPIONSHIP™ DRIVER & CONSTRUCTOR POINTS
          </p>
        </div>

        <button
          onClick={() => setShowTelemetryTool(!showTelemetryTool)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 text-xs font-mono font-bold transition-all self-start md:self-auto"
        >
          <Zap size={14} className="text-amber-400" />
          <span>{showTelemetryTool ? 'Hide Speed Index' : 'Speed Trap Telemetry Index'}</span>
        </button>
      </div>

      {/* Speed Trap Telemetry Inspector (F1 Themed) */}
      {showTelemetryTool && (
        <div className="p-6 rounded-3xl bg-[#1e1e24] border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={14} /> Official Speed Trap Benchmark Comparator (Las Vegas Strip Straight)
            </span>
            <button onClick={() => setShowTelemetryTool(false)} className="text-xs text-neutral-500 hover:text-white">
              Close ✕
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-neutral-300">Target Speed:</span>
            <select
              value={targetSpeed}
              onChange={(e) => setTargetSpeed(parseFloat(e.target.value))}
              className="bg-neutral-900 border border-neutral-700 text-white font-mono text-xs rounded-xl px-3 py-2"
            >
              {speedRankings.map((s) => (
                <option key={s.number} value={s.speed}>
                  {s.speed} km/h — {s.name} ({s.team})
                </option>
              ))}
            </select>

            <button
              onClick={handleRunSearch}
              className="px-4 py-2 rounded-xl bg-[#e10600] hover:bg-red-700 text-white font-mono font-bold text-xs uppercase transition-all shadow-md"
            >
              Scan Telemetry Database
            </button>
          </div>

          {searchFeedback && (
            <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0" />
              <span>{searchFeedback}</span>
            </div>
          )}
        </div>
      )}

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
        <div className="rounded-3xl border border-white/5 bg-[#1e1e24] overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="bg-[#15151e] text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-4 px-4 font-bold">POS</th>
                <th className="py-4 px-3 font-bold">NO</th>
                <th className="py-4 px-4 font-bold">DRIVER</th>
                <th className="py-4 px-4 font-bold">NATIONALITY</th>
                <th className="py-4 px-4 font-bold">CAR / TEAM</th>
                <th className="py-4 px-4 font-bold text-center">PODIUMS</th>
                <th className="py-4 px-4 font-bold text-right">POINTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ALL_20_DRIVERS.map((driver, idx) => (
                <tr key={driver.id} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-3.5 px-4 font-black text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: driver.teamColor }}
                      />
                      <span>{idx + 1}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-bold text-neutral-400">{driver.number}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white text-xs group-hover:text-red-400 transition-colors font-sans uppercase">
                      {driver.firstName} {driver.lastName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-400 uppercase">{driver.country} ({driver.countryFlag})</td>
                  <td className="py-3.5 px-4 text-neutral-300 font-sans">{driver.team}</td>
                  <td className="py-3.5 px-4 text-center text-neutral-400 font-bold">{driver.podiums}</td>
                  <td className="py-3.5 px-4 text-right font-black text-white text-sm">
                    {driver.points} <span className="text-[10px] text-neutral-500 font-normal">PTS</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/5 bg-[#1e1e24] overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="bg-[#15151e] text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-4 px-4 font-bold">POS</th>
                <th className="py-4 px-4 font-bold">TEAM</th>
                <th className="py-4 px-4 font-bold">DRIVERS</th>
                <th className="py-4 px-4 font-bold hidden sm:table-cell">POWER UNIT</th>
                <th className="py-4 px-4 font-bold text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ALL_10_TEAMS.map((team) => (
                <tr key={team.id} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-4 px-4 font-black text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: team.baseColor }}
                      />
                      <span>{team.pos}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold text-white text-sm font-sans uppercase group-hover:text-red-400 transition-colors">
                    {team.fullName}
                  </td>
                  <td className="py-4 px-4 text-neutral-400 font-sans">
                    {team.drivers.join(' & ')}
                  </td>
                  <td className="py-4 px-4 text-neutral-400 font-sans hidden sm:table-cell">
                    {team.powerUnit}
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
