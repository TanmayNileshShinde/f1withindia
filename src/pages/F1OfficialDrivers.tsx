import React, { useState } from 'react';
import { ALL_20_DRIVERS, DriverBio } from '../data/f1OfficialData';
import DriverModal from '../components/f1/DriverModal';
import CountryFlag from '../components/f1/CountryFlag';

export const F1OfficialDrivers: React.FC = () => {
  const [selectedDriver, setSelectedDriver] = useState<DriverBio | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
          F1 Drivers 2026
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
          CHECK OUT THIS SEASON'S OFFICIAL 20-DRIVER FORMULA 1 GRID
        </p>
      </div>

      {/* Drivers Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ALL_20_DRIVERS.map((driver) => (
          <div
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
            className="group cursor-pointer rounded-2xl bg-[#1e1e24] border border-white/5 hover:border-red-600/40 overflow-hidden f1-card-hover flex flex-col justify-between h-[410px] relative transition-all duration-300"
          >
            {/* Top Info */}
            <div className="p-5 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-4xl font-black text-white font-syne italic block leading-none">
                    #{driver.number}
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <CountryFlag code={driver.countryFlag} size="sm" />
                    <span className="text-[11px] font-mono text-neutral-400 uppercase font-bold tracking-wider">
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
                <span className="text-xs font-medium text-neutral-400 block tracking-wide">
                  {driver.firstName}
                </span>
                <span className="text-xl font-black text-white uppercase italic tracking-tight font-syne block group-hover:text-red-400 transition-colors">
                  {driver.lastName}
                </span>
                <span
                  className="text-xs font-semibold mt-1 block truncate"
                  style={{ color: driver.teamColor }}
                >
                  {driver.team}
                </span>
              </div>
            </div>

            {/* Driver Portrait Photo Background */}
            <div className="relative h-56 overflow-hidden mt-auto flex items-end justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e24] via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src={driver.portraitUrl}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="w-auto h-full max-h-52 object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300 z-0"
              />
              <span
                className="absolute bottom-0 left-0 right-0 h-1.5 z-20"
                style={{ backgroundColor: driver.teamColor }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Driver Detail Modal */}
      <DriverModal
        driver={selectedDriver}
        onClose={() => setSelectedDriver(null)}
      />
    </div>
  );
};

export default F1OfficialDrivers;
