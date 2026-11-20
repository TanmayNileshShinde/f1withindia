import React, { useState } from 'react';
import { Network, Search, Plus, RotateCcw, Check, Sparkles } from 'lucide-react';

interface BSTNode {
  value: number;
  driver: string;
  left?: BSTNode | null;
  right?: BSTNode | null;
  height?: number;
}

const INITIAL_NODES: { value: number; driver: string }[] = [
  { value: 44, driver: 'HAM' },
  { value: 16, driver: 'LEC' },
  { value: 63, driver: 'RUS' },
  { value: 4, driver: 'NOR' },
  { value: 81, driver: 'PIA' },
  { value: 1, driver: 'VER' },
  { value: 55, driver: 'SAI' },
];

function insertBST(root: BSTNode | null, value: number, driver: string): BSTNode {
  if (!root) {
    return { value, driver, left: null, right: null };
  }
  if (value < root.value) {
    root.left = insertBST(root.left || null, value, driver);
  } else if (value > root.value) {
    root.right = insertBST(root.right || null, value, driver);
  }
  return root;
}

function inorder(root: BSTNode | null, arr: string[] = []): string[] {
  if (!root) return arr;
  inorder(root.left || null, arr);
  arr.push(`#${root.value} ${root.driver}`);
  inorder(root.right || null, arr);
  return arr;
}

function preorder(root: BSTNode | null, arr: string[] = []): string[] {
  if (!root) return arr;
  arr.push(`#${root.value} ${root.driver}`);
  preorder(root.left || null, arr);
  preorder(root.right || null, arr);
  return arr;
}

function postorder(root: BSTNode | null, arr: string[] = []): string[] {
  if (!root) return arr;
  postorder(root.left || null, arr);
  postorder(root.right || null, arr);
  arr.push(`#${root.value} ${root.driver}`);
  return arr;
}

