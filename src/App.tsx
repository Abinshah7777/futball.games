import { useState, Suspense, lazy, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { PlayerSearchModal } from './components/PlayerSearchModal';
import { getLocalProfile } from './services/authService';
import { getDailyChallenge } from './services/dailyService';
import { loadExtendedDatabase, isDatabaseLoaded } from './data/footballDatabase';
import type { UserProfile, Player } from './types';

const FootballGridPage = lazy(() => import('./pages/FootballGridPage').then(m => ({ default: m.FootballGridPage })));
const PlayerConnectionPage = lazy(() => import('./pages/PlayerConnectionPage').then(m => ({ default: m.PlayerConnectionPage })));
const WordGamePage = lazy(() => import('./pages/WordGamePage').then(m => ({ default: m.WordGamePage })));

const PageLoader = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
    <div className="broadcast-panel p-8 rounded-none flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-chalk-muted border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="font-display font-bold text-chalk">Preparing pitch...</p>
    </div>
  </div>
);

export function App() {
  const [dbLoaded, setDbLoaded] = useState(isDatabaseLoaded);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getLocalProfile());
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [selectedSearchPlayer, setSelectedSearchPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!dbLoaded) {
      loadExtendedDatabase().then(() => {
        setDbLoaded(true);
      });
    }
  }, [dbLoaded]);

  const dailyChallenge = getDailyChallenge();

  const handleSelectGame = (gameId: string) => {
    setActiveTab(gameId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGlobalPlayerSelect = (player: Player) => {
    setSelectedSearchPlayer(player);
    setActiveTab('word'); // View player details in word game / trivia search
  };

  if (!dbLoaded) {
    return (
      <div className="min-h-screen bg-pitch-950 text-slate-100 flex flex-col font-sans">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pitch-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProfile={userProfile}
        onOpenAuth={() => setActiveTab('profile')}
        onOpenGlobalSearch={() => setIsGlobalSearchOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Suspense fallback={<PageLoader />}>
        {activeTab === 'home' && (
          <Home
            onSelectGame={handleSelectGame}
            userProfile={userProfile}
          />
        )}

        {activeTab === 'games' && (
          <Games onSelectGame={handleSelectGame} />
        )}

        {activeTab === 'grid' && (
          <FootballGridPage
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'connection' && (
          <PlayerConnectionPage
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'word' && (
          <WordGamePage
            onGoHome={() => setActiveTab('home')}
            targetPlayer={selectedSearchPlayer || undefined}
          />
        )}

        {activeTab === 'daily' && (
          <div className="space-y-12">
            <div className="text-center p-6 rounded-none broadcast-panel border border-amber-500/30">
              <h2 className="text-2xl font-black text-amber-400 font-display">
                ⚡ TODAY'S SYNCHRONIZED DAILY CHALLENGE ({dailyChallenge.date})
              </h2>
              <p className="text-xs text-chalk mt-1">
                Same puzzle for all Football11 players worldwide today.
              </p>
            </div>

            <FootballGridPage
              onGoHome={() => setActiveTab('home')}
              rows={dailyChallenge.gridRows}
              cols={dailyChallenge.gridCols}
              isDaily={true}
            />
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardPage />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
          />
        )}
        </Suspense>

      </main>

      {/* Global Player Search Modal */}
      <PlayerSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onSelectPlayer={handleGlobalPlayerSelect}
        title="Global Football Player Database"
      />

      {/* Footer */}
      <footer className="border-t border-chalk-muted/80 bg-pitch-950/90 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-base text-white">FOOTBALL<span className="text-match-green">11</span></span>
            <span>© 2026 Football11 Trivia Arena</span>
          </div>
          <p className="text-chalk-muted">
            Powered by real football databases, club career histories & Supabase PostgreSQL.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
