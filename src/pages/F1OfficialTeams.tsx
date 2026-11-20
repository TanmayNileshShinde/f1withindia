import React, { useState } from 'react';
import { ALL_10_TEAMS, TeamBio } from '../data/f1OfficialData';
import { Trophy, ChevronRight, Wrench } from 'lucide-react';
import TeamModal from '../components/f1/TeamModal';

export const F1OfficialTeams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<TeamBio | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          F1 Teams 2026
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          DISCOVER THE OFFICIAL 2026 FORMULA 1 CONSTRUCTOR GRID
        </p>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ALL_10_TEAMS.map((team) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="group cursor-pointer rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden f1-card-hover p-6 flex flex-col justify-between relative"
          >
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase">
                    CHAMPIONSHIP POS
                  </span>
                  <span className="text-xs font-mono font-black text-white bg-neutral-900 px-2 py-0.5 rounded">
                    P{team.pos}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tight font-syne mt-1 group-hover:text-red-400 transition-colors">
                  {team.fullName}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono block">
                  {team.points} <span className="text-xs text-neutral-400">PTS</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-5 text-xs font-mono">
              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Drivers</span>
                <span className="text-white font-bold block">{team.drivers[0]}</span>
                <span className="text-white font-bold block">{team.drivers[1]}</span>
              </div>

              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Team Principal</span>
                <span className="text-neutral-300 font-semibold">{team.teamPrincipal}</span>
              </div>

              <div>
                <span className="text-neutral-500 uppercase text-[10px] block">Chassis / Power</span>
                <span className="text-neutral-300 font-semibold">{team.chassis}</span>
                <span className="text-neutral-500 text-[10px] block truncate">{team.powerUnit}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-[#e10600] uppercase hover:underline flex items-center gap-1">
                View Full Team Profile <ChevronRight size={13} />
              </span>
              <div
                className="h-2 w-20 rounded-full"
                style={{ backgroundColor: team.baseColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Team Detail Modal */}
      <TeamModal
        team={selectedTeam}
        onClose={() => setSelectedTeam(null)}
      />
    </div>
  );
};

export default F1OfficialTeams;
