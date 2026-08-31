import type { Player, WordGameGuess, WordGameAttributeFeedback } from '../types';
import { INITIAL_PLAYERS, INITIAL_CLUBS } from '../data/footballDatabase';

const CONTINENT_MAP: Record<string, string> = {
  'Argentina': 'South America',
  'Brazil': 'South America',
  'Uruguay': 'South America',
  'Chile': 'South America',
  'Colombia': 'South America',
  'France': 'Europe',
  'Portugal': 'Europe',
  'Spain': 'Europe',
  'England': 'Europe',
  'Sweden': 'Europe',
  'Belgium': 'Europe',
  'Germany': 'Europe',
  'Croatia': 'Europe',
  'Poland': 'Europe',
  'Norway': 'Europe',
  'Italy': 'Europe',
  'Netherlands': 'Europe',
  'Gabon': 'Africa',
  'Egypt': 'Africa',
  'Morocco': 'Africa',
  'Costa Rica': 'North America',
  'USA': 'North America',
};

export function evaluateWordGameGuess(targetPlayer: Player, guessedPlayer: Player): WordGameGuess {
  // 1. Nationality match
  let natFeedback: 'EXACT' | 'CONTINENT' | 'NONE' = 'NONE';
  if (guessedPlayer.nationality === targetPlayer.nationality) {
    natFeedback = 'EXACT';
  } else {
    const targetCont = CONTINENT_MAP[targetPlayer.nationality] || 'Europe';
    const guessCont = CONTINENT_MAP[guessedPlayer.nationality] || 'Europe';
    if (targetCont === guessCont) {
      natFeedback = 'CONTINENT';
    }
  }

  // 2. Position match
  let posFeedback: 'EXACT' | 'CATEGORY' | 'NONE' = 'NONE';
  if (guessedPlayer.position === targetPlayer.position) {
    posFeedback = 'EXACT';
  } else {
    const isGuessAttacker = guessedPlayer.position === 'Forward' || guessedPlayer.position === 'Midfielder';
    const isTargetAttacker = targetPlayer.position === 'Forward' || targetPlayer.position === 'Midfielder';
    if (isGuessAttacker && isTargetAttacker) posFeedback = 'CATEGORY';
  }

  // 3. Current League match
  const targetCurrentClub = targetPlayer.clubs[targetPlayer.clubs.length - 1];
  const guessCurrentClub = guessedPlayer.clubs[guessedPlayer.clubs.length - 1];

  const targetClubInfo = INITIAL_CLUBS.find(c => c.name === targetCurrentClub?.clubName);
  const guessClubInfo = INITIAL_CLUBS.find(c => c.name === guessCurrentClub?.clubName);

  const leagueFeedback: 'EXACT' | 'NONE' = (targetClubInfo && guessClubInfo && targetClubInfo.league === guessClubInfo.league) ? 'EXACT' : 'NONE';

  // 4. Shared Club
  const targetClubNames = new Set(targetPlayer.clubs.map(c => c.clubName));
  const guessClubNames = new Set(guessedPlayer.clubs.map(c => c.clubName));

  let clubFeedback: 'EXACT' | 'PREVIOUS' | 'NONE' = 'NONE';
  if (targetCurrentClub?.clubName === guessCurrentClub?.clubName) {
    clubFeedback = 'EXACT';
  } else {
    const hasSharedPrevious = [...guessClubNames].some(name => targetClubNames.has(name));
    if (hasSharedPrevious) {
      clubFeedback = 'PREVIOUS';
    }
  }

  // 5. Age comparison
  let ageFeedback: 'EXACT' | 'HIGHER' | 'LOWER' = 'EXACT';
  if (guessedPlayer.age < targetPlayer.age) {
    ageFeedback = 'HIGHER'; // Target is older than guess
  } else if (guessedPlayer.age > targetPlayer.age) {
    ageFeedback = 'LOWER'; // Target is younger than guess
  }

  // 6. Era comparison
  const targetEra = targetPlayer.age > 35 ? 'Legend Era' : 'Modern Era';
  const guessEra = guessedPlayer.age > 35 ? 'Legend Era' : 'Modern Era';
  const eraFeedback: 'EXACT' | 'NONE' = targetEra === guessEra ? 'EXACT' : 'NONE';

  const feedback: WordGameAttributeFeedback = {
    nationality: natFeedback,
    position: posFeedback,
    league: leagueFeedback,
    club: clubFeedback,
    age: ageFeedback,
    era: eraFeedback
  };

  return {
    player: guessedPlayer,
    feedback
  };
}

export function getRandomWordGamePlayer(): Player {
  const index = Math.floor(Math.random() * INITIAL_PLAYERS.length);
  return INITIAL_PLAYERS[index];
}
