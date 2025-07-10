import React from 'react';
import { Users, Clock, Star, Play } from 'lucide-react';
import { Game } from '../types';
import { difficulties } from '../data/games';

interface GameCardProps {
  game: Game;
  onSelect: (gameId: string) => void;
  onPlay?: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect, onPlay }) => {
  const difficulty = difficulties.find(d => d.id === game.difficulty);
  
  return (
    <article className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-orange-100 transform hover:scale-105" itemScope itemType="https://schema.org/Game">
      <div 
        className="p-6 md:p-8 h-full flex flex-col"
        onClick={() => onSelect(game.id)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onSelect(game.id)}
        aria-label={`Voir les détails du jeu ${game.title}`}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors" itemProp="name">
              {game.title}
            </h3>
            <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed" itemProp="description">
              {game.shortDescription}
            </p>
          </div>
          <div className="text-3xl md:text-4xl ml-4 md:ml-6">
            {game.category === 'expression' && '🎭'}
            {game.category === 'reflexion' && '🧠'}
            {game.category === 'creativite' && '🎨'}
            {game.category === 'ambiance' && '🎉'}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-6 mb-6 text-sm md:text-base text-gray-500">
          <div className="flex items-center gap-1">
            <Users size={14} className="md:w-4 md:h-4" />
            <span itemProp="numberOfPlayers">{game.players}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="md:w-4 md:h-4" />
            <span itemProp="timeRequired">{game.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="md:w-4 md:h-4" />
            <span className={difficulty?.color} itemProp="gameDifficulty">{difficulty?.name}</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-end">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 md:px-6 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all font-bold text-sm md:text-base shadow-lg"
              aria-label={`Voir les règles de ${game.title}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(game.id);
              }}
            >
              📖 Voir les règles
            </button>
            {game.interactive && onPlay && (
              <button 
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 md:px-6 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-bold flex items-center justify-center gap-2 text-sm md:text-base shadow-lg"
                aria-label={`Jouer à ${game.title} maintenant`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(game.id);
                }}
              >
                <Play size={14} className="md:w-4 md:h-4" />
                🎮 Jouer
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default GameCard;