import React from 'react';
import { X, Clock, Share2, Bookmark, User, ChevronRight } from 'lucide-react';
import { NewsArticleDetail } from '../../data/f1OfficialData';

interface ArticleModalProps {
  article: NewsArticleDetail | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#181820] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121218]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#e10600] text-white text-[10px] font-black uppercase tracking-wider f1-skew-badge">
              <span>{article.category}</span>
            </span>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <Clock size={12} /> {article.timeAgo} • {article.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-white/5 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Article Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <h1 className="text-2xl sm:text-4xl font-black text-white uppercase italic tracking-tight font-syne leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between border-y border-white/10 py-3 text-xs font-mono text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-300 font-bold">
              <User size={13} className="text-[#e10600]" /> By {article.author || 'Formula 1 Editorial'}
            </span>
            <div className="flex items-center gap-3">
              <button className="hover:text-white flex items-center gap-1">
                <Share2 size={13} /> Share
              </button>
              <button className="hover:text-white flex items-center gap-1">
                <Bookmark size={13} /> Save
              </button>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="rounded-2xl overflow-hidden border border-white/5 relative h-64 sm:h-80">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[9px] font-mono text-neutral-400">
              © Formula One Digital Media
            </div>
          </div>

          {/* Content Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
            {article.fullContent.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Quotes */}
          {article.quotes && article.quotes.length > 0 && (
            <div className="space-y-3 pt-2">
              {article.quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-900/90 border-l-4 border-[#e10600] space-y-1"
                >
                  <p className="text-sm italic text-white font-medium">
                    "{q.text}"
                  </p>
                  <span className="text-xs font-mono font-bold text-[#e10600] block">
                    — {q.speaker}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#121218] border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-[#e10600] text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
