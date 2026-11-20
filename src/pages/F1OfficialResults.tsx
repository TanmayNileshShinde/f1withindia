import React, { useState } from 'react';
import { DRIVERS_2026, CALENDAR_2026 } from '../data/f1OfficialData';
import { Trophy, Clock, Flag, Award } from 'lucide-react';

export const F1OfficialResults: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [resultType, setResultType] = useState<'races' | 'fastestLaps'>('races');

  const completedRaces = CALENDAR_2026.filter((r) => r.status === 'COMPLETED');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          {selectedYear} Race Results
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          FIA FORMULA ONE WORLD CHAMPIONSHIP™ GRAND PRIX CLASSIFICATIONS
        </p>
      </div>

      {/* Year & Type Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#1e1e24] border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase">Season:</span>
          <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl text-xs font-mono">
            {['2026', '2025', '2024'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  selectedYear === yr ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setResultType('races')}
            className={`px-4 py-1.5 rounded-lg uppercase font-bold transition-colors ${
              resultType === 'races' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Races
          </button>
          <button
            onClick={() => setResultType('fastestLaps')}
            className={`px-4 py-1.5 rounded-lg uppercase font-bold transition-colors ${
              resultType === 'fastestLaps' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            DHL Fastest Laps
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="rounded-3xl bg-[#1e1e24] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="bg-[#15151e] border-b border-white/10 text-neutral-400 uppercase text-[11px]">
              <th className="py-4 px-4 font-bold">GRAND PRIX</th>
              <th className="py-4 px-4 font-bold">DATE</th>
              <th className="py-4 px-4 font-bold">WINNER</th>
              <th className="py-4 px-4 font-bold hidden sm:table-cell">CAR</th>
              <th className="py-4 px-4 font-bold text-right">LAPS</th>
              <th className="py-4 px-4 font-bold text-right">TIME</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {completedRaces.map((race) => (
              <tr key={race.round} className="hover:bg-neutral-800/40 transition-colors group">
                <td className="py-4 px-4 font-bold text-white text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{race.flag}</span>
                    <span className="group-hover:text-red-400 transition-colors font-sans uppercase">
                      {race.country}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-neutral-400">{race.dates.split('-')[0]}</td>
                <td className="py-4 px-4 font-bold text-white font-sans text-sm">
                  <div className="flex items-center gap-1.5">
                    <Trophy size={13} className="text-amber-400" />
                    <span>{race.winner}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-neutral-300 font-sans hidden sm:table-cell">
                  {race.winner?.includes('Verstappen')
                    ? 'Red Bull Racing Honda RBPT'
                    : race.winner?.includes('Sainz')
                    ? 'Ferrari'
                    : race.winner?.includes('Leclerc')
                    ? 'Ferrari'
                    : race.winner?.includes('Hamilton')
                    ? 'Mercedes'
                    : 'McLaren Mercedes'}
                </td>
                <td className="py-4 px-4 text-right font-bold text-neutral-300">57</td>
                <td className="py-4 px-4 text-right font-bold text-cyan-300">1:31:44.742</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default F1OfficialResults;
