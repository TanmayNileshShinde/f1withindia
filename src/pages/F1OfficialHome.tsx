import React from 'react';
import HeroNewsGrid from '../components/f1/HeroNewsGrid';
import MustWatchCarousel from '../components/f1/MustWatchCarousel';
import SeasonStandingsWidget from '../components/f1/SeasonStandingsWidget';
import AppDownloadBanner from '../components/f1/AppDownloadBanner';
import PartnersStrip from '../components/f1/PartnersStrip';
import { F1NavPage } from '../types/f1';

interface F1OfficialHomeProps {
  onNavigate: (page: F1NavPage) => void;
}

export const F1OfficialHome: React.FC<F1OfficialHomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-14 animate-fadeIn">
      {/* 1. Main Hero News & Trending Grid */}
      <HeroNewsGrid />

      {/* 2. Must Watch Videos Carousel */}
      <MustWatchCarousel />

      {/* 3. 2026 Season Standings Widget */}
      <SeasonStandingsWidget onNavigate={onNavigate} />

      {/* 4. Download Official F1 App Banner */}
      <AppDownloadBanner />

      {/* 5. Official Partners Strip */}
      <PartnersStrip />
    </div>
  );
};

export default F1OfficialHome;
