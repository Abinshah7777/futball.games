import React from 'react';
import { Gamepad2, Trophy, Sparkles, Flame, ArrowRight, CheckCircle2, Search, Play } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import type { UserProfile } from '../types';

interface HomeProps {
  onSelectGame: (gameId: string) => void;
  userProfile: UserProfile;
}

export const Home: React.FC<HomeProps> = ({ onSelectGame, userProfile }) => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-16 animate-fadeIn">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 rounded-none broadcast-panel border-match-green/30 px-6 sm:px-12 text-center sm:text-left">
        
        <div className="max-w-4xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-match-green text-pitch-950 font-display font-bold text-sm uppercase tracking-widest border border-match-green">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>The Premier Football Knowledge Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-tight">
            Test Your <br className="hidden sm:inline" />
            <span className="text-match-green">Football Knowledge</span>
          </h1>

          <p className="text-base sm:text-xl text-chalk max-w-2xl font-sans leading-relaxed">
            Challenge your trivia skills across player career histories, club connections, 3×3 category grids, and daily mystery player puzzles powered by real football databases.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => onSelectGame('grid')}
              className="w-full sm:w-auto px-8 py-4 font-display text-xl text-pitch-950 bg-match-green hover:bg-white border border-match-green flex items-center justify-center gap-3 transition-colors"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Play Football Grid</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onSelectGame('daily')}
              className="w-full sm:w-auto px-8 py-4 font-display text-xl text-floodlight bg-pitch-900 hover:bg-pitch-800 border border-floodlight flex items-center justify-center gap-3 transition-colors"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>Today's Daily Challenge</span>
            </button>
          </div>
        </div>

        {/* Live Stats Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-chalk-muted/80 text-center sm:text-left">
          <div>
            <span className="text-xs text-chalk-muted font-semibold uppercase">Real Football Database</span>
            <span className="block text-2xl font-black text-white font-display">500+ Players</span>
          </div>
          <div>
            <span className="text-xs text-chalk-muted font-semibold uppercase tracking-wider block mb-1">Career Connections</span>
            <span className="block text-4xl font-black text-match-green font-display">100%</span>
          </div>
          <div>
            <span className="text-xs text-chalk-muted font-semibold uppercase tracking-wider block mb-1">Current Streak</span>
            <span className="block text-4xl font-black text-floodlight font-display flex items-center justify-center sm:justify-start gap-2">
              <Flame className="w-6 h-6 fill-current" /> {userProfile.currentStreak}
            </span>
          </div>
          <div>
            <span className="text-xs text-chalk-muted font-semibold uppercase">Community Games</span>
            <span className="block text-2xl font-black text-white font-display">12,450+ Played</span>
          </div>
        </div>
      </section>

      {/* FEATURED GAMES SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display flex items-center gap-2">
              <Gamepad2 className="w-7 h-7 text-match-green" />
              Game Modes
            </h2>
            <p className="text-sm text-chalk-muted">Choose a trivia mode and start testing your football IQ</p>
          </div>

          <button
            onClick={() => onSelectGame('all')}
            className="text-xs font-bold text-match-green hover:text-emerald-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Games</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <GameCard
            id="daily"
            title="Daily Challenge"
            description="The flagship daily trivia puzzle. Same challenge for all players worldwide every 24 hours."
            icon={Flame}
            tag="Daily Puzzle"
            isDaily={true}
            onPlay={onSelectGame}
          />
          <GameCard
            id="grid"
            title="Football Grid"
            description="Solve a 3x3 category grid. Match clubs, nationalities, and leagues with valid footballers."
            icon={Gamepad2}
            tag="3x3 Grid"
            onPlay={onSelectGame}
          />
          <GameCard
            id="connection"
            title="Player Connection"
            description="Find the mystery player who connects dual clubs or country + club career combinations."
            icon={Trophy}
            tag="Dual Entity"
            onPlay={onSelectGame}
          />
          <GameCard
            id="word"
            title="Football Word Game"
            description="Guess secret players using color-coded hints for Nation, Position, Club, Age, and Era."
            icon={Sparkles}
            tag="Guess Player"
            onPlay={onSelectGame}
          />
        </div>
      </section>

      {/* WHY FOOTBALL11 */}
      <section className="broadcast-panel rounded-none border border-chalk-muted space-y-6">
        <h3 className="text-xl font-extrabold text-white font-display text-center sm:text-left">
          Why Football Trivia Fans Love Football11
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-none bg-stadium-900/60 border border-chalk-muted space-y-2">
            <div className="w-10 h-10 rounded-none bg-pitch-900/80 text-match-green flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white font-display">Authentic Player Career History</h4>
            <p className="text-xs text-chalk-muted">Database populated with real player transfers, club histories, and national team caps.</p>
          </div>

          <div className="p-4 rounded-none bg-pitch-900/80 text-match-green flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>

          <div className="p-4 rounded-none bg-stadium-900/60 border border-chalk-muted space-y-2">
            <div className="w-10 h-10 rounded-none bg-pitch-900/80 text-match-green flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white font-display">Daily Leaderboard & Streaks</h4>
            <p className="text-xs text-chalk-muted">Compete with football fans daily, build streaks, and rank on global leaderboards.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
