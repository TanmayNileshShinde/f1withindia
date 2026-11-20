import React from 'react';
import { SYLLABUS_MODULES } from '../../data/syllabusData';
import LinkedListVisualizer from '../visualizers/LinkedListVisualizer';
import { GitCommit, Code2, Database } from 'lucide-react';

interface Module2Props {
  viewMode: 'both' | 'visualizer' | 'theory';
}

export const Module2LinkedLists: React.FC<Module2Props> = ({ viewMode }) => {
  const modData = SYLLABUS_MODULES.find((m) => m.id === 'module2')!;

  return (
    <div className="space-y-10">
      {/* Module Title Header */}
      <div className="border-l-4 border-emerald-500 pl-4 sm:pl-6 py-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            Module 02 • {modData.hours} Hours • {modData.outcomes.join(', ')}
          </span>
          <span className="text-xs text-neutral-400 font-mono">Exam Unit: Linked List-based Linear DS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          {modData.title}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-1">
          {modData.tagline}
        </p>
      </div>

      {/* Visualizer Section */}
      {(viewMode === 'both' || viewMode === 'visualizer') && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Interactive Telemetry Simulator 3: Lap History Linked List & Circular Track Loop
            </h3>
            <span className="text-xs text-neutral-400 font-mono">Topics 2.1 & 2.4</span>
          </div>
          <LinkedListVisualizer />
        </div>
      )}

      {/* Theory & Comparison Section */}
      {(viewMode === 'both' || viewMode === 'theory') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <GitCommit size={18} className="text-emerald-400" />
              Syllabus Coverage: Core Concepts & F1 Case Studies
            </h3>
            <span className="text-xs font-mono text-neutral-400">All 5 Subpoints Addressed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modData.topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/5 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      Topic {topic.id}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Memory & Pointers</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {topic.theory}
                  </p>
                </div>

                {/* F1 Real-world Case Study */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                    <span className="text-sm">🏎️</span>
                    <span>F1 Official App Real-World Use:</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal">
                    {topic.f1Analogy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Topic 2.2 Difference Table */}
          <div className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/10 space-y-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span>Topic 2.2: Difference Between Array and Linked List</span>
              <span className="text-xs text-emerald-400 font-mono">(Key Exam Question)</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400">
                    <th className="p-2.5">Feature</th>
                    <th className="p-2.5 text-red-400">Array (Static Buffer)</th>
                    <th className="p-2.5 text-emerald-400">Linked List (Dynamic Chain)</th>
                    <th className="p-2.5 text-neutral-300">F1 Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white">Memory Allocation</td>
                    <td className="p-2.5">Fixed contiguous block (Stack/Data segment)</td>
                    <td className="p-2.5">Dynamic non-contiguous nodes (Heap)</td>
                    <td className="p-2.5 text-[11px]">Grid slots vs Dynamic Safety Car queues</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Size Flexibility</td>
                    <td className="p-2.5">Fixed at compile time (Can cause Overflow)</td>
                    <td className="p-2.5">Grows and shrinks as needed</td>
                    <td className="p-2.5 text-[11px]">Race laps count varies by Grand Prix</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Random Access</td>
                    <td className="p-2.5 text-emerald-400">O(1) instant via index: arr[i]</td>
                    <td className="p-2.5 text-red-400">O(n) sequential pointer traversal</td>
                    <td className="p-2.5 text-[11px]">Instant lookups in speed trap arrays</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Insertion / Deletion</td>
                    <td className="p-2.5 text-red-400">O(n) - requires shifting remaining elements</td>
                    <td className="p-2.5 text-emerald-400">O(1) if pointer is known (no shifting)</td>
                    <td className="p-2.5 text-[11px]">Inserting intermediate pit stop logs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Topic 2.3 C Memory Management Snippet */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-neutral-400 flex items-center gap-2">
                <Code2 size={16} className="text-emerald-400" />
                C Dynamic Memory Allocation (malloc, calloc, free)
              </span>
              <span className="text-[11px] text-neutral-500 font-mono">Topic 2.3</span>
            </div>
            <pre className="p-4 rounded-xl bg-[#09090d] text-xs font-mono text-neutral-300 overflow-x-auto leading-relaxed border border-white/5">
{`// Topic 2.3: Allocating and freeing dynamic lap node memory in C
struct LapNode* createLap(int lapNum, float lapTime) {
    // malloc: allocates uninitialized memory block on heap
    struct LapNode* newNode = (struct LapNode*)malloc(sizeof(struct LapNode));
    if (newNode == NULL) return NULL; // Allocation safety guard

    newNode->lapNum = lapNum;
    newNode->lapTime = lapTime;
    newNode->next = NULL;
    return newNode;
}

// free: returns memory to heap to eliminate dangling pointers & leaks
void deleteSession(struct LapNode* head) {
    struct LapNode* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module2LinkedLists;
