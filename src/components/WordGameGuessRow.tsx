import React from 'react';
import type { WordGameGuess } from '../types';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { getNationalityFlagUrl, getClubLogoUrl } from '../utils/mediaUtils';

interface WordGameGuessRowProps {
  guess: WordGameGuess;
}

export const WordGameGuessRow: React.FC<WordGameGuessRowProps> = ({ guess }) => {
  const { player, feedback } = guess;

  const getPillStyle = (status: 'EXACT' | 'CONTINENT' | 'CATEGORY' | 'PREVIOUS' | 'HIGHER' | 'LOWER' | 'NONE') => {
    switch (status) {
      case 'EXACT':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-glow-emerald';
      case 'CONTINENT':
      case 'CATEGORY':
      case 'PREVIOUS':
      case 'HIGHER':
      case 'LOWER':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      default:
        return 'bg-slate-900/60 text-slate-400 border-slate-800';
    }
  };

  const currentClub = player.clubs[player.clubs.length - 1]?.clubName || 'Free Agent';
  const flagUrl = getNationalityFlagUrl(player.nationality);
  const clubLogoUrl = getClubLogoUrl(currentClub);

  return (
    <div className="grid grid-cols-6 gap-2 p-2 rounded-2xl bg-stadium-900/80 border border-slate-800/80 items-center animate-fadeIn text-center">
      
      {/* 1. Player & Image */}
      <div className="col-span-1 flex flex-col items-center justify-center">
        <img
          src={player.imageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80'}
          alt={player.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-700 mb-1"
        />
        <span className="text-[11px] font-bold text-white truncate max-w-full font-display">
          {player.name}
        </span>
      </div>

      {/* 2. Nationality with Flag Picture */}
      <div className={`p-2 rounded-xl border text-xs font-bold font-display flex flex-col items-center justify-center h-full gap-1 ${getPillStyle(feedback.nationality)}`}>
        <img src={flagUrl} alt={player.nationality} className="w-6 h-4 rounded object-cover shadow border border-slate-700/60" />
        <span className="truncate max-w-full text-[11px]">{player.nationality}</span>
      </div>

      {/* 3. Position */}
      <div className={`p-2.5 rounded-xl border text-xs font-bold font-display flex flex-col items-center justify-center h-full ${getPillStyle(feedback.position)}`}>
        <span className="text-[10px] opacity-75 uppercase tracking-wider font-sans font-normal">Pos</span>
        <span>{player.position}</span>
      </div>

      {/* 4. Club / Previous with Team Logo Picture */}
      <div className={`p-2 rounded-xl border text-xs font-bold font-display flex flex-col items-center justify-center h-full gap-1 ${getPillStyle(feedback.club)}`}>
        <img src={clubLogoUrl} alt={currentClub} className="w-5 h-5 object-contain filter drop-shadow" />
        <span className="truncate max-w-full text-[10px]">{currentClub}</span>
      </div>

      {/* 5. Age */}
      <div className={`p-2.5 rounded-xl border text-xs font-bold font-display flex items-center justify-center gap-1 h-full ${getPillStyle(feedback.age)}`}>
        <div className="flex flex-col items-center">
          <span className="text-[10px] opacity-75 uppercase tracking-wider font-sans font-normal">Age</span>
          <div className="flex items-center gap-0.5">
            <span>{player.age}</span>
            {feedback.age === 'HIGHER' && <ArrowUp className="w-3.5 h-3.5 text-amber-400 font-bold" />}
            {feedback.age === 'LOWER' && <ArrowDown className="w-3.5 h-3.5 text-amber-400 font-bold" />}
          </div>
        </div>
      </div>

      {/* 6. Era */}
      <div className={`p-2.5 rounded-xl border text-xs font-bold font-display flex flex-col items-center justify-center h-full ${getPillStyle(feedback.era)}`}>
        <span className="text-[10px] opacity-75 uppercase tracking-wider font-sans font-normal">Era</span>
        <span>{player.age > 35 ? 'Legend' : 'Modern'}</span>
      </div>

    </div>
  );
};
