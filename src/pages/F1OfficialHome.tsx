import React, { useState } from 'react';
import HeroNewsGrid from '../components/f1/HeroNewsGrid';
import MustWatchCarousel from '../components/f1/MustWatchCarousel';
import SeasonStandingsWidget from '../components/f1/SeasonStandingsWidget';
import AppDownloadBanner from '../components/f1/AppDownloadBanner';
import PartnersStrip from '../components/f1/PartnersStrip';
import ArticleModal from '../components/f1/ArticleModal';
import VideoModal from '../components/f1/VideoModal';
import { F1NavPage, F1VideoItem } from '../types/f1';
import { NewsArticleDetail } from '../data/f1OfficialData';

interface F1OfficialHomeProps {
  onNavigate: (page: F1NavPage) => void;
}

export const F1OfficialHome: React.FC<F1OfficialHomeProps> = ({ onNavigate }) => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleDetail | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<F1VideoItem | null>(null);

  return (
    <div className="space-y-14 animate-fadeIn">
      {/* 1. Main Hero News & Trending Grid */}
      <HeroNewsGrid onSelectArticle={setSelectedArticle} />

      {/* 2. Must Watch Videos Carousel */}
      <MustWatchCarousel onSelectVideo={setSelectedVideo} />

      {/* 3. 2026 Season Standings Widget */}
      <SeasonStandingsWidget onNavigate={onNavigate} />

      {/* 4. Download Official F1 App Banner */}
      <AppDownloadBanner />

      {/* 5. Official Partners Strip */}
      <PartnersStrip />

      {/* Interactive Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
};

export default F1OfficialHome;
