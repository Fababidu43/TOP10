import React from 'react';
import { ArrowLeft, Users, Clock, Star, Play, BookOpen, Package } from 'lucide-react';
import { Game } from '../types';
import { difficulties } from '../data/games';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
  onPlay?: (gameId: string) => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ game, onBack, onPlay }) => {
  const difficulty = difficulties.find(d => d.id === game.difficulty);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Retour aux jeux
      </button>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-3">{game.title}</h1>
              <p className="text-orange-100 text-base md:text-lg leading-relaxed">{game.description}</p>
            </div>
            <div className="text-4xl md:text-6xl opacity-40 hidden sm:block">
              {game.category === 'expression' && '🎭'}
              {game.category === 'reflexion' && '🧠'}
              {game.category === 'creativite' && '🎨'}
              {game.category === 'ambiance' && '🎉'}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-orange-100">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>{game.players}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{game.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} />
              <span>{difficulty?.name}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <BookOpen size={20} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Règles du jeu</h3>
              </div>
              <ol className="space-y-4">
                {game.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1 shadow-lg">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed text-sm md:text-base">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <Package size={20} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">Matériel nécessaire</h3>
              </div>
              <ul className="space-y-3">
                {game.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-sm"></div>
                    <span className="text-gray-700 text-sm md:text-base">{material}</span>
                  </li>
                ))}
              </ul>
              
              {game.variants && (
                <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <span className="text-blue-600">🎲</span>
                    Variantes du jeu
                  </h4>
                  <ul className="space-y-2">
                    {game.variants.map((variant, index) => (
                      <li key={index} className="text-gray-600 text-sm leading-relaxed">
                        • {variant}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {game.interactive && onPlay && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-lg">
              <h3 className="text-lg md:text-xl font-bold mb-3 text-green-800 flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                Jeu interactif disponible !
              </h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Vous pouvez jouer à ce jeu directement en ligne avec vos amis.
              </p>
              <button
                onClick={() => onPlay(game.id)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-8 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-bold text-lg flex items-center gap-3 shadow-lg transform hover:scale-105"
              >
                <Play size={20} />
                Lancer le jeu interactif
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetail;