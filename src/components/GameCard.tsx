import React from 'react';
import { ArrowRight, Sparkles, Trophy, Play } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  tagColor?: string;
  isDaily?: boolean;
  onPlay: (gameId: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  icon: Icon,
  tag,
  isDaily = false,
  onPlay,
}) => {
  return (
    <div className={`relative group broadcast-panel rounded-none border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      isDaily
        ? 'border-amber-500/40 bg-gradient-to-b from-stadium-900/90 via-stadium-950 to-pitch-950/60 shadow-glow-gold'
        : 'border-chalk-muted/80 hover:border-match-green/30 hover:shadow-glow-emerald'
    }`}>
      
      {/* Background Subtle Accent Effect */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-match-green/10 rounded-full blur-2xl group-hover:bg-match-green/20 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Header Tag & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3.5 rounded-none ${
            isDaily ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-pitch-900/60 text-match-green border border-match-green/30'
          }`}>
            <Icon className="w-7 h-7" />
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider ${
            isDaily
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
              : 'bg-pitch-950 text-match-green border border-match-green/30'
          }`}>
            {tag}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors font-display mb-2 flex items-center gap-2">
          {title}
          {isDaily && <Sparkles className="w-4 h-4 text-amber-400" />}
        </h3>
        
        <p className="text-sm text-chalk leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-chalk-muted/60 flex items-center justify-between">
        <span className="text-xs font-medium text-chalk-muted flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          Earn up to +500 PTS
        </span>

        <button
          onClick={() => onPlay(id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-none font-bold text-sm font-display transition-all duration-200 shadow-md ${
            isDaily
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stadium-950 shadow-glow-gold'
              : 'bg-gradient-to-r from-pitch-600 to-pitch-500 hover:from-pitch-500 hover:to-emerald-400 text-white shadow-glow-emerald'
          } group-hover:translate-x-0.5`}
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Play Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </div>
  );
};
