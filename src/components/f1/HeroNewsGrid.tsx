import React from 'react';
import { HERO_NEWS, SIDE_NEWS, TRENDING_NEWS } from '../../data/f1OfficialData';
import { ChevronRight, Clock } from 'lucide-react';

export const HeroNewsGrid: React.FC = () => {
  return (
    <section className="space-y-8">
      {/* 2/3 Hero + 1/3 Side Stack Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Giant Main Hero Article */}
        <div className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-2xl bg-[#1e1e24] border border-white/5 f1-card-hover flex flex-col justify-end min-h-[440px] sm:min-h-[500px]">
          <img
            src={HERO_NEWS.imageUrl}
            alt={HERO_NEWS.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15151e] via-[#15151e]/60 to-transparent" />

          <div className="relative z-10 p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#e10600] text-white text-[11px] font-black uppercase tracking-wider f1-skew-badge">
                <span>{HERO_NEWS.category}</span>
              </span>
              <span className="text-neutral-400 text-xs font-mono">{HERO_NEWS.timeAgo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase italic tracking-tight font-syne leading-none group-hover:text-red-400 transition-colors">
              {HERO_NEWS.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl font-sans leading-relaxed line-clamp-2">
              {HERO_NEWS.summary}
            </p>
          </div>
        </div>

        {/* Right: 4 Stacked Top Stories */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3">
          {SIDE_NEWS.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer p-3 sm:p-3.5 rounded-xl bg-[#1e1e24] border border-white/5 f1-card-hover flex items-center gap-4 flex-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-24 h-20 sm:w-28 sm:h-22 rounded-lg object-cover shrink-0 group-hover:opacity-90 transition-opacity"
              />
              <div className="flex flex-col justify-between h-full py-0.5 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#e10600] uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white uppercase leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                  <Clock size={10} /> {item.timeAgo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Trending Horizontal Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TRENDING_NEWS.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden f1-card-hover flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider f1-skew-badge">
                <span>{item.category}</span>
              </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase leading-snug group-hover:text-red-400 transition-colors line-clamp-3">
                {item.title}
              </h4>
              <span className="text-[10px] text-neutral-400 font-mono block pt-2 border-t border-white/5">
                {item.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroNewsGrid;
