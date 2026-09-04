import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, ArrowRight, Award, CheckCircle } from 'lucide-react';

interface GameCompletionModalProps {
  isOpen: boolean;
  isWin: boolean;
  score: number;
  title: string;
  subtitle: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameCompletionModal: React.FC<GameCompletionModalProps> = ({
  isOpen,
  isWin,
  score,
  title,
  subtitle,
  onPlayAgain,
  onGoHome,
}) => {
  useEffect(() => {
    if (isOpen && isWin) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen, isWin]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pitch-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="w-full max-w-md broadcast-panel rounded-none p-6 border border-match-green/30 shadow-none text-center relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className={`absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl ${
          isWin ? 'bg-match-green/30' : 'bg-rose-500/20'
        }`} />

        {/* Icon Header */}
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4 border-2 shadow-none ${
          isWin
            ? 'bg-gradient-to-tr from-pitch-600 to-emerald-400 border-emerald-300 shadow-glow-emerald text-stadium-950'
            : 'bg-gradient-to-tr from-rose-900 to-rose-700 border-rose-400 text-white'
        }`}>
          {isWin ? <Trophy className="w-10 h-10 fill-current" /> : <Award className="w-10 h-10" />}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white font-display mb-1">
          {title}
        </h2>
        <p className="text-sm text-chalk mb-6">{subtitle}</p>

        {/* Score Card */}
        <div className="p-4 rounded-none bg-stadium-900/90 border border-chalk-muted mb-6 flex items-center justify-around">
          <div>
            <span className="text-xs text-chalk-muted uppercase font-semibold block">Points Earned</span>
            <span className="text-3xl font-black text-match-green font-display">+{score}</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-xs text-chalk-muted uppercase font-semibold block">Status</span>
            <span className={`text-base font-bold flex items-center gap-1 ${isWin ? 'text-match-green' : 'text-chalk'}`}>
              {isWin ? <CheckCircle className="w-4 h-4" /> : null}
              {isWin ? 'COMPLETED' : 'FINISHED'}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 px-4 rounded-none font-bold font-display text-white bg-gradient-to-r from-pitch-600 to-pitch-500 hover:from-pitch-500 hover:to-emerald-400 shadow-glow-emerald flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onGoHome}
            className="w-full py-3 px-4 rounded-none font-semibold text-chalk bg-stadium-900 hover:bg-stadium-800 border border-chalk-muted flex items-center justify-center gap-2 transition-colors"
          >
            <span>Return to Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
