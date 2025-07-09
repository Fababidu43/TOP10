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
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Retour aux jeux
      </button>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              <p className="text-purple-100 text-lg">{game.description}</p>
            </div>
            <div className="text-6xl opacity-30">
              {game.category === 'expression' && '🎭'}
              {game.category === 'reflexion' && '🧠'}
              {game.category === 'creativite' && '🎨'}
              {game.category === 'ambiance' && '🎉'}
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6 text-purple-100">
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
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-purple-600" />
                <h3 className="text-xl font-semibold">Règles du jeu</h3>
              </div>
              <ol className="space-y-2">
                {game.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package size={20} className="text-purple-600" />
                <h3 className="text-xl font-semibold">Matériel nécessaire</h3>
              </div>
              <ul className="space-y-2">
                {game.materials.map((material, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{material}</span>
                  </li>
                ))}
              </ul>
              
              {game.variants && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-gray-800">Variantes</h4>
                  <ul className="space-y-2">
                    {game.variants.map((variant, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {variant}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {game.interactive && onPlay && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold mb-2 text-green-800">
                Jeu interactif disponible !
              </h3>
              <p className="text-green-700 mb-4">
                Vous pouvez jouer à ce jeu directement en ligne avec vos amis.
              </p>
              <button
                onClick={() => onPlay(game.id)}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium flex items-center gap-2"
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