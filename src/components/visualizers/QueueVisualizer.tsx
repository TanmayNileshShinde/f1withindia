import React, { useState } from 'react';
import { ArrowRight, RotateCcw, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';

interface QueueItem {
  id: string;
  driver: string;
  data: string;
  priority?: boolean;
}

const PRESET_PACKETS = [
  { driver: 'VER', data: 'Sector 1: 27.842s' },
  { driver: 'NOR', data: 'Speed Trap: 339.8 km/h' },
  { driver: 'LEC', data: 'Tyre Temp: 104°C' },
  { driver: 'HAM', data: 'Sector 3: 31.029s' },
  { driver: 'PIA', data: 'DRS Detected: Open' },
  { driver: 'SAFETY CAR', data: 'CRASH DEBRIS IN TURN 4', priority: true },
];

export const QueueVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'linear' | 'circular' | 'priority'>('linear');
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: '1', driver: 'VER', data: 'Sector 1: 27.842s' },
    { id: '2', driver: 'NOR', data: 'Speed Trap: 339.8 km/h' },
    { id: '3', driver: 'LEC', data: 'Tyre Temp: 104°C' },
  ]);
  const [log, setLog] = useState<string[]>(['Queue initialized with 3 live timing packets']);
  const CAPACITY = 6;

  const handleEnqueue = (packet: typeof PRESET_PACKETS[0]) => {
    if (queue.length >= CAPACITY) {
      setLog((prev) => [`Queue Overflow! Buffer full (${CAPACITY}/${CAPACITY}).`, ...prev.slice(0, 4)]);
      return;
    }

    const newItem: QueueItem = {
      id: Math.random().toString(36).substr(2, 5),
      driver: packet.driver,
      data: packet.data,
      priority: packet.priority,
    };

    if (mode === 'priority' && packet.priority) {
      // In priority mode, emergency packets jump to the front
      setQueue((prev) => [newItem, ...prev]);
      setLog((prev) => [`PRIORITY ENQUEUE: Safety Car emergency placed at FRONT!`, ...prev.slice(0, 4)]);
    } else {
      setQueue((prev) => [...prev, newItem]);
      setLog((prev) => [`ENQUEUE: [${packet.driver}] added at REAR.`, ...prev.slice(0, 4)]);
    }
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      setLog((prev) => ['Queue Underflow! No packets to process.', ...prev.slice(0, 4)]);
      return;
    }
    const dequeued = queue[0];
    setQueue((prev) => prev.slice(1));
    setLog((prev) => [`DEQUEUE: Broadcast screen processed [${dequeued.driver} - ${dequeued.data}] from FRONT.`, ...prev.slice(0, 4)]);
  };

  const handleReset = () => {
    setQueue([]);
    setLog(['Queue cleared. Ready for fresh race session.']);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Cpu size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Live Telemetry Queue & Buffers
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">FIFO</span>
            </h4>
            <p className="text-xs text-neutral-400">First-In-First-Out processing of streaming timing sensors</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setMode('linear')}
            className={`px-3 py-1.5 rounded-lg transition-all ${mode === 'linear' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Linear Queue
          </button>
          <button
            onClick={() => setMode('circular')}
            className={`px-3 py-1.5 rounded-lg transition-all ${mode === 'circular' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Circular Queue
          </button>
          <button
            onClick={() => setMode('priority')}
            className={`px-3 py-1.5 rounded-lg transition-all ${mode === 'priority' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Priority Queue
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              1. Enqueue Incoming Telemetry Packets
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_PACKETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEnqueue(p)}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs font-medium flex flex-col gap-1 active:scale-95 ${
                    p.priority
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50'
                      : 'bg-neutral-900 hover:bg-neutral-850 border-neutral-800 text-neutral-300 hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-mono text-[11px] text-white">{p.driver}</span>
                    {p.priority && <ShieldAlert size={12} className="text-amber-400" />}
                  </div>
                  <span className="text-[10px] text-neutral-400 truncate">{p.data}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleDequeue}
              disabled={queue.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide transition-all shadow-lg active:scale-95"
            >
              <ArrowRight size={14} />
              DEQUEUE (Process onto TV Screen)
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
              title="Reset Queue"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Mode explanation */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-white/5 text-xs text-neutral-400 space-y-1">
            <div className="font-bold text-neutral-200">
              {mode === 'linear' && '🔹 Linear Queue (FIFO)'}
              {mode === 'circular' && '🔄 Circular Ring Buffer'}
              {mode === 'priority' && '🚨 Priority Emergency Queue'}
            </div>
            <p className="text-[11px]">
              {mode === 'linear' && 'New items join the REAR, items leave from the FRONT. Standard order.'}
              {mode === 'circular' && 'When rear hits the end of array, it wraps around using (rear + 1) % size, eliminating wasted space.'}
              {mode === 'priority' && 'Safety Car and Red Flag alerts jump directly to the FRONT of processing.'}
            </p>
          </div>

          {/* Log */}
          <div className="p-2.5 rounded-xl bg-neutral-950 font-mono text-[11px] text-neutral-400 border border-neutral-900 space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-500">Telemetry Feed Log:</div>
            {log.slice(0, 3).map((l, i) => (
              <div key={i} className="truncate text-cyan-300/80">▸ {l}</div>
            ))}
          </div>
        </div>

        {/* Visual Queue Pipeline */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4 pb-2 border-b border-neutral-900">
            <span className="flex items-center gap-1 text-cyan-400 font-bold">
              FRONT (Next to Dequeue) <ArrowRight size={12} />
            </span>
            <span className="text-red-400 font-bold">
              REAR (Incoming Enqueue)
            </span>
          </div>

          {/* Queue Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto">
            {Array.from({ length: CAPACITY }).map((_, index) => {
              const item = queue[index];
              const isFront = index === 0 && item;
              const isRear = index === queue.length - 1 && item;

              return (
                <div
                  key={index}
                  className={`relative p-3.5 rounded-xl border flex flex-col justify-between h-28 transition-all duration-300 ${
                    item
                      ? item.priority
                        ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : isFront
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(39,244,210,0.2)]'
                        : 'bg-neutral-900/90 border-neutral-700'
                      : 'bg-neutral-900/20 border-dashed border-neutral-800 text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-500 font-bold">
                      Slot [{index}]
                    </span>
                    {isFront && (
                      <span className="text-[9px] font-mono font-bold bg-cyan-500 text-black px-1.5 py-0.5 rounded">
                        FRONT
                      </span>
                    )}
                    {isRear && !isFront && (
                      <span className="text-[9px] font-mono font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                        REAR
                      </span>
                    )}
                  </div>

                  {item ? (
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <span>{item.driver}</span>
                        {item.priority && <ShieldAlert size={12} className="text-amber-400" />}
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                        {item.data}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center font-mono text-[11px] text-neutral-700">
                      Empty
                    </div>
                  )}

                  <div className="text-[9px] font-mono text-neutral-500 flex justify-between">
                    <span>{mode === 'circular' ? `(${index}) % ${CAPACITY}` : `Index ${index}`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-900 flex justify-between items-center text-xs font-mono text-neutral-400">
            <span>Size: {queue.length} / {CAPACITY}</span>
            <span className="text-neutral-500">Formula: (rear + 1) % {CAPACITY}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
