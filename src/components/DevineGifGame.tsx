import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Timer, CheckCircle, XCircle, Trophy, Target, Play, Video } from 'lucide-react';
import { frenchGifs, GifItem, getCategoryIcon, getCategoryName, getCategoryColor } from '../data/devineGifData';

interface DevineGifGameProps {
  onBack: () => void;
}

interface GameState {
  players: string[];
  currentPlayerIndex: number;
  currentGif: GifItem | null;
  timeLeft: number;
  isTimerRunning: boolean;
  isPaused: boolean;
  scores: { [playerName: string]: { correct: number; wrong: number; timeout: number } };
  gamePhase: 'setup' | 'playing' | 'waiting-answer' | 'round-result' | 'video-playing';
  roundsPlayed: number;
  maxRounds: number;
  showVideo: boolean;
  usedGifIds: string[];
  shuffledGifs: GifItem[];
}

const DevineGifGame: React.FC<DevineGifGameProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    currentGif: null,
    timeLeft: 30,
    isTimerRunning: false,
    isPaused: false,
    scores: {},
    gamePhase: 'setup',
    roundsPlayed: 0,
    maxRounds: 10,
    showVideo: false,
    usedGifIds: [],
    shuffledGifs: []
  });
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | 'timeout' | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (game.isTimerRunning && !game.isPaused && game.timeLeft > 0) {
      interval = setInterval(() => {
        setGame(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (game.timeLeft === 0 && game.isTimerRunning && !game.isPaused) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [game.isTimerRunning, game.isPaused, game.timeLeft]);

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

    // Mélanger les GIFs au début du jeu
    const shuffled = [...frenchGifs].sort(() => Math.random() - 0.5);

    const initialScores: { [key: string]: { correct: number; wrong: number; timeout: number } } = {};
    validPlayers.forEach(player => {
      initialScores[player] = { correct: 0, wrong: 0, timeout: 0 };
    });

    setGame({
      players: validPlayers,
      currentPlayerIndex: 0,
      currentGif: null,
      timeLeft: 30,
      isTimerRunning: false,
      isPaused: false,
      scores: initialScores,
      gamePhase: 'playing',
      roundsPlayed: 0,
      maxRounds: Math.min(shuffled.length, validPlayers.length * 3),
      showVideo: false,
      usedGifIds: [],
      shuffledGifs: shuffled
    });

    startNewRound();
  };

  const startNewRound = () => {
    if (game.roundsPlayed >= game.maxRounds) {
      endGame();
      return;
    }

    // Prendre le prochain GIF dans la liste mélangée
    const availableGifs = game.shuffledGifs.filter(gif => 
      !game.usedGifIds.includes(gif.id)
    );
    
    if (availableGifs.length === 0) {
      endGame();
      return;
    }
    
    const nextGif = availableGifs[0];
    
    setGame(prev => ({
      ...prev,
      currentGif: nextGif,
      timeLeft: 30,
      isTimerRunning: true,
      isPaused: false,
      gamePhase: 'waiting-answer',
      showVideo: false,
      usedGifIds: [...prev.usedGifIds, nextGif.id]
    }));
    setLastResult(null);
  };

  const togglePause = () => {
    setGame(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }));
  };

  const handleCorrectAnswer = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer].correct += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
      isPaused: false,
      gamePhase: 'round-result',
      roundsPlayed: prev.roundsPlayed + 1
    }));

    setLastResult('correct');
    setTimeout(() => {
      nextPlayer();
    }, 3000);
  };

  const handleWrongAnswer = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer].wrong += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
      isPaused: false,
      gamePhase: 'round-result',
      roundsPlayed: prev.roundsPlayed + 1
    }));

    setLastResult('wrong');
    setTimeout(() => {
      nextPlayer();
    }, 3000);
  };

  const handleTimeUp = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer].timeout += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
      isPaused: false,
      gamePhase: 'round-result',
      roundsPlayed: prev.roundsPlayed + 1
    }));

    setLastResult('timeout');
    setTimeout(() => {
      nextPlayer();
    }, 3000);
  };

  const nextPlayer = () => {
    if (game.roundsPlayed >= game.maxRounds) {
      endGame();
      return;
    }

    const nextIndex = (game.currentPlayerIndex + 1) % game.players.length;
    setGame(prev => ({
      ...prev,
      currentPlayerIndex: nextIndex,
      isPaused: false,
      gamePhase: 'playing'
    }));
    
    setTimeout(() => {
      startNewRound();
    }, 1000);
  };

  const endGame = () => {
    setGame(prev => ({ ...prev, gamePhase: 'setup' }));
  };

  const resetGame = () => {
    setGame({
      players: [],
      currentPlayerIndex: 0,
      currentGif: null,
      timeLeft: 30,
      isTimerRunning: false,
      isPaused: false,
      scores: {},
      gamePhase: 'setup',
      roundsPlayed: 0,
      maxRounds: 10,
      showVideo: false,
      usedGifIds: [],
      shuffledGifs: []
    });
    setPlayers(['']);
    setLastResult(null);
  };

  const getTopPlayers = () => {
    return Object.entries(game.scores)
      .map(([name, scores]) => ({
        name,
        total: scores.correct * 3 - scores.wrong - scores.timeout * 2,
        correct: scores.correct,
        wrong: scores.wrong,
        timeout: scores.timeout
      }))
      .sort((a, b) => b.total - a.total);
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

        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-xl shadow-lg p-8 border border-purple-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Devine le GIF
            </h1>
            <p className="text-gray-600">
              Devinez le contenu de GIFs issus de la culture française !
            </p>
          </div>


          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-700">
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
                    className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80"
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
              className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium bg-purple-100 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors"
            >
              + Ajouter un joueur
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 mb-6 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Comment jouer :</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Un joueur est tiré au sort pour chaque manche</li>
              <li>• Il a 30 secondes pour deviner le GIF/vidéo affiché</li>
              <li>• Le lien YouTube est toujours disponible pour voir la vidéo</li>
              <li>• Bonne réponse = distribue 4 gorgées</li>
              <li>• Mauvaise réponse = boit 3 gorgées</li>
              <li>• Temps écoulé = boit 5 gorgées</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={players.filter(p => p.trim()).length < 3}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-lg shadow-lg"
          >
            🎬 Commencer la partie
          </button>
        </div>
      </div>
    );
  }

  if (game.gamePhase === 'video-playing' && game.currentGif) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-8 border border-green-300">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Bonne réponse !
            </h2>
          </div>

          <div className="text-center mb-6">
            <a 
              href={`https://www.youtube.com/watch?v=${game.currentGif.videoUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <Play size={24} className="text-white" />
              </div>
              🎬 Regarder la vidéo complète
            </a>
          </div>

          <div className="text-center text-green-600">
            <p>Passage au joueur suivant dans quelques secondes...</p>
          </div>
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
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-8 border border-purple-200">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-4xl">{getCategoryIcon(game.currentGif.category)}</div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Tour de {currentPlayer}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(game.currentGif.category)}`}>
                      {getCategoryName(game.currentGif.category)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className={`text-4xl font-bold ${
                    game.timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-purple-600'
                  }`}>
                    <Timer size={32} className="inline mr-2" />
                    {game.timeLeft}s
                  </div>
                  
                  <button
                    onClick={togglePause}
                    className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                      game.isPaused 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white' 
                        : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                    }`}
                  >
                    {game.isPaused ? (
                      <>
                        <Play size={16} />
                        Reprendre
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 flex gap-1">
                          <div className="w-1.5 h-4 bg-white rounded"></div>
                          <div className="w-1.5 h-4 bg-white rounded"></div>
                        </div>
                        Pause
                      </>
                    )}
                  </button>
                </div>
                
                {game.isPaused && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-4">
                    <p className="text-yellow-800 font-medium">⏸️ Jeu en pause</p>
                  </div>
                )}
              </div>

              {/* Miniature YouTube avec overlay */}
              <div className="bg-black rounded-lg mb-4 overflow-hidden relative">
                <div className="aspect-video relative">
                  <img 
                    src={game.currentGif.thumbnailUrl} 
                    alt="Miniature à deviner" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${game.currentGif.videoUrl}/default.jpg`;
                    }}
                  />
                  {/* Timer overlay */}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full font-bold">
                    {game.timeLeft}s
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-lg font-medium text-gray-800 mb-4">
                  {currentPlayer}, devine ce GIF/vidéo à voix haute !
                </p>
                <p className="text-sm text-gray-600">
                  Les autres joueurs valident ta réponse
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCorrectAnswer}
                  disabled={game.isPaused}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <CheckCircle size={20} />
                  Bonne réponse
                </button>
                <button
                  onClick={handleWrongAnswer}
                  disabled={game.isPaused}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 px-6 rounded-lg hover:from-red-600 hover:to-pink-600 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <XCircle size={20} />
                  Mauvaise réponse
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar avec les scores */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
                <Target size={20} />
                Progression
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Manche {game.roundsPlayed + 1}</span>
                  <span>{game.roundsPlayed + 1}/{game.maxRounds}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((game.roundsPlayed + 1) / game.maxRounds) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-xl shadow-lg p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700">
                🏆 Scores
              </h3>
              <div className="space-y-3">
                {getTopPlayers().map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-3 rounded-lg ${
                    player.name === currentPlayer ? 'bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-purple-400' : 'bg-gray-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      {index === 0 && player.total > 0 && <span className="text-yellow-500 text-xl">👑</span>}
                      <span className={`font-medium ${
                        player.name === currentPlayer ? 'text-purple-800' : 'text-gray-800'
                      }`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-purple-600">
                        {player.total} pts
                      </div>
                      <div className="text-xs text-gray-500">
                        {player.correct}✅ {player.wrong}❌ {player.timeout}⏰
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-300">
              <h3 className="font-semibold text-purple-800 mb-3">🍺 Règles d'alcool</h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-700 font-medium">✅ Bonne réponse : distribue 4 gorgées</p>
                <p className="text-red-700 font-medium">❌ Mauvaise réponse : boit 3 gorgées</p>
                <p className="text-orange-700 font-medium">⏰ Temps écoulé : boit 5 gorgées</p>
                <p className="text-blue-700 font-medium">🎬 Vidéo visible après chaque réponse !</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (game.gamePhase === 'round-result' && game.currentGif) {
    const currentPlayer = game.players[game.currentPlayerIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">
              {lastResult === 'correct' ? '🎉' : lastResult === 'wrong' ? '😅' : '⏰'}
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${
              lastResult === 'correct' ? 'text-green-600' : 
              lastResult === 'wrong' ? 'text-red-600' : 'text-orange-600'
            }`}>
              {lastResult === 'correct' ? 'Bonne réponse !' : 
               lastResult === 'wrong' ? 'Mauvaise réponse !' : 'Temps écoulé !'}
            </h2>
            <p className="text-gray-600">
              La réponse était : <strong>{game.currentGif.title}</strong>
            </p>
          </div>

          {/* Lien YouTube après la réponse */}
          <div className="text-center mb-6">
            <a 
              href={`https://www.youtube.com/watch?v=${game.currentGif.videoUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <Play size={24} className="text-white" />
              </div>
              🎬 Voir la vidéo complète
            </a>
          </div>

          <div className={`rounded-lg p-6 mb-6 text-center border-2 ${
            lastResult === 'correct' ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300' : 
            lastResult === 'wrong' ? 'bg-gradient-to-r from-red-100 to-pink-100 border-red-300' : 
            'bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300'
          }`}>
            <h3 className={`text-xl font-bold mb-2 ${
              lastResult === 'correct' ? 'text-green-800' : 
              lastResult === 'wrong' ? 'text-red-800' : 'text-orange-800'
            }`}>
              {currentPlayer}
            </h3>
            <p className={`text-lg ${
              lastResult === 'correct' ? 'text-green-700' : 
              lastResult === 'wrong' ? 'text-red-700' : 'text-orange-700'
            }`}>
              {lastResult === 'correct' ? '🎉 Distribue 4 gorgées aux autres joueurs !' : 
               lastResult === 'wrong' ? '🍺 Boit 3 gorgées !' : '⏰ Boit 5 gorgées !'}
            </p>
          </div>

          <div className="text-center text-gray-500">
            <p>Passage au joueur suivant...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DevineGifGame;