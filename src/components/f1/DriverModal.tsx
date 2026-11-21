import React from 'react';
import { X } from 'lucide-react';
import { DriverBio } from '../../data/f1OfficialData';
import CountryFlag from './CountryFlag';

interface DriverModalProps {
  driver: DriverBio | null;
  onClose: () => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({ driver, onClose }) => {
  if (!driver) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#161620] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col">
        {/* Top Header */}
        <div
          className="p-6 sm:p-8 flex items-start justify-between relative overflow-hidden min-h-[160px]"
          style={{ background: `linear-gradient(135deg, ${driver.teamColor}35 0%, #161620 90%)` }}
        >
          <div className="z-10 space-y-1">
            <span className="text-5xl font-black text-white italic font-syne leading-none block">
              #{driver.number}
            </span>
            <div className="pt-2">
              <span className="text-sm font-semibold text-neutral-300 block">
                {driver.firstName}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
                {driver.lastName}
              </h2>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <CountryFlag code={driver.countryFlag} size="sm" />
              <p
                className="text-xs font-bold uppercase tracking-wider font-mono"
                style={{ color: driver.teamColor }}
              >
                {driver.team}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="z-20 p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
          >
            <X size={18} />
          </button>

          {/* Portrait Background */}
          <img
            src={driver.portraitUrl}
            alt={driver.lastName}
            className="absolute right-4 bottom-0 w-44 sm:w-56 h-[90%] object-contain object-bottom opacity-90 pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] z-0"
          />
        </div>

        {/* Content Stats Grid */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">2026 Points</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">{driver.points}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Podiums</span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-0.5 block">{driver.podiums}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">World Titles</span>
              <span className="text-2xl font-black text-white font-mono mt-0.5 block">{driver.worldChampionships}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">GP Starts</span>
              <span className="text-2xl font-black text-cyan-300 font-mono mt-0.5 block">{driver.grandsPrixStarts}</span>
            </div>
          </div>

          {/* Driver Biography */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400">
              Biography & Paddock Profile
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {driver.bio}
            </p>
          </div>

          {/* Career Specs Table */}
          <div className="rounded-2xl bg-neutral-900/60 border border-white/5 p-4 space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Country of Origin:</span>
              <span className="text-white font-bold flex items-center gap-1.5">
                <CountryFlag code={driver.countryFlag} size="sm" />
                {driver.country}
              </span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Date & Place of Birth:</span>
              <span className="text-white font-bold">{driver.birthDate} ({driver.birthPlace})</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2 text-neutral-300">
              <span className="text-neutral-500">Highest Race Finish:</span>
              <span className="text-white font-bold">{driver.highestFinish}</span>
            </div>
            <div className="flex justify-between text-neutral-300">
              <span className="text-neutral-500">Highest Grid Position:</span>
              <span className="text-white font-bold">{driver.highestGrid}</span>
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

export default DriverModal;
