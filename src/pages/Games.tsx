import React from 'react';
import { Gamepad2, Trophy, Flame, Sparkles, HelpCircle } from 'lucide-react';
import { GameCard } from '../components/GameCard';

interface GamesProps {
  onSelectGame: (gameId: string) => void;
}

export const Games: React.FC<GamesProps> = ({ onSelectGame }) => {
  return (
    <div className="space-y-10 sm:space-y-12 pb-16 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white font-display">
          Football <span className="text-match-green">Game Arena</span>
        </h1>
        <p className="text-sm sm:text-base text-chalk">
          Select a football game mode to test your knowledge of player careers, club transfers, nationalities, and historical stats.
        </p>
      </div>

      {/* Grid of Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <GameCard
          id="daily"
          title="Daily Challenge"
          description="A new synchronized football puzzle every 24 hours. Includes a 3x3 Grid, Player Connection, and Word Game target player!"
          icon={Flame}
          tag="Daily Puzzle"
          isDaily={true}
          onPlay={onSelectGame}
        />

        <GameCard
          id="grid"
          title="Football Grid (3x3)"
          description="The ultimate 3×3 football matrix. Enter valid footballers matching row & column categories like PSG + Argentina, or Chelsea + Juventus."
          icon={Gamepad2}
          tag="3x3 Matrix"
          onPlay={onSelectGame}
        />

        <GameCard
          id="connection"
          title="Player Connection"
          description="Display two football entities (e.g., Arsenal + PSG or Argentina + Barcelona). Enter a player who played for or represents both!"
          icon={Trophy}
          tag="Dual Entity"
          onPlay={onSelectGame}
        />

        <GameCard
          id="word"
          title="Football Word Game (Footle)"
          description="Secret mystery player guessing game. Get color-coded feedback on Nation, Position, Club, Age, and Era after every guess!"
          icon={Sparkles}
          tag="Attribute Match"
          onPlay={onSelectGame}
        />
      </div>

      {/* Rules Notice */}
      <div className="max-w-3xl mx-auto rounded-none broadcast-panel border border-chalk-muted space-y-3">
        <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-match-green" />
          Official Football11 Rules
        </h3>
        <ul className="text-xs text-chalk space-y-1.5 list-disc pl-5">
          <li>A player cannot be used twice in the same 3x3 grid.</li>
          <li>Answers are validated strictly against verified club transfer databases and national team caps.</li>
          <li>Autocomplete suggests valid players with alias normalization (e.g. PSG matches Paris Saint-Germain).</li>
          <li>Daily challenge streaks increase by completing at least one game mode daily.</li>
        </ul>
      </div>

    </div>
  );
};
