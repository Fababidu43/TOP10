import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Send, RotateCcw, Crown } from 'lucide-react';
import { TelephoneGame as TelephoneGameType } from '../types';

interface TelephoneGameProps {
  onBack: () => void;
}

const TelephoneGame: React.FC<TelephoneGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'results'>('setup');
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<TelephoneGameType | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  const [showResults, setShowResults] = useState(false);

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

  const startGame = () => {
    const validPlayers = players.filter(p => p.trim());
    if (validPlayers.length < 3) return;

    const newGame: TelephoneGameType = {
      id: Date.now().toString(),
      players: validPlayers,
      rounds: [],
      currentRound: 0,
      currentPlayer: 0,
      isComplete: false,
      originalPhrase: ''
    };

    setGame(newGame);
    setGameState('playing');
  };

  const submitPhrase = () => {
    if (!game || !currentInput.trim()) return;

    const newRound = {
      id: Date.now().toString(),
      playerId: game.players[game.currentPlayer],
      playerName: game.players[game.currentPlayer],
      content: currentInput.trim(),
      type: 'phrase' as const
    };

    const updatedGame = {
      ...game,
      rounds: [...game.rounds, newRound],
      originalPhrase: game.rounds.length === 0 ? currentInput.trim() : game.originalPhrase
    };

    // Move to next player
    if (game.currentPlayer < game.players.length - 1) {
      updatedGame.currentPlayer = game.currentPlayer + 1;
    } else {
      updatedGame.isComplete = true;
      setGameState('results');
    }

    setGame(updatedGame);
    setCurrentInput('');
  };

  const resetGame = () => {
    setGame(null);
    setGameState('setup');
    setPlayers(['']);
    setCurrentInput('');
    setShowResults(false);
  };

  const getPreviousMessage = () => {
    if (!game || game.rounds.length === 0) return '';
    return game.rounds[game.rounds.length - 1].content;
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
            <div className="text-6xl mb-4">🎭</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Téléphone Arabe</h1>
            <p className="text-gray-600">
              Configurez votre partie en ajoutant les joueurs
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
              <li>• Le premier joueur écrit une phrase secrète</li>
              <li>• Chaque joueur suivant lit la phrase du précédent</li>
              <li>• Il la réécrit comme il l'a comprise</li>
              <li>• Découvrez comment la phrase a évolué !</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={players.filter(p => p.trim()).length < 3}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Commencer la partie
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && game) {
    const currentPlayerName = game.players[game.currentPlayer];
    const isFirstPlayer = game.currentPlayer === 0;
    const previousMessage = getPreviousMessage();

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tour de {currentPlayerName}
            </h2>
            <p className="text-gray-600">
              Joueur {game.currentPlayer + 1} sur {game.players.length}
            </p>
          </div>

          <div className="mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-purple-800 mb-2">
                {isFirstPlayer ? 'Écrivez la phrase de départ :' : 'Le joueur précédent a écrit :'}
              </h3>
              {!isFirstPlayer && (
                <p className="text-gray-700 font-medium bg-white rounded p-3 mb-3">
                  "{previousMessage}"
                </p>
              )}
              <p className="text-sm text-purple-700">
                {isFirstPlayer 
                  ? 'Soyez créatif ! Cette phrase va être transformée par les autres joueurs.'
                  : 'Réécrivez cette phrase comme vous l\'avez comprise.'
                }
              </p>
            </div>

            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={isFirstPlayer ? 'Écrivez votre phrase originale...' : 'Réécrivez la phrase...'}
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            onClick={submitPhrase}
            disabled={!currentInput.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
          >
            <Send size={20} />
            {isFirstPlayer ? 'Commencer le téléphone' : 'Passer au joueur suivant'}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'results' && game) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Résultats</h2>
            <p className="text-gray-600">
              Découvrez comment la phrase a évolué !
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {game.rounds.map((round, index) => (
              <div 
                key={round.id}
                className={`p-4 rounded-lg border-l-4 ${
                  index === 0 
                    ? 'bg-green-50 border-green-500' 
                    : index === game.rounds.length - 1
                    ? 'bg-red-50 border-red-500'
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-800">
                    {round.playerName}
                  </span>
                  {index === 0 && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Original
                    </span>
                  )}
                  {index === game.rounds.length - 1 && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Final
                    </span>
                  )}
                </div>
                <p className="text-gray-700 font-medium">
                  "{round.content}"
                </p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
              <Crown size={20} />
              Comparaison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-yellow-700 mb-1">Phrase originale :</p>
                <p className="font-medium text-gray-800">"{game.originalPhrase}"</p>
              </div>
              <div>
                <p className="text-sm text-yellow-700 mb-1">Phrase finale :</p>
                <p className="font-medium text-gray-800">"{game.rounds[game.rounds.length - 1].content}"</p>
              </div>
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

export default TelephoneGame;