import React from 'react';
import { Flag, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0a0a0f] py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#e10600] flex items-center justify-center font-black text-white italic text-base">
              F1
            </div>
            <div>
              <span className="font-bold text-white tracking-wide block">
                Formula 1 Data Structures & Telemetry Case Study
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">
                Academic School Project • SAKEC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://www.formula1.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              Official F1 App Reference <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500 font-mono">
          <p>© 2026 Tanmay Nilesh Shinde. Designed & developed for Data Structures and Algorithms curriculum.</p>
          <p className="flex items-center gap-1 text-neutral-400">
            Built with React, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
