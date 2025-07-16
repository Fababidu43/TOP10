import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Lightbulb, Flag, Beer, CheckCircle, XCircle } from 'lucide-react';
import { top10Categories, Top10Category, Top10Item, fuzzyMatch } from '../data/top10Data';

interface Top10GameProps {
  onBack: () => void;
}

const Top10Game: React.FC<Top10GameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'selecting' | 'playing' | 'finished'>('selecting');
  const [currentSaga, setCurrentSaga] = useState<Top10Category | null>(null);
  const [foundItems, setFoundItems] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [availableHints, setAvailableHints] = useState<{ [key: string]: string }>({});
  const [usedHints, setUsedHints] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<{type: 'correct' | 'incorrect', message: string} | null>(null);
  const [totalDrinksGiven, setTotalDrinksGiven] = useState(0);
  const [totalDrinksTaken, setTotalDrinksTaken] = useState(0);

  const startGame = (categoryId: string) => {
    const category = top10Categories.find(cat => cat.id === categoryId);
    if (category) {
      setCurrentSaga(category);
      setFoundItems([]);
      setUsedHints([]);
      setCurrentGuess('');
      setTotalDrinksGiven(0);
      setTotalDrinksTaken(0);
      
      // Préparer les indices (un par réponse)
      const hints: { [key: string]: string } = {};
      category.items.forEach(item => {
        if (item.hint) {
          hints[item.name] = item.hint;
        }
      });
      setAvailableHints(hints);
      
      setGameState('playing');
    }
  };

  const handleGuess = () => {
    if (!currentSaga || !currentGuess.trim()) return;

    const matchedItem = currentSaga.items.find(item => 
      fuzzyMatch(currentGuess.trim(), item.name)
    );

    if (matchedItem && !foundItems.includes(matchedItem.name)) {
      // Bonne réponse
      const newFoundItems = [...foundItems, matchedItem.name];
      setFoundItems(newFoundItems);
      
      // Calcul des gorgées à distribuer (plus le rang est élevé, plus on distribue)
      const drinksToGive = 17 - matchedItem.rank; // Top 1 = 16 gorgées, Top 10 = 7 gorgées
      setTotalDrinksGiven(prev => prev + drinksToGive);
      
      setShowPopup({
        type: 'correct',
        message: `🎉 BONNE RÉPONSE ! "${matchedItem.name}" était #${matchedItem.rank} ! Tu distribues ${drinksToGive} gorgées !`
      });

      // Vérifier si le jeu est terminé
      if (newFoundItems.length === 10) {
        setTimeout(() => {
          setGameState('finished');
          setShowPopup(null);
        }, 2000);
      } else {
        setTimeout(() => setShowPopup(null), 2000);
      }
    } else {
      // Mauvaise réponse
      setTotalDrinksTaken(prev => prev + 2);
      setShowPopup({
        type: 'incorrect',
        message: '❌ MAUVAISE RÉPONSE ! Tu bois 2 gorgées ! 🍺'
      });
      setTimeout(() => setShowPopup(null), 2000);
    }

    setCurrentGuess('');
  };

  const getHint = () => {
    if (!currentSaga) return;

    // Trouver les réponses non trouvées qui ont des indices disponibles
    const unfoundItemsWithHints = currentSaga.items.filter(item => 
      !foundItems.includes(item.name) && 
      availableHints[item.name] && 
      !usedHints.includes(item.name)
    );
    
    if (unfoundItemsWithHints.length === 0) return;

    const randomItem = unfoundItemsWithHints[Math.floor(Math.random() * unfoundItemsWithHints.length)];
    const hint = availableHints[randomItem.name];
    
    setUsedHints(prev => [...prev, randomItem.name]);
    
    setShowPopup({
      type: 'correct',
      message: `💡 INDICE : ${hint}`
    });
    
    setTimeout(() => setShowPopup(null), 3000);
  };

  const abandonGame = () => {
    setShowPopup({
      type: 'incorrect',
      message: '🏳️ Partie abandonnée ! Voici toutes les réponses :'
    });
    
    setTimeout(() => {
      setGameState('finished');
      setShowPopup(null);
    }, 2000);
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'films-nominations-oscars': return '🏆';
      case 'films-cultes-francais': return '🎬';
      case 'series-netflix': return '📺';
      case 'pays-population': return '🌍';
      case 'jeux-video-vendus': return '🎮';
      case 'langues-parlees': return '🗣️';
      case 'marques-valorisees': return '💰';
      case 'sports-populaires': return '⚽';
      case 'youtubers-francais': return '📹';
      case 'artistes-spotify': return '🎵';
      case 'jeux-mobiles': return '📱';
      case 'rappeurs-francais': return '🎤';
      case 'monuments-visites': return '🏛️';
      case 'animaux-dangereux': return '🦁';
      case 'villes-france-population': return '🏙️';
      case 'marques-voitures': return '🚗';
      case 'reseaux-sociaux-utilisateurs': return '📱';
      case 'plats-francais-populaires': return '🍽️';
      case 'super-heros-populaires': return '🦸';
      case 'festivals-musique-france': return '🎪';
      case 'desserts-francais': return '🍰';
      case 'inventions-francaises': return '💡';
      default: return '🎯';
    }
  };

  if (gameState === 'selecting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-pink-300 transition-colors text-lg font-semibold"
            >
              <ArrowLeft size={24} />
              Retour
            </button>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
              🏆 TOP 10 GAME 🏆
            </h1>
            <p className="text-xl text-purple-200 font-medium">
              Trouve les 10 réponses et distribue des gorgées ! 🍺
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top10Categories.map((category) => (
              <div
                key={category.id}
                onClick={() => startGame(category.id)}
                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-pink-400/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(category.id)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-purple-200 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-4">
                🎉 PARTIE TERMINÉE ! 🎉
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-500/20 rounded-xl p-4 border border-green-400/30">
                  <div className="text-2xl font-bold text-green-300">{foundItems.length}/10</div>
                  <div className="text-green-200">Trouvées</div>
                </div>
                <div className="bg-blue-500/20 rounded-xl p-4 border border-blue-400/30">
                  <div className="text-2xl font-bold text-blue-300">{totalDrinksGiven}</div>
                  <div className="text-blue-200">Gorgées distribuées</div>
                </div>
                <div className="bg-red-500/20 rounded-xl p-4 border border-red-400/30">
                  <div className="text-2xl font-bold text-red-300">{totalDrinksTaken}</div>
                  <div className="text-red-200">Gorgées bues</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                📋 LE TOP 10 COMPLET 📋
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentSaga?.items.map((item) => {
                  const isFound = foundItems.includes(item.name);
                  return (
                    <div
                      key={item.rank}
                      className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                        isFound 
                          ? 'bg-green-500/20 border border-green-400/50' 
                          : 'bg-red-500/20 border border-red-400/50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {isFound ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-white">#{item.rank}</span>
                          <span className={`font-semibold ${isFound ? 'text-green-300' : 'text-red-300'}`}>
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setGameState('selecting')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                🎮 Nouvelle Partie
              </button>
              <button
                onClick={onBack}
                className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                🏠 Menu Principal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const remainingHints = Object.keys(availableHints).filter(itemName => 
      !foundItems.includes(itemName) && !usedHints.includes(itemName)
    ).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900 p-4">
        {/* Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-gradient-to-br ${
              showPopup.type === 'correct' 
                ? 'from-green-500 to-emerald-600' 
                : 'from-red-500 to-rose-600'
            } p-8 rounded-3xl shadow-2xl max-w-md w-full text-center animate-bounce border-4 border-white/30`}>
              <div className="text-white text-xl font-bold leading-relaxed">
                {showPopup.message}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-white hover:text-pink-300 transition-colors text-lg font-semibold"
            >
              <ArrowLeft size={24} />
              Retour
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {currentSaga?.name}
              </h2>
            </div>
            <div></div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            {/* Description du top 10 */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 mb-6 border border-blue-400/30">
              <div className="text-center">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">{getCategoryIcon(currentSaga.id)}</span>
                  {currentSaga.name}
                </h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  {currentSaga.description}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-purple-500/20 rounded-xl p-4 text-center border border-purple-400/30">
                <div className="text-2xl font-bold text-purple-300">{foundItems.length}/10</div>
                <div className="text-purple-200 text-sm">Trouvées</div>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4 text-center border border-blue-400/30">
                <div className="text-2xl font-bold text-blue-300">{totalDrinksGiven}</div>
                <div className="text-blue-200 text-sm">Distribuées</div>
              </div>
              <div className="bg-red-500/20 rounded-xl p-4 text-center border border-red-400/30">
                <div className="text-2xl font-bold text-red-300">{totalDrinksTaken}</div>
                <div className="text-red-200 text-sm">Bues</div>
              </div>
              <div className="bg-yellow-500/20 rounded-xl p-4 text-center border border-yellow-400/30">
                <div className="text-2xl font-bold text-yellow-300">{remainingHints}</div>
                <div className="text-yellow-200 text-sm">Indices</div>
              </div>
            </div>

            {/* Grille des positions */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {Array.from({ length: 10 }, (_, i) => {
                const rank = i + 1;
                const item = currentSaga?.items.find((item: Top10Item) => item.rank === rank);
                const isFound = item && foundItems.includes(item.name);
                
                return (
                  <div
                    key={rank}
                    className={`p-4 rounded-xl text-center transition-all duration-300 ${
                      isFound 
                        ? 'bg-gradient-to-br from-green-500/30 to-emerald-500/30 border-2 border-green-400 shadow-lg shadow-green-500/25' 
                        : 'bg-white/5 border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-xl font-bold text-white mb-1">#{rank}</div>
                    {isFound && (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-xs text-green-300 font-medium break-words">
                          {item.name}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Zone de saisie */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
                  placeholder="Tape ta réponse ici... 🎯"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 backdrop-blur-sm text-lg font-medium"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleGuess}
                    disabled={!currentGuess.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    ✅ Valider
                  </button>
                  <button
                    onClick={getHint}
                    disabled={remainingHints === 0}
                    className="px-6 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-bold rounded-xl hover:from-yellow-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </button>
                  <button
                    onClick={abandonGame}
                    className="px-6 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Top10Game;