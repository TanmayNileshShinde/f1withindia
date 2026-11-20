import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';
import { F1VideoItem } from '../../types/f1';

interface VideoModalProps {
  video: F1VideoItem | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#121218] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0f0f15]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Formula 1® Video Player
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-bold uppercase">
              {video.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden group">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover opacity-80"
          />

          {/* Broadcast Overlay Graphic */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
            <div className="w-6 h-5 rounded bg-[#e10600] flex items-center justify-center font-black text-white italic text-[10px]">
              F1
            </div>
            <span className="text-white font-bold">LAS VEGAS GP</span>
            <span className="text-red-400 font-bold">• FP2 REPLAY</span>
          </div>

          {/* Speed & Gear Telemetry Hud */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono text-right">
            <span className="text-cyan-400 font-bold text-sm block">338 km/h</span>
            <span className="text-[10px] text-neutral-400">GEAR 8 • DRS ACTIVE</span>
          </div>

          {/* Central Play/Pause Watermark Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-[#e10600]/90 hover:bg-[#e10600] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 fill-current" />}
          </button>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-2">
            {/* Timeline Bar */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(pos);
              }}
              className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden cursor-pointer group"
            >
              <div
                className="h-full bg-[#e10600] rounded-full relative"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
                <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white">
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <span>02:18 / {video.duration}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded text-white font-bold">1080p 60fps</span>
                <Maximize2 size={14} className="hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Info Detail */}
        <div className="p-6 bg-[#15151e] space-y-2">
          <h2 className="text-xl font-bold text-white uppercase italic tracking-tight font-syne">
            {video.title}
          </h2>
          <p className="text-xs text-neutral-400">
            Official Formula 1 stream broadcast recording. Broadcast footage courtesy of Formula One Management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
