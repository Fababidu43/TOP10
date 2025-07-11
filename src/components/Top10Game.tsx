import React, { useState, useEffect } from 'react';
import { ArrowLeft, Target, Lightbulb, XCircle, Trophy, Medal, Award } from 'lucide-react';
import { top10Categories, Top10Category, Top10Item, fuzzyMatch } from '../data/top10Data';

interface Top10GameProps {
  onBack: () => void;
}

interface GameState {
  currentSaga: Top10Category | null;
  foundItems: string[];
  currentGuess: string;
  hints: string[];
  gameStatus: 'playing' | 'completed' | 'abandoned';
  score: number;
}

const Top10Game: React.FC<Top10GameProps> = ({ onBack }) => {
  const [game, setGame] = useState<GameState>({
    currentSaga: null,
    foundItems: [],
    currentGuess: '',
    hints: [],
    gameStatus: 'playing',
    score: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const startGame = (category: string) => {
    const selectedCategory = top10Categories.find(cat => cat.id === category);
    if (selectedCategory) {
      setGame({
        currentSaga: selectedCategory,
        foundItems: [],
        currentGuess: '',
        hints: [],
        gameStatus: 'playing',
        score: 0,
      });
    }
  };

  const submitGuess = () => {
    if (!game.currentSaga || !game.currentGuess.trim()) return;

    const guess = game.currentGuess.toLowerCase().trim();
    const matchingItem = game.currentSaga.items.find((item: Top10Item) => 
      fuzzyMatch(guess, item.name, item.alternatives || [])
    );

    if (matchingItem && !game.foundItems.includes(matchingItem.name)) {
      const newFoundItems = [...game.foundItems, matchingItem.name];
      const newScore = game.score + (11 - matchingItem.rank) * 10;
      
      setGame(prev => ({
        ...prev,
        foundItems: newFoundItems,
        currentGuess: '',
        score: newScore,
        gameStatus: newFoundItems.length === game.currentSaga.items.length ? 'completed' : 'playing'
      }));
    } else {
      setGame(prev => ({ ...prev, currentGuess: '' }));
    }
  };

  const useHint = () => {
    if (!game.currentSaga) return;

    const unFoundItems = game.currentSaga.items.filter((item: Top10Item) => 
      !game.foundItems.includes(item.name)
    );
    
    if (unFoundItems.length > 0) {
      const randomItem = unFoundItems[Math.floor(Math.random() * unFoundItems.length)];
      const firstLetter = randomItem.name.charAt(0).toUpperCase();
      const hintText = `Une réponse commence par "${firstLetter}"`;
      
      setGame(prev => ({
        ...prev,
        hints: [...prev.hints, hintText]
      }));
    }
  };

  const abandonGame = () => {
    setGame(prev => ({
      ...prev,
      gameStatus: 'abandoned'
    }));
    
    // Transition vers les résultats après 2 secondes
    setTimeout(() => {
      setGame(prev => ({
        ...prev,
        gameStatus: 'completed'
      }));
    }, 2000);
  };

  const resetGame = () => {
    setGame({
      currentSaga: null,
      foundItems: [],
      currentGuess: '',
      hints: [],
      gameStatus: 'playing',
      score: 0,
    });
    setSelectedCategory('');
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-yellow-400';
    if (score >= 600) return 'text-orange-400';
    if (score >= 400) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 800) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (score >= 600) return <Medal className="w-6 h-6 text-orange-400" />;
    if (score >= 400) return <Award className="w-6 h-6 text-blue-400" />;
    return <Award className="w-6 h-6 text-gray-400" />;
  };

  // Écran de sélection de catégorie
  if (!game.currentSaga) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-medium">Retour</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              🏆 TOP 10 🏆
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Trouvez les 10 éléments du classement ! Plus vous trouvez rapidement, plus vous gagnez de points !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top10Categories.map((category) => (
              <button
                key={category.id}
                onClick={() => startGame(category.id)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {category.id.includes('films') && '🎬'}
                    {category.id.includes('series') && '📺'}
                    {category.id.includes('artistes') && '🎵'}
                    {category.id.includes('sports') && '⚽'}
                    {category.id.includes('youtubers') && '📱'}
                    {category.id.includes('jeux') && '🎮'}
                    {category.id.includes('pays') && '🌍'}
                    {category.id.includes('langues') && '🗣️'}
                    {category.id.includes('marques') && '💼'}
                    {category.id.includes('rappeurs') && '🎤'}
                    {!category.id.includes('films') && !category.id.includes('series') && !category.id.includes('artistes') && !category.id.includes('sports') && !category.id.includes('youtubers') && !category.id.includes('jeux') && !category.id.includes('pays') && !category.id.includes('langues') && !category.id.includes('marques') && !category.id.includes('rappeurs') && '🌟'}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 capitalize">
                    {category.name}
                  </h3>
                  <p className="text-purple-200 text-sm">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Écran de jeu
  if (game.gameStatus === 'playing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-medium">Retour</span>
            </button>
            
            <div className="flex items-center gap-6 text-white">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(game.score)}`}>
                  {game.score}
                </div>
                <div className="text-sm text-purple-200">Score</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              {game.currentSaga.name}
            </h2>
            <p className="text-purple-200 text-center mb-6">
              {game.currentSaga.description}
            </p>
            
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-white">
                {game.foundItems.length}/10
              </span>
              <span className="text-purple-200 ml-2">trouvés</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
              {Array.from({ length: 10 }, (_, i) => {
                const rank = i + 1;
                const item = game.currentSaga.items.find((item: Top10Item) => item.rank === rank);
                const isFound = item && game.foundItems.includes(item.name);
                
                return (
                  <div
                    key={rank}
                    className={`p-3 rounded-lg text-center transition-all ${
                      isFound 
                        ? 'bg-green-500/20 border-2 border-green-400' 
                        : 'bg-white/5 border border-white/20'
                    }`}
                  >
                    <div className="text-lg font-bold text-white">#{rank}</div>
                    {isFound && (
                      <div className="text-xs text-green-300 mt-1 break-words">
                        {item.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Affichage des indices */}
            {game.hints.length > 0 && (
              <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4 mb-4">
                <h4 className="text-yellow-300 font-semibold mb-2">💡 Indices :</h4>
                <div className="space-y-1">
                  {game.hints.map((hint, index) => (
                    <p key={index} className="text-yellow-200 text-sm">
                      • {hint}
                    </p>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <input
                type="text"
                value={game.currentGuess}
                onChange={(e) => setGame(prev => ({ ...prev, currentGuess: e.target.value }))}
                onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                placeholder="Tapez votre réponse..."
                className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={submitGuess}
                  disabled={!game.currentGuess.trim()}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <Target size={20} />
                  Valider
                </button>
                <button
                  onClick={useHint}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <Lightbulb size={20} />
                  Indice
                </button>
                <button
                  onClick={abandonGame}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <XCircle size={20} />
                  Abandonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran abandonné
  if (game.gameStatus === 'abandoned') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏳️</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Partie abandonnée !
            </h2>
            <p className="text-xl text-orange-200 mb-8">
              Voici toutes les réponses :
            </p>
            <div className="text-lg text-orange-300">
              Transition vers les résultats...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de résultats
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {getScoreIcon(game.score)}
            <h2 className="text-4xl font-bold text-white">
              {game.foundItems.length === 10 ? 'Parfait !' : 'Terminé !'}
            </h2>
          </div>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(game.score)}`}>
            {game.score} points
          </div>
          <p className="text-xl text-purple-200">
            {game.foundItems.length}/10 réponses trouvées
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {game.currentSaga.name} - Classement complet
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {game.currentSaga.items
              .sort((a: Top10Item, b: Top10Item) => a.rank - b.rank)
              .map((item: Top10Item) => {
                const isFound = game.foundItems.includes(item.name);
                return (
                  <div
                    key={item.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isFound 
                        ? 'bg-green-500/20 border-2 border-green-400' 
                        : 'bg-gray-500/20 border border-gray-400'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      isFound ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <span className="text-sm md:text-base font-medium text-white">
                        {item.name}
                      </span>
                      {item.value && (
                        <span className="text-xs text-purple-300 ml-2">
                          ({item.value})
                        </span>
                      )}
                    </div>
                    {isFound && (
                      <div className="text-green-400 font-bold">✓</div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium shadow-lg"
          >
            Nouvelle partie
          </button>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-8 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all font-medium shadow-lg"
          >
            Retour au menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top10Game;