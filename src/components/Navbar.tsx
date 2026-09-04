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
    <header className="sticky top-0 z-40 w-full broadcast-panel border-b border-match-green/30 backdrop-blur-xl bg-pitch-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-match-green border border-match-green flex items-center justify-center transition-colors duration-200 group-hover:bg-white">
              <span className="font-display font-black text-xl text-pitch-950">11</span>
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1">
                FOOTBALL<span className="text-match-green">11</span>
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-match-green/80 tracking-widest uppercase">
                Trivia & Knowledge Arena
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-pitch-900 border border-chalk-muted p-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                    isActive
                      ? 'bg-match-green text-pitch-950 border border-match-green'
                      : 'text-chalk-muted hover:text-white border border-transparent hover:border-chalk-muted'
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
              className="p-2 rounded-none bg-stadium-900 text-chalk-muted hover:text-match-green hover:bg-slate-800 transition-colors border border-chalk-muted"
              title="Search Players"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 bg-pitch-900 px-3 py-1.5 border border-floodlight text-floodlight font-display font-bold text-lg">
              <Flame className="w-4 h-4 fill-current animate-pulse" />
              <span>{userProfile.currentStreak}</span>
              <span className="text-[11px] font-normal text-chalk-muted uppercase hidden sm:inline">Streak</span>
            </div>

            {/* User Profile / Login */}
            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-pitch-900 hover:bg-chalk-dim border border-chalk-muted transition-colors"
            >
              <img
                src={userProfile.avatarUrl}
                alt={userProfile.username}
                className="w-7 h-7 rounded-full bg-slate-800 border border-match-green/30"
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-200">
                {userProfile.username}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-none bg-stadium-900 text-chalk border border-chalk-muted"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-chalk-muted bg-pitch-950/95 backdrop-blur-2xl px-4 py-4 space-y-2">
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-pitch-600 text-white shadow-glow-emerald'
                    : 'text-chalk hover:bg-stadium-900'
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
