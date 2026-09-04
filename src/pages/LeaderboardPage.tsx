import React, { useState } from 'react';
import { Trophy, Flame } from 'lucide-react';
import { getLeaderboardEntries } from '../services/authService';

export const LeaderboardPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'grid' | 'connection' | 'word' | 'daily'>('all');
  const leaderboard = getLeaderboardEntries(filterType);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-900/80 border border-match-green/30 text-emerald-300 text-xs font-bold font-display uppercase tracking-widest">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Global Rankings & Stats</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
          Football11 <span className="text-floodlight">Leaderboard</span>
        </h1>
        <p className="text-sm text-chalk">
          Rankings of top football strategists based on total score, streak, and quiz wins.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-none bg-stadium-900 border border-chalk-muted max-w-xl mx-auto">
        {[
          { id: 'all', label: 'All-Time' },
          { id: 'daily', label: 'Daily Challenge' },
          { id: 'grid', label: 'Football Grid' },
          { id: 'connection', label: 'Connection' },
          { id: 'word', label: 'Word Game' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-4 py-2 rounded-none text-xs font-bold font-display transition-all ${
              filterType === tab.id
                ? 'bg-gradient-to-r from-pitch-600 to-pitch-500 text-white shadow-glow-emerald'
                : 'text-chalk-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard Table Container */}
      <div className="broadcast-panel rounded-none border border-match-green/30 shadow-none overflow-hidden">
        
        {/* TOP 3 PODIUM DISPLAY */}
        {leaderboard.length >= 3 && (
          <div className="grid grid-cols-3 gap-2 p-6 bg-gradient-to-b from-stadium-900/90 to-stadium-950 border-b border-chalk-muted text-center items-end">
            
            {/* Rank 2 - Silver */}
            <div className="p-3 rounded-none bg-stadium-900/80 border border-chalk-muted/80 space-y-2">
              <div className="w-12 h-12 rounded-full mx-auto border-2 border-slate-300 overflow-hidden shadow-none">
                <img src={leaderboard[1].avatarUrl} alt={leaderboard[1].username} className="w-full h-full object-cover" />
              </div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 font-black text-xs font-display">#2</span>
              <h4 className="font-bold text-white text-xs sm:text-sm font-display truncate">{leaderboard[1].username}</h4>
              <span className="text-xs font-bold text-match-green block font-display">{leaderboard[1].score} PTS</span>
            </div>

            {/* Rank 1 - Gold */}
            <div className="p-4 rounded-none bg-gradient-to-b from-amber-500/20 to-stadium-900 border border-amber-500/40 space-y-2 shadow-glow-gold -translate-y-2">
              <div className="relative w-16 h-16 rounded-full mx-auto border-2 border-amber-400 overflow-hidden shadow-none">
                <img src={leaderboard[0].avatarUrl} alt={leaderboard[0].username} className="w-full h-full object-cover" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500 text-stadium-950 font-black text-xs font-display">#1</span>
              <h4 className="font-extrabold text-white text-sm sm:text-base font-display truncate">{leaderboard[0].username}</h4>
              <span className="text-sm font-black text-floodlight block font-display">{leaderboard[0].score} PTS</span>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="p-3 rounded-none bg-stadium-900/80 border border-amber-700/50 space-y-2">
              <div className="w-12 h-12 rounded-full mx-auto border-2 border-amber-700 overflow-hidden shadow-none">
                <img src={leaderboard[2].avatarUrl} alt={leaderboard[2].username} className="w-full h-full object-cover" />
              </div>
              <span className="inline-block px-2 py-0.5 rounded-full bg-amber-900 text-amber-300 font-black text-xs font-display">#3</span>
              <h4 className="font-bold text-white text-xs sm:text-sm font-display truncate">{leaderboard[2].username}</h4>
              <span className="text-xs font-bold text-match-green block font-display">{leaderboard[2].score} PTS</span>
            </div>

          </div>
        )}

        {/* FULL RANKINGS LIST */}
        <div className="divide-y divide-slate-800/80">
          {leaderboard.map((entry, index) => (
            <div
              key={entry.id + index}
              className="flex items-center justify-between p-4 hover:bg-stadium-900/60 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-none flex items-center justify-center font-black text-xs font-display ${
                  entry.rank === 1 ? 'bg-amber-500 text-stadium-950' :
                  entry.rank === 2 ? 'bg-slate-300 text-stadium-950' :
                  entry.rank === 3 ? 'bg-amber-800 text-amber-100' :
                  'bg-stadium-900 text-chalk-muted border border-chalk-muted'
                }`}>
                  #{entry.rank}
                </span>

                <img
                  src={entry.avatarUrl}
                  alt={entry.username}
                  className="w-10 h-10 rounded-full object-cover border border-chalk-muted"
                />

                <div>
                  <h4 className="font-bold text-white text-sm font-display">{entry.username}</h4>
                  <div className="flex items-center gap-2 text-xs text-chalk-muted">
                    <span className="uppercase text-[10px] font-semibold text-match-green">{entry.gameType}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Flame className="w-3 h-3" /> {entry.streak} Streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-black text-white font-display block">
                  {entry.score}
                </span>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Points</span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
