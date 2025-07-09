import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Users, RotateCcw, CheckCircle, XCircle, Crown } from 'lucide-react';
import { top10Categories, Top10Category, Top10Item, getDrinksForRank, fuzzyMatch } from '../data/top10Data';

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
    showResults: false
  });
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

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
    setGame({
      ...game,
      category,
      foundItems: [],
      guesses: [],
      currentRound: 0,
      gameComplete: false,
      showResults: false
    });
    setCurrentPlayerIndex(0);
    setGameState('playing');
  };

  const submitGuess = () => {
    if (!game.category || !currentGuess.trim()) return;

    const currentPlayer = game.players[currentPlayerIndex];
    let foundItem: Top10Item | undefined;
    let isCorrect = false;
    let drinks = 0;

    // Vérifier si la réponse correspond à un élément du top 10
    for (const item of game.category.items) {
      if (!game.foundItems.includes(item.rank) && 
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
      gameComplete: newFoundItems.length === 10
    };

    setGame(newGame);
    setCurrentGuess('');

    // Passer au joueur suivant
    setCurrentPlayerIndex((currentPlayerIndex + 1) % game.players.length);

    // Si tous les éléments sont trouvés, afficher les résultats
    if (newGame.gameComplete) {
      setTimeout(() => {
        setGameState('results');
      }, 1500);
    }
  };

  const resetGame = () => {
    setGame({
      category: null,
      players: [],
      currentRound: 0,
      guesses: [],
      foundItems: [],
      gameComplete: false,
      showResults: false
    });
    setPlayers(['']);
    setCurrentPlayerIndex(0);
    setCurrentGuess('');
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
          : null
      };
    });

    return stats.sort((a, b) => b.correctGuesses - a.correctGuesses);
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

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🏆</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Top 10</h1>
            <p className="text-gray-600">
              Devinez les éléments d'un classement et buvez selon votre performance !
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {players.length > 1 && (
                    <button
                      onClick={() => removePlayer(index)}
                      className="text-red-500 hover:text-red-700 px-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addPlayer}
              className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              + Ajouter un joueur
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Comment jouer :</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Choisissez une catégorie de classement</li>
              <li>• À tour de rôle, devinez un élément du top 10</li>
              <li>• Plus votre réponse est bien classée, plus vous faites boire !</li>
              <li>• Top 1 = 15 gorgées, Top 2-5 = 5-10 gorgées, Top 6-10 = 2-4 gorgées</li>
            </ul>
          </div>

          <button
            onClick={startCategorySelection}
            disabled={players.filter(p => p.trim()).length < 2}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Choisir une catégorie
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'category-select') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Choisissez une catégorie
            </h2>
            <p className="text-gray-600">
              Sélectionnez le type de classement que vous voulez deviner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {top10Categories.map((category) => (
              <div
                key={category.id}
                onClick={() => selectCategory(category)}
                className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 cursor-pointer hover:from-purple-100 hover:to-blue-100 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && game.category) {
    const currentPlayer = game.players[currentPlayerIndex];
    const remainingItems = getRemainingItems();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de jeu principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🏆</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {game.category.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {game.category.description}
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-3">
                  <p className="font-semibold text-purple-800">
                    Tour de {currentPlayer}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre réponse :
                </label>
                <input
                  type="text"
                  value={currentGuess}
                  onChange={(e) => setCurrentGuess(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                  placeholder="Tapez votre réponse..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={submitGuess}
                disabled={!currentGuess.trim()}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
              >
                Valider la réponse
              </button>

              <div className="mt-6 text-center text-sm text-gray-500">
                {game.foundItems.length}/10 éléments trouvés
              </div>
            </div>
          </div>

          {/* Sidebar avec les résultats */}
          <div className="space-y-6">
            {/* Éléments trouvés */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Trophy size={20} className="text-yellow-500" />
                Éléments trouvés
              </h3>
              <div className="space-y-2">
                {game.category.items
                  .filter(item => game.foundItems.includes(item.rank))
                  .sort((a, b) => a.rank - b.rank)
                  .map((item) => (
                    <div key={item.rank} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {item.rank}
                      </span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Dernières tentatives */}
            {game.guesses.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Dernières tentatives</h3>
                <div className="space-y-2">
                  {game.guesses.slice(-5).reverse().map((guess, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded">
                      {guess.isCorrect ? (
                        <CheckCircle size={16} className="text-green-500" />
                      ) : (
                        <XCircle size={16} className="text-red-500" />
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium">{guess.playerName}</div>
                        <div className="text-xs text-gray-500">{guess.guess}</div>
                      </div>
                      {guess.isCorrect && (
                        <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                          {guess.drinks} 🍺
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results' && game.category) {
    const playerStats = getPlayerStats();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Résultats</h2>
            <p className="text-gray-600">
              Classement final pour : {game.category.name}
            </p>
          </div>

          {/* Classement des joueurs */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Crown size={20} className="text-yellow-500" />
              Classement des joueurs
            </h3>
            <div className="space-y-3">
              {playerStats.map((player, index) => (
                <div key={player.name} className={`p-4 rounded-lg border-l-4 ${
                  index === 0 ? 'bg-yellow-50 border-yellow-500' :
                  index === 1 ? 'bg-gray-50 border-gray-400' :
                  index === 2 ? 'bg-orange-50 border-orange-400' :
                  'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">#{index + 1}</span>
                        <span className="font-semibold">{player.name}</span>
                        {index === 0 && <Crown size={16} className="text-yellow-500" />}
                      </div>
                      <div className="text-sm text-gray-600">
                        {player.correctGuesses} bonnes réponses sur {player.totalGuesses} tentatives
                        {player.bestRank && ` • Meilleur rang: ${player.bestRank}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        {player.totalDrinks} 🍺
                      </div>
                      <div className="text-xs text-gray-500">gorgées distribuées</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 10 complet */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Top 10 complet</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {game.category.items.map((item) => (
                <div key={item.rank} className={`p-3 rounded-lg flex items-center gap-3 ${
                  game.foundItems.includes(item.rank) 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <span className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-white ${
                    game.foundItems.includes(item.rank) ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {item.rank}
                  </span>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    {item.value && (
                      <div className="text-xs text-gray-500">{item.value}</div>
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

          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Nouvelle partie
            </button>
            <button
              onClick={onBack}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all font-medium flex items-center justify-center gap-2"
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