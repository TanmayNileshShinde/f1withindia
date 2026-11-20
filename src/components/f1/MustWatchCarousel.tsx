import React, { useState } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { MUST_WATCH_VIDEOS_LIST } from '../../data/f1OfficialData';
import { F1VideoItem } from '../../types/f1';

interface MustWatchCarouselProps {
  onSelectVideo: (video: F1VideoItem) => void;
}

export const MustWatchCarousel: React.FC<MustWatchCarouselProps> = ({ onSelectVideo }) => {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(MUST_WATCH_VIDEOS_LIST.length - 2, prev + 1));
  };

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#e10600]" />
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase italic tracking-tight font-syne">
            Must Watch
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#e10600] uppercase hover:underline cursor-pointer hidden sm:inline">
            View All &gt;
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={scrollIndex === 0}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              disabled={scrollIndex >= MUST_WATCH_VIDEOS_LIST.length - 2}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Videos Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MUST_WATCH_VIDEOS_LIST.slice(scrollIndex, scrollIndex + 4).map((video) => (
          <div
            key={video.id}
            onClick={() => onSelectVideo(video)}
            className="group cursor-pointer rounded-2xl bg-[#1e1e24] border border-white/5 overflow-hidden f1-card-hover flex flex-col justify-between"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#e10600]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={20} className="ml-1 fill-current" />
                </div>
              </div>

              {/* Timestamp badge */}
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 font-mono text-[10px] text-white font-bold">
                {video.duration}
              </span>

              {/* Category */}
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#e10600] text-white text-[9px] font-bold uppercase f1-skew-badge">
                <span>{video.category}</span>
              </span>
            </div>

            <div className="p-4 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase leading-snug group-hover:text-red-400 transition-colors line-clamp-2">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MustWatchCarousel;
