import React, { useState, useEffect } from 'react';
import { Timer, Radio, AlertTriangle, ArrowUpDown, ChevronRight, Play, RotateCcw, ShieldAlert, Cpu } from 'lucide-react';
import { INITIAL_DRIVERS } from '../data/f1Data';
import { F1Driver } from '../types/f1';
import DsaBadge from '../components/f1/DsaBadge';
import QueueVisualizer from '../components/visualizers/QueueVisualizer';

interface F1LiveTimingProps {
  dsaMode: boolean;
}

export const F1LiveTiming: React.FC<F1LiveTimingProps> = ({ dsaMode }) => {
  const [drivers, setDrivers] = useState<F1Driver[]>(INITIAL_DRIVERS);
  const [showVisualizer, setShowVisualizer] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('00:00:02 ago');
  const [telemetryCount, setTelemetryCount] = useState(142);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'queueArchitecture'>('leaderboard');

  // Simulate incoming telemetry packet from Queue FIFO
  const simulateNextLapPacket = () => {
    setDrivers((prev) => {
      return prev.map((d) => {
        // slight jitter to simulate live telemetry
        const jitter = (Math.random() * 0.2 - 0.1).toFixed(3);
        const parts = d.lastLap.split(':');
        const seconds = (parseFloat(parts[1]) + parseFloat(jitter)).toFixed(3);
        return {
          ...d,
          lastLap: `${parts[0]}:${seconds.padStart(6, '0')}`,
          speedTrap: Math.round(d.speedTrap + (Math.random() * 2 - 1)),
        };
      });
    });
    setTelemetryCount((c) => c + 1);
    setLastUpdated('Just now');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            Live Race Session • Circuit de Monaco
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne">
            Live Timing & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time track positioning, sector splits, speed trap indices, and pit delta calculations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={simulateNextLapPacket}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e10600] hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,6,0,0.3)] active:scale-95"
          >
            <Play size={14} /> Process Telemetry Packet (FIFO)
          </button>

          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <Cpu size={14} className="text-cyan-400" />
            <span>{showVisualizer ? 'Hide Queue Core' : 'Inspect Queue Core'}</span>
          </button>
        </div>
      </div>

      {dsaMode && (
        <DsaBadge
          module="1.5"
          structure="Queue ADT & Ring Buffer (Linear, Circular, Priority)"
          complexity="Enqueue O(1) • Dequeue O(1)"
          explanation="Every car transponder transmits sector timing packets into a streaming FIFO queue. Live timing screens dequeue packets to update sector times, while high-priority emergency flags (Safety Car, Red Flag) jump the queue via Priority Queue."
          active={dsaMode}
        />
      )}

      {/* Embedded Queue Visualizer Drawer if opened */}
      {showVisualizer && (
        <div className="p-4 rounded-3xl bg-neutral-950 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
              <Cpu size={14} /> Telemetry Queue Engine Visualizer (Syllabus 1.5, 1.6 & 2.5)
            </span>
            <button
              onClick={() => setShowVisualizer(false)}
              className="text-xs text-neutral-500 hover:text-white"
            >
              Close Drawer ✕
            </button>
          </div>
          <QueueVisualizer />
        </div>
      )}

      {/* Timing Board Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Session Status</span>
          <span className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            GREEN FLAG
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Packets Dequeued</span>
          <span className="text-sm font-bold text-white mt-0.5 font-mono">{telemetryCount} Frames (FIFO)</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Fastest Lap</span>
          <span className="text-sm font-bold text-purple-400 mt-0.5 font-mono">1:14.054 (NOR)</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Last Ingestion</span>
          <span className="text-sm font-bold text-cyan-300 mt-0.5 font-mono">{lastUpdated}</span>
        </div>
      </div>

      {/* Authentic F1 Leaderboard Table */}
      <div className="rounded-3xl border border-white/10 bg-[#0f0f15] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
                <th className="py-3.5 px-4 font-bold">POS</th>
                <th className="py-3.5 px-3 font-bold">NO</th>
                <th className="py-3.5 px-4 font-bold">DRIVER</th>
                <th className="py-3.5 px-4 font-bold">GAP</th>
                <th className="py-3.5 px-4 font-bold">INTERVAL</th>
                <th className="py-3.5 px-4 font-bold">LAST LAP</th>
                <th className="py-3.5 px-3 font-bold">S1</th>
                <th className="py-3.5 px-3 font-bold">S2</th>
                <th className="py-3.5 px-3 font-bold">S3</th>
                <th className="py-3.5 px-3 font-bold text-center">TYRE</th>
                <th className="py-3.5 px-3 font-bold text-center">PITS</th>
                <th className="py-3.5 px-4 font-bold text-right">SPEED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {drivers.map((driver) => {
                const tyreBg =
                  driver.tyre === 'SOFT'
                    ? 'text-red-400 border-red-500/40 bg-red-950/30'
                    : driver.tyre === 'MEDIUM'
                    ? 'text-amber-400 border-amber-500/40 bg-amber-950/30'
                    : 'text-neutral-200 border-neutral-400/40 bg-neutral-800/40';

                return (
                  <tr
                    key={driver.number}
                    className="hover:bg-neutral-800/50 transition-colors group"
                  >
                    {/* Position */}
                    <td className="py-3 px-4 font-black text-sm text-white">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1 h-5 rounded-full"
                          style={{ backgroundColor: driver.color }}
                        />
                        <span>{driver.pos}</span>
                      </div>
                    </td>

                    {/* Car Number */}
                    <td className="py-3 px-3 text-neutral-400 font-bold">
                      {driver.number}
                    </td>

                    {/* Driver Name & Team */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-xs group-hover:text-red-400 transition-colors font-sans uppercase">
                          {driver.name}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-sans">
                          {driver.team}
                        </span>
                      </div>
                    </td>

                    {/* Gap */}
                    <td className="py-3 px-4 text-neutral-300 font-bold">
                      {driver.gap}
                    </td>

                    {/* Interval */}
                    <td className="py-3 px-4 text-neutral-400">
                      {driver.interval}
                    </td>

                    {/* Last Lap Time */}
                    <td className="py-3 px-4">
                      <span className={driver.pos === 1 ? 'text-purple-400 font-bold' : 'text-neutral-200'}>
                        {driver.lastLap}
                      </span>
                    </td>

                    {/* Sectors */}
                    <td className="py-3 px-3 text-neutral-300">{driver.s1}</td>
                    <td className="py-3 px-3 text-purple-300 font-bold">{driver.s2}</td>
                    <td className="py-3 px-3 text-neutral-300">{driver.s3}</td>

                    {/* Tyre */}
                    <td className="py-3 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tyreBg}`}>
                        {driver.tyre[0]} ({driver.tyreAge}L)
                      </span>
                    </td>

                    {/* Pits */}
                    <td className="py-3 px-3 text-center text-neutral-400">
                      {driver.pits}
                    </td>

                    {/* Speed Trap */}
                    <td className="py-3 px-4 text-right font-bold text-cyan-400">
                      {driver.speedTrap} <span className="text-[10px] text-neutral-500 font-normal">km/h</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default F1LiveTiming;
