import React, { useState } from 'react';
import { DRIVERS_2026, TEAMS_2026, DriverBio, TeamBio } from '../../data/f1OfficialData';
import { ChevronRight, ChevronDown, Trophy } from 'lucide-react';
import { F1NavPage } from '../../types/f1';

interface SeasonStandingsWidgetProps {
  onNavigate: (page: F1NavPage) => void;
}

export const SeasonStandingsWidget: React.FC<SeasonStandingsWidgetProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'drivers' | 'teams'>('drivers');
  const [showAll, setShowAll] = useState(false);

  const top3 = DRIVERS_2026.slice(0, 3);
  const remainingDrivers = showAll ? DRIVERS_2026.slice(3) : DRIVERS_2026.slice(3, 7);

  return (
    <section className="space-y-6">
      {/* Signature F1 Double Red Divider */}
      <div className="f1-double-stripe"></div>

      {/* Section Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-2">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight font-syne">
          2026 Season
        </h2>

        {/* DRIVERS / TEAMS Tabs */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('drivers')}
            className={`relative pb-2 text-xs font-black uppercase tracking-wider transition-colors ${
              activeTab === 'drivers' ? 'text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Drivers
            {activeTab === 'drivers' && (
              <span className="absolute bottom-[-9px] left-0 right-0 h-[3px] bg-[#e10600]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('teams')}
            className={`relative pb-2 text-xs font-black uppercase tracking-wider transition-colors ${
              activeTab === 'teams' ? 'text-white' : 'text-neutral-500 hover:text-white'
            }`}
          >
            Teams
            {activeTab === 'teams' && (
              <span className="absolute bottom-[-9px] left-0 right-0 h-[3px] bg-[#e10600]" />
            )}
          </button>
        </div>
      </div>

      {activeTab === 'drivers' ? (
        <div className="space-y-6">
          {/* Top 3 Podium Cards (1st Big, 2nd & 3rd Medium) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* 1st Place Card (Antonelli - Mercedes) */}
            <div className="md:col-span-6 rounded-2xl f1-gradient-mercedes border border-[#27f4d2]/30 p-6 flex flex-col justify-between relative overflow-hidden h-72 f1-card-hover group">
              <div className="flex items-start justify-between z-10">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#27f4d2] uppercase tracking-widest">
                    Championship Leader
                  </span>
                  <div className="text-4xl font-black text-white italic tracking-tighter font-syne mt-1">
                    1<span className="text-xl">ST</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-white font-mono block">
                    {top3[0].points} <span className="text-xs text-neutral-400">PTS</span>
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">14 Podiums</span>
                </div>
              </div>

              <div className="z-10 mt-auto">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{top3[0].countryFlag}</span>
                  <span className="text-xs font-mono text-neutral-300 font-bold uppercase">{top3[0].country}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight font-syne group-hover:text-red-400 transition-colors">
                  {top3[0].firstName} <br />
                  <span className="text-white font-extrabold">{top3[0].lastName}</span>
                </h3>
                <p className="text-xs text-[#27f4d2] font-semibold mt-1">
                  {top3[0].team}
                </p>
              </div>

              {/* Large Cutout Driver Photo */}
              <img
                src={top3[0].portraitUrl}
                alt={top3[0].lastName}
                className="absolute right-0 bottom-0 w-44 sm:w-56 h-full object-cover object-top opacity-50 sm:opacity-75 mask-gradient pointer-events-none"
              />
            </div>

            {/* 2nd Place Card (Verstappen - Red Bull) */}
            <div className="md:col-span-3 rounded-2xl f1-gradient-redbull border border-[#3671c6]/30 p-5 flex flex-col justify-between relative overflow-hidden h-72 f1-card-hover group">
              <div className="flex items-start justify-between z-10">
                <div className="text-3xl font-black text-white italic tracking-tighter font-syne">
                  2<span className="text-base">ND</span>
                </div>
                <span className="text-lg font-black text-white font-mono">
                  {top3[1].points} <span className="text-[10px] text-neutral-400">PTS</span>
                </span>
              </div>

              <div className="z-10 mt-auto">
                <span className="text-base">{top3[1].countryFlag}</span>
                <h4 className="text-lg font-black text-white uppercase italic tracking-tight font-syne leading-tight mt-1">
                  {top3[1].firstName} <br />
                  {top3[1].lastName}
                </h4>
                <p className="text-[11px] text-[#3671c6] font-semibold mt-1">
                  {top3[1].team}
                </p>
              </div>

              <img
                src={top3[1].portraitUrl}
                alt={top3[1].lastName}
                className="absolute right-[-10px] bottom-0 w-36 h-48 object-cover object-top opacity-40 pointer-events-none"
              />
            </div>

            {/* 3rd Place Card (Russell - Mercedes) */}
            <div className="md:col-span-3 rounded-2xl f1-gradient-mercedes border border-[#27f4d2]/30 p-5 flex flex-col justify-between relative overflow-hidden h-72 f1-card-hover group">
              <div className="flex items-start justify-between z-10">
                <div className="text-3xl font-black text-white italic tracking-tighter font-syne">
                  3<span className="text-base">RD</span>
                </div>
                <span className="text-lg font-black text-white font-mono">
                  {top3[2].points} <span className="text-[10px] text-neutral-400">PTS</span>
                </span>
              </div>

              <div className="z-10 mt-auto">
                <span className="text-base">{top3[2].countryFlag}</span>
                <h4 className="text-lg font-black text-white uppercase italic tracking-tight font-syne leading-tight mt-1">
                  {top3[2].firstName} <br />
                  {top3[2].lastName}
                </h4>
                <p className="text-[11px] text-[#27f4d2] font-semibold mt-1">
                  {top3[2].team}
                </p>
              </div>

              <img
                src={top3[2].portraitUrl}
                alt={top3[2].lastName}
                className="absolute right-[-10px] bottom-0 w-36 h-48 object-cover object-top opacity-40 pointer-events-none"
              />
            </div>
          </div>

          {/* Compact Standings Table (Positions 4+) */}
          <div className="rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <tbody className="divide-y divide-white/5">
                {remainingDrivers.map((d: DriverBio, i: number) => (
                  <tr key={d.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-bold text-white text-sm w-12">
                      {i + 4}
                    </td>
                    <td className="py-3 px-2 w-4">
                      <span
                        className="inline-block w-1.5 h-5 rounded-full"
                        style={{ backgroundColor: d.teamColor }}
                      />
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{d.countryFlag}</span>
                        <span className="font-bold text-white uppercase font-sans">
                          {d.firstName} {d.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-400 font-sans hidden sm:table-cell">
                      {d.team}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-white text-sm">
                      {d.points} <span className="text-[10px] text-neutral-500 font-normal">PTS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controls: Show All & View Full Standings */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-white/5 text-xs font-bold uppercase transition-all"
            >
              <ChevronDown size={14} className={showAll ? 'rotate-180 transition-transform' : ''} />
              <span>{showAll ? 'Show less' : 'Show all'}</span>
            </button>

            <button
              onClick={() => onNavigate('standings')}
              className="text-xs font-bold text-[#e10600] uppercase hover:underline flex items-center gap-1"
            >
              View full standings &gt;
            </button>
          </div>
        </div>
      ) : (
        /* Constructors Tab */
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#15151e] border-b border-white/5 text-neutral-400 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Pos</th>
                  <th className="py-3 px-4">Team</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Drivers</th>
                  <th className="py-3 px-4 text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {TEAMS_2026.map((team: TeamBio) => (
                  <tr key={team.id} className="hover:bg-neutral-800/40 transition-colors">
                    <td className="py-3 px-4 font-black text-white text-sm w-12">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-5 rounded-full"
                          style={{ backgroundColor: team.baseColor }}
                        />
                        <span>{team.pos}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold text-white text-sm font-sans uppercase">
                      {team.fullName}
                    </td>
                    <td className="py-3 px-4 text-neutral-400 font-sans hidden sm:table-cell">
                      {team.drivers.join(' & ')}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-white text-base">
                      {team.points} <span className="text-[10px] text-neutral-500 font-normal">PTS</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => onNavigate('standings')}
              className="text-xs font-bold text-[#e10600] uppercase hover:underline flex items-center gap-1"
            >
              View full constructors table &gt;
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SeasonStandingsWidget;
