import React, { useState } from 'react';
import { FULL_24_CALENDAR, TrackDetail } from '../data/f1OfficialData';
import { Calendar, MapPin, ChevronRight, Trophy } from 'lucide-react';
import CircuitModal from '../components/f1/CircuitModal';

export const F1OfficialSchedule: React.FC = () => {
  const [selectedCircuit, setSelectedCircuit] = useState<TrackDetail | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          F1 Schedule 2026
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          2026 FIA FORMULA ONE WORLD CHAMPIONSHIP™ OFFICIAL 24-RACE CALENDAR
        </p>
      </div>

      {/* Calendar List Cards */}
      <div className="space-y-4">
        {FULL_24_CALENDAR.map((race) => (
          <div
            key={race.round}
            className={`p-6 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6 f1-card-hover ${
              race.status === 'LIVE'
                ? 'bg-gradient-to-r from-red-950/80 via-[#1c1212] to-[#15151e] border-red-500 shadow-[0_0_25px_rgba(225,6,0,0.3)]'
                : 'bg-[#1e1e24] border-white/5'
            }`}
          >
            {/* Left: Round & Info */}
            <div className="flex items-center gap-6">
              <div className="text-center w-14 shrink-0">
                <span className="text-[10px] font-mono font-bold text-[#e10600] uppercase block">
                  ROUND
                </span>
                <span className="text-2xl font-black text-white font-mono leading-none">
                  {race.round}
                </span>
              </div>

              <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-black/40 text-neutral-300 font-mono text-xs font-bold">
                    {race.flag}
                  </span>
                  <span className="font-bold text-white text-lg uppercase font-syne">
                    {race.country}
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

                <h3 className="text-xs sm:text-sm text-neutral-300 font-bold uppercase">
                  {race.gpName}
                </h3>
                <p className="text-xs text-neutral-500 font-sans flex items-center gap-1">
                  <MapPin size={12} className="text-[#e10600]" /> {race.circuit}
                </p>
              </div>
            </div>

            {/* Middle: Mini Track Vector Outline */}
            <div className="hidden xl:flex items-center justify-center w-36 h-20 bg-black/30 rounded-xl p-2 border border-white/5 shrink-0">
              <svg
                className="w-full h-full stroke-neutral-400 hover:stroke-[#e10600] fill-none stroke-[2.5] transition-colors"
                viewBox="0 0 160 100"
              >
                <path d={race.svgPath} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Right: Dates & Action */}
            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 border-white/5 pt-3 lg:pt-0">
              <div className="text-left lg:text-right">
                <span className="text-xs font-mono font-bold text-white block">
                  {race.dates}
                </span>
                {race.winner ? (
                  <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center lg:justify-end gap-1 mt-0.5">
                    <Trophy size={11} /> Winner: {race.winner}
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-neutral-400 block mt-0.5">
                    {race.turns} Turns • {race.trackLength}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelectedCircuit(race)}
                className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-[#e10600] text-white text-xs font-bold uppercase tracking-wider transition-colors border border-white/5 active:scale-95 shrink-0"
              >
                Circuit Guide &gt;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Circuit Modal */}
      <CircuitModal
        track={selectedCircuit}
        onClose={() => setSelectedCircuit(null)}
      />
    </div>
  );
};

export default F1OfficialSchedule;
