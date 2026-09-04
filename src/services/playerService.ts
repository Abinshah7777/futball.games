import type { Player, GridCategory } from '../types';
import { INITIAL_PLAYERS, INITIAL_CLUBS } from '../data/footballDatabase';
import { normalizeClubName } from '../utils/clubUtils';

export function searchPlayers(query: string, maxResults: number = 8): Player[] {
  if (!query || query.trim().length === 0) return [];
  
  const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  
  const cleanQuery = normalizeText(query).trim();
  const queryAsClub = normalizeText(normalizeClubName(cleanQuery));

  return INITIAL_PLAYERS.filter(player => {
    const nameMatch = normalizeText(player.name).includes(cleanQuery);
    const fullNameMatch = normalizeText(player.fullName).includes(cleanQuery);
    const natMatch = normalizeText(player.nationality).includes(cleanQuery);
    
    const clubMatch = player.clubs.some(c => {
      const clubNorm = normalizeText(normalizeClubName(c.clubName));
      return normalizeText(c.clubName).includes(cleanQuery) || 
             clubNorm.includes(cleanQuery) || 
             clubNorm === queryAsClub;
    });

    return nameMatch || fullNameMatch || natMatch || clubMatch;
  }).slice(0, maxResults);
}

export function getPlayerById(id: string): Player | undefined {
  return INITIAL_PLAYERS.find(p => p.id === id);
}

// Helper: Check if player played for a specific club or league or holds nationality
export function playerMatchesCategory(player: Player, category: GridCategory): boolean {
  if (category.type === 'NATIONALITY') {
    return player.nationality.toLowerCase() === category.value.toLowerCase();
  }

  if (category.type === 'CLUB') {
    const targetClubNorm = normalizeClubName(category.value);
    return player.clubs.some(ch => normalizeClubName(ch.clubName) === targetClubNorm);
  }

  if (category.type === 'LEAGUE') {
    const targetLeague = category.value.toLowerCase();
    // Find all clubs belonging to this league
    const leagueClubNames = INITIAL_CLUBS
      .filter(c => c.league.toLowerCase() === targetLeague)
      .map(c => normalizeClubName(c.name));

    return player.clubs.some(ch => leagueClubNames.includes(normalizeClubName(ch.clubName)));
  }

  return false;
}

// Validate if player matches BOTH row and column categories in Football Grid
export function validatePlayerGridMatch(
  playerId: string,
  rowCategory: GridCategory,
  colCategory: GridCategory
): { isValid: boolean; player?: Player; reason?: string } {
  const player = getPlayerById(playerId);
  if (!player) {
    return { isValid: false, reason: 'Player not found in database' };
  }

  const matchesRow = playerMatchesCategory(player, rowCategory);
  const matchesCol = playerMatchesCategory(player, colCategory);

  if (matchesRow && matchesCol) {
    return { isValid: true, player };
  }

  let reason = '';
  if (!matchesRow) reason += `Did not represent/play for ${rowCategory.name}. `;
  if (!matchesCol) reason += `Did not represent/play for ${colCategory.name}.`;

  return { isValid: false, player, reason: reason.trim() };
}

// Validate Player Connection (e.g. Arsenal + PSG)
export function validatePlayerConnectionMatch(
  playerId: string,
  entity1: GridCategory,
  entity2: GridCategory
): { isValid: boolean; player?: Player; matchingClubs: string[] } {
  const player = getPlayerById(playerId);
  if (!player) return { isValid: false, matchingClubs: [] };

  const matches1 = playerMatchesCategory(player, entity1);
  const matches2 = playerMatchesCategory(player, entity2);

  const matchingClubs = player.clubs.map(c => c.clubName);

  return {
    isValid: matches1 && matches2,
    player,
    matchingClubs
  };
}

// Find all players connecting two entities
export function findAllConnectingPlayers(
  entity1: GridCategory,
  entity2: GridCategory
): Player[] {
  return INITIAL_PLAYERS.filter(player => {
    return playerMatchesCategory(player, entity1) && playerMatchesCategory(player, entity2);
  });
}
