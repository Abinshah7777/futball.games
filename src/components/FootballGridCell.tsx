import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { GridCell } from '../types';
import { getPlayerImageUrl } from '../utils/mediaUtils';

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
      className={`relative w-full aspect-square p-2.5 flex flex-col items-center justify-center transition-colors duration-150 border ${
        isValidated
          ? isCorrect
            ? 'bg-pitch-900 border-match-green animate-flash-green'
            : 'bg-referee-red/20 border-referee-red animate-shake'
          : 'bg-pitch-950 hover:bg-pitch-900 border-chalk-muted hover:border-match-green cursor-pointer group'
      }`}
    >


      {guessedPlayer ? (
        <div className="flex flex-col items-center text-center z-10 w-full">
          <div className="relative mb-1.5">
            <img
              src={getPlayerImageUrl(guessedPlayer)}
              alt={guessedPlayer.name}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 ${
                isCorrect ? 'border-emerald-400' : 'border-rose-400'
              } shadow-md`}
            />
            {isCorrect ? (
              <div className="absolute -bottom-1 -right-1 bg-match-green text-stadium-950 p-0.5 rounded-full">
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
        <div className="flex flex-col items-center text-center text-chalk-muted group-hover:text-match-green transition-colors">
          <span className="font-display text-xl sm:text-3xl font-black opacity-30 group-hover:opacity-100 mb-1">+</span>
          <span className="text-xs font-display tracking-widest text-chalk-muted group-hover:text-match-green">SELECT</span>
        </div>
      )}
    </button>
  );
};
