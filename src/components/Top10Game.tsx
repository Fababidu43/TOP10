import React, { useState, useEffect } from 'react';
import { ArrowLeft, Target, Lightbulb, XCircle, Trophy, Medal, Award, CheckCircle, AlertCircle, Beer } from 'lucide-react';
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
  lastGuessResult: 'correct' | 'wrong' | null;
  showResult: boolean;
}

const Top10Game: React.FC<Top10GameProps> = ({ onBack }) => {
  const [game, setGame] = useState<GameState>({
    currentSaga: null,
    foundItems: [],
    currentGuess: '',
    hints: [],
    gameStatus: 'playing',
    score: 0,
    lastGuessResult: null,
    showResult: false,
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
        lastGuessResult: null,
        showResult: false,
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
      const drinksToGive = getDrinksForRank(matchingItem.rank);
      
      setGame(prev => ({
        ...prev,
        foundItems: newFoundItems,
        currentGuess: '',
        score: newScore,
        gameStatus: newFoundItems.length === game.currentSaga.items.length ? 'completed' : 'playing',
        lastGuessResult: 'correct',
        showResult: true
      }));
      
      // Masquer le résultat après 3 secondes
      setTimeout(() => {
        setGame(prev => ({ ...prev, showResult: false, lastGuessResult: null }));
      }, 3000);
    } else {
      setGame(prev => ({ 
        ...prev, 
        currentGuess: '',
        lastGuessResult: 'wrong',
        showResult: true
      }));
      
      // Masquer le résultat après 3 secondes
      setTimeout(() => {
        setGame(prev => ({ ...prev, showResult: false, lastGuessResult: null }));
      }, 3000);
    }
  };

  const getDrinksForRank = (rank: number): number => {
    if (rank === 1) return 15;
    if (rank === 2) return 12;
    if (rank === 3) return 10;
    if (rank === 4) return 8;
    if (rank === 5) return 6;
    if (rank >= 6 && rank <= 8) return 4;
    if (rank >= 9 && rank <= 10) return 2;
    return 0;
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
      lastGuessResult: null,
      showResult: false,
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header avec style gaming */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={resetGame}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all"
            >
              <ArrowLeft size={24} />
              <span className="font-medium">Retour</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-center">
                <div className={`text-3xl font-bold ${getScoreColor(game.score)} drop-shadow-lg`}>
                  {game.score}
                </div>
                <div className="text-xs text-white/80 font-medium">SCORE</div>
              </div>
            </div>
          </div>

          {/* Zone de jeu principale avec style moderne */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 mb-6 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {game.currentSaga.name}
            </h2>
            <p className="text-white/80 text-center mb-8 text-lg">
              {game.currentSaga.description}
            </p>
            
            {/* Compteur avec style gaming */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-2xl px-8 py-4">
                <Trophy className="text-yellow-400" size={32} />
                <span className="text-5xl font-bold text-white drop-shadow-lg">
                  {game.foundItems.length}
                </span>
                <span className="text-2xl text-white/60">/</span>
                <span className="text-3xl font-bold text-white/80">10</span>
              </div>
              <p className="text-white/60 mt-2 font-medium">Réponses trouvées</p>
            </div>

            {/* Grille des positions avec animations */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-3 mb-8">
              {Array.from({ length: 10 }, (_, i) => {
                const rank = i + 1;
                const item = game.currentSaga.items.find((item: Top10Item) => item.rank === rank);
                const isFound = item && game.foundItems.includes(item.name);
                
                return (
                  <div
                    key={rank}
                    className={`relative p-4 rounded-xl text-center transition-all duration-500 transform hover:scale-105 ${
                      isFound 
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-green-300 shadow-lg shadow-green-500/25' 
                        : 'bg-white/10 border-2 border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className={`text-xl font-bold ${isFound ? 'text-white' : 'text-white/60'}`}>
                      #{rank}
                    </div>
                    {isFound && (
                      <>
                        <CheckCircle className="absolute -top-2 -right-2 text-white bg-green-500 rounded-full" size={20} />
                        <div className="text-xs text-white mt-2 break-words font-medium">
                          {item.name.length > 15 ? item.name.substring(0, 12) + '...' : item.name}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pop-up de résultat */}
            {game.showResult && (
              <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
                <div className={`bg-gradient-to-br ${
                  game.lastGuessResult === 'correct' 
                    ? 'from-green-400 to-emerald-500' 
                    : 'from-red-400 to-pink-500'
                } rounded-2xl p-8 text-white text-center shadow-2xl transform animate-bounce max-w-md w-full`}>
                  <div className="text-6xl mb-4">
                    {game.lastGuessResult === 'correct' ? '🎉' : '😅'}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {game.lastGuessResult === 'correct' ? 'BONNE RÉPONSE !' : 'MAUVAISE RÉPONSE !'}
                  </h3>
                  {game.lastGuessResult === 'correct' ? (
                    <div className="space-y-2">
                      <p className="text-lg font-medium">
                        Tu distribues {(() => {
                          const lastFound = game.foundItems[game.foundItems.length - 1];
                          const item = game.currentSaga.items.find(i => i.name === lastFound);
                          return item ? getDrinksForRank(item.rank) : 0;
                        })()} gorgées !
                      </p>
                      <Beer className="mx-auto text-white" size={32} />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-medium">Tu bois 2 gorgées !</p>
                      <Beer className="mx-auto text-white" size={32} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Zone d'input avec style gaming */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={game.currentGuess}
                  onChange={(e) => setGame(prev => ({ ...prev, currentGuess: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                  placeholder="Tape ta réponse ici... 🎯"
                  className="w-full p-6 rounded-2xl bg-white/10 border-2 border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-purple-400/50 focus:border-purple-400 text-xl font-medium backdrop-blur-sm"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Target className="text-white/40" size={24} />
                </div>
              </div>

              {/* Boutons avec style gaming */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={submitGuess}
                  disabled={!game.currentGuess.trim()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 border border-green-400/30"
                >
                  <CheckCircle size={24} />
                  VALIDER
                </button>
                <button
                  onClick={useHint}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 border border-yellow-400/30"
                >
                  <Lightbulb size={24} />
                  INDICE
                </button>
                <button
                  onClick={abandonGame}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 border border-red-400/30"
                >
                  <XCircle size={24} />
                  ABANDONNER
                </button>
              </div>
            </div>
          </div>

          {/* Zone des indices avec style moderne */}
          {game.hints.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/30 rounded-2xl p-6 backdrop-blur-sm">
              <h4 className="text-yellow-300 font-bold mb-4 flex items-center gap-2 text-lg">
                <Lightbulb size={24} />
                💡 Tes indices :
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {game.hints.map((hint, index) => (
                  <div key={index} className="bg-white/10 rounded-xl p-3 border border-yellow-400/20">
                    <p className="text-yellow-200 font-medium">
                      🔤 {hint}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Écran abandonné avec style dramatique
  if (game.gameStatus === 'abandoned') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-20">
            <div className="text-8xl mb-6 animate-bounce">🏳️</div>
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              PARTIE ABANDONNÉE !
            </h2>
            <p className="text-2xl text-orange-200 mb-8 font-medium">
              Voici toutes les réponses que tu as ratées...
            </p>
            <div className="text-xl text-orange-300 animate-pulse">
              Affichage des résultats dans 3 secondes...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran de résultats avec style gaming
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {getScoreIcon(game.score)}
            <h2 className="text-5xl font-bold text-white drop-shadow-lg">
              {game.foundItems.length === 10 ? 'PARFAIT ! 🔥' : 'TERMINÉ !'}
            </h2>
          </div>
          <div className={`text-7xl font-bold mb-6 ${getScoreColor(game.score)} drop-shadow-lg`}>
            {game.score} PTS
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block border border-white/20">
            <p className="text-2xl text-white font-bold">
              {game.foundItems.length}/10 réponses trouvées
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl p-8 mb-8 shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {game.currentSaga.name} - Classement complet
          </h3>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {game.currentSaga.items
              .sort((a: Top10Item, b: Top10Item) => a.rank - b.rank)
              .map((item: Top10Item) => {
                const isFound = game.foundItems.includes(item.name);
                const drinks = getDrinksForRank(item.rank);
                return (
                  <div
                    key={item.rank}
                    className={`flex items-center gap-6 p-6 rounded-xl transition-all ${
                      isFound 
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 shadow-lg' 
                        : 'bg-white/5 border-2 border-gray-400/30'
                    }`}
                  >
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl ${
                      isFound ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-500 text-white'
                    }`}>
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <span className="text-lg font-bold text-white">
                        {item.name}
                      </span>
                      {item.value && (
                        <span className="text-sm text-purple-300 ml-3 font-medium">
                          ({item.value})
                        </span>
                      )}
                      {isFound && (
                        <div className="text-green-300 text-sm mt-1 font-medium">
                          🍺 Tu as distribué {drinks} gorgées !
                        </div>
                      )}
                    </div>
                    {isFound && (
                      <div className="text-green-400 font-bold text-2xl">✓</div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-lg shadow-lg transform hover:scale-105 border border-purple-400/30"
          >
            🎮 REJOUER
          </button>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all font-bold text-lg shadow-lg transform hover:scale-105 border border-gray-400/30"
          >
            🏠 MENU PRINCIPAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Top10Game;
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