import type { GridCategory, ConnectionPuzzle, Player } from '../types';
import { INITIAL_GRID_CATEGORIES, INITIAL_CONNECTION_PUZZLES, INITIAL_PLAYERS } from '../data/footballDatabase';

// Deterministic String Hash
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getTodayDateString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
}

export interface DailyChallengePayload {
  date: string;
  gridRows: GridCategory[];
  gridCols: GridCategory[];
  connectionPuzzle: ConnectionPuzzle;
  wordGamePlayer: Player;
}

export function getDailyChallenge(dateStr: string = getTodayDateString()): DailyChallengePayload {
  const seed = simpleHash(dateStr);

  // 1. Pick 3 rows and 3 cols for Daily Football Grid
  const clubCategories = INITIAL_GRID_CATEGORIES.filter(c => c.type === 'CLUB');
  const natCategories = INITIAL_GRID_CATEGORIES.filter(c => c.type === 'NATIONALITY');

  // Rows: 2 Clubs + 1 Nationality
  const row1 = clubCategories[seed % clubCategories.length];
  const row2 = clubCategories[(seed + 3) % clubCategories.length];
  const row3 = natCategories[seed % natCategories.length];

  // Cols: 2 Nationalities + 1 Club
  const col1 = natCategories[(seed + 1) % natCategories.length];
  const col2 = clubCategories[(seed + 5) % clubCategories.length];
  const col3 = natCategories[(seed + 2) % natCategories.length];

  const gridRows = [row1, row2, row3];
  const gridCols = [col1, col2, col3];

  // 2. Pick Daily Player Connection Puzzle
  const connIndex = seed % INITIAL_CONNECTION_PUZZLES.length;
  const connectionPuzzle = INITIAL_CONNECTION_PUZZLES[connIndex];

  // 3. Pick Daily Football Word Game Target Player
  const playerIndex = seed % INITIAL_PLAYERS.length;
  const wordGamePlayer = INITIAL_PLAYERS[playerIndex];

  return {
    date: dateStr,
    gridRows,
    gridCols,
    connectionPuzzle,
    wordGamePlayer
  };
}
