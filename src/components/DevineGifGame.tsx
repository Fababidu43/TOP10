import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Timer, CheckCircle, XCircle, Play } from 'lucide-react';

interface DevineGifGameProps {
  onBack: () => void;
}

interface GifItem {
  id: string;
  title: string;
  description: string;
  category: 'film' | 'tv' | 'meme';
  imageUrl: string;
  alternatives?: string[];
}

interface GameState {
  players: string[];
  currentPlayerIndex: number;
  currentGif: GifItem | null;
  timeLeft: number;
  isTimerRunning: boolean;
  scores: { [playerName: string]: number };
  gamePhase: 'setup' | 'playing' | 'waiting-answer';
}

// Base de données de GIFs français (simulée avec des descriptions)
const frenchGifs: GifItem[] = [
  {
    id: '1',
    title: 'Les Visiteurs',
    description: 'Scène culte : "C\'est quoi ce bordel ?"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    alternatives: ['visiteurs', 'jean reno', 'christian clavier']
  },
  {
    id: '2',
    title: 'OSS 117',
    description: 'Jean Dujardin qui fait son arrogant',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    alternatives: ['oss', 'jean dujardin', 'hubert bonisseur']
  },
  {
    id: '3',
    title: 'Kaamelott',
    description: 'Arthur qui soupire face à ses chevaliers',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    alternatives: ['kaamelott', 'arthur', 'alexandre astier']
  },
  {
    id: '4',
    title: 'Intouchables',
    description: 'Omar Sy qui rigole avec François Cluzet',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg',
    alternatives: ['intouchables', 'omar sy', 'françois cluzet']
  },
  {
    id: '5',
    title: 'Burger Quiz',
    description: 'Alain Chabat qui fait "Miam miam miam"',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    alternatives: ['burger quiz', 'alain chabat', 'miam']
  },
  {
    id: '6',
    title: 'La Cité de la Peur',
    description: 'Les Nuls : "Ça va couper chérie !"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    alternatives: ['cité de la peur', 'les nuls', 'couper chérie']
  },
  {
    id: '7',
    title: 'Koh-Lanta',
    description: 'Denis Brogniart qui annonce une épreuve',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    alternatives: ['koh lanta', 'denis brogniart', 'épreuve']
  },
  {
    id: '8',
    title: 'Astérix Mission Cléopâtre',
    description: 'Jamel qui dit "C\'est du brutal !"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg',
    alternatives: ['astérix', 'cléopâtre', 'jamel', 'brutal']
  },
  {
    id: '9',
    title: 'TPMP',
    description: 'Cyril Hanouna qui fait le fou',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181425/pexels-photo-1181425.jpeg',
    alternatives: ['tpmp', 'cyril hanouna', 'baba']
  },
  {
    id: '10',
    title: 'Le Dîner de Cons',
    description: 'Jacques Villeret qui fait l\'innocent',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181351/pexels-photo-1181351.jpeg',
    alternatives: ['dîner de cons', 'jacques villeret', 'cons']
  }
];

