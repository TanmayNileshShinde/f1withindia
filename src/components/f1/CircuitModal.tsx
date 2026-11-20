import React from 'react';
import { X, MapPin, Trophy, Clock, Flag, Compass, Activity } from 'lucide-react';
import { TrackDetail } from '../../data/f1OfficialData';

interface CircuitModalProps {
  track: TrackDetail | null;
  onClose: () => void;
}

export const CircuitModal: React.FC<CircuitModalProps> = ({ track, onClose }) => {
  if (!track) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#161620] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 flex flex-col">
        {/* Top Header */}
        <div className="p-6 sm:p-8 flex items-start justify-between border-b border-white/10 bg-[#121218]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                ROUND {track.round}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {track.dates}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase italic tracking-tight font-syne mt-1">
              {track.gpName}
            </h2>
            <p className="text-xs text-neutral-400 flex items-center gap-1 font-sans">
              <MapPin size={12} className="text-[#e10600]" /> {track.circuit}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Circuit Vector Track Graphic */}
          <div className="rounded-2xl bg-[#0f0f15] border border-white/5 p-6 flex flex-col items-center justify-center relative min-h-[220px]">
            <span className="absolute top-3 left-3 text-[10px] font-mono text-neutral-500 uppercase font-bold">
              Official Track Vector Outline
            </span>

            <svg
              className="w-full max-w-xs h-36 stroke-[#e10600] fill-none stroke-[3] filter drop-shadow-[0_0_12px_rgba(225,6,0,0.5)]"
              viewBox="0 0 160 100"
            >
              <path d={track.svgPath} strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-cyan-300 font-bold bg-neutral-900/80 px-2.5 py-1 rounded-lg border border-white/5">
              DRS Zones: {track.drsZones}
            </div>
          </div>

          {/* Track Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Circuit Length</span>
              <span className="text-xl font-black text-white font-mono mt-0.5 block">{track.trackLength}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Number of Turns</span>
              <span className="text-xl font-black text-amber-400 font-mono mt-0.5 block">{track.turns}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Lap Record</span>
              <span className="text-xl font-black text-cyan-300 font-mono mt-0.5 block">{track.lapRecord}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-white/5 text-center">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Status</span>
              <span className={`text-xs font-mono font-bold mt-1.5 inline-block uppercase ${
                track.status === 'LIVE' ? 'text-red-400 animate-pulse' : track.status === 'COMPLETED' ? 'text-neutral-400' : 'text-emerald-400'
              }`}>
                {track.status}
              </span>
            </div>
          </div>

          {/* Record Holder Note */}
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 text-xs font-mono flex items-center justify-between text-neutral-300">
            <span className="text-neutral-500">Fastest Lap Record Holder:</span>
            <span className="text-white font-bold">{track.lapRecordHolder}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#121218] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-[#e10600] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Circuit Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircuitModal;
