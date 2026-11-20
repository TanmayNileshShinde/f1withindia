import React from 'react';
import { GLOBAL_PARTNERS, OFFICIAL_PARTNERS } from '../../data/f1OfficialData';

export const PartnersStrip: React.FC = () => {
  return (
    <section className="space-y-6 pt-6 border-t border-white/10">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <h3 className="text-xs font-black text-neutral-400 uppercase tracking-widest font-mono">
          Our Partners
        </h3>
        <span className="text-xs font-bold text-[#e10600] uppercase hover:underline cursor-pointer">
          View all &gt;
        </span>
      </div>

      {/* Global Partners Grid */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
          Global Partners
        </span>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-2">
          {GLOBAL_PARTNERS.map((partner: string) => (
            <div
              key={partner}
              className="px-4 py-2 rounded-xl bg-[#1e1e24] border border-white/5 text-xs font-black tracking-wider text-neutral-300 uppercase hover:text-white hover:border-red-500/40 transition-colors cursor-pointer"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>

      {/* Official Partners Grid */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">
          Official Partners
        </span>
        <div className="flex flex-wrap items-center gap-3 py-1">
          {OFFICIAL_PARTNERS.map((partner: string) => (
            <span
              key={partner}
              className="text-[11px] font-bold text-neutral-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wide"
            >
              {partner} •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersStrip;
