import React from 'react';
import { SYLLABUS_MODULES } from '../data/syllabusData';
import { CheckCircle2, Award, Clock, BookOpen } from 'lucide-react';
import { ModuleId } from '../types/dsa';

interface SyllabusRoadmapProps {
  onSelectModule: (m: ModuleId) => void;
}

export const SyllabusRoadmap: React.FC<SyllabusRoadmapProps> = ({ onSelectModule }) => {
  return (
    <section className="p-6 lg:p-8 rounded-3xl bg-[#121218]/90 border border-white/10 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#e10600] font-mono text-xs font-bold uppercase mb-1">
            <Award size={16} /> Official Curriculum Mapping
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight uppercase">
            Data Structures Syllabus & Course Outcome Matrix
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            100% compliance with Shah & Anchor Kutchhi Engineering College (SAKEC) / University Syllabus
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
            Total Hours: <span className="font-bold text-white">30 Hours</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-300 font-bold">
            CO1 to CO5 Mapped
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SYLLABUS_MODULES.map((mod) => (
          <div
            key={mod.id}
            onClick={() => onSelectModule(mod.id as ModuleId)}
            className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-850 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                <span className="font-bold text-[#e10600]">MODULE 0{mod.number}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {mod.hours}h</span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-red-400 transition-colors mb-2">
                {mod.title}
              </h4>
              <div className="space-y-1 mb-3">
                {mod.topics.map((t) => (
                  <div key={t.id} className="text-[11px] text-neutral-400 flex items-start gap-1.5 truncate">
                    <CheckCircle2 size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span className="truncate">{t.id} {t.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>{mod.outcomes.join(', ')}</span>
              <span className="text-[#e10600] font-bold group-hover:translate-x-1 transition-transform">
                Open View ➔
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SyllabusRoadmap;
