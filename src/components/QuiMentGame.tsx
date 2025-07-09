import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Eye, EyeOff, Vote, Crown } from 'lucide-react';

interface QuiMentGameProps {
  onBack: () => void;
}

interface GameSettings {
  players: string[];
  liarIndex: number;
  currentPhase: 'setup' | 'reveal-roles' | 'storytelling' | 'voting' | 'results';
  votes: { [playerId: string]: string };
  currentStorytellerIndex: number;
}

const anecdotePrompts = [
  "Racontez votre pire rendez-vous amoureux",
  "Décrivez la fois où vous avez eu le plus honte",
  "Parlez d'une fois où vous avez menti à vos parents",
  "Racontez votre plus grosse bêtise d'enfance",
  "Décrivez un moment où vous avez eu très peur",
  "Parlez d'une situation embarrassante au travail/école",
  "Racontez une fois où vous avez triché",
  "Décrivez votre plus belle rencontre inattendue",
  "Parlez d'un moment où vous avez été très en colère",
  "Racontez une expérience ratée en cuisine"
];

const QuiMentGame: React.FC<QuiMentGameProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<GameSettings>({
    players: [],
    liarIndex: -1,
    currentPhase: 'setup',
    votes: {},
    currentStorytellerIndex: 0
  });
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [showRole, setShowRole] = useState(false);
  const [currentPlayerForRole, setCurrentPlayerForRole] = useState(0);

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
    if (validPlayers.length < 4) return;

    const liarIndex = Math.floor(Math.random() * validPlayers.length);
    const prompt = anecdotePrompts[Math.floor(Math.random() * anecdotePrompts.length)];
    
    setGame({
      players: validPlayers,
      liarIndex,
      currentPhase: 'reveal-roles',
      votes: {},
      currentStorytellerIndex: 0
    });
    setCurrentPrompt(prompt);
    setCurrentPlayerForRole(0);
    setShowRole(false);
  };

  const nextPlayerRole = () => {
    if (currentPlayerForRole < game.players.length - 1) {
      setCurrentPlayerForRole(currentPlayerForRole + 1);
      setShowRole(false);
    } else {
      setGame({ ...game, currentPhase: 'storytelling' });
    }
  };

  const nextStoryteller = () => {
    if (game.currentStorytellerIndex < game.players.length - 1) {
      setGame({ 
        ...game, 
        currentStorytellerIndex: game.currentStorytellerIndex + 1 
      });
    } else {
      setGame({ ...game, currentPhase: 'voting' });
    }
  };

  const vote = (voterId: string, suspectId: string) => {
    const newVotes = { ...game.votes, [voterId]: suspectId };
    setGame({ ...game, votes: newVotes });
    
    if (Object.keys(newVotes).length === game.players.length) {
      setTimeout(() => {
        setGame({ ...game, votes: newVotes, currentPhase: 'results' });
      }, 1000);
    }
  };

  const getVoteResults = () => {
    const voteCounts: { [playerId: string]: number } = {};
    Object.values(game.votes).forEach(vote => {
      voteCounts[vote] = (voteCounts[vote] || 0) + 1;
    });
    
    const liarName = game.players[game.liarIndex];
    const mostVoted = Object.keys(voteCounts).reduce((a, b) => 
      voteCounts[a] > voteCounts[b] ? a : b
    );
    
    const liarFound = mostVoted === liarName;
    
    return { voteCounts, liarName, mostVoted, liarFound };
  };

  const resetGame = () => {
    setGame({
      players: [],
      liarIndex: -1,
      currentPhase: 'setup',
      votes: {},
      currentStorytellerIndex: 0
    });
    setPlayers(['']);
    setCurrentPrompt('');
    setShowRole(false);
    setCurrentPlayerForRole(0);
  };

  if (game.currentPhase === 'setup') {
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
            <div className="text-6xl mb-4">🕵️</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Qui Ment ?</h1>
            <p className="text-gray-600">
              Un joueur ment, les autres disent la vérité. Saurez-vous le démasquer ?
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
              <li>• Un joueur est secrètement désigné comme menteur</li>
              <li>• Chaque joueur raconte une anecdote sur le thème donné</li>
              <li>• Le menteur doit inventer, les autres disent la vérité</li>
              <li>• Tous votent pour identifier le menteur</li>
              <li>• Révélation et distribution des gorgées !</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={players.filter(p => p.trim()).length < 4}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Commencer la partie
          </button>
        </div>
      </div>
    );
  }

  if (game.currentPhase === 'reveal-roles') {
    const currentPlayer = game.players[currentPlayerForRole];
    const isLiar = currentPlayerForRole === game.liarIndex;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Révélation des rôles
            </h2>
            <p className="text-gray-600">
              {currentPlayer}, regardez votre rôle en privé
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-purple-800 mb-4 text-center">
              Thème de l'anecdote :
            </h3>
            <p className="text-lg font-medium text-center text-gray-800">
              "{currentPrompt}"
            </p>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={() => setShowRole(!showRole)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium flex items-center gap-2 mx-auto"
            >
              {showRole ? <EyeOff size={20} /> : <Eye size={20} />}
              {showRole ? 'Cacher le rôle' : 'Révéler mon rôle'}
            </button>
          </div>

          {showRole && (
            <div className={`rounded-lg p-6 mb-6 text-center ${
              isLiar ? 'bg-red-100 border border-red-300' : 'bg-green-100 border border-green-300'
            }`}>
              <div className="text-4xl mb-3">
                {isLiar ? '🤥' : '✅'}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                isLiar ? 'text-red-800' : 'text-green-800'
              }`}>
                {isLiar ? 'Tu es le MENTEUR !' : 'Tu dis la VÉRITÉ !'}
              </h3>
              <p className={`text-sm ${
                isLiar ? 'text-red-700' : 'text-green-700'
              }`}>
                {isLiar 
                  ? 'Invente une anecdote crédible sur ce thème'
                  : 'Raconte une anecdote vraie sur ce thème'
                }
              </p>
            </div>
          )}

          <button
            onClick={nextPlayerRole}
            disabled={!showRole}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {currentPlayerForRole < game.players.length - 1 ? 'Joueur suivant' : 'Commencer les anecdotes'}
          </button>
        </div>
      </div>
    );
  }

  if (game.currentPhase === 'storytelling') {
    const currentPlayer = game.players[game.currentStorytellerIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🎤</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Anecdotes
            </h2>
            <p className="text-gray-600">
              Joueur {game.currentStorytellerIndex + 1} sur {game.players.length}
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-purple-800 mb-2 text-center">
              Au tour de {currentPlayer}
            </h3>
            <p className="text-center text-gray-700 mb-4">
              Raconte ton anecdote sur :
            </p>
            <p className="text-lg font-medium text-center text-gray-800">
              "{currentPrompt}"
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm text-center">
              📢 {currentPlayer}, raconte ton anecdote à voix haute aux autres joueurs
            </p>
          </div>

          <button
            onClick={nextStoryteller}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium"
          >
            {game.currentStorytellerIndex < game.players.length - 1 ? 'Joueur suivant' : 'Passer au vote'}
          </button>
        </div>
      </div>
    );
  }

  if (game.currentPhase === 'voting') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🗳️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Phase de vote
            </h2>
            <p className="text-gray-600">
              Chaque joueur vote pour désigner le menteur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {game.players.map((voter, voterIndex) => (
              <div key={voterIndex} className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Vote size={20} />
                  Vote de {voter}
                </h3>
                
                {game.votes[voter] ? (
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <p className="text-green-800 font-medium">
                      A voté pour : {game.votes[voter]}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-3">
                      Qui penses-tu être le menteur ?
                    </p>
                    {game.players.map((suspect, suspectIndex) => (
                      <button
                        key={suspectIndex}
                        onClick={() => vote(voter, suspect)}
                        className="w-full text-left px-3 py-2 bg-white border border-gray-300 rounded hover:bg-purple-50 hover:border-purple-300 transition-colors"
                      >
                        {suspect}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Votes reçus : {Object.keys(game.votes).length}/{game.players.length}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (game.currentPhase === 'results') {
    const { voteCounts, liarName, mostVoted, liarFound } = getVoteResults();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Résultats</h2>
            <p className="text-gray-600">
              Découvrez qui était le menteur !
            </p>
          </div>

          <div className={`rounded-lg p-6 mb-8 text-center ${
            liarFound ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <div className="text-4xl mb-4">
              {liarFound ? '🎯' : '🤥'}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${
              liarFound ? 'text-green-800' : 'text-red-800'
            }`}>
              {liarFound ? 'Menteur démasqué !' : 'Le menteur s\'en sort !'}
            </h3>
            <p className={`text-lg ${
              liarFound ? 'text-green-700' : 'text-red-700'
            }`}>
              Le menteur était : <strong>{liarName}</strong>
            </p>
            <p className={`text-sm mt-2 ${
              liarFound ? 'text-green-600' : 'text-red-600'
            }`}>
              Joueur le plus suspecté : <strong>{mostVoted}</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Résultats des votes</h3>
              <div className="space-y-2">
                {Object.entries(voteCounts).map(([player, votes]) => (
                  <div key={player} className="flex justify-between items-center">
                    <span className={player === liarName ? 'font-bold text-red-600' : ''}>
                      {player}
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                      {votes} vote{votes > 1 ? 's' : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                🍺 Règles d'alcool
              </h3>
              <div className="space-y-2 text-sm">
                {liarFound ? (
                  <>
                    <p className="text-green-700">✅ Menteur démasqué :</p>
                    <p className="ml-4 text-gray-700">• {liarName} boit 5 gorgées</p>
                    <p className="text-red-700 mt-2">❌ Mauvais votes :</p>
                    {Object.entries(game.votes).map(([voter, vote]) => (
                      vote !== liarName && (
                        <p key={voter} className="ml-4 text-gray-700">
                          • {voter} boit 2 gorgées
                        </p>
                      )
                    ))}
                  </>
                ) : (
                  <p className="text-red-700">
                    🎭 Menteur non trouvé : tout le monde boit 3 gorgées !
                  </p>
                )}
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

export default QuiMentGame;