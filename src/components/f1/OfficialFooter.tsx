import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { F1NavPage } from '../../types/f1';

interface OfficialFooterProps {
  onNavigate: (page: F1NavPage) => void;
}

export const OfficialFooter: React.FC<OfficialFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 bg-[#0f0f15] border-t border-white/10 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Share Your Feedback CTA Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-8 rounded-lg bg-[#e10600] flex items-center justify-center font-black text-white italic text-xl">
              F1
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Formula 1 Official Experience
            </span>
          </div>

          <a
            href="https://www.formula1.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all f1-card-hover"
          >
            <span>Share your feedback</span>
            <ArrowUpRight size={14} className="text-[#e10600]" />
          </a>
        </div>

        {/* 5 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-[11px] leading-relaxed">
          {/* Col 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('schedule')} className="hover:text-white transition-colors">Schedule &gt;</button></li>
              <li><button onClick={() => onNavigate('results')} className="hover:text-white transition-colors">Results &gt;</button></li>
              <li><button onClick={() => onNavigate('standings')} className="hover:text-white transition-colors">Standings &gt;</button></li>
              <li><button onClick={() => onNavigate('drivers')} className="hover:text-white transition-colors">Drivers &gt;</button></li>
              <li><button onClick={() => onNavigate('teams')} className="hover:text-white transition-colors">Teams &gt;</button></li>
              <li><button onClick={() => onNavigate('timing')} className="hover:text-white transition-colors">Live Timing &gt;</button></li>
            </ul>
          </div>

          {/* Col 2: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Legal & Compliance</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal Notices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Anti-Bribery</a></li>
            </ul>
          </div>

          {/* Col 3: Support & Corporate */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Support & Corporate</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">F1 Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F1® Corporate Site</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media Centre</a></li>
            </ul>
          </div>

          {/* Col 4: Community & Content */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">F1® Fan Voice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beyond The Grid Podcast</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F1 Unlocked</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F1 Fantasy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">F1 Play Predictor</a></li>
            </ul>
          </div>

          {/* Col 5: Guidelines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Preferences</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Human Rights</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Double Red Line & Copyright */}
        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="f1-double-stripe" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[11px] font-mono">
            <div className="flex items-center gap-3">
              <div className="w-6 h-5 rounded bg-[#e10600] flex items-center justify-center font-black text-white italic text-xs">
                F1
              </div>
              <span>© 2003-2026 Formula One World Championship Limited</span>
            </div>

            {/* Social Icons (SVG) */}
            <div className="flex items-center gap-4 text-neutral-400">
              <a href="https://facebook.com/Formula1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="https://twitter.com/F1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/f1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com/f1" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OfficialFooter;
