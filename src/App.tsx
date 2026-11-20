import React, { useState } from 'react';
import OfficialHeader from './components/f1/OfficialHeader';
import F1OfficialHome from './pages/F1OfficialHome';
import F1OfficialSchedule from './pages/F1OfficialSchedule';
import F1OfficialResults from './pages/F1OfficialResults';
import F1OfficialDrivers from './pages/F1OfficialDrivers';
import F1OfficialTeams from './pages/F1OfficialTeams';
import F1Standings from './pages/F1Standings';
import F1LiveTiming from './pages/F1LiveTiming';
import OfficialFooter from './components/f1/OfficialFooter';
import { F1NavPage } from './types/f1';

export function App() {
  // Stack ADT (Module 1.3) for navigation history
  const [navStack, setNavStack] = useState<F1NavPage[]>(['latest']);

  const currentPage = navStack[navStack.length - 1];

  const handleNavigate = (page: F1NavPage) => {
    if (page === currentPage) return;
    setNavStack((prev) => [...prev, page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#15151e] text-slate-100 flex flex-col font-sans selection:bg-[#e10600] selection:text-white">
      {/* Official Formula 1 Top Header & Weekend Ticker */}
      <OfficialHeader
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Official Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'latest' && (
          <F1OfficialHome onNavigate={handleNavigate} />
        )}
        {currentPage === 'schedule' && (
          <F1OfficialSchedule />
        )}
        {currentPage === 'results' && (
          <F1OfficialResults />
        )}
        {currentPage === 'standings' && (
          <F1Standings dsaMode={false} />
        )}
        {currentPage === 'drivers' && (
          <F1OfficialDrivers />
        )}
        {currentPage === 'teams' && (
          <F1OfficialTeams />
        )}
        {currentPage === 'timing' && (
          <F1LiveTiming dsaMode={false} />
        )}
      </main>

      {/* Official Formula 1 Footer */}
      <OfficialFooter onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
