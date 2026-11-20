import React from 'react';
import { Smartphone, Download } from 'lucide-react';

export const AppDownloadBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl f1-carbon-pattern border border-white/10 p-8 sm:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-4">
        {/* Mini F1 Emblem */}
        <div className="w-12 h-10 rounded-xl bg-[#e10600] flex items-center justify-center font-black text-white italic text-xl shadow-[0_0_20px_rgba(225,6,0,0.5)]">
          F1
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne leading-none">
          Download the Official F1® App
        </h2>

        <p className="text-neutral-300 text-xs sm:text-sm tracking-wider uppercase font-mono">
          Your ultimate companion into the world of Formula 1
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          {/* Apple App Store */}
          <a
            href="https://apps.apple.com/app/formula-1/id389201206"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 transition-all f1-card-hover"
          >
            <span className="text-2xl"></span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase font-mono text-neutral-400 leading-none">Download on the</span>
              <span className="text-xs font-bold font-sans">App Store</span>
            </div>
          </a>

          {/* Google Play Store */}
          <a
            href="https://play.google.com/store/apps/details?id=com.softpauer.f1timingapp2014.basic"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 transition-all f1-card-hover"
          >
            <span className="text-xl">▶</span>
            <div className="flex flex-col text-left">
              <span className="text-[9px] uppercase font-mono text-neutral-400 leading-none">GET IT ON</span>
              <span className="text-xs font-bold font-sans">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadBanner;
