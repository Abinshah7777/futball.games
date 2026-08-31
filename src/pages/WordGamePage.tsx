import React, { useState } from 'react';
import { Sparkles, Search, RotateCcw } from 'lucide-react';
import type { Player, WordGameGuess } from '../types';
import { getRandomWordGamePlayer, evaluateWordGameGuess } from '../services/gameEngine';
import { WordGameGuessRow } from '../components/WordGameGuessRow';
import { PlayerSearchModal } from '../components/PlayerSearchModal';
import { GameCompletionModal } from '../components/GameCompletionModal';
import { Toast } from '../components/Toast';
import { recordGameResult } from '../services/authService';

interface WordGamePageProps {
  onGoHome: () => void;
  targetPlayer?: Player;
  isDaily?: boolean;
}

export const WordGamePage: React.FC<WordGamePageProps> = ({
  onGoHome,
  targetPlayer: propTarget
}) => {
  const [target, setTarget] = useState<Player>(() => propTarget || getRandomWordGamePlayer());
  const [guesses, setGuesses] = useState<WordGameGuess[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState<{ pos?: boolean; nat?: boolean }>({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const maxGuesses = 6;
  const attemptsLeft = maxGuesses - guesses.length;

  const handleSelectPlayer = (guessedPlayer: Player) => {
    // Prevent duplicate guess
    if (guesses.some(g => g.player.id === guessedPlayer.id)) {
      setToastMessage({ msg: `${guessedPlayer.name} has already been guessed!`, type: 'info' });
      return;
    }

    const feedback = evaluateWordGameGuess(target, guessedPlayer);
    const updatedGuesses = [...guesses, feedback];
    setGuesses(updatedGuesses);

    const isMatch = guessedPlayer.id === target.id;

    if (isMatch) {
      setIsWin(true);
      setGameCompleted(true);
      const points = (maxGuesses - updatedGuesses.length + 1) * 100;
      recordGameResult('word', points, true);
      setToastMessage({ msg: `LEGENDARY! You guessed ${target.name}!`, type: 'success' });
    } else if (updatedGuesses.length >= maxGuesses) {
      setIsWin(false);
      setGameCompleted(true);
      recordGameResult('word', 0, false);
      setToastMessage({ msg: `Out of guesses! The player was ${target.name}.`, type: 'error' });
    }
  };

  const handleResetGame = () => {
    setTarget(getRandomWordGamePlayer());
    setGuesses([]);
    setHintsUsed({});
    setGameCompleted(false);
    setIsWin(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pitch-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-display uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Football Word Game (Footle)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
          Guess The <span className="pitch-gradient-text">Mystery Player</span>
        </h1>
        <p className="text-sm text-slate-300">
          Get feedback on Nation, Position, Club, Age, and Era after every guess.
        </p>
      </div>

      {/* Control Bar: Hints & Guesses */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-semibold uppercase">Attempts Left:</span>
          <span className="text-base font-black text-amber-400 font-display">{attemptsLeft} / {maxGuesses}</span>
        </div>

        {/* Hints */}
        <div className="flex items-center gap-2">
          {!hintsUsed.pos && (
            <button
              onClick={() => {
                setHintsUsed(prev => ({ ...prev, pos: true }));
                setToastMessage({ msg: `Hint: Position is ${target.position}`, type: 'info' });
              }}
              className="px-3 py-1.5 rounded-xl bg-stadium-900 hover:bg-stadium-850 border border-slate-700 text-xs font-bold text-slate-300"
            >
              Reveal Position
            </button>
          )}

          {!hintsUsed.nat && (
            <button
              onClick={() => {
                setHintsUsed(prev => ({ ...prev, nat: true }));
                setToastMessage({ msg: `Hint: Nationality is ${target.nationality}`, type: 'info' });
              }}
              className="px-3 py-1.5 rounded-xl bg-stadium-900 hover:bg-stadium-850 border border-slate-700 text-xs font-bold text-slate-300"
            >
              Reveal Nation
            </button>
          )}

          <button
            onClick={handleResetGame}
            className="p-2 rounded-xl bg-stadium-800 hover:bg-stadium-700 text-slate-300"
            title="New Player"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GUESS MATRIX HEADER */}
      <div className="glass-panel p-4 rounded-3xl border border-emerald-500/20 shadow-2xl space-y-3">
        <div className="grid grid-cols-6 gap-2 text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">
          <span>Player</span>
          <span>Nation</span>
          <span>Pos</span>
          <span>Club</span>
          <span>Age</span>
          <span>Era</span>
        </div>

        {/* Guesses List */}
        <div className="space-y-2">
          {guesses.map((guess, idx) => (
            <WordGameGuessRow key={guess.player.id + idx} guess={guess} />
          ))}

          {/* Empty Placeholder Rows */}
          {Array.from({ length: attemptsLeft }).map((_, idx) => (
            <div key={'empty-' + idx} className="h-14 rounded-2xl bg-stadium-950/40 border border-slate-800/40 border-dashed" />
          ))}
        </div>
      </div>

      {/* Guess Input Trigger */}
      {!gameCompleted && (
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full py-4 px-6 rounded-2xl font-extrabold font-display text-base text-stadium-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-glow-emerald flex items-center justify-center gap-3 transition-all hover:scale-105"
        >
          <Search className="w-5 h-5" />
          <span>Enter Guess ({guesses.length + 1}/{maxGuesses})</span>
        </button>
      )}

      {/* Legend Key */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500" />
          <span>Exact Match</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-500" />
          <span>Close / Previous</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-700" />
          <span>Incorrect</span>
        </div>
      </div>

      {/* Search Modal */}
      <PlayerSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlayer={handleSelectPlayer}
        title="Guess Mystery Player"
      />

      {/* Completion Modal */}
      <GameCompletionModal
        isOpen={gameCompleted}
        isWin={isWin}
        score={isWin ? (maxGuesses - guesses.length + 1) * 100 : 0}
        title={isWin ? 'TAKE A BOW! ⚽' : 'GAME OVER'}
        subtitle={isWin ? `You identified ${target.name} in ${guesses.length} guesses!` : `The secret player was ${target.name}.`}
        onPlayAgain={handleResetGame}
        onGoHome={onGoHome}
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
