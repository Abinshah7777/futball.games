import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight } from 'lucide-react';
import type { Player } from '../types';
import { searchPlayers } from '../services/playerService';
import { getNationalityFlagUrl } from '../utils/mediaUtils';

interface PlayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (player: Player) => void;
  title?: string;
  subtitle?: string;
}

export const PlayerSearchModal: React.FC<PlayerSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlayer,
  title = 'Search Football Player',
  subtitle = 'Type player name, nationality, or club history'
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Player[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const matches = searchPlayers(query);
      setResults(matches);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stadium-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-emerald-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-stadium-900/90">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
              <Search className="w-5 h-5 text-emerald-400" />
              {title}
            </h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stadium-800 hover:bg-stadium-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stadium-950/50 border-b border-slate-800/60">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-emerald-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Messi, Ronaldo, Anelka, PSG..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-stadium-900 border border-slate-700 focus:border-emerald-400 text-white placeholder-slate-500 outline-none text-base transition-all font-sans"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Suggestions List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {query.trim().length === 0 ? (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-full bg-pitch-900/60 text-emerald-400 mx-auto flex items-center justify-center mb-3 border border-emerald-500/20">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300 font-semibold">Start typing to search players</p>
              <p className="text-xs text-slate-500 mt-1">Try "Mess", "Ronal", "Anel", "Zlat", "Di Maria"</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 px-4">
              <p className="text-sm text-amber-400 font-semibold">No matching players found</p>
              <p className="text-xs text-slate-400 mt-1">Check spelling or search by last name</p>
            </div>
          ) : (
            results.map((player) => {
              const flagUrl = getNationalityFlagUrl(player.nationality);
              return (
                <div
                  key={player.id}
                  onClick={() => {
                    onSelectPlayer(player);
                    onClose();
                  }}
                  className="group flex items-center justify-between p-3 rounded-xl bg-stadium-900/70 hover:bg-pitch-900/50 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={player.imageUrl || 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=100'}
                        alt={player.name}
                        className="w-12 h-12 rounded-xl object-cover border border-emerald-500/30 group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-stadium-950 text-[10px] font-bold text-emerald-400 border border-slate-700">
                        {player.position.slice(0, 2).toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-display flex items-center gap-2">
                        {player.name}
                        <img src={flagUrl} alt={player.nationality} className="w-5 h-3.5 rounded object-cover shadow border border-slate-700/60" />
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span className="font-medium text-slate-300">
                          {player.nationality}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">
                          {player.clubs.map(c => c.clubName).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-stadium-950 text-center text-xs text-slate-500">
          Showing up to 8 verified player entries
        </div>

      </div>
    </div>
  );
};
