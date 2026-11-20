import React, { useState } from 'react';
import { Layers, ArrowDown, ArrowUp, RotateCcw, CheckCircle2, AlertTriangle, Play } from 'lucide-react';

const PRESET_SCREENS = [
  { name: 'Home Feed', icon: '🏠', color: '#3671c6' },
  { name: 'Race Results', icon: '🏁', color: '#e10600' },
  { name: 'Live Timing', icon: '⏱️', color: '#27f4d2' },
  { name: 'Driver Telemetry', icon: '📊', color: '#ff8000' },
  { name: 'Pit Wall Radio', icon: '📻', color: '#aa3bff' },
  { name: 'Tyre Degradation', icon: '🛞', color: '#ffd700' },
];

export const StackVisualizer: React.FC = () => {
  const [stack, setStack] = useState<string[]>(['Home Feed', 'Live Timing']);
  const [parenthesisExpr, setParenthesisExpr] = useState('((VER * RPM) + Delta)');
  const [parenthesisValid, setParenthesisValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState('Current screen is on Top of Stack (LIFO)');
  const MAX_CAPACITY = 6;

  const handlePush = (screenName: string) => {
    if (stack.length >= MAX_CAPACITY) {
      setMessage('Stack Overflow! Back stack is full (Max 6 screens).');
      return;
    }
    setStack((prev) => [...prev, screenName]);
    setMessage(`PUSH: Loaded "${screenName}" on top of the navigation stack.`);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setMessage('Stack Underflow! No previous screens to pop.');
      return;
    }
    const popped = stack[stack.length - 1];
    setStack((prev) => prev.slice(0, -1));
    setMessage(`POP: Pressed Back button. Removed "${popped}".`);
  };

  const handleReset = () => {
    setStack(['Home Feed']);
    setMessage('Reset stack to initial Home screen.');
  };

  const checkParentheses = () => {
    const s: string[] = [];
    let isValid = true;
    for (const ch of parenthesisExpr) {
      if (ch === '(' || ch === '[' || ch === '{') {
        s.push(ch);
      } else if (ch === ')' || ch === ']' || ch === '}') {
        if (s.length === 0) {
          isValid = false;
          break;
        }
        const top = s.pop();
        if ((ch === ')' && top !== '(') || (ch === ']' && top !== '[') || (ch === '}' && top !== '{')) {
          isValid = false;
          break;
        }
      }
    }
    if (s.length > 0) isValid = false;
    setParenthesisValid(isValid);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121218] p-5 lg:p-6 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-600/20 text-[#e10600]">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-base tracking-wide flex items-center gap-2">
              F1 Mobile App Navigation Stack
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">LIFO</span>
            </h4>
            <p className="text-xs text-neutral-400">Array-based Stack ADT with top pointer</p>
          </div>
        </div>
        <div className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
          Capacity: <span className="text-white font-bold">{stack.length}</span> / {MAX_CAPACITY}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              1. Tap Screen to PUSH (Open Screen)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_SCREENS.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handlePush(s.name)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/5 hover:border-red-500/40 text-left transition-all text-xs font-medium text-neutral-200 group active:scale-95"
                >
                  <span className="text-base">{s.icon}</span>
                  <span className="truncate group-hover:text-white">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handlePop}
              disabled={stack.length === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide transition-all shadow-lg active:scale-95"
            >
              <ArrowDown size={14} />
              POP (Press Back)
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
              title="Reset Stack"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Status Message */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-white/5 font-mono text-xs text-neutral-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="truncate">{message}</span>
          </div>

          {/* Subpoint 1.4 Parenthesis Application */}
          <div className="pt-3 border-t border-white/10">
            <h5 className="text-xs font-bold text-neutral-300 mb-2 flex items-center gap-1.5">
              <span>Formula Parenthesis Validator (Subpoint 1.4)</span>
            </h5>
            <div className="flex gap-2">
              <input
                type="text"
                value={parenthesisExpr}
                onChange={(e) => {
                  setParenthesisExpr(e.target.value);
                  setParenthesisValid(null);
                }}
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-red-500 focus:outline-none"
                placeholder="((A + B) * C)"
              />
              <button
                onClick={checkParentheses}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-700 transition-colors flex items-center gap-1"
              >
                <Play size={12} />
                Validate
              </button>
            </div>
            {parenthesisValid !== null && (
              <div className={`mt-2 p-2 rounded-lg text-xs font-mono flex items-center gap-2 ${parenthesisValid ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' : 'bg-red-950/40 text-red-400 border border-red-500/30'}`}>
                {parenthesisValid ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
                <span>{parenthesisValid ? 'Valid balanced telemetry expression!' : 'Error: Unbalanced brackets in formula!'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stack Visual Pillar */}
        <div className="lg:col-span-7 flex flex-col items-center justify-end min-h-[320px] p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 relative">
          <div className="absolute top-3 left-3 text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
            <ArrowUp size={12} className="text-red-500" /> TOP OF STACK (Active Visible Screen)
          </div>

          <div className="w-full max-w-sm flex flex-col-reverse gap-2 mt-8">
            {stack.length === 0 ? (
              <div className="h-44 flex flex-col items-center justify-center text-neutral-600 font-mono text-xs border border-dashed border-neutral-800 rounded-xl">
                <span>[ Stack is Empty ]</span>
                <span className="text-[10px] text-neutral-600 mt-1">Tap a screen on the left to push</span>
              </div>
            ) : (
              stack.map((item, index) => {
                const isTop = index === stack.length - 1;
                return (
                  <div
                    key={`${item}-${index}`}
                    className={`relative p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isTop
                        ? 'bg-gradient-to-r from-red-950/80 to-[#1f0a0a] border-red-500/80 text-white shadow-[0_0_15px_rgba(225,6,0,0.25)] scale-[1.02]'
                        : 'bg-neutral-900/90 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-black/40 flex items-center justify-center font-mono text-xs font-bold text-neutral-300">
                        {index}
                      </span>
                      <span className="font-semibold text-sm">{item}</span>
                    </div>

                    {isTop && (
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-red-600 text-white uppercase animate-pulse">
                        TOP (Active)
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="w-full max-w-sm mt-3 pt-2 border-t-2 border-neutral-700 flex justify-between text-[11px] font-mono text-neutral-500 px-1">
            <span>Index 0 (Bottom)</span>
            <span>Array Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
