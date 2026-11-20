import React from 'react';
import { X, CheckCircle2, Award, Clock, BookOpen, Layers, GitCommit, Network, Database } from 'lucide-react';
import { SYLLABUS_MODULES } from '../../data/syllabusData';

interface SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#121218] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-[#e10600] text-xs font-mono font-bold uppercase mb-1">
            <Award size={16} /> Academic School Project Blueprint
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Data Structures & Algorithms Syllabus Mapping
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Official Course Outcome & Topic Breakdown powering this Formula 1 Application
          </p>
        </div>

        {/* Course Outcomes Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {['CO1: Linear Array DS', 'CO2: Linked List DS', 'CO3: Non-Linear Trees & Graphs', 'CO4: Searching & Hashing', 'CO5: Problem Solving & Collab'].map((co, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
              <span className="text-[10px] font-mono font-bold text-red-400 block">{co.split(':')[0]}</span>
              <span className="text-[10px] text-neutral-300 font-medium leading-tight block mt-0.5">{co.split(':')[1]}</span>
            </div>
          ))}
        </div>

        {/* Module Breakdowns */}
        <div className="space-y-4">
          {SYLLABUS_MODULES.map((mod) => (
            <div key={mod.id} className="p-4 rounded-2xl bg-neutral-950 border border-neutral-850 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e10600]" />
                  Module {mod.number}: {mod.title}
                </span>
                <span className="text-xs font-mono text-neutral-400">{mod.hours} Hours • {mod.outcomes.join(', ')}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {mod.topics.map((t) => (
                  <div key={t.id} className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-200 block">{t.id} {t.title}</span>
                      <span className="text-[10px] text-neutral-400 block mt-0.5">Applied in F1: {t.f1Analogy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-500 font-mono">
          <span>Project by: Tanmay Nilesh Shinde</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#e10600] hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};

export default SyllabusModal;
