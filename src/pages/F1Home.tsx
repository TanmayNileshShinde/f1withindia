import React, { useState, useEffect } from 'react';
import { Flag, Play, ArrowRight, ShieldAlert, Zap, Trophy, Timer, Radio } from 'lucide-react';
import { F1Page } from '../types/f1';
import DsaBadge from '../components/f1/DsaBadge';

interface F1HomeProps {
  onNavigate: (page: F1Page) => void;
  dsaMode: boolean;
}

export const F1Home: React.FC<F1HomeProps> = ({ onNavigate, dsaMode }) => {
  const [tickerMessages, setTickerMessages] = useState<string[]>([
    'LAP 28/78: Verstappen maintains P1 lead over Norris (+1.428s)',
    'RACE CONTROL: Track clear in Sector 2 (Green Flag)',
    'FERRARI RADIO: "Charles, we are considering Plan B under-cut"',
    'FASTEST LAP: Lando Norris (McLaren) clocks 1:14.054',
  ]);

  const addTelemetryMessage = () => {
    const alerts = [
      'ASTON MARTIN: Alonso reports vibration in front-left tyre',
      'SPEED TRAP: Verstappen clocks 341.2 km/h on main straight',
      'PIT WINDOW: Mercedes servicing Russell (2.4s stationary)',
      'WEATHER REPORT: 0% rain probability for remaining 50 laps',
    ];
    const nextAlert = alerts[Math.floor(Math.random() * alerts.length)];
    // FIFO Queue operation: push new message to end
    setTickerMessages((prev) => [...prev.slice(1), nextAlert]);
  };

  return (
    <div className="space-y-10">
      {/* Live Race Control Ticker (Queue FIFO) */}
      <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <Radio size={14} /> Live Timing Stream
        </div>

        <div className="flex-1 overflow-hidden font-mono text-xs text-neutral-300">
          <div className="truncate text-cyan-300">
            {tickerMessages[tickerMessages.length - 1]}
          </div>
        </div>

        <button
          onClick={addTelemetryMessage}
          className="px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg text-[11px] font-mono border border-neutral-800 transition-colors shrink-0"
        >
          + Enqueue Next Event
        </button>
      </div>

      {dsaMode && (
        <DsaBadge
          module="1.5"
          structure="Queue ADT (FIFO Telemetry Stream)"
          complexity="Enqueue O(1) • Dequeue O(1)"
          explanation="Race control radio messages and sector updates are appended to the rear of a FIFO queue and processed sequentially at the front to maintain chronological accuracy on the broadcast ticker."
          active={dsaMode}
        />
      )}

      {/* Featured Grand Prix Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-r from-[#14141d] via-[#1a141a] to-[#121217] p-8 lg:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#e10600] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              ROUND 05 • LIVE GRAND PRIX
            </span>
            <span className="text-xs text-neutral-400 font-mono">Circuit de Monaco • Lap 28 / 78</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne leading-none">
            FORMULA 1 GRAND PRIX <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-white">
              DE MONACO 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Verstappen defends lead under intense pressure from Norris. High downforce aero battles on the historic streets of Monte Carlo.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('timing')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#e10600] hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,6,0,0.4)] active:scale-95"
            >
              <Timer size={16} /> Open Live Timing Board
            </button>
            <button
              onClick={() => onNavigate('laps')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 font-bold text-xs uppercase tracking-wider transition-all active:scale-95"
            >
              <Zap size={16} /> Lap Event Tracker
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Live Podium Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-white uppercase tracking-wider flex items-center gap-2 font-syne">
            <Trophy size={18} className="text-amber-400" />
            Current Race Leaders (P1 - P3)
          </h2>
          <button
            onClick={() => onNavigate('standings')}
            className="text-xs font-mono text-[#e10600] hover:underline font-bold flex items-center gap-1"
          >
            Full Standings <ArrowRight size={12} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* P1 */}
          <div className="p-5 rounded-2xl bg-[#14141c] border-2 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col justify-between h-44 relative overflow-hidden">
            <div className="absolute top-2 right-3 font-mono font-black text-4xl text-amber-500/20">P1</div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">Race Leader</span>
              <h3 className="text-xl font-black text-white mt-1">Max Verstappen</h3>
              <span className="text-xs text-neutral-400 font-medium">Oracle Red Bull Racing • #1</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs font-mono">
              <span className="text-neutral-400">Interval: <span className="text-white font-bold">LEADER</span></span>
              <span className="text-cyan-300">1:14.281</span>
            </div>
          </div>

          {/* P2 */}
          <div className="p-5 rounded-2xl bg-[#14141c] border border-neutral-700 flex flex-col justify-between h-44 relative overflow-hidden">
            <div className="absolute top-2 right-3 font-mono font-black text-4xl text-neutral-600/30">P2</div>
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">Chaser</span>
              <h3 className="text-xl font-black text-white mt-1">Lando Norris</h3>
              <span className="text-xs text-neutral-400 font-medium">McLaren Formula 1 • #4</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs font-mono">
              <span className="text-neutral-400">Gap: <span className="text-white font-bold">+1.428s</span></span>
              <span className="text-cyan-300">1:14.054</span>
            </div>
          </div>

          {/* P3 */}
          <div className="p-5 rounded-2xl bg-[#14141c] border border-neutral-700 flex flex-col justify-between h-44 relative overflow-hidden">
            <div className="absolute top-2 right-3 font-mono font-black text-4xl text-amber-700/20">P3</div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">Podium</span>
              <h3 className="text-xl font-black text-white mt-1">Charles Leclerc</h3>
              <span className="text-xs text-neutral-400 font-medium">Scuderia Ferrari HP • #16</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs font-mono">
              <span className="text-neutral-400">Gap: <span className="text-white font-bold">+4.195s</span></span>
              <span className="text-cyan-300">1:14.412</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights & F1 App Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigate('timing')}
          className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-red-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Timer size={20} />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            Live Telemetry & Timings
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Real-time sector splits, speed trap telemetry, and pit stop gaps refreshed live with FIFO queue buffers.
          </p>
          <div className="text-xs font-mono text-[#e10600] font-bold flex items-center gap-1">
            Launch Timing Console ➔
          </div>
        </div>

        <div
          onClick={() => onNavigate('schedule')}
          className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-red-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Flag size={20} />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            2026 Season Schedule & Circuits
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            24 Grand Prix tracks modeled as graph networks with sector nodes, DRS activation zones, and weekend DAG schedules.
          </p>
          <div className="text-xs font-mono text-[#e10600] font-bold flex items-center gap-1">
            Explore Grand Prix Tracks ➔
          </div>
        </div>

        <div
          onClick={() => onNavigate('pitwall')}
          className="p-6 rounded-3xl bg-neutral-900/60 border border-neutral-800 hover:border-red-500/40 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
            <Zap size={20} />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            Pit Wall Telemetry Directory
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Fast hash lookup mapping driver three-letter codes (VER, NOR, LEC) to dedicated team garage telemetry channels.
          </p>
          <div className="text-xs font-mono text-[#e10600] font-bold flex items-center gap-1">
            Open Garage Directory ➔
          </div>
        </div>
      </div>
    </div>
  );
};

export default F1Home;
