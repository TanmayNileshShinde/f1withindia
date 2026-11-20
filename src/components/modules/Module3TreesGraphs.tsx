import React from 'react';
import { SYLLABUS_MODULES } from '../../data/syllabusData';
import TreeVisualizer from '../visualizers/TreeVisualizer';
import GraphVisualizer from '../visualizers/GraphVisualizer';
import { Network, Share2, Code2, Sparkles } from 'lucide-react';

interface Module3Props {
  viewMode: 'both' | 'visualizer' | 'theory';
}

export const Module3TreesGraphs: React.FC<Module3Props> = ({ viewMode }) => {
  const modData = SYLLABUS_MODULES.find((m) => m.id === 'module3')!;

  return (
    <div className="space-y-10">
      {/* Module Title Header */}
      <div className="border-l-4 border-purple-500 pl-4 sm:pl-6 py-1">
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
            Module 03 • {modData.hours} Hours • {modData.outcomes.join(', ')}
          </span>
          <span className="text-xs text-neutral-400 font-mono">Exam Unit: Non-Linear Data Structures</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          {modData.title}
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 mt-1">
          {modData.tagline}
        </p>
      </div>

      {/* Visualizers Section */}
      {(viewMode === 'both' || viewMode === 'visualizer') && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                Interactive Telemetry Simulator 4: Binary Search Tree (BST) & Inorder Grid Sorting
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topics 3.2, 3.3, 3.5</span>
            </div>
            <TreeVisualizer />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                Interactive Telemetry Simulator 5: Circuit Track Graph (BFS & DFS) & Weekend DAG
              </h3>
              <span className="text-xs text-neutral-400 font-mono">Topics 3.7, 3.8, 3.9</span>
            </div>
            <GraphVisualizer />
          </div>
        </div>
      )}

      {/* Theory & F1 Case Studies */}
      {(viewMode === 'both' || viewMode === 'theory') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide flex items-center gap-2">
              <Network size={18} className="text-purple-400" />
              Syllabus Coverage: Core Concepts & F1 Case Studies
            </h3>
            <span className="text-xs font-mono text-neutral-400">All 9 Subpoints Addressed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modData.topics.map((topic) => (
              <div
                key={topic.id}
                className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                      Topic {topic.id}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Non-Linear</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    {topic.title}
                  </h4>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    {topic.theory}
                  </p>
                </div>

                {/* F1 Real-world Case Study */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
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

          {/* AVL Rotations Card */}
          <div className="p-5 rounded-2xl bg-[#14141c]/90 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span>Topic 3.5: AVL Tree 4 Rebalancing Rotations</span>
                <span className="text-xs text-purple-400 font-mono">BF = Height(L) - Height(R)</span>
              </h4>
              <span className="text-xs font-mono text-neutral-400">Guaranteed O(log n) lookups</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-purple-400 font-bold block mb-1">1. LL Rotation (Single Right)</span>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Node inserted into left subtree of left child. Fixed by a single Right rotation about root.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-purple-400 font-bold block mb-1">2. RR Rotation (Single Left)</span>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Node inserted into right subtree of right child. Fixed by a single Left rotation about root.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-purple-400 font-bold block mb-1">3. LR Rotation (Double)</span>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Left rotation on left child, followed by Right rotation on unbalanced root.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                <span className="text-purple-400 font-bold block mb-1">4. RL Rotation (Double)</span>
                <p className="text-neutral-400 text-[11px] font-sans">
                  Right rotation on right child, followed by Left rotation on unbalanced root.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Module3TreesGraphs;
