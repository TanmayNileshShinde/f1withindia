import React from 'react';
import { DRIVERS_2026 } from '../data/f1OfficialData';
import { Trophy, Award } from 'lucide-react';

export const F1OfficialDrivers: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          F1 Drivers 2026
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          CHECK OUT THIS SEASON'S OFFICIAL FORMULA 1 DRIVERS LINE-UP
        </p>
      </div>

      {/* Drivers Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DRIVERS_2026.map((driver) => (
          <div
            key={driver.id}
            className="group cursor-pointer rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden f1-card-hover flex flex-col justify-between h-[380px] relative"
          >
            {/* Top Info */}
            <div className="p-5 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-4xl font-black text-white font-syne italic block leading-none">
                    {driver.number}
                  </span>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-base">{driver.countryFlag}</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">
                      {driver.country}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-white font-mono block">
                    {driver.points} <span className="text-[10px] text-neutral-400">PTS</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {driver.podiums} Podiums
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10">
                <span className="text-sm font-medium text-neutral-300 block">
                  {driver.firstName}
                </span>
                <span className="text-xl font-black text-white uppercase italic tracking-tight font-syne block group-hover:text-red-400 transition-colors">
                  {driver.lastName}
                </span>
                <span
                  className="text-xs font-semibold mt-1 block"
                  style={{ color: driver.teamColor }}
                >
                  {driver.team}
                </span>
              </div>
            </div>

            {/* Driver Portrait Photo Background */}
            <div className="relative h-48 overflow-hidden mt-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e24] via-transparent to-transparent z-10" />
              <img
                src={driver.portraitUrl}
                alt={driver.lastName}
                className="w-full h-full object-cover object-top opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-300"
              />
              <span
                className="absolute bottom-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: driver.teamColor }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default F1OfficialDrivers;
