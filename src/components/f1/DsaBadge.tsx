import React from 'react';
import { Layers, GitCommit, Network, Database, Cpu, Search, Sparkles } from 'lucide-react';

interface DsaBadgeProps {
  module: '1.3' | '1.5' | '1.6' | '2.1' | '2.4' | '3.3' | '3.7' | '3.8' | '3.9' | '4.1' | '4.2' | '4.3';
  structure: string;
  complexity: string;
  explanation: string;
  active: boolean;
}

export const DsaBadge: React.FC<DsaBadgeProps> = ({
  module,
  structure,
  complexity,
  explanation,
  active,
}) => {
  if (!active) return null;

  return (
    <div className="my-2 p-2.5 rounded-xl bg-gradient-to-r from-red-950/60 via-neutral-900 to-neutral-950 border border-red-500/40 shadow-[0_0_15px_rgba(225,6,0,0.15)] animate-fadeIn">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#e10600] animate-pulse" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            {structure}
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/30">
            Syllabus Mod {module}
          </span>
        </div>

        <div className="text-[11px] font-mono text-cyan-300 font-bold bg-black/40 px-2 py-0.5 rounded">
          {complexity}
        </div>
      </div>
      <p className="text-[11px] text-neutral-300 font-sans mt-1 leading-normal">
        <span className="text-amber-400 font-semibold font-mono">F1 Implementation: </span>
        {explanation}
      </p>
    </div>
  );
};

export default DsaBadge;