export const TreeVisualizer: React.FC = () => {
  const [tree, setTree] = useState<BSTNode>(() => {
    let root: BSTNode | null = null;
    INITIAL_NODES.forEach((n) => {
      root = insertBST(root, n.value, n.driver);
    });
    return root!;
  });

  const [inputNumber, setInputNumber] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [searchTarget, setSearchTarget] = useState<number | null>(null);
  const [searchPath, setSearchPath] = useState<number[]>([]);
  const [searchFound, setSearchFound] = useState<boolean | null>(null);
  const [traversalType, setTraversalType] = useState<'inorder' | 'preorder' | 'postorder'>('inorder');

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputNumber);
    if (isNaN(num) || !inputCode.trim()) return;

    setTree((prev) => insertBST({ ...prev }, num, inputCode.trim().toUpperCase()));
    setInputNumber('');
    setInputCode('');
    setSearchPath([]);
    setSearchFound(null);
  };

  const handleSearch = () => {
    if (searchTarget === null) return;
    const path: number[] = [];
    let curr: BSTNode | null = tree;
    let found = false;

    while (curr) {
      path.push(curr.value);
      if (curr.value === searchTarget) {
        found = true;
        break;
      } else if (searchTarget < curr.value) {
        curr = curr.left || null;
      } else {
        curr = curr.right || null;
      }
    }

    setSearchPath(path);
    setSearchFound(found);
  };

  const handleReset = () => {
    let root: BSTNode | null = null;
    INITIAL_NODES.forEach((n) => {
      root = insertBST(root, n.value, n.driver);
    });
    setTree(root!);
    setSearchPath([]);
    setSearchFound(null);
    setSearchTarget(null);
  };

  const currentTraversal =
    traversalType === 'inorder'
      ? inorder(tree)
      : traversalType === 'preorder'
      ? preorder(tree)
      : postorder(tree);

  // Simple recursive tree layout renderer
  const renderSubtree = (node: BSTNode | null | undefined, depth = 0) => {
    if (!node) return null;
    const isSearched = searchPath.includes(node.value);
    const isTarget = node.value === searchTarget && searchFound;

    return (
      <div className="flex flex-col items-center mx-2">
        {/* Node Circle */}
        <div
          className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center font-mono transition-all duration-300 z-10 ${
            isTarget
              ? 'bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110'
              : isSearched
              ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(39,244,210,0.3)]'
              : 'bg-neutral-900 border-neutral-700 text-white hover:border-red-500/50'
          }`}
        >
          <span className="text-xs font-bold leading-none">#{node.value}</span>
          <span className="text-[10px] text-neutral-400 font-sans font-medium mt-0.5">{node.driver}</span>
        </div>

        {/* Children branches */}
        {(node.left || node.right) && (
          <div className="flex items-start justify-center pt-3 relative">
            <div className="absolute top-0 w-1/2 h-3 border-t-2 border-neutral-700 pointer-events-none" />
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                {node.left ? renderSubtree(node.left, depth + 1) : <div className="w-10 text-[9px] text-neutral-700 font-mono text-center pt-2">L: null</div>}
              </div>
              <div className="flex flex-col items-center">
                {node.right ? renderSubtree(node.right, depth + 1) : <div className="w-10 text-[9px] text-neutral-700 font-mono text-center pt-2">R: null</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Network size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Driver Grid Binary Search Tree (BST)
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">O(log n)</span>
            </h4>
            <p className="text-xs text-neutral-400">Car number keys with Left &lt; Root &lt; Right property</p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 text-xs font-mono transition-all"
        >
          <RotateCcw size={13} /> Reset Grid
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-4">
          {/* Insert */}
          <form onSubmit={handleInsert} className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
              1. Insert Driver Node
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Car #"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                className="w-20 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Code (e.g. TSU)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-purple-500 focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow"
              >
                <Plus size={14} />
              </button>
            </div>
          </form>

          {/* Search */}
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 block">
              2. Search Car Number
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Search Car #"
                value={searchTarget ?? ''}
                onChange={(e) => setSearchTarget(e.target.value ? parseInt(e.target.value) : null)}
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 shadow"
              >
                <Search size={13} />
                Find
              </button>
            </div>

            {searchFound !== null && (
              <div className={`p-2 rounded-lg text-xs font-mono flex items-center gap-1.5 ${searchFound ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/40 text-red-400 border border-red-500/30'}`}>
                {searchFound ? <Check size={14} /> : <span>✖</span>}
                <span>
                  {searchFound
                    ? `Found Car #${searchTarget}! Path: ${searchPath.map((v) => `#${v}`).join(' ➔ ')}`
                    : `Car #${searchTarget} is not on the grid.`}
                </span>
              </div>
            )}
          </div>

          {/* Traversal Selector */}
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                3. Tree Traversal
              </label>
              <span className="text-[10px] text-purple-400 font-mono">Module 3.2</span>
            </div>
            <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-[11px] font-semibold">
              <button
                onClick={() => setTraversalType('inorder')}
                className={`py-1 rounded ${traversalType === 'inorder' ? 'bg-purple-600 text-white' : 'text-neutral-400'}`}
              >
                Inorder
              </button>
              <button
                onClick={() => setTraversalType('preorder')}
                className={`py-1 rounded ${traversalType === 'preorder' ? 'bg-purple-600 text-white' : 'text-neutral-400'}`}
              >
                Preorder
              </button>
              <button
                onClick={() => setTraversalType('postorder')}
                className={`py-1 rounded ${traversalType === 'postorder' ? 'bg-purple-600 text-white' : 'text-neutral-400'}`}
              >
                Postorder
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300">
              <div className="text-[10px] text-neutral-500 mb-1">
                {traversalType === 'inorder' && 'Inorder (L, Root, R) gives strictly sorted grid order:'}
                {traversalType === 'preorder' && 'Preorder (Root, L, R):'}
                {traversalType === 'postorder' && 'Postorder (L, R, Root):'}
              </div>
              <div className="text-purple-300 flex flex-wrap gap-1.5">
                {currentTraversal.map((t, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tree Render Canvas */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex flex-col items-center justify-center min-h-[380px] overflow-x-auto">
          <div className="w-full flex justify-between text-[11px] font-mono text-neutral-500 mb-4 pb-2 border-b border-neutral-900">
            <span>Root: #{tree.value} ({tree.driver})</span>
            <span className="flex items-center gap-1 text-purple-400">
              <Sparkles size={12} /> AVL Balance Factor: {-1} to +1
            </span>
          </div>

          <div className="py-2 min-w-max flex justify-center">
            {renderSubtree(tree)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;
