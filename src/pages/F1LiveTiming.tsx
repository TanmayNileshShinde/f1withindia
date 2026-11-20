import React, { useState } from 'react';
import { Timer, Radio, Play, RotateCcw, Cpu, Zap, Activity } from 'lucide-react';
import { ALL_20_DRIVERS } from '../data/f1OfficialData';
import QueueVisualizer from '../components/visualizers/QueueVisualizer';

interface LiveDriverRow {
  pos: number;
  number: number;
  code: string;
  name: string;
  team: string;
  gap: string;
  interval: string;
  lastLap: string;
  s1: string;
  s2: string;
  s3: string;
  tyre: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTER';
  tyreAge: number;
  pits: number;
  speedTrap: number;
  color: string;
}

export const F1LiveTiming: React.FC<{ dsaMode?: boolean }> = () => {
  const [drivers, setDrivers] = useState<LiveDriverRow[]>([
    { pos: 1, number: 63, code: 'RUS', name: 'George Russell', team: 'Mercedes-AMG', gap: 'LEADER', interval: '-', lastLap: '1:33.812', s1: '26.4', s2: '38.1', s3: '29.3', tyre: 'SOFT', tyreAge: 8, pits: 1, speedTrap: 342.1, color: '#27f4d2' },
    { pos: 2, number: 10, code: 'GAS', name: 'Pierre Gasly', team: 'Alpine', gap: '+0.182', interval: '+0.182', lastLap: '1:33.994', s1: '26.5', s2: '38.2', s3: '29.2', tyre: 'MEDIUM', tyreAge: 11, pits: 1, speedTrap: 338.4, color: '#ff87bc' },
    { pos: 3, number: 16, code: 'LEC', name: 'Charles Leclerc', team: 'Ferrari', gap: '+0.245', interval: '+0.063', lastLap: '1:34.057', s1: '26.4', s2: '38.4', s3: '29.2', tyre: 'SOFT', tyreAge: 6, pits: 1, speedTrap: 340.8, color: '#e8002d' },
    { pos: 4, number: 12, code: 'ANT', name: 'Kimi Antonelli', team: 'Mercedes-AMG', gap: '+0.310', interval: '+0.065', lastLap: '1:34.122', s1: '26.6', s2: '38.2', s3: '29.3', tyre: 'SOFT', tyreAge: 7, pits: 1, speedTrap: 343.2, color: '#27f4d2' },
    { pos: 5, number: 1, code: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing', gap: '+0.450', interval: '+0.140', lastLap: '1:34.262', s1: '26.7', s2: '38.3', s3: '29.2', tyre: 'MEDIUM', tyreAge: 14, pits: 1, speedTrap: 341.5, color: '#3671c6' },
    { pos: 6, number: 4, code: 'NOR', name: 'Lando Norris', team: 'McLaren', gap: '+0.512', interval: '+0.062', lastLap: '1:34.324', s1: '26.5', s2: '38.5', s3: '29.3', tyre: 'HARD', tyreAge: 18, pits: 1, speedTrap: 339.6, color: '#ff8000' },
    { pos: 7, number: 44, code: 'HAM', name: 'Lewis Hamilton', team: 'Ferrari', gap: '+0.680', interval: '+0.168', lastLap: '1:34.492', s1: '26.8', s2: '38.4', s3: '29.2', tyre: 'MEDIUM', tyreAge: 12, pits: 1, speedTrap: 338.9, color: '#e8002d' },
    { pos: 8, number: 81, code: 'PIA', name: 'Oscar Piastri', team: 'McLaren', gap: '+0.744', interval: '+0.064', lastLap: '1:34.556', s1: '26.7', s2: '38.5', s3: '29.3', tyre: 'HARD', tyreAge: 16, pits: 1, speedTrap: 339.2, color: '#ff8000' },
    { pos: 9, number: 55, code: 'SAI', name: 'Carlos Sainz', team: 'Williams', gap: '+0.890', interval: '+0.146', lastLap: '1:34.702', s1: '26.9', s2: '38.5', s3: '29.3', tyre: 'MEDIUM', tyreAge: 15, pits: 1, speedTrap: 337.8, color: '#64c4ff' },
    { pos: 10, number: 14, code: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin', gap: '+1.105', interval: '+0.215', lastLap: '1:34.917', s1: '27.0', s2: '38.6', s3: '29.3', tyre: 'HARD', tyreAge: 21, pits: 1, speedTrap: 336.5, color: '#229971' },
  ]);

  const [showBufferInspector, setShowBufferInspector] = useState(false);
  const [telemetryFrames, setTelemetryFrames] = useState(284);
  const [lastUpdated, setLastUpdated] = useState('00:00:01 ago');

  const processIncomingPacket = () => {
    setDrivers((prev) =>
      prev.map((d) => {
        const jitter = (Math.random() * 0.15 - 0.075).toFixed(3);
        const parts = d.lastLap.split(':');
        const seconds = (parseFloat(parts[1]) + parseFloat(jitter)).toFixed(3);
        return {
          ...d,
          lastLap: `${parts[0]}:${seconds.padStart(6, '0')}`,
          speedTrap: Math.round(d.speedTrap + (Math.random() * 2 - 1)),
        };
      })
    );
    setTelemetryFrames((c) => c + 1);
    setLastUpdated('Just now');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#e10600] font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            Live Practice Session • Las Vegas Strip Circuit
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white uppercase italic tracking-tight font-syne">
            Live Timing & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-mono">
            REAL-TIME TRACK POSITIONING, SECTOR SPLITS & PIT STOP INTERVALS
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={processIncomingPacket}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e10600] hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,6,0,0.3)] active:scale-95"
          >
            <Play size={14} /> Process Live Telemetry Packet
          </button>

          <button
            onClick={() => setShowBufferInspector(!showBufferInspector)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-200 font-mono text-xs font-bold transition-all"
          >
            <Activity size={14} className="text-cyan-400" />
            <span>{showBufferInspector ? 'Hide Telemetry Buffer' : 'Telemetry Buffer Stream'}</span>
          </button>
        </div>
      </div>

      {/* Embedded Buffer Drawer if opened */}
      {showBufferInspector && (
        <div className="p-5 rounded-3xl bg-[#1e1e24] border border-cyan-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono font-bold uppercase text-cyan-400 flex items-center gap-2">
              <Cpu size={14} /> High-Speed Telemetry Buffer Ring & Stream
            </span>
            <button
              onClick={() => setShowBufferInspector(false)}
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
        <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/5">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Session Status</span>
          <span className="text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            FP3 GREEN FLAG
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/5">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Frames Processed</span>
          <span className="text-sm font-bold text-white mt-0.5 font-mono">{telemetryFrames} Packets</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/5">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Fastest Lap</span>
          <span className="text-sm font-bold text-purple-400 mt-0.5 font-mono">1:33.812 (RUS)</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-[#1e1e24] border border-white/5">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">Stream Ingestion</span>
          <span className="text-sm font-bold text-cyan-300 mt-0.5 font-mono">{lastUpdated}</span>
        </div>
      </div>

      {/* Authentic F1 Timing Board Table */}
      <div className="rounded-3xl border border-white/5 bg-[#1e1e24] overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs font-mono min-w-[760px]">
          <thead>
            <tr className="bg-[#15151e] text-neutral-400 uppercase tracking-wider text-[11px] border-b border-white/10">
              <th className="py-4 px-4 font-bold">POS</th>
              <th className="py-4 px-3 font-bold">NO</th>
              <th className="py-4 px-4 font-bold">DRIVER</th>
              <th className="py-4 px-4 font-bold">GAP</th>
              <th className="py-4 px-4 font-bold">INTERVAL</th>
              <th className="py-4 px-4 font-bold">LAST LAP</th>
              <th className="py-4 px-3 font-bold">S1</th>
              <th className="py-4 px-3 font-bold">S2</th>
              <th className="py-4 px-3 font-bold">S3</th>
              <th className="py-4 px-3 font-bold text-center">TYRE</th>
              <th className="py-4 px-3 font-bold text-center">PITS</th>
              <th className="py-4 px-4 font-bold text-right">SPEED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {drivers.map((driver) => {
              const tyreClass =
                driver.tyre === 'SOFT'
                  ? 'text-red-400 border-red-500/40 bg-red-950/30'
                  : driver.tyre === 'MEDIUM'
                  ? 'text-amber-400 border-amber-500/40 bg-amber-950/30'
                  : 'text-neutral-200 border-neutral-400/40 bg-neutral-800/40';

              return (
                <tr key={driver.number} className="hover:bg-neutral-800/40 transition-colors group">
                  <td className="py-3 px-4 font-black text-sm text-white">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-6 rounded-full"
                        style={{ backgroundColor: driver.color }}
                      />
                      <span>{driver.pos}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-neutral-400 font-bold">{driver.number}</td>

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

                  <td className="py-3 px-4 text-neutral-300 font-bold">{driver.gap}</td>
                  <td className="py-3 px-4 text-neutral-400">{driver.interval}</td>

                  <td className="py-3 px-4">
                    <span className={driver.pos === 1 ? 'text-purple-400 font-bold' : 'text-neutral-200'}>
                      {driver.lastLap}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-neutral-300">{driver.s1}</td>
                  <td className="py-3 px-3 text-purple-300 font-bold">{driver.s2}</td>
                  <td className="py-3 px-3 text-neutral-300">{driver.s3}</td>

                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${tyreClass}`}>
                      {driver.tyre[0]} ({driver.tyreAge}L)
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center text-neutral-400">{driver.pits}</td>

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
  );
};

export default F1LiveTiming;
