import React, { useState } from 'react';
import { Database, Plus, RotateCcw, AlertTriangle, ArrowRight } from 'lucide-react';

interface ChainingBucket {
  index: number;
  items: { code: string; name: string }[];
}

const DRIVER_PRESETS = [
  { code: 'VER', name: 'Max Verstappen' },
  { code: 'NOR', name: 'Lando Norris' },
  { code: 'LEC', name: 'Charles Leclerc' },
  { code: 'PIA', name: 'Oscar Piastri' },
  { code: 'HAM', name: 'Lewis Hamilton' },
  { code: 'RUS', name: 'George Russell' },
  { code: 'ALO', name: 'Fernando Alonso' },
  { code: 'SAI', name: 'Carlos Sainz' },
];

const TABLE_SIZE = 8;

function hashFunc(code: string): number {
  let sum = 0;
  for (let i = 0; i < code.length; i++) {
    sum += code.charCodeAt(i);
  }
  return sum % TABLE_SIZE;
}

export const HashVisualizer: React.FC = () => {
  const [resolution, setResolution] = useState<'linear' | 'chaining'>('linear');
  const [openAddressingTable, setOpenAddressingTable] = useState<(string | null)[]>(
    Array(TABLE_SIZE).fill(null)
  );
  const [chainingTable, setChainingTable] = useState<ChainingBucket[]>(() =>
    Array.from({ length: TABLE_SIZE }, (_, i) => ({ index: i, items: [] }))
  );
  const [logs, setLogs] = useState<string[]>([
    'Pit Lane Garage Table initialized (8 slots).',
  ]);

  const insertDriver = (driver: typeof DRIVER_PRESETS[0]) => {
    const rawHash = hashFunc(driver.code);

    if (resolution === 'linear') {
      let slot = rawHash;
      let probes = 0;
      let placed = false;

      const newTable = [...openAddressingTable];

      // Check if already in table
      if (newTable.includes(driver.code)) {
        setLogs((prev) => [`[${driver.code}] already assigned to a garage slot.`, ...prev.slice(0, 4)]);
        return;
      }

      while (probes < TABLE_SIZE) {
        if (newTable[slot] === null) {
          newTable[slot] = driver.code;
          placed = true;
          break;
        }
        probes++;
        slot = (rawHash + probes) % TABLE_SIZE;
      }

      if (placed) {
        setOpenAddressingTable(newTable);
        const msg =
          probes === 0
            ? `h("${driver.code}") = ${rawHash} ➔ Placed in Garage [${slot}] (Direct Hit)`
            : `Collision at [${rawHash}]! Linear Probe #${probes} ➔ Placed in Garage [${slot}]`;
        setLogs((prev) => [msg, ...prev.slice(0, 4)]);
      } else {
        setLogs((prev) => [`Table Overflow! All 8 garage slots are full.`, ...prev.slice(0, 4)]);
      }
    } else {
      // Separate Chaining
      const newChain = chainingTable.map((bucket) => ({
        ...bucket,
        items: [...bucket.items],
      }));

      // Check duplicate
      if (newChain[rawHash].items.some((item) => item.code === driver.code)) {
        setLogs((prev) => [`[${driver.code}] already in Bucket [${rawHash}].`, ...prev.slice(0, 4)]);
        return;
      }

      newChain[rawHash].items.push(driver);
      setChainingTable(newChain);

      const chainLen = newChain[rawHash].items.length;
      const msg =
        chainLen > 1
          ? `Collision at Bucket [${rawHash}]! Appended "${driver.code}" to Linked Chain (Length: ${chainLen})`
          : `h("${driver.code}") = ${rawHash} ➔ Created Head node at Bucket [${rawHash}]`;
      setLogs((prev) => [msg, ...prev.slice(0, 4)]);
    }
  };

  const handleReset = () => {
    setOpenAddressingTable(Array(TABLE_SIZE).fill(null));
    setChainingTable(
      Array.from({ length: TABLE_SIZE }, (_, i) => ({ index: i, items: [] }))
    );
    setLogs(['Garage table cleared. Ready for next race.']);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400">
            <Database size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Pit Garage Telemetry Hash Table
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">O(1)</span>
            </h4>
            <p className="text-xs text-neutral-400">Hash function h(k) = sum(ASCII) % 8 with collision resolution</p>
          </div>
        </div>

        {/* Resolution Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setResolution('linear'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${resolution === 'linear' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Linear Probing (Open Addressing)
          </button>
          <button
            onClick={() => { setResolution('chaining'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${resolution === 'chaining' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Separate Chaining (Linked Buckets)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              1. Tap Driver to Hash & Assign Garage
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DRIVER_PRESETS.map((d) => (
                <button
                  key={d.code}
                  onClick={() => insertDriver(d)}
                  className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-pink-500/50 text-left transition-all text-xs font-medium text-neutral-200 active:scale-95 flex items-center justify-between"
                >
                  <span className="font-bold font-mono text-white">{d.code}</span>
                  <span className="text-[10px] text-neutral-500 font-mono">
                    h={hashFunc(d.code)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw size={14} /> Clear Hash Table
            </button>
          </div>

          {/* Theory note */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-white/5 text-xs text-neutral-400 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>{resolution === 'linear' ? 'Linear Probing Formula:' : 'Separate Chaining Concept:'}</span>
            </div>
            <code className="text-[11px] text-pink-300 font-mono block">
              {resolution === 'linear'
                ? 'h(k, i) = (h\'(k) + i) mod 8'
                : 'Bucket[index] ➔ Node ➔ Node ➔ NULL'}
            </code>
            <p className="text-[11px] text-neutral-500">
              {resolution === 'linear'
                ? 'When a collision occurs, probe linearly to slot (i + 1) % 8.'
                : 'Multiple collisions simply chain onto a linked list at that hash bucket.'}
            </p>
          </div>

          {/* Log */}
          <div className="p-2.5 rounded-xl bg-neutral-950 font-mono text-[11px] text-neutral-400 border border-neutral-900 space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-500">Hash Operations Log:</div>
            {logs.slice(0, 3).map((l, i) => (
              <div key={i} className="truncate text-pink-300/80">▸ {l}</div>
            ))}
          </div>
        </div>

        {/* Table Canvas */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 min-h-[340px]">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3 pb-2 border-b border-neutral-900">
            <span>Table Size: {TABLE_SIZE} Slots</span>
            <span className="text-pink-400 font-bold">Modulo: % {TABLE_SIZE}</span>
          </div>

          {resolution === 'linear' ? (
            /* Open Addressing Table */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {openAddressingTable.map((slot, index) => {
                const isOccupied = slot !== null;
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-xl border flex flex-col justify-between h-24 transition-all duration-300 ${
                      isOccupied
                        ? 'bg-gradient-to-br from-pink-950/50 to-neutral-900 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                        : 'bg-neutral-900/30 border-dashed border-neutral-800 text-neutral-600'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500">
                      <span>Slot [{index}]</span>
                    </div>

                    <div className="my-auto text-center">
                      {isOccupied ? (
                        <span className="font-bold font-mono text-lg text-white tracking-wider">
                          {slot}
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-neutral-700">Empty</span>
                      )}
                    </div>

                    <div className="text-[9px] font-mono text-neutral-500 text-right">
                      {isOccupied ? 'Occupied' : 'Free'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Separate Chaining Table */
            <div className="space-y-2">
              {chainingTable.map((bucket) => (
                <div
                  key={bucket.index}
                  className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center gap-3 overflow-x-auto"
                >
                  <div className="w-16 shrink-0 font-mono text-xs font-bold text-neutral-400 px-2 py-1 rounded bg-black/40 text-center">
                    Slot [{bucket.index}]
                  </div>
                  <span className="text-neutral-600 font-bold">➔</span>

                  {bucket.items.length === 0 ? (
                    <span className="font-mono text-xs text-neutral-600">NULL</span>
                  ) : (
                    bucket.items.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <div className="px-3 py-1 rounded-lg bg-pink-950/60 border border-pink-500/40 text-pink-200 font-mono text-xs font-bold shrink-0">
                          {item.code}
                        </div>
                        <span className="text-pink-500 font-bold">➔</span>
                      </React.Fragment>
                    ))
                  )}
                  {bucket.items.length > 0 && (
                    <span className="font-mono text-xs text-neutral-600 shrink-0">NULL</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HashVisualizer;
