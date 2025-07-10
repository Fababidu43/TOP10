import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Users, RotateCcw, CheckCircle, XCircle, Crown, Target, Lightbulb, Shuffle } from 'lucide-react';
import { top10Categories, Top10Category, Top10Item, SagaChoice, getDrinksForRank, fuzzyMatch, getRandomCategory, detectSaga, isSagaInput } from '../data/top10Data';

interface Top10GameProps {
  onBack: () => void;
}

interface PlayerGuess {
  playerId: string;
  playerName: string;
  guess: string;
  isCorrect: boolean;
  foundItem?: Top10Item;
  drinks: number;
}

interface GameState {
  category: Top10Category | null;
  players: string[];
  currentRound: number;
  guesses: PlayerGuess[];
  foundItems: number[];
  gameComplete: boolean;
  showResults: boolean;
  currentPlayerIndex: number;
  hintsUsed: number;
  maxHints: number;
  excludedSagaItems: string[];
  showingSagaChoice: SagaChoice | null;
}

const Top10Game: React.FC<Top10GameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'setup' | 'category-select' | 'playing' | 'results'>('setup');
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<GameState>({
    category: null,
    players: [],
    currentRound: 0,
    guesses: [],
    foundItems: [],
    gameComplete: false,
    showResults: false,
    currentPlayerIndex: 0,
    hintsUsed: 0,
    maxHints: 3,
    excludedSagaItems: [],
    showingSagaChoice: null
  });
  const [currentGuess, setCurrentGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [showSagaWarning, setShowSagaWarning] = useState(false);

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const updatePlayer = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const startCategorySelection = () => {
    const validPlayers = players.filter(p => p.trim());
    if (validPlayers.length < 2) return;

    setGame({
      ...game,
      players: validPlayers
    });
    setGameState('category-select');
  };

  const selectCategory = (category: Top10Category) => {
    // Vérifier si c'est une catégorie avec des sagas/suites
    const sagaCategories = ['films-box-office', 'jeux-video-vendus', 'series-netflix'];
    if (sagaCategories.includes(category.id)) {
      setShowSagaWarning(true);
      setTimeout(() => setShowSagaWarning(false), 4000);
    }
    
    setGame({
      ...game,
      category,
      foundItems: [],
      guesses: [],
      currentRound: 0,
      gameComplete: false,
      showResults: false,
      currentPlayerIndex: 0,
      hintsUsed: 0
      ,
      excludedSagaItems: [],
      showingSagaChoice: null
    });
    setCurrentGuess('');
    setShowHint(false);
    setFeedback('');
    setGameState('playing');
  };

  const selectRandomCategory = () => {
    const randomCategory = getRandomCategory();
    selectCategory(randomCategory);
  };

  const submitGuess = () => {
    if (!game.category || !currentGuess.trim()) return;

    // D'abord, vérifier si c'est une saga
    const sagaChoice = detectSaga(currentGuess.trim(), [game.category]);
    if (sagaChoice && isSagaInput(currentGuess.trim())) {
      // Filtrer les éléments déjà exclus
      const availableItems = sagaChoice.availableItems.filter(item => 
        !game.excludedSagaItems.includes(item.name) && 
        !game.foundItems.includes(item.rank)
      );
      
      if (availableItems.length > 0) {
        setGame({ ...game, showingSagaChoice: { ...sagaChoice, availableItems } });
        setFeedback(`🎬 Plusieurs films ${sagaChoice.sagaName} sont dans le classement ! Choisissez lequel :`);
        return;
      }
    }

    const currentPlayer = game.players[game.currentPlayerIndex];
    let foundItem: Top10Item | undefined;
    let isCorrect = false;
    let drinks = 0;

    // Vérifier si la réponse correspond à un élément du top 10
    for (const item of game.category.items) {
      if (!game.foundItems.includes(item.rank) && 
          !game.excludedSagaItems.includes(item.name) &&
          fuzzyMatch(currentGuess.trim(), item.name, item.alternatives)) {
        foundItem = item;
        isCorrect = true;
        drinks = getDrinksForRank(item.rank);
        break;
      }
    }

    const newGuess: PlayerGuess = {
      playerId: currentPlayer,
      playerName: currentPlayer,
      guess: currentGuess.trim(),
      isCorrect,
      foundItem,
      drinks
    };

    const newFoundItems = isCorrect && foundItem 
      ? [...game.foundItems, foundItem.rank]
      : game.foundItems;

    const newGame = {
      ...game,
      guesses: [...game.guesses, newGuess],
      foundItems: newFoundItems,
      gameComplete: newFoundItems.length === 10,
      currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length
    };

    setGame(newGame);
    setCurrentGuess('');
    setShowHint(false); // Cache l'indice après soumission
    
    // Réinitialiser le choix de saga
    if (game.showingSagaChoice) {
      setGame(prev => ({ ...prev, showingSagaChoice: null }));
    }

    // Feedback pour le joueur
    if (isCorrect && foundItem) {
      setFeedback(`🎉 BRAVO ! "${foundItem.name}" était bien classé #${foundItem.rank} ! 🍺 Tu distribues ${drinks} gorgées aux autres joueurs !`);
    } else {
      setFeedback(`❌ Dommage ! "${currentGuess}" n'est pas dans ce top 10. 🍺 Tu bois 2 gorgées et on continue !`);
    }

    // Si tous les éléments sont trouvés, afficher les résultats
    if (newGame.gameComplete) {
      setTimeout(() => {
        setGameState('results');
      }, 2000);
    } else {
      // Effacer le feedback après 3 secondes
      setTimeout(() => {
        setFeedback('');
      }, 3000);
    }
  };

  const selectSagaItem = (selectedItem: Top10Item) => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    let isCorrect = false;
    let drinks = 0;

    // Vérifier si l'élément sélectionné est dans le top 10 et pas encore trouvé
    if (!game.foundItems.includes(selectedItem.rank)) {
      isCorrect = true;
      drinks = getDrinksForRank(selectedItem.rank);
    }

    const newGuess: PlayerGuess = {
      playerId: currentPlayer,
      playerName: currentPlayer,
      guess: selectedItem.name,
      isCorrect,
      foundItem: selectedItem,
      drinks
    };

    const newFoundItems = isCorrect 
      ? [...game.foundItems, selectedItem.rank]
      : game.foundItems;

    // Ajouter l'élément aux exclusions si c'est faux
    const newExcludedItems = !isCorrect 
      ? [...game.excludedSagaItems, selectedItem.name]
      : game.excludedSagaItems;

    const newGame = {
      ...game,
      guesses: [...game.guesses, newGuess],
      foundItems: newFoundItems,
      excludedSagaItems: newExcludedItems,
      gameComplete: newFoundItems.length === 10,
      currentPlayerIndex: (game.currentPlayerIndex + 1) % game.players.length,
      showingSagaChoice: null
    };

    setGame(newGame);
    setCurrentGuess('');
    setShowHint(false);

    // Feedback pour le joueur
    if (isCorrect) {
      setFeedback(`🎉 Excellent ! ${selectedItem.name} était #${selectedItem.rank} ! Tu distribues ${drinks} gorgées !`);
    } else {
      setFeedback(`❌ "${selectedItem.name}" n'est pas dans le top 10. Ce film est maintenant exclu pour les prochains tours. Tu bois 2 gorgées !`);
    }

    // Si tous les éléments sont trouvés, afficher les résultats
    if (newGame.gameComplete) {
      setTimeout(() => {
        setGameState('results');
      }, 2000);
    } else {
      // Effacer le feedback après 3 secondes
      setTimeout(() => {
        setFeedback('');
      }, 3000);
    }
  };

  const useHint = () => {
    if (game.hintsUsed >= game.maxHints || !game.category) return;
    
    setGame({ ...game, hintsUsed: game.hintsUsed + 1 });
    setShowHint(true);
    
    // L'indice reste visible jusqu'à ce que le joueur soumette une réponse
  };

  const getHint = () => {
    if (!game.category) return '';
    
    const remainingItems = game.category.items.filter(item => 
      !game.foundItems.includes(item.rank)
    );
    
    if (remainingItems.length === 0) return '';
    
    // Choisir un élément aléatoire parmi ceux non trouvés
    const randomItem = remainingItems[Math.floor(Math.random() * remainingItems.length)];
    
    // Système d'indices progressifs et utiles
    const getProgressiveHint = (item: Top10Item, category: Top10Category, hintLevel: number) => {
      const hints: string[] = [];
      
      // Niveau 1 : Indice général sur la catégorie
      if (hintLevel === 1) {
        switch (category.id) {
          case 'films-oscars':
            hints.push(`🎬 C'est un film qui a marqué l'histoire du cinéma`);
            hints.push(`🏆 Ce film a remporté de nombreuses récompenses`);
            hints.push(`🎭 Une œuvre cinématographique reconnue mondialement`);
            break;
          case 'films-cultes-francais':
            hints.push(`🇫🇷 C'est un film français que tout le monde connaît`);
            hints.push(`😂 Ce film fait partie de la culture populaire française`);
            hints.push(`🎪 Une comédie ou un film d'aventure français célèbre`);
            break;
          case 'series-netflix':
            hints.push(`📺 C'est une série qui a fait le buzz sur Netflix`);
            hints.push(`🌍 Cette série a été regardée dans le monde entier`);
            hints.push(`🔥 Un phénomène de société sur la plateforme`);
            break;
          case 'pays-population':
            hints.push(`🌍 C'est un pays avec énormément d'habitants`);
            hints.push(`🏙️ Un pays où vivent des centaines de millions de personnes`);
            hints.push(`📊 L'un des pays les plus peuplés au monde`);
            break;
          case 'jeux-video-vendus':
            hints.push(`🎮 C'est un jeu vidéo que presque tout le monde connaît`);
            hints.push(`💰 Un des jeux les plus vendus de l'histoire`);
            hints.push(`🌟 Un phénomène du jeu vidéo mondial`);
            break;
          case 'langues-parlees':
            hints.push(`🗣️ C'est une langue parlée par des millions de personnes`);
            hints.push(`🌍 Une des langues les plus importantes au monde`);
            hints.push(`📚 Une langue que vous avez sûrement déjà entendue`);
            break;
          case 'marques-valorisees':
            hints.push(`💼 C'est une marque que vous utilisez probablement`);
            hints.push(`🌟 Une entreprise connue dans le monde entier`);
            hints.push(`💰 Une des marques les plus précieuses au monde`);
            break;
          case 'sports-populaires':
            hints.push(`⚽ C'est un sport pratiqué par des millions de personnes`);
            hints.push(`🏟️ Un sport qu'on peut voir aux Jeux Olympiques`);
            hints.push(`📺 Un sport souvent diffusé à la télévision`);
            break;
          case 'youtubers-francais':
            hints.push(`📱 C'est un créateur de contenu français très populaire`);
            hints.push(`🎬 Un YouTubeur que les jeunes français connaissent`);
            hints.push(`🌟 Une personnalité du web français`);
            break;
          case 'artistes-spotify':
            hints.push(`🎵 C'est un artiste écouté dans le monde entier`);
            hints.push(`📻 Un chanteur/rappeur très populaire actuellement`);
            hints.push(`🎤 Une star de la musique internationale`);
            break;
          case 'jeux-mobiles':
            hints.push(`📱 C'est un jeu mobile très addictif`);
            hints.push(`🎮 Un jeu qu'on peut jouer partout sur son téléphone`);
            hints.push(`⭐ Un des jeux mobiles les plus téléchargés`);
            break;
          case 'rappeurs-francais':
            hints.push(`🎤 C'est un rappeur français très écouté`);
            hints.push(`🇫🇷 Une figure importante du rap français`);
            hints.push(`🎵 Un artiste hip-hop français populaire`);
            break;
        }
      }
      
      // Niveau 2 : Indice sur la position
      else if (hintLevel === 2) {
        if (item.rank === 1) {
          hints.push(`🥇 C'est le numéro 1 absolu de ce classement !`);
        } else if (item.rank <= 3) {
          hints.push(`🏆 C'est dans le podium (TOP 3) !`);
        } else if (item.rank <= 5) {
          hints.push(`🥉 C'est dans le TOP 5 du classement`);
        } else {
          hints.push(`📊 C'est dans la seconde moitié du TOP 10`);
        }
      }
      
      // Niveau 3 : Indice plus spécifique
      else if (hintLevel === 3) {
        switch (category.id) {
          case 'films-oscars':
            if (item.value?.includes('11 Oscars')) hints.push(`🏆 Ce film a remporté 11 Oscars !`);
            else if (item.value?.includes('10 Oscars')) hints.push(`🏆 Ce film a remporté 10 Oscars`);
            else if (item.value?.includes('9 Oscars')) hints.push(`🏆 Ce film a remporté 9 Oscars`);
            else if (item.value?.includes('8 Oscars')) hints.push(`🏆 Ce film a remporté 8 Oscars`);
            break;
          case 'films-cultes-francais':
            if (item.value?.includes('2011')) hints.push(`📅 Ce film est sorti en 2011`);
            else if (item.value?.includes('2001')) hints.push(`📅 Ce film est sorti en 2001`);
            else if (item.value?.includes('2008')) hints.push(`📅 Ce film est sorti en 2008`);
            else if (item.value?.includes('1993')) hints.push(`📅 Ce film est sorti dans les années 90`);
            break;
          case 'pays-population':
            if (item.value?.includes('milliard')) hints.push(`👥 Ce pays a plus d'un milliard d'habitants !`);
            else if (item.value?.includes('millions')) hints.push(`👥 Ce pays a plusieurs centaines de millions d'habitants`);
            break;
        }
        
        // Si pas d'indice spécifique, donner un indice sur la première lettre
        if (hints.length === 0) {
          hints.push(`🔤 Ça commence par la lettre "${item.name.charAt(0).toUpperCase()}"`);
        }
      }
      
      return hints;
    };
    
    // Utiliser le niveau d'indice basé sur le nombre d'indices utilisés
    const hintLevel = Math.min(game.hintsUsed + 1, 3);
    const availableHints = getProgressiveHint(randomItem, game.category, hintLevel);
    
    return availableHints.length > 0 
      ? availableHints[Math.floor(Math.random() * availableHints.length)]
      : `💡 Réfléchissez aux éléments les plus connus de cette catégorie !`;
  };

  const resetGame = () => {
    setGame({
      category: null,
      players: [],
      currentRound: 0,
      guesses: [],
      foundItems: [],
      gameComplete: false,
      showResults: false,
      currentPlayerIndex: 0,
      hintsUsed: 0,
      maxHints: 3,
      excludedSagaItems: [],
      showingSagaChoice: null
    });
    setPlayers(['']);
    setCurrentGuess('');
    setShowHint(false);
    setFeedback('');
    setGameState('setup');
  };

  const getRemainingItems = () => {
    if (!game.category) return [];
    return game.category.items.filter(item => !game.foundItems.includes(item.rank));
  };

  const getPlayerStats = () => {
    const stats = game.players.map(player => {
      const playerGuesses = game.guesses.filter(g => g.playerName === player);
      const correctGuesses = playerGuesses.filter(g => g.isCorrect);
      const totalDrinks = playerGuesses.reduce((sum, g) => sum + g.drinks, 0);
      
      return {
        name: player,
        correctGuesses: correctGuesses.length,
        totalGuesses: playerGuesses.length,
        totalDrinks,
        bestRank: correctGuesses.length > 0 
          ? Math.min(...correctGuesses.map(g => g.foundItem?.rank || 11))
          : null,
        accuracy: playerGuesses.length > 0 ? Math.round((correctGuesses.length / playerGuesses.length) * 100) : 0
      };
    });

    return stats.sort((a, b) => b.totalDrinks - a.totalDrinks);
  };

  if (gameState === 'setup') {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Retour aux jeux
        </button>

        <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-xl shadow-lg p-8 border border-orange-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Top 10
            </h1>
            <p className="text-gray-600">
              Devinez les éléments d'un classement et buvez selon votre performance !
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-orange-700">
              <Users size={20} />
              Joueurs ({players.filter(p => p.trim()).length})
            </h3>
            
            <div className="space-y-3">
              {players.map((player, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => updatePlayer(index, e.target.value)}
                    placeholder={`Joueur ${index + 1}`}
                    className="flex-1 px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/80"
                  />
                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="text-red-500 hover:text-red-700 px-2 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addPlayer}
              className="mt-3 text-orange-600 hover:text-orange-800 text-sm font-medium bg-orange-100 px-3 py-1 rounded-lg hover:bg-orange-200 transition-colors"
            >
              + Ajouter un joueur
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Comment jouer :</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Choisissez une catégorie de classement</li>
              <li>• À tour de rôle, devinez un élément du top 10</li>
              <li>• Plus votre réponse est bien classée, plus vous faites boire !</li>
              <li>• Top 1 = 15 gorgées, Top 2-5 = 6-12 gorgées, Top 6-10 = 2-4 gorgées</li>
              <li>• Utilisez les indices si vous êtes bloqués (3 maximum)</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startCategorySelection}
              disabled={players.filter(p => p.trim()).length < 2}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            >
              🎯 Choisir une catégorie
            </button>
            <button
              onClick={() => {
                const validPlayers = players.filter(p => p.trim());
                if (validPlayers.length >= 2) {
                  setGame({ ...game, players: validPlayers });
                  selectRandomCategory();
                }
              }}
              disabled={players.filter(p => p.trim()).length < 2}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 shadow-lg"
            >
              <Shuffle size={20} />
              Aléatoire
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'category-select') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-4 md:p-8 border border-blue-200">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Choisissez une catégorie
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Sélectionnez le type de classement que vous voulez deviner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {top10Categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => selectCategory(category)}
                className={`bg-gradient-to-r ${
                  index % 5 === 0 ? 'from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 border-purple-300' :
                  index % 5 === 1 ? 'from-green-100 to-teal-100 hover:from-green-200 hover:to-teal-200 border-green-300' :
                  index % 5 === 2 ? 'from-orange-100 to-red-100 hover:from-orange-200 hover:to-red-200 border-orange-300' :
                  index % 5 === 3 ? 'from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 border-pink-300' :
                  'from-yellow-100 to-orange-100 hover:from-yellow-200 hover:to-orange-200 border-yellow-300'
                } border-2 rounded-lg p-4 md:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-md hover:shadow-lg`}
              >
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mb-3">
                  {category.description}
                </p>
                <div className="text-xs md:text-sm text-purple-600 font-medium">
                  Cliquez pour jouer →
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={selectRandomCategory}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 md:px-8 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium flex items-center gap-2 mx-auto shadow-lg text-sm md:text-base"
            >
              <Shuffle size={20} />
              Catégorie aléatoire
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && game.category) {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const remainingItems = getRemainingItems();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Zone de jeu principale */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-lg p-4 md:p-8 border border-yellow-200">
              <div className="text-center mb-6">
                <div className="text-3xl md:text-4xl mb-4">🏆</div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {game.category.name}
                </h2>
                <p className="text-sm md:text-base text-gray-600 mb-4">
                  {game.category.description}
                </p>
                <div className="bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg p-2 md:p-3 border border-purple-300">
                  <p className="font-semibold text-purple-800 text-sm md:text-base">
                    🎯 Tour de {currentPlayer}
                  </p>
                </div>
              </div>

              {feedback && (
                <div className={`mb-6 p-4 rounded-lg text-center border-2 ${
                  feedback.includes('🎉') ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300' : 
                  'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-300'
                } text-base md:text-lg font-medium`}>
                  {feedback}
                </div>
              )}

              {showSagaWarning && (
                <div className="mb-6 p-3 md:p-4 bg-gradient-to-r from-blue-100 to-cyan-100 border-2 border-blue-300 rounded-lg animate-pulse">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xl md:text-2xl">ℹ️</div>
                    <span className="font-semibold text-blue-800 text-sm md:text-base">Information importante :</span>
                  </div>
                  <p className="text-blue-700 text-xs md:text-sm">
                    Attention ! Cette catégorie peut contenir plusieurs films d'une même saga ou franchise. 
                    Soyez précis dans vos réponses (ex: "Avatar 2009" plutôt que juste "Avatar", "Stranger Things 4" plutôt que "Stranger Things").
                  </p>
                </div>
              )}

              {showHint && (
                <div className="mb-6 p-3 md:p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb size={20} className="text-yellow-600" />
                    <span className="font-semibold text-yellow-800 text-sm md:text-base">Indice :</span>
                  </div>
                  <p className="text-yellow-700 font-medium text-sm md:text-base">{getHint()}</p>
                </div>
              )}

              {game.showingSagaChoice && (
                <div className="mb-6 p-3 md:p-4 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-xl md:text-2xl">🎬</div>
                    <span className="font-semibold text-purple-800 text-sm md:text-base">Choisissez le film {game.showingSagaChoice.sagaName} :</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {game.showingSagaChoice.availableItems.map((item) => (
                      <button
                        key={item.rank}
                        onClick={() => selectSagaItem(item)}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
                      >
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          ?
                        </span>
                        <div className="flex-1">
                          <div className="font-medium text-sm md:text-base text-purple-800">{item.name}</div>
                          <div className="text-xs text-purple-600">{item.value}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-purple-600">
                    💡 Attention : Si vous choisissez le mauvais film, il sera exclu pour les prochains tours et vous boirez 2 gorgées !
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm md:text-base font-bold text-gray-800 mb-3">
                  Votre réponse :
                </label>
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                  placeholder="Tapez votre réponse..."
                  className="w-full px-4 md:px-6 py-3 md:py-4 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-500/50 focus:border-orange-500 bg-white text-base md:text-lg font-medium shadow-lg"
                  onFocus={() => setShowHint(false)} // Cache l'indice quand on tape
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  onClick={submitGuess}
                  disabled={!currentGuess.trim() || game.showingSagaChoice !== null}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold shadow-xl text-base md:text-lg transform hover:scale-105"
                >
                  ✅ Valider la réponse
                </button>
                <button
                  onClick={useHint}
                  disabled={game.hintsUsed >= game.maxHints || game.showingSagaChoice !== null}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-xl hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold flex items-center justify-center gap-2 shadow-xl text-base md:text-lg transform hover:scale-105"
                >
                  <Lightbulb size={20} />
                  Indice ({game.maxHints - game.hintsUsed})
                </button>
              </div>

              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-2 md:p-3 border border-purple-200">
                  <span className="text-purple-800 font-bold text-base md:text-lg">
                    {game.foundItems.length}/10 éléments trouvés
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar avec les résultats */}
          <div className="space-y-6">
            {/* Progression */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-4 md:p-6 border border-purple-200">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
                <Target size={20} />
                Progression
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Trouvés</span>
                  <span>{game.foundItems.length}/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(game.foundItems.length / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Éléments trouvés */}
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg p-4 md:p-6 border border-green-200">
              <h3 className="text-base md:text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
                <Trophy size={20} className="text-yellow-500" />
                Éléments trouvés
              </h3>
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {game.category.items
                  .filter(item => game.foundItems.includes(item.rank))
                  .sort((a, b) => a.rank - b.rank)
                  .map((item) => (
                    <div key={item.rank} className="flex items-center gap-2 p-2 md:p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                        {item.rank}
                      </span>
                      <div className="flex-1">
                        <span className="text-xs md:text-sm font-medium">{item.name}</span>
                        {item.value && (
                          <div className="text-xs text-gray-500 hidden md:block">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Scores des joueurs */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg p-4 md:p-6 border border-orange-200">
              <h3 className="text-base md:text-lg font-semibold mb-4 text-orange-700">🏆 Scores</h3>
              <div className="space-y-2">
                {getPlayerStats().map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-2 md:p-3 rounded-lg border-2 ${
                    player.name === currentPlayer ? 'bg-gradient-to-r from-purple-200 to-pink-200 border-purple-400' : 
                    'bg-gray-100 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      {index === 0 && player.totalDrinks > 0 && <Crown size={16} className="text-yellow-500" />}
                      <span className={`font-medium text-sm md:text-base ${
                        player.name === currentPlayer ? 'text-purple-800' : 'text-gray-800'
                      }`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs md:text-sm font-bold text-purple-600">
                        {player.totalDrinks} 🍺
                      </div>
                      <div className="text-xs text-gray-500">
                        {player.correctGuesses}/{player.totalGuesses} ({player.accuracy}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results' && game.category) {
    const playerStats = getPlayerStats();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-lg p-4 md:p-8 border border-yellow-200">
          <div className="text-center mb-8">
            <div className="text-4xl md:text-6xl mb-4">🎉</div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
              Résultats
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Classement final pour : {game.category.name}
            </p>
          </div>

          {/* Classement des joueurs */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-700">
              <Crown size={20} className="text-yellow-500" />
              Classement des joueurs
            </h3>
            <div className="space-y-3">
              {playerStats.map((player, index) => (
                <div key={player.name} className={`p-3 md:p-4 rounded-lg border-l-4 ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-500' :
                  index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400' :
                  index === 2 ? 'bg-gradient-to-r from-orange-100 to-red-100 border-orange-400' :
                  'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg md:text-xl">#{index + 1}</span>
                        <span className="font-semibold text-sm md:text-base">{player.name}</span>
                        {index === 0 && <Crown size={16} className="text-yellow-500" />}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600">
                        {player.correctGuesses} bonnes réponses sur {player.totalGuesses} tentatives
                        {player.bestRank && ` • Meilleur rang: ${player.bestRank}`}
                        <span className="hidden md:inline">{` • Précision: ${player.accuracy}%`}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base md:text-lg font-bold text-purple-600">
                        {player.totalDrinks} 🍺
                      </div>
                      <div className="text-xs text-gray-500 hidden md:block">gorgées distribuées</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 10 complet */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">Top 10 complet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
              {game.category.items.map((item) => (
                <div key={item.rank} className={`p-2 md:p-3 rounded-lg flex items-center gap-2 md:gap-3 border-2 ${
                  game.foundItems.includes(item.rank) 
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300' 
                    : 'bg-gradient-to-r from-red-100 to-pink-100 border-red-300'
                }`}>
                  <span className={`rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold text-white flex-shrink-0 ${
                    game.foundItems.includes(item.rank) ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}>
                    {item.rank}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium text-xs md:text-sm">{item.name}</div>
                    {item.value && (
                      <div className="text-xs text-gray-500 hidden md:block">{item.value}</div>
                    )}
                  </div>
                  {game.foundItems.includes(item.rank) ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={16} className="text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-medium flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <RotateCcw size={20} />
              Nouvelle partie
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
            >
              <ArrowLeft size={20} />
              Retour aux jeux
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Top10Game;