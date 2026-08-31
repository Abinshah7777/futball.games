import React, { useState } from 'react';
import { Trophy, Gamepad2, User, Home, Flame, Menu, X, Search } from 'lucide-react';
import type { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  onOpenAuth: () => void;
  onOpenGlobalSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProfile,
  onOpenGlobalSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-500/20 backdrop-blur-xl bg-stadium-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pitch-600 via-pitch-500 to-emerald-400 p-0.5 shadow-glow-emerald group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-stadium-950 rounded-[10px] flex items-center justify-center">
                <span className="font-display font-black text-xl text-pitch-400 group-hover:text-emerald-300">11</span>
              </div>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1">
                FOOTBALL<span className="pitch-gradient-text">11</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-emerald-400/80 tracking-widest uppercase">
                Trivia & Knowledge Arena
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-stadium-900/60 p-1.5 rounded-full border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-pitch-600 to-pitch-500 text-white shadow-glow-emerald'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Search, Streak, Auth */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenGlobalSearch}
              className="p-2 rounded-xl bg-stadium-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors border border-slate-800"
              title="Search Players"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 bg-pitch-950/80 px-3 py-1.5 rounded-full border border-pitch-500/30 text-emerald-400 font-display font-bold text-sm shadow-sm">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{userProfile.currentStreak}</span>
              <span className="text-[11px] font-normal text-slate-400 uppercase hidden sm:inline">Streak</span>
            </div>

            {/* User Profile / Login */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-stadium-900 hover:bg-stadium-850 border border-slate-800 transition-colors"
            >
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.username}
                className="w-7 h-7 rounded-full bg-slate-800 border border-emerald-500/50"
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-200">
                {userProfile.username}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-stadium-900 text-slate-300 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-stadium-950/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-pitch-600 text-white shadow-glow-emerald'
                    : 'text-slate-300 hover:bg-stadium-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
