import type { UserProfile, LeaderboardEntry } from '../types';

const GUEST_PROFILE_KEY = 'football11_user_profile';
const LEADERBOARD_STORAGE_KEY = 'football11_local_leaderboard';

export function getLocalProfile(): UserProfile {
  const saved = localStorage.getItem(GUEST_PROFILE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // fallback
    }
  }

  const newProfile: UserProfile = {
    id: 'guest_' + Math.random().toString(36).substring(2, 9),
    username: 'Tactician' + Math.floor(1000 + Math.random() * 9000),
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Football11',
    gamesPlayed: 0,
    gamesWon: 0,
    totalScore: 0,
    currentStreak: 0,
    highestStreak: 0,
    created_at: new Date().toISOString()
  };

  localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify(newProfile));
  return newProfile;
}

export function saveLocalProfile(profile: UserProfile): void {
  localStorage.setItem(GUEST_PROFILE_KEY, JSON.stringify(profile));
}

export function recordGameResult(gameType: 'grid' | 'connection' | 'word' | 'daily', points: number, isWin: boolean): UserProfile {
  const profile = getLocalProfile();
  profile.gamesPlayed += 1;
  if (isWin) {
    profile.gamesWon += 1;
    profile.currentStreak += 1;
    if (profile.currentStreak > profile.highestStreak) {
      profile.highestStreak = profile.currentStreak;
    }
    profile.totalScore += points;
  } else {
    profile.currentStreak = 0;
  }

  saveLocalProfile(profile);

  // Add entry to local leaderboard store
  addLeaderboardEntry({
    id: 'lb_' + Date.now(),
    userId: profile.id,
    username: profile.username,
    avatarUrl: profile.avatarUrl,
    score: points,
    streak: profile.currentStreak,
    gameType,
    createdAt: new Date().toISOString()
  });

  return profile;
}

export function getLeaderboardEntries(gameType?: string): LeaderboardEntry[] {
  // Pre-populated realistic high scores for leaderboard
  const defaultEntries: LeaderboardEntry[] = [
    { id: 'lb1', userId: 'u1', username: 'StrikerKing', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50', score: 2850, streak: 12, gameType: 'grid', createdAt: new Date().toISOString(), rank: 1 },
    { id: 'lb2', userId: 'u2', username: 'PitchMaster99', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50', score: 2600, streak: 9, gameType: 'grid', createdAt: new Date().toISOString(), rank: 2 },
    { id: 'lb3', userId: 'u3', username: 'TacticalGenius', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50', score: 2420, streak: 7, gameType: 'daily', createdAt: new Date().toISOString(), rank: 3 },
    { id: 'lb4', userId: 'u4', username: 'ElCapitan', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50', score: 2150, streak: 5, gameType: 'connection', createdAt: new Date().toISOString(), rank: 4 },
    { id: 'lb5', userId: 'u5', username: 'FootleWiz', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50', score: 1980, streak: 4, gameType: 'word', createdAt: new Date().toISOString(), rank: 5 },
  ];

  const saved = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
  let localEntries: LeaderboardEntry[] = [];
  if (saved) {
    try {
      localEntries = JSON.parse(saved);
    } catch {
      localEntries = [];
    }
  }

  const all = [...localEntries, ...defaultEntries];
  const filtered = gameType && gameType !== 'all'
    ? all.filter(e => e.gameType === gameType)
    : all;

  // Sort descending by score
  filtered.sort((a, b) => b.score - a.score);

  return filtered.map((entry, index) => ({
    ...entry,
    rank: index + 1
  }));
}

export function addLeaderboardEntry(entry: LeaderboardEntry): void {
  const current = getLeaderboardEntries();
  current.push(entry);
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(current.slice(0, 50)));
}
