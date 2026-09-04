import React, { useState } from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';
import type { GridCategory, GridCell, Player } from '../types';
import { INITIAL_GRID_CATEGORIES } from '../data/footballDatabase';
import { FootballGridCell } from '../components/FootballGridCell';
import { PlayerSearchModal } from '../components/PlayerSearchModal';
import { validatePlayerGridMatch } from '../services/playerService';
import { GameCompletionModal } from '../components/GameCompletionModal';
import { Toast } from '../components/Toast';
import { recordGameResult } from '../services/authService';
import { getNationalityFlagUrl, getClubLogoUrl } from '../utils/mediaUtils';

interface FootballGridPageProps {
  onGoHome: () => void;
  rows?: GridCategory[];
  cols?: GridCategory[];
  isDaily?: boolean;
}

export const FootballGridPage: React.FC<FootballGridPageProps> = ({
  onGoHome,
  rows: initialRows,
  cols: initialCols,
  isDaily = false
}) => {
  // Default Rows & Cols if not provided
  const rowCategories: GridCategory[] = initialRows || [
    INITIAL_GRID_CATEGORIES[0], // PSG
    INITIAL_GRID_CATEGORIES[1], // Arsenal
    INITIAL_GRID_CATEGORIES[10], // Argentina
  ];

  const colCategories: GridCategory[] = initialCols || [
    INITIAL_GRID_CATEGORIES[11], // Brazil
    INITIAL_GRID_CATEGORIES[2],  // Barcelona
    INITIAL_GRID_CATEGORIES[12], // France
  ];

  // Initialize 3x3 Grid Matrix State
  const [gridState, setGridState] = useState<GridCell[][]>(() => {
    return rowCategories.map((row, rIdx) =>
      colCategories.map((col, cIdx) => ({
        rowIndex: rIdx,
        colIndex: cIdx,
        rowCategory: row,
        colCategory: col,
        guessedPlayer: undefined,
        isCorrect: false,
        isValidated: false,
      }))
    );
  });

  const [activeCellIndex, setActiveCellIndex] = useState<{ r: number; c: number } | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(10);
  const [usedPlayerIds, setUsedPlayerIds] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const totalCells = 9;
  const correctCount = gridState.flat().filter(c => c.isCorrect).length;
  const completionPercentage = Math.round((correctCount / totalCells) * 100);

  const handleCellClick = (r: number, c: number) => {
    if (attemptsLeft <= 0 || gameCompleted) return;
    const currentCell = gridState[r][c];
    if (currentCell.isCorrect) return;

    setActiveCellIndex({ r, c });
  };

  const handleSelectPlayer = (player: Player) => {
    if (!activeCellIndex) return;

    const { r, c } = activeCellIndex;
    const cell = gridState[r][c];

    // 1. Check Duplicate Answer
    if (usedPlayerIds.has(player.id)) {
      setToastMessage({
        msg: `${player.name} has already been used in this grid!`,
        type: 'error'
      });
      return;
    }

    // 2. Validate Grid Match (Row & Col)
    const validation = validatePlayerGridMatch(player.id, cell.rowCategory, cell.colCategory);

    // Update Grid Cell
    const newGrid = [...gridState.map(row => [...row])];
    newGrid[r][c] = {
      ...cell,
      guessedPlayer: player,
      isCorrect: validation.isValid,
      isValidated: true,
    };

    setGridState(newGrid);
    setAttemptsLeft(prev => prev - 1);

    if (validation.isValid) {
      setUsedPlayerIds(prev => new Set(prev).add(player.id));
      setToastMessage({
        msg: `Correct! ${player.name} played for ${cell.rowCategory.name} & ${cell.colCategory.name}!`,
        type: 'success'
      });
    } else {
      setToastMessage({
        msg: `Incorrect! ${player.name} does not match both ${cell.rowCategory.name} and ${cell.colCategory.name}.`,
        type: 'error'
      });
    }

    // Check Win/Loss conditions
    const updatedCorrectCount = newGrid.flat().filter(cellItem => cellItem.isCorrect).length;
    const newAttempts = attemptsLeft - 1;

    if (updatedCorrectCount === totalCells || newAttempts <= 0) {
      const calculatedScore = updatedCorrectCount * 100 + newAttempts * 20;
      setFinalScore(calculatedScore);
      setGameCompleted(true);
      recordGameResult('grid', calculatedScore, updatedCorrectCount > 0);
    }
  };

  const handleResetGame = () => {
    setGridState(
      rowCategories.map((row, rIdx) =>
        colCategories.map((col, cIdx) => ({
          rowIndex: rIdx,
          colIndex: cIdx,
          rowCategory: row,
          colCategory: col,
          guessedPlayer: undefined,
          isCorrect: false,
          isValidated: false,
        }))
      )
    );
    setAttemptsLeft(10);
    setUsedPlayerIds(new Set());
    setGameCompleted(false);
    setFinalScore(0);
  };

  const renderCategoryMedia = (cat: GridCategory) => {
    if (cat.type === 'NATIONALITY') {
      const flagUrl = cat.flagUrl || getNationalityFlagUrl(cat.value);
      return (
        <img
          src={flagUrl}
          alt={cat.name}
          className="w-8 h-5 sm:w-10 sm:h-7 rounded object-cover shadow border border-chalk-muted mb-1"
        />
      );
    }
    const logoUrl = cat.logoUrl || getClubLogoUrl(cat.value);
    return (
      <img
        src={logoUrl}
        alt={cat.name}
        className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow mb-1"
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-none broadcast-panel border border-chalk-muted">
        <div>
          <h1 className="text-2xl font-black text-white font-display flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-match-green" />
            {isDaily ? "Daily Football Grid" : "Football Trivia Grid (3×3)"}
          </h1>
          <p className="text-xs text-chalk-muted">
            Find a footballer who satisfies both row and column category requirements
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-none bg-stadium-900 border border-chalk-muted text-xs font-bold text-chalk">
            Attempts Left: <span className="text-amber-400 text-sm font-black font-display ml-1">{attemptsLeft}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-none bg-pitch-950 border border-match-green/30 text-xs font-bold text-emerald-300">
            Score: <span className="text-match-green text-sm font-black font-display ml-1">{correctCount * 100}</span>
          </div>

          <button
            onClick={handleResetGame}
            className="p-2 rounded-none bg-stadium-800 hover:bg-stadium-700 text-chalk transition-colors"
            title="Restart Grid"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Progress Bar */}
      <div className="w-full bg-stadium-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-chalk-muted">
        <div
          className="bg-gradient-to-r from-pitch-500 to-emerald-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* 3x3 GRID DISPLAY */}
      <div className="bg-pitch-950 p-1 sm:p-2 border border-chalk-muted border-4">
        {/* Outer pitch border */}
        <div className="border border-chalk-muted/50 p-2 sm:p-4">
          <div className="grid grid-cols-4 gap-1 sm:gap-2 items-stretch text-center">
            
            {/* Top-Left Empty Corner */}
            <div className="p-2 bg-panel-900 border border-chalk-muted flex items-center justify-center">
              <span className="font-display font-black text-2xl text-match-green tracking-widest">F11</span>
            </div>

          {/* Column Headers */}
          {colCategories.map((col, cIdx) => (
            <div
              key={col.id + cIdx}
              className="p-2 sm:p-3 bg-panel-900 border border-chalk-muted flex flex-col items-center justify-center shadow-none"
            >
              {renderCategoryMedia(col)}
              <span className="text-sm font-bold text-chalk font-display line-clamp-1">
                {col.name}
              </span>
            </div>
          ))}

          {/* Grid Rows with Cells */}
          {gridState.map((rowCells, rIdx) => (
            <React.Fragment key={'row-' + rIdx}>
              {/* Row Header */}
              <div className="p-2 sm:p-3 bg-panel-900 border border-chalk-muted flex flex-col items-center justify-center shadow-none">
                {renderCategoryMedia(rowCategories[rIdx])}
                <span className="text-sm font-bold text-chalk font-display line-clamp-1">
                  {rowCategories[rIdx].name}
                </span>
              </div>

              {/* Row 3 Cells */}
              {rowCells.map((cell, cIdx) => (
                <FootballGridCell
                  key={`cell-${rIdx}-${cIdx}`}
                  cell={cell}
                  onClick={() => handleCellClick(rIdx, cIdx)}
                  disabled={attemptsLeft <= 0 || gameCompleted}
                />
              ))}
            </React.Fragment>
          ))}

          </div>
        </div>
      </div>

      {/* Player Search Modal Trigger */}
      {activeCellIndex && (
        <PlayerSearchModal
          isOpen={Boolean(activeCellIndex)}
          onClose={() => setActiveCellIndex(null)}
          onSelectPlayer={handleSelectPlayer}
          title={`Find Player: ${rowCategories[activeCellIndex.r].name} + ${colCategories[activeCellIndex.c].name}`}
          subtitle="Must have represented both entities in their career"
        />
      )}

      {/* Completion Modal */}
      <GameCompletionModal
        isOpen={gameCompleted}
        isWin={correctCount > 0}
        score={finalScore}
        title={correctCount === 9 ? 'PERFECT GRID! 🏆' : 'Grid Challenge Finished'}
        subtitle={`You successfully solved ${correctCount} of 9 cells in this football matrix.`}
        onPlayAgain={handleResetGame}
        onGoHome={onGoHome}
      />

      {/* Toast Notification */}
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
