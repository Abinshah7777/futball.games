import React, { useState } from 'react';
import { Trophy, Flame, Gamepad2, Award, Percent, CheckCircle2, Shield, Edit3 } from 'lucide-react';
import type { UserProfile } from '../types';
import { saveLocalProfile } from '../services/authService';

interface ProfilePageProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usernameInput, setUsernameInput] = useState(userProfile.username);

  const gamesLost = Math.max(0, userProfile.gamesPlayed - userProfile.gamesWon);
  const winRate = userProfile.gamesPlayed > 0
    ? Math.round((userProfile.gamesWon / userProfile.gamesPlayed) * 100)
    : 0;

  const avgScore = userProfile.gamesPlayed > 0
    ? Math.round(userProfile.totalScore / userProfile.gamesPlayed)
    : 0;

  const handleSaveProfile = () => {
    if (!usernameInput.trim()) return;
    const updated = { ...userProfile, username: usernameInput.trim() };
    saveLocalProfile(updated);
    onUpdateProfile(updated);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-fadeIn">
      
      {/* PROFILE HEADER CARD */}
      <div className="broadcast-panel rounded-none p-6 sm:p-8 border border-match-green/30 shadow-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-match-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.username}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-emerald-400 shadow-glow-emerald bg-stadium-900"
            />
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-pitch-500 text-stadium-950 shadow-md">
              <Shield className="w-5 h-5 fill-current" />
            </div>
          </div>

          {/* User Details & Edit */}
          <div className="flex-1 space-y-2">
            {!isEditing ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
                  {userProfile.username}
                </h1>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-none bg-stadium-900 hover:bg-stadium-850 text-xs font-semibold text-chalk border border-chalk-muted transition-colors self-center sm:self-auto"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Name</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 max-w-sm mx-auto sm:mx-0">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="px-3 py-1.5 rounded-none bg-stadium-900 border border-emerald-400 text-white font-bold text-base outline-none font-display w-full"
                />
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-1.5 rounded-none bg-match-green text-stadium-950 font-bold text-xs font-display hover:bg-emerald-400"
                >
                  Save
                </button>
              </div>
            )}

            <p className="text-xs text-chalk-muted flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Football Knowledge Strategist
            </p>
          </div>

          {/* Quick Total Score Pill */}
          <div className="p-4 rounded-none bg-stadium-900/90 border border-chalk-muted text-center min-w-[140px]">
            <span className="text-xs text-chalk-muted font-semibold uppercase">Total Score</span>
            <span className="block text-3xl font-black text-match-green font-display">
              {userProfile.totalScore}
            </span>
          </div>

        </div>
      </div>

      {/* DETAILED STATISTICS GRID */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-white font-display flex items-center gap-2">
          <Award className="w-5 h-5 text-match-green" />
          Career Statistics Breakdown
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-match-green" /> Games Played
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-display block">
              {userProfile.gamesPlayed}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-match-green" /> Games Won
            </span>
            <span className="text-2xl sm:text-3xl font-black text-match-green font-display block">
              {userProfile.gamesWon}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-amber-400" /> Win Rate
            </span>
            <span className="text-2xl sm:text-3xl font-black text-floodlight font-display block">
              {winRate}%
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" /> Current Streak
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display block">
              {userProfile.currentStreak}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" /> Highest Streak
            </span>
            <span className="text-2xl sm:text-3xl font-black text-white font-display block">
              {userProfile.highestStreak}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase flex items-center gap-1.5">
              <Award className="w-4 h-4 text-match-green" /> Avg Score / Game
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-300 font-display block">
              {avgScore}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase">Losses</span>
            <span className="text-2xl sm:text-3xl font-black text-chalk-muted font-display block">
              {gamesLost}
            </span>
          </div>

          <div className="p-5 rounded-none broadcast-panel border border-chalk-muted space-y-1">
            <span className="text-xs text-chalk-muted font-semibold uppercase">Account Rank</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 font-display block">
              Pro Tactician
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
