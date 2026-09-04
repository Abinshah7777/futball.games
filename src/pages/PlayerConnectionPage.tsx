import React, { useState } from 'react';
import { Trophy, ArrowRight, CheckCircle2, XCircle, Search, Users } from 'lucide-react';
import type { ConnectionPuzzle, Player, GridCategory } from '../types';
import { INITIAL_CONNECTION_PUZZLES } from '../data/footballDatabase';
import { validatePlayerConnectionMatch, findAllConnectingPlayers } from '../services/playerService';
import { PlayerSearchModal } from '../components/PlayerSearchModal';
import { Toast } from '../components/Toast';
import { recordGameResult } from '../services/authService';
import { getNationalityFlagUrl, getClubLogoUrl, getPlayerImageUrl } from '../utils/mediaUtils';

interface PlayerConnectionPageProps {
  onGoHome?: () => void;
  puzzle?: ConnectionPuzzle;
  isDaily?: boolean;
}

export const PlayerConnectionPage: React.FC<PlayerConnectionPageProps> = ({
  puzzle: propPuzzle,
  isDaily = false
}) => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle = propPuzzle || INITIAL_CONNECTION_PUZZLES[puzzleIndex % INITIAL_CONNECTION_PUZZLES.length];

  const [guessedPlayer, setGuessedPlayer] = useState<Player | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAllSolutions, setShowAllSolutions] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const allValidPlayers = findAllConnectingPlayers(currentPuzzle.entity1, currentPuzzle.entity2);

  const handleSelectPlayer = (player: Player) => {
    const result = validatePlayerConnectionMatch(player.id, currentPuzzle.entity1, currentPuzzle.entity2);
    setGuessedPlayer(player);
    setIsCorrect(result.isValid);

    if (result.isValid) {
      setToastMessage({
        msg: `Correct! ${player.name} played for both ${currentPuzzle.entity1.name} and ${currentPuzzle.entity2.name}!`,
        type: 'success'
      });
      recordGameResult('connection', 250, true);
    } else {
      setToastMessage({
        msg: `Incorrect! ${player.name} does not connect both entities.`,
        type: 'error'
      });
      recordGameResult('connection', 0, false);
    }
  };

  const handleNextPuzzle = () => {
    setGuessedPlayer(null);
    setIsCorrect(null);
    setShowAllSolutions(false);
    setPuzzleIndex(prev => prev + 1);
  };

  const renderEntityPicture = (entity: GridCategory) => {
    if (entity.type === 'NATIONALITY') {
      const flagUrl = entity.flagUrl || getNationalityFlagUrl(entity.value);
      return (
        <div className="w-20 h-14 sm:w-24 sm:h-16 rounded-none overflow-hidden shadow-none border border-chalk-muted bg-pitch-950 flex items-center justify-center p-1">
          <img src={flagUrl} alt={entity.name} className="w-full h-full object-cover rounded-none" />
        </div>
      );
    }
    const logoUrl = entity.logoUrl || getClubLogoUrl(entity.value);
    return (
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-none bg-pitch-950/80 p-3 shadow-none border border-chalk-muted flex items-center justify-center">
        <img src={logoUrl} alt={entity.name} className="max-w-full max-h-full object-contain filter drop-shadow" />
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12 pb-16 animate-fadeIn">
      
      {/* Page Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-900/80 border border-match-green/30 text-emerald-300 text-xs font-bold font-display uppercase tracking-widest">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Player Connection Trivia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Find The <span className="text-match-green">Connecting Player</span>
        </h1>
        <p className="text-sm text-chalk">
          Identify a footballer who represented or played for both entities below.
        </p>
      </div>

      {/* DUAL ENTITY DISPLAY CARD */}
      <div className="broadcast-panel rounded-none border border-match-green/30 shadow-none relative overflow-hidden text-center">
        
        <div className="flex items-center justify-center gap-4 sm:gap-8 my-6">
          
          {/* Entity 1 */}
          <div className="flex-1 p-4 sm:p-6 rounded-none bg-stadium-900 border border-chalk-muted flex flex-col items-center justify-center space-y-3 shadow-none">
            {renderEntityPicture(currentPuzzle.entity1)}
            <h3 className="text-lg sm:text-2xl font-black text-white font-display">
              {currentPuzzle.entity1.name}
            </h3>
            <span className="text-[10px] font-bold text-match-green uppercase tracking-widest">
              {currentPuzzle.entity1.type}
            </span>
          </div>

          {/* Plus / Connection Icon */}
          <div className="w-12 h-12 rounded-full bg-pitch-950 border-2 border-emerald-400 text-emerald-300 font-black font-display text-xl flex items-center justify-center shadow-glow-emerald shrink-0">
            +
          </div>

          {/* Entity 2 */}
          <div className="flex-1 p-4 sm:p-6 rounded-none bg-stadium-900 border border-chalk-muted flex flex-col items-center justify-center space-y-3 shadow-none">
            {renderEntityPicture(currentPuzzle.entity2)}
            <h3 className="text-lg sm:text-2xl font-black text-white font-display">
              {currentPuzzle.entity2.name}
            </h3>
            <span className="text-[10px] font-bold text-match-green uppercase tracking-widest">
              {currentPuzzle.entity2.type}
            </span>
          </div>

        </div>

        {/* Input Trigger Button */}
        {!guessedPlayer ? (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full max-w-md mx-auto py-4 px-6 rounded-none font-extrabold font-display text-base text-stadium-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-glow-emerald flex items-center justify-center gap-3 transition-all hover:scale-105"
          >
            <Search className="w-5 h-5" />
            <span>Select Connecting Footballer</span>
          </button>
        ) : (
          /* RESULT REVEAL CARD */
          <div className="mt-8 p-6 rounded-none bg-stadium-900 border border-chalk-muted text-left space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5 ${
                isCorrect ? 'bg-match-green/20 text-emerald-300 border border-match-green/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {isCorrect ? <CheckCircle2 className="w-4 h-4 text-match-green" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                {isCorrect ? 'CORRECT CONNECTION' : 'INCORRECT CONNECTION'}
              </span>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-xs font-semibold text-chalk-muted hover:text-white"
              >
                Try Another Player
              </button>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <img
                src={getPlayerImageUrl(guessedPlayer)}
                alt={guessedPlayer.name}
                className="w-16 h-16 rounded-none object-cover border-2 border-emerald-400 shadow-none"
              />
              <div>
                <h4 className="text-xl font-black text-white font-display">{guessedPlayer.name}</h4>
                <p className="text-xs text-chalk mt-0.5 flex items-center gap-2">
                  <img
                    src={getNationalityFlagUrl(guessedPlayer.nationality)}
                    alt={guessedPlayer.nationality}
                    className="w-5 h-3.5 rounded object-cover border border-chalk-muted inline"
                  />
                  <span className="font-semibold text-match-green">{guessedPlayer.nationality}</span> • {guessedPlayer.position} • Age {guessedPlayer.age}
                </p>
                <p className="text-xs text-chalk-muted mt-1">
                  Career Clubs: <span className="text-slate-200">{guessedPlayer.clubs.map(c => c.clubName).join(', ')}</span>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-chalk-muted flex items-center justify-between">
              <button
                onClick={() => setShowAllSolutions(!showAllSolutions)}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
              >
                <Users className="w-4 h-4" />
                <span>{showAllSolutions ? 'Hide All Valid Players' : `Show All Valid Players (${allValidPlayers.length})`}</span>
              </button>

              {!isDaily && (
                <button
                  onClick={handleNextPuzzle}
                  className="px-4 py-2 rounded-none font-bold font-display text-xs text-stadium-950 bg-emerald-400 hover:bg-emerald-300 flex items-center gap-1.5 transition-all"
                >
                  <span>Next Puzzle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ALL VALID CONNECTING PLAYERS EXPANDABLE LIST */}
      {showAllSolutions && (
        <div className="broadcast-panel rounded-none border border-chalk-muted space-y-6 animate-fadeIn">
          <h4 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Users className="w-4 h-4 text-match-green" />
            Verified Players connecting {currentPuzzle.entity1.name} & {currentPuzzle.entity2.name}:
          </h4>

          {allValidPlayers.length === 0 ? (
            <p className="text-xs text-chalk-muted">No other players found in database.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {allValidPlayers.map(p => (
                <div key={p.id} className="p-3 rounded-none bg-stadium-900 border border-chalk-muted flex items-center gap-3">
                  <img src={getPlayerImageUrl(p)} alt={p.name} className="w-10 h-10 rounded-none object-cover border border-chalk-muted" />
                  <div>
                    <h5 className="text-xs font-bold text-white font-display flex items-center gap-1.5">
                      {p.name}
                      <img src={getNationalityFlagUrl(p.nationality)} alt={p.nationality} className="w-4 h-3 rounded object-cover" />
                    </h5>
                    <span className="text-[10px] text-match-green">{p.nationality} • {p.position}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Modal */}
      <PlayerSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlayer={handleSelectPlayer}
        title={`Find Player: ${currentPuzzle.entity1.name} + ${currentPuzzle.entity2.name}`}
      />

      {/* Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage.msg}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}

    </div>
  );
};