const DevineGifGame: React.FC<DevineGifGameProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    currentGif: null,
    timeLeft: 30,
    isTimerRunning: false,
    scores: {},
    gamePhase: 'setup'
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (game.isTimerRunning && game.timeLeft > 0) {
      interval = setInterval(() => {
        setGame(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (game.timeLeft === 0 && game.isTimerRunning) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [game.isTimerRunning, game.timeLeft]);

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

    const initialScores: { [key: string]: number } = {};
    validPlayers.forEach(player => {
      initialScores[player] = 0;
    });

    setGame({
      players: validPlayers,
      currentPlayerIndex: 0,
      currentGif: null,
      timeLeft: 30,
      isTimerRunning: false,
      scores: initialScores,
      gamePhase: 'playing'
    });

    startNewRound();
  };

  const startNewRound = () => {
    const randomGif = frenchGifs[Math.floor(Math.random() * frenchGifs.length)];
    setGame(prev => ({
      ...prev,
      currentGif: randomGif,
      timeLeft: 30,
      isTimerRunning: true,
      gamePhase: 'waiting-answer'
    }));
  };

  const handleCorrectAnswer = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer] += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
      gamePhase: 'playing'
    }));

    setTimeout(() => {
      nextPlayer();
    }, 2000);
  };

  const handleWrongAnswer = () => {
    setGame(prev => ({
      ...prev,
      isTimerRunning: false,
      gamePhase: 'playing'
    }));

    setTimeout(() => {
      nextPlayer();
    }, 2000);
  };

  const handleTimeUp = () => {
    setGame(prev => ({
      ...prev,
      isTimerRunning: false,
      gamePhase: 'playing'
    }));

    setTimeout(() => {
      nextPlayer();
    }, 2000);
  };

  const nextPlayer = () => {
    const nextIndex = (game.currentPlayerIndex + 1) % game.players.length;
    setGame(prev => ({
      ...prev,
      currentPlayerIndex: nextIndex
    }));
    startNewRound();
  };

  const resetGame = () => {
    setGame({
      players: [],
      currentPlayerIndex: 0,
      currentGif: null,
      timeLeft: 30,
      isTimerRunning: false,
      scores: {},
      gamePhase: 'setup'
    });
    setPlayers(['']);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'film': return '🎬';
      case 'tv': return '📺';
      case 'meme': return '😂';
      default: return '🎭';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'film': return 'Film';
      case 'tv': return 'TV';
      case 'meme': return 'Meme';
      default: return 'Autre';
    }
  };

  if (game.gamePhase === 'setup') {
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
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Devine le GIF</h1>
            <p className="text-gray-600">
              Devinez le contenu de GIFs issus de la culture française !
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
              <li>• Un joueur est tiré au sort pour chaque manche</li>
              <li>• Il a 30 secondes pour deviner le GIF affiché</li>
              <li>• Les autres valident si la réponse est correcte</li>
              <li>• Bonne réponse = distribue 4 gorgées</li>
              <li>• Mauvaise réponse = boit 3 gorgées</li>
              <li>• Temps écoulé = boit 5 gorgées</li>
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

  if (game.gamePhase === 'waiting-answer' && game.currentGif) {
    const currentPlayer = game.players[game.currentPlayerIndex];

    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de jeu principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-4xl">{getCategoryIcon(game.currentGif.category)}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Tour de {currentPlayer}
                    </h2>
                    <p className="text-gray-600">
                      Catégorie : {getCategoryName(game.currentGif.category)}
                    </p>
                  </div>
                </div>
                
                <div className={`text-3xl font-bold mb-4 ${
                  game.timeLeft <= 10 ? 'text-red-600' : 'text-purple-600'
                }`}>
                  <Timer size={24} className="inline mr-2" />
                  {game.timeLeft}s
                </div>
              </div>

              {/* Simulation du GIF avec une image */}
              <div className="bg-gray-100 rounded-lg p-8 mb-6 text-center">
                <img 
                  src={game.currentGif.imageUrl} 
                  alt="GIF à deviner" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-md mb-4"
                />
                <p className="text-gray-600 text-sm">
                  🎬 GIF en cours de lecture...
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  (Description pour la démo : {game.currentGif.description})
                </p>
              </div>

              <div className="text-center mb-6">
                <p className="text-lg font-medium text-gray-800 mb-4">
                  {currentPlayer}, devine ce GIF à voix haute !
                </p>
                <p className="text-sm text-gray-600">
                  Les autres joueurs valident ta réponse
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCorrectAnswer}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Bonne réponse
                </button>
                <button
                  onClick={handleWrongAnswer}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Mauvaise réponse
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar avec les scores */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🏆 Scores
              </h3>
              <div className="space-y-3">
                {Object.entries(game.scores)
                  .sort(([,a], [,b]) => b - a)
                  .map(([player, score], index) => (
                    <div key={player} className={`flex items-center justify-between p-2 rounded ${
                      player === currentPlayer ? 'bg-purple-100 border border-purple-300' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        {index === 0 && score > 0 && <span className="text-yellow-500">👑</span>}
                        <span className={`font-medium ${
                          player === currentPlayer ? 'text-purple-800' : 'text-gray-800'
                        }`}>
                          {player}
                        </span>
                      </div>
                      <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm font-bold">
                        {score}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3">🍺 Règles d'alcool</h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-700">✅ Bonne réponse : distribue 4 gorgées</p>
                <p className="text-red-700">❌ Mauvaise réponse : boit 3 gorgées</p>
                <p className="text-orange-700">⏰ Temps écoulé : boit 5 gorgées</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (game.gamePhase === 'playing') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Préparation du prochain tour
            </h2>
            <p className="text-gray-600">
              Passez l'appareil au joueur suivant...
            </p>
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

export default DevineGifGame;