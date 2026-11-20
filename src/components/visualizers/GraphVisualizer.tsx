import React, { useState } from 'react';
import { Share2, Play, RotateCcw, ListFilter } from 'lucide-react';

interface TrackNode {
  id: string;
  name: string;
  sector: number;
  neighbors: string[];
}

const CIRCUIT_NODES: TrackNode[] = [
  { id: 'T1', name: 'Turn 1 (Abbey)', sector: 1, neighbors: ['T2', 'T3'] },
  { id: 'T2', name: 'Turn 2 (Farm)', sector: 1, neighbors: ['T1', 'T3'] },
  { id: 'T3', name: 'Turn 3 (Village)', sector: 1, neighbors: ['T1', 'T2', 'T4'] },
  { id: 'T4', name: 'Turn 4 (The Loop)', sector: 2, neighbors: ['T3', 'T5'] },
  { id: 'T5', name: 'Turn 5 (Aintree)', sector: 2, neighbors: ['T4', 'T6'] },
  { id: 'T6', name: 'Turn 6 (Brooklands)', sector: 3, neighbors: ['T5', 'T7'] },
  { id: 'T7', name: 'Turn 7 (Luffield)', sector: 3, neighbors: ['T6'] },
];

const PRE_RACE_TASKS = [
  { id: 'S1', name: 'FIA Scrutineering', prereq: [] },
  { id: 'S2', name: 'FP1 Practice Session', prereq: ['S1'] },
  { id: 'S3', name: 'Engine Telemetry Calibration', prereq: ['S2'] },
  { id: 'S4', name: 'Qualifying (Q1-Q3)', prereq: ['S3'] },
  { id: 'S5', name: 'Parc Fermé Lockout', prereq: ['S4'] },
  { id: 'S6', name: 'Starting Grid Formation', prereq: ['S5'] },
  { id: 'S7', name: 'Lights Out / Grand Prix', prereq: ['S6'] },
];

export const GraphVisualizer: React.FC = () => {
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeQueueStack, setActiveQueueStack] = useState<string[]>([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [algorithm, setAlgorithm] = useState<'bfs' | 'dfs' | 'topo'>('bfs');
  const [viewFormat, setViewFormat] = useState<'graph' | 'matrix' | 'list'>('graph');

  const runBFS = async () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setVisitedNodes([]);

    const visited: string[] = [];
    const queue: string[] = ['T1'];

    while (queue.length > 0) {
      setActiveQueueStack([...queue]);
      const current = queue.shift()!;

      if (!visited.includes(current)) {
        visited.push(current);
        setVisitedNodes([...visited]);

        const currNode = CIRCUIT_NODES.find((n) => n.id === current);
        if (currNode) {
          for (const neighbor of currNode.neighbors) {
            if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
              queue.push(neighbor);
            }
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    setActiveQueueStack([]);
    setIsTraversing(false);
  };

  const runDFS = async () => {
    if (isTraversing) return;
    setIsTraversing(true);
    setVisitedNodes([]);

    const visited: string[] = [];
    const stack: string[] = ['T1'];

    while (stack.length > 0) {
      setActiveQueueStack([...stack]);
      const current = stack.pop()!;

      if (!visited.includes(current)) {
        visited.push(current);
        setVisitedNodes([...visited]);

        const currNode = CIRCUIT_NODES.find((n) => n.id === current);
        if (currNode) {
          for (const neighbor of currNode.neighbors) {
            if (!visited.includes(neighbor)) {
              stack.push(neighbor);
            }
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    setActiveQueueStack([]);
    setIsTraversing(false);
  };

  const handleReset = () => {
    setVisitedNodes([]);
    setActiveQueueStack([]);
    setIsTraversing(false);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400">
            <Share2 size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Circuit Sector Graph & Topological Sorting
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">G = (V, E)</span>
            </h4>
            <p className="text-xs text-neutral-400">Track corner networks and race weekend dependency DAGs</p>
          </div>
        </div>

        {/* Algorithm Modes */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => { setAlgorithm('bfs'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${algorithm === 'bfs' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            BFS (Medical Car)
          </button>
          <button
            onClick={() => { setAlgorithm('dfs'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${algorithm === 'dfs' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            DFS (Marshal Check)
          </button>
          <button
            onClick={() => { setAlgorithm('topo'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${algorithm === 'topo' ? 'bg-[#e10600] text-white' : 'text-neutral-400 hover:text-white'}`}
          >
            Topological Sort
          </button>
        </div>
      </div>

      {algorithm === 'topo' ? (
        /* Topological Sorting DAG View */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <h5 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <span>Race Weekend Workflow (DAG Topological Sort)</span>
              <span className="text-xs text-neutral-400 font-mono">(Module 3.9)</span>
            </h5>
            <p className="text-xs text-neutral-400 mb-4">
              Topological sort arranges tasks linearly such that each task is performed only after all its prerequisites are cleared.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {PRE_RACE_TASKS.map((task, idx) => (
                <React.Fragment key={task.id}>
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center min-w-[130px]">
                    <span className="text-[10px] font-mono font-bold text-orange-400 block mb-0.5">Step {idx + 1}</span>
                    <span className="text-xs font-bold text-white block">{task.name}</span>
                    <span className="text-[9px] text-neutral-500 font-mono">In-degree: {task.prereq.length}</span>
                  </div>
                  {idx < PRE_RACE_TASKS.length - 1 && (
                    <span className="text-neutral-600 font-bold">➔</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Graph BFS/DFS Interactive */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-neutral-300">
                  {algorithm === 'bfs' ? 'Breadth-First Search' : 'Depth-First Search'}
                </span>
                <span className="text-[10px] font-mono text-orange-400">
                  {algorithm === 'bfs' ? 'Queue (FIFO)' : 'Stack (LIFO)'}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {algorithm === 'bfs'
                  ? 'Medical Car explores level-by-level using a FIFO Queue to find shortest track path.'
                  : 'Track Marshal dives deeply down each branch before backtracking.'}
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={algorithm === 'bfs' ? runBFS : runDFS}
                  disabled={isTraversing}
                  className="flex-1 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow"
                >
                  <Play size={13} />
                  Start {algorithm.toUpperCase()} Traversal
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              {/* Data Structure State */}
              <div className="p-2.5 rounded-lg bg-neutral-950 font-mono text-xs border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">
                  Active {algorithm === 'bfs' ? 'Queue' : 'Stack'}:
                </div>
                <div className="text-cyan-400 flex gap-1">
                  {activeQueueStack.length === 0 ? <span className="text-neutral-600">[ empty ]</span> : activeQueueStack.map((n) => `[${n}]`).join(' ')}
                </div>
              </div>

              {/* Visited Order */}
              <div className="p-2.5 rounded-lg bg-neutral-950 font-mono text-xs border border-neutral-800 space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase font-bold">Visited Nodes Sequence:</div>
                <div className="text-orange-400 font-bold flex flex-wrap gap-1">
                  {visitedNodes.length === 0 ? <span className="text-neutral-600">[ none ]</span> : visitedNodes.join(' ➔ ')}
                </div>
              </div>
            </div>

            {/* Representation Switcher */}
            <div className="flex gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 text-xs">
              <button
                onClick={() => setViewFormat('graph')}
                className={`flex-1 py-1 rounded text-center font-medium ${viewFormat === 'graph' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
              >
                Track Map
              </button>
              <button
                onClick={() => setViewFormat('list')}
                className={`flex-1 py-1 rounded text-center font-medium ${viewFormat === 'list' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
              >
                Adjacency List
              </button>
              <button
                onClick={() => setViewFormat('matrix')}
                className={`flex-1 py-1 rounded text-center font-medium ${viewFormat === 'matrix' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
              >
                Matrix
              </button>
            </div>
          </div>

          {/* Graph Visual Canvas */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col justify-center min-h-[360px]">
            {viewFormat === 'graph' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CIRCUIT_NODES.map((node) => {
                  const isVisited = visitedNodes.includes(node.id);
                  const isCurrent = activeQueueStack[0] === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-28 ${
                        isCurrent
                          ? 'bg-orange-950 border-orange-400 text-orange-200 shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-105'
                          : isVisited
                          ? 'bg-neutral-900 border-emerald-500/60 text-emerald-300'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold px-1.5 py-0.5 rounded bg-black/40 text-white">
                          {node.id}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500">Sec {node.sector}</span>
                      </div>
                      <div className="font-semibold text-xs text-white truncate">{node.name}</div>
                      <div className="text-[9px] font-mono text-neutral-500 truncate">
                        Edges: {node.neighbors.join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {viewFormat === 'list' && (
              <div className="font-mono text-xs space-y-2 p-3 bg-neutral-900/40 rounded-xl border border-neutral-800">
                <div className="text-neutral-400 text-[11px] mb-2 font-sans">Adjacency List Representation (Space Complexity: O(V + E)):</div>
                {CIRCUIT_NODES.map((n) => (
                  <div key={n.id} className="flex items-center gap-2">
                    <span className="font-bold text-orange-400 w-8">{n.id}</span>
                    <span className="text-neutral-500">➔</span>
                    <span className="text-neutral-300">{n.neighbors.map((nb) => `[ ${nb} ]`).join(' ➔ ')} ➔ NULL</span>
                  </div>
                ))}
              </div>
            )}

            {viewFormat === 'matrix' && (
              <div className="font-mono text-xs overflow-x-auto p-3 bg-neutral-900/40 rounded-xl border border-neutral-800">
                <div className="text-neutral-400 text-[11px] mb-2 font-sans">Adjacency Matrix (7x7 Binary Connectivity Array):</div>
                <table className="w-full text-center">
                  <thead>
                    <tr className="text-neutral-500 border-b border-neutral-800">
                      <th className="p-1"></th>
                      {CIRCUIT_NODES.map((n) => <th key={n.id} className="p-1 text-orange-400">{n.id}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {CIRCUIT_NODES.map((row) => (
                      <tr key={row.id} className="border-b border-neutral-900">
                        <td className="p-1 font-bold text-orange-400">{row.id}</td>
                        {CIRCUIT_NODES.map((col) => {
                          const connected = row.neighbors.includes(col.id);
                          return (
                            <td key={col.id} className={`p-1 ${connected ? 'text-emerald-400 font-bold bg-emerald-950/20' : 'text-neutral-700'}`}>
                              {connected ? 1 : 0}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphVisualizer;
