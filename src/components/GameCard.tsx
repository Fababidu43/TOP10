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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div 
        className="p-4 md:p-6 h-full flex flex-col"
        onClick={() => onSelect(game.id)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
              {game.title}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-2">
              {game.shortDescription}
            </p>
          </div>
          <div className="text-xl md:text-2xl ml-2 md:ml-4">
            {game.category === 'expression' && '🎭'}
            {game.category === 'reflexion' && '🧠'}
            {game.category === 'creativite' && '🎨'}
            {game.category === 'ambiance' && '🎉'}
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 mb-4 text-xs md:text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users size={14} className="md:w-4 md:h-4" />
            <span>{game.players}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="md:w-4 md:h-4" />
            <span>{game.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="md:w-4 md:h-4" />
            <span className={difficulty?.color}>{difficulty?.name}</span>
          </div>
        </div>
        
        <div className="flex-1 flex items-end">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <button 
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-3 md:px-4 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(game.id);
              }}
            >
              Voir les règles
            </button>
            {game.interactive && onPlay && (
              <button 
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-3 md:px-4 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlay(game.id);
                }}
              >
                <Play size={14} className="md:w-4 md:h-4" />
                Jouer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;