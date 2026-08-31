import React from 'react';
import { Plus, CheckCircle2, XCircle } from 'lucide-react';
import type { GridCell } from '../types';

interface FootballGridCellProps {
  cell: GridCell;
  onClick: () => void;
  disabled?: boolean;
}

export const FootballGridCell: React.FC<FootballGridCellProps> = ({
  cell,
  onClick,
  disabled = false,
}) => {
  const { guessedPlayer, isCorrect, isValidated } = cell;

  return (
    <button
      onClick={onClick}
      disabled={disabled || (isValidated && isCorrect)}
      className={`relative w-full aspect-square rounded-2xl p-2.5 flex flex-col items-center justify-center transition-all duration-300 border overflow-hidden ${
        isValidated
          ? isCorrect
            ? 'bg-gradient-to-b from-pitch-900/90 to-stadium-950 border-emerald-500/80 shadow-glow-emerald'
            : 'bg-gradient-to-b from-rose-950/80 to-stadium-950 border-rose-500/60 animate-shake'
          : 'bg-stadium-900/70 hover:bg-pitch-950/70 border-slate-800 hover:border-emerald-500/40 cursor-pointer group'
      }`}
    >
      {/* Glow background accent if correct */}
      {isCorrect && (
        <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none blur-xl" />
      )}

      {guessedPlayer ? (
        <div className="flex flex-col items-center text-center z-10 w-full">
          <div className="relative mb-1.5">
            <img
              src={guessedPlayer.imageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100'}
              alt={guessedPlayer.name}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 ${
                isCorrect ? 'border-emerald-400' : 'border-rose-400'
              } shadow-md`}
            />
            {isCorrect ? (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-stadium-950 p-0.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 fill-current text-white" />
              </div>
            ) : (
              <div className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-0.5 rounded-full">
                <XCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1 font-display">
            {guessedPlayer.name}
          </h4>
          <span className="text-[10px] text-emerald-300 font-medium mt-0.5">
            {guessedPlayer.nationality}
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center text-slate-500 group-hover:text-emerald-400 transition-colors">
          <div className="w-9 h-9 rounded-full bg-stadium-800/80 group-hover:bg-pitch-900 flex items-center justify-center mb-1 transition-all group-hover:scale-110 border border-slate-700/50 group-hover:border-emerald-500/50">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold tracking-wide uppercase">Select Player</span>
        </div>
      )}
    </button>
  );
};
