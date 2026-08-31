export type Position = 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper';

export interface Club {
  id: string;
  name: string;
  country: string;
  league: string;
  logoUrl?: string;
  aliases: string[];
  externalId?: string;
}

export interface PlayerClubHistory {
  clubId: string;
  clubName: string;
  startYear?: number;
  endYear?: number;
}

export interface Player {
  id: string;
  name: string;
  fullName: string;
  nationality: string;
  position: Position;
  dateOfBirth?: string;
  age: number;
  imageUrl?: string;
  externalId?: string;
  clubs: PlayerClubHistory[]; // List of clubs played for
}

export type CategoryType = 'CLUB' | 'NATIONALITY' | 'LEAGUE' | 'TROPHY' | 'CONTINENT';

export interface GridCategory {
  id: string;
  name: string;
  type: CategoryType;
  value: string; // The match value, e.g. "Paris Saint-Germain" or "Argentina" or "Premier League"
  icon?: string;
  logoUrl?: string;
  flagUrl?: string;
  flag?: string;
}

export interface GridCell {
  rowIndex: number;
  colIndex: number;
  rowCategory: GridCategory;
  colCategory: GridCategory;
  guessedPlayer?: Player;
  isCorrect?: boolean;
  isValidated?: boolean;
}

export interface ConnectionPuzzle {
  id: string;
  title: string;
  entity1: GridCategory;
  entity2: GridCategory;
  solutionCount?: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface WordGameTarget {
  player: Player;
  currentClub: string;
  currentLeague: string;
  continent: string;
  era: string; // e.g. "2010s-2020s"
}

export interface WordGameAttributeFeedback {
  nationality: 'EXACT' | 'CONTINENT' | 'NONE';
  position: 'EXACT' | 'CATEGORY' | 'NONE';
  league: 'EXACT' | 'NONE';
  club: 'EXACT' | 'PREVIOUS' | 'NONE';
  age: 'EXACT' | 'HIGHER' | 'LOWER';
  era: 'EXACT' | 'NONE';
}

export interface WordGameGuess {
  player: Player;
  feedback: WordGameAttributeFeedback;
}

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  currentStreak: number;
  highestStreak: number;
  created_at?: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  score: number;
  streak: number;
  gameType: 'grid' | 'connection' | 'word' | 'daily';
  createdAt: string;
  rank?: number;
}
