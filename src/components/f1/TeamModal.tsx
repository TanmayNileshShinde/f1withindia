import React from 'react';
import { X } from 'lucide-react';
import { TeamBio } from '../../data/f1OfficialData';

interface TeamModalProps {
  team: TeamBio | null;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ team, onClose }) => {
  if (!team) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#161620] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col">
        {/* Header */}
        <div
          className="p-6 sm:p-8 flex items-start justify-between relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${team.baseColor}30 0%, #161620 90%)` }}
        >
          <div className="z-10 space-y-1">
            <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
              CHAMPIONSHIP STANDING: P{team.pos}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
              {team.fullName}
            </h2>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-black/50 text-white font-mono font-black text-sm">
                {team.points} PTS
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Drivers: {team.drivers.join(' & ')}
              </span>
            </div>
          </div>

          <div className="z-20 flex items-center gap-3">
            {team.logoUrl && (
              <img
                src={team.logoUrl}
                alt={team.name}
                className="h-10 w-auto max-w-[80px] object-contain opacity-90 drop-shadow hidden sm:block"
              />
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Team Car Livery in Modal */}
          {team.carImageUrl && (
            <div className="relative h-36 overflow-hidden rounded-2xl bg-black/50 flex items-center justify-center p-4 border border-white/5">
              <img
                src={team.carImageUrl}
                alt={`${team.name} 2026 Car`}
                className="w-full max-h-32 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]"
              />
            </div>
          )}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">World Titles</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">{team.worldChampionships}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Pole Positions</span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-0.5 block">{team.polePositions}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Fastest Laps</span>
              <span className="text-2xl font-black text-cyan-300 font-mono mt-0.5 block">{team.fastestLaps}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">First Entry</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">{team.firstEntry}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              Constructor History & Technical Setup
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {team.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="rounded-2xl bg-neutral-900/60 border border-white/5 p-4 space-y-3 text-xs font-mono">
            <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Factory Base:</span>
              <span className="text-white font-bold">{team.base}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Team Principal:</span>
              <span className="text-white font-bold">{team.teamPrincipal}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Chassis Model:</span>
              <span className="text-white font-bold">{team.chassis}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-500">Power Unit:</span>
              <span className="text-cyan-300 font-bold">{team.powerUnit}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121218] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-[#e10600] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;
