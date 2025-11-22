


import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Circles } from './pages/Circles';
import { Learn } from './pages/Learn'; // Lesson Interaction
import { LearnPath } from './pages/LearnPath'; // Map
import { Guide } from './pages/Guide'; // New Guidebook
import { Challenges } from './pages/Challenges';
import { Profile } from './pages/Profile';
import { Onboarding } from './pages/Onboarding';
import { Navbar } from './components/Navbar';
import { Notifications } from './pages/Notifications';
import { Leaderboard } from './pages/Leaderboard';
import { CreateCircle } from './pages/CreateCircle';
import { InviteFriends } from './pages/InviteFriends';
import { Settings } from './pages/Settings';
import { Shop } from './pages/Shop';
import { JoinCircle } from './pages/JoinCircle';
import { LearningDashboard } from './pages/LearningDashboard';

const App: React.FC = () => {
  const [hasOnboarded, setHasOnboarded] = useState<boolean>(() => {
    const saved = localStorage.getItem('savecircle_onboarded');
    return saved === 'true';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [hasOnboarded]); // Re-check when onboarding completes

  const handleOnboardingComplete = () => {
    setHasOnboarded(true);
    localStorage.setItem('savecircle_onboarded', 'true');
  };

  return (
    <HashRouter>
      {/* Outer container fixed to viewport height to prevent window scrolling */}
      <div className="h-[100dvh] w-screen bg-gray-100 dark:bg-black flex justify-center font-display overflow-hidden transition-colors duration-300">
        {/* App container fixed to parent height */}
        <div className="w-full max-w-md bg-background-light dark:bg-background-dark h-full relative shadow-2xl flex flex-col overflow-hidden transition-colors duration-300">
          <Routes>
            {/* Onboarding Route - Handles its own layout */}
            <Route 
              path="/onboarding" 
              element={
                hasOnboarded ? <Navigate to="/" /> : <div className="h-full overflow-y-auto no-scrollbar"><Onboarding onComplete={handleOnboardingComplete} /></div>
              } 
            />

            {/* Protected Routes */}
            <Route 
              path="/*" 
              element={
                !hasOnboarded ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth w-full bg-background-light dark:bg-background-dark transition-colors duration-300">
                      <Routes>
                        <Route path="/" element={<Home />} />
                        
                        {/* Redirect old vault route to new circle vault */}
                        <Route path="/vault" element={<Navigate to="/circles/vault" replace />} />
                        
                        <Route path="/circles" element={<Circles />} />
                        <Route path="/circles/:circleId" element={<Circles />} />
                        
                        <Route path="/create-circle" element={<CreateCircle />} />
                        <Route path="/join-circle" element={<JoinCircle />} />
                        <Route path="/invite" element={<InviteFriends />} />
                        
                        <Route path="/learn" element={<LearnPath />} />
                        <Route path="/learning-dashboard" element={<LearningDashboard />} />
                        <Route path="/lesson/:id" element={<Learn />} />
                        <Route path="/guide/:unitId" element={<Guide />} />
                        
                        <Route path="/challenges" element={<Challenges />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/shop" element={<Shop />} />
                      </Routes>
                    </div>
                    {/* Fixed Bottom Navbar */}
                    <Navbar />
                  </div>
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
