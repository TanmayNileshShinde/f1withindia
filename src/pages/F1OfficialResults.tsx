import React, { useState } from 'react';
import { FULL_24_CALENDAR, RESULTS_2025_DATA, FASTEST_LAPS_DATA } from '../data/f1OfficialData';
import { Trophy, Clock, Flag, Award, Zap } from 'lucide-react';
import CountryFlag from '../components/f1/CountryFlag';

export const F1OfficialResults: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<'2026' | '2025'>('2026');
  const [resultType, setResultType] = useState<'races' | 'fastestLaps'>('races');

  const completed2026Races = FULL_24_CALENDAR.filter((r) => r.status === 'COMPLETED');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          {selectedYear} {resultType === 'fastestLaps' ? 'DHL Fastest Laps' : 'Race Results'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          FIA FORMULA ONE WORLD CHAMPIONSHIP™ OFFICIAL CLASSIFICATIONS
        </p>
      </div>

      {/* Year & Type Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#1e1e24] border border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-neutral-400 uppercase">Season:</span>
          <div className="flex gap-1 bg-neutral-900 p-1 rounded-xl text-xs font-mono">
            {(['2026', '2025'] as const).map((yr) => (
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
            className={`px-4 py-1.5 rounded-lg uppercase font-bold transition-colors flex items-center gap-1.5 ${
              resultType === 'fastestLaps' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Zap size={12} className="text-amber-400" />
            DHL Fastest Laps
          </button>
        </div>
      </div>

      {/* Results View */}
      {resultType === 'fastestLaps' ? (
        <div className="rounded-3xl bg-[#1e1e24] border border-white/5 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="bg-[#15151e] border-b border-white/10 text-neutral-400 uppercase text-[11px]">
                <th className="py-4 px-4 font-bold">GRAND PRIX</th>
                <th className="py-4 px-4 font-bold">DRIVER</th>
                <th className="py-4 px-4 font-bold">CAR / TEAM</th>
                <th className="py-4 px-4 font-bold text-center">LAP</th>
                <th className="py-4 px-4 font-bold text-right">FASTEST TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {FASTEST_LAPS_DATA.map((lap, i) => (
                <tr key={i} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-4 px-4 font-bold text-white uppercase">{lap.grandPrix}</td>
                  <td className="py-4 px-4 font-bold text-purple-400 uppercase font-sans text-sm">{lap.driver}</td>
                  <td className="py-4 px-4 text-neutral-300 font-sans">{lap.team}</td>
                  <td className="py-4 px-4 text-center text-neutral-400 font-bold">{lap.lap}</td>
                  <td className="py-4 px-4 text-right font-black text-purple-300 text-sm">{lap.lapTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedYear === '2026' ? (
        <div className="rounded-3xl bg-[#1e1e24] border border-white/5 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="bg-[#15151e] border-b border-white/10 text-neutral-400 uppercase text-[11px]">
                <th className="py-4 px-4 font-bold">GRAND PRIX</th>
                <th className="py-4 px-4 font-bold">DATE</th>
                <th className="py-4 px-4 font-bold">WINNER</th>
                <th className="py-4 px-4 font-bold hidden sm:table-cell">CAR / TEAM</th>
                <th className="py-4 px-4 font-bold text-right">LAPS</th>
                <th className="py-4 px-4 font-bold text-right">WINNING TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {completed2026Races.map((race, i) => {
                const times = ['1:31:44.742', '1:20:43.273', '1:20:26.843', '1:54:23.566', '1:40:52.554', '1:30:49.876', '1:28:20.000', '2:23:15.554', '1:45:47.000', '1:30:50.000', '1:24:22.000', '1:22:27.059', '1:38:01.989', '1:19:57.971', '1:30:45.519', '1:14:40.727', '1:32:58.007', '1:44:42.534', '1:35:09.650', '1:31:52.486', '2:06:54.430'];
                const lapCounts = [57, 50, 58, 53, 56, 57, 63, 78, 70, 66, 71, 52, 70, 44, 72, 53, 51, 62, 56, 71, 69];

                return (
                  <tr key={race.round} className="hover:bg-neutral-800/40 transition-colors group">
                    <td className="py-4 px-4 font-bold text-white text-sm">
                      <div className="flex items-center gap-2">
                        <CountryFlag code={race.flag} size="sm" />
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
                        ? 'Red Bull Racing'
                        : race.winner?.includes('Sainz')
                        ? 'Williams'
                        : race.winner?.includes('Leclerc') || race.winner?.includes('Hamilton')
                        ? 'Ferrari'
                        : race.winner?.includes('Russell')
                        ? 'Mercedes'
                        : 'McLaren'}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-neutral-300">{lapCounts[i] || 57}</td>
                    <td className="py-4 px-4 text-right font-bold text-cyan-300">{times[i] || '1:31:44.742'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-3xl bg-[#1e1e24] border border-white/5 overflow-x-auto shadow-2xl">
          <table className="w-full text-left text-xs font-mono min-w-[640px]">
            <thead>
              <tr className="bg-[#15151e] border-b border-white/10 text-neutral-400 uppercase text-[11px]">
                <th className="py-4 px-4 font-bold">GRAND PRIX</th>
                <th className="py-4 px-4 font-bold">DATE</th>
                <th className="py-4 px-4 font-bold">WINNER</th>
                <th className="py-4 px-4 font-bold hidden sm:table-cell">CAR / TEAM</th>
                <th className="py-4 px-4 font-bold text-right">LAPS</th>
                <th className="py-4 px-4 font-bold text-right">WINNING TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RESULTS_2025_DATA.map((race) => (
                <tr key={race.round} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-4 px-4 font-bold text-white text-sm uppercase font-sans">{race.country}</td>
                  <td className="py-4 px-4 text-neutral-400">{race.date}</td>
                  <td className="py-4 px-4 font-bold text-white font-sans text-sm">
                    <div className="flex items-center gap-1.5">
                      <Trophy size={13} className="text-amber-400" />
                      <span>{race.winner}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-300 font-sans hidden sm:table-cell">{race.team}</td>
                  <td className="py-4 px-4 text-right font-bold text-neutral-300">{race.laps}</td>
                  <td className="py-4 px-4 text-right font-bold text-cyan-300">{race.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default F1OfficialResults;
