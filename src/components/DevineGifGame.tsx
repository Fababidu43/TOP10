import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Timer, CheckCircle, XCircle, Trophy, Target, Play, Video } from 'lucide-react';

interface DevineGifGameProps {
  onBack: () => void;
}

interface GifItem {
  id: string;
  title: string;
  description: string;
  category: 'tiktok' | 'youtube' | 'tv' | 'meme';
  imageUrl: string;
  videoUrl?: string;
  alternatives?: string[];
  hint?: string;
}

interface GameState {
  players: string[];
  currentPlayerIndex: number;
  currentGif: GifItem | null;
  timeLeft: number;
  isTimerRunning: boolean;
  scores: { [playerName: string]: { correct: number; wrong: number; timeout: number } };
  gamePhase: 'setup' | 'playing' | 'waiting-answer' | 'round-result' | 'video-playing';
  roundsPlayed: number;
  maxRounds: number;
  showVideo: boolean;
}

// Base de données étendue de GIFs/vidéos virales françaises
const frenchGifs: GifItem[] = [
  // TikTok/Réseaux sociaux
  {
    id: '1',
    title: 'Ah vous êtes sûrement pas français',
    description: 'Vidéo TikTok virale d\'un homme qui teste les français',
    category: 'tiktok',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    alternatives: ['vous etes surement pas francais', 'pas francais', 'test francais'],
    hint: 'Vidéo TikTok récente qui teste la nationalité'
  },
  {
    id: '2',
    title: 'Mais tu es grosse Mélissande',
    description: 'Réplique culte devenue meme',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    alternatives: ['grosse melissande', 'melissande', 'tu es grosse'],
    hint: 'Réplique devenue virale sur les réseaux'
  },
  {
    id: '3',
    title: 'Wesh alors',
    description: 'Meme français populaire',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg',
    alternatives: ['wesh', 'wesh alors meme'],
    hint: 'Expression française devenue meme'
  },
  {
    id: '4',
    title: 'Bonjour madame',
    description: 'Vidéo TikTok du livreur poli',
    category: 'tiktok',
    imageUrl: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg',
    alternatives: ['bonjour madame livreur', 'livreur poli', 'madame bonjour'],
    hint: 'Livreur très poli devenu viral'
  },
  {
    id: '5',
    title: 'C\'est pas possible',
    description: 'Réaction française classique',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    alternatives: ['pas possible', 'c est pas possible'],
    hint: 'Expression française d\'incrédulité'
  },
  {
    id: '6',
    title: 'Oskour',
    description: 'Expression internet française',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181351/pexels-photo-1181351.jpeg',
    alternatives: ['oskour meme', 'au secours'],
    hint: 'Déformation d\'une expression de détresse'
  },
  {
    id: '7',
    title: 'Ratio',
    description: 'Terme des réseaux sociaux français',
    category: 'tiktok',
    imageUrl: 'https://images.pexels.com/photos/1181234/pexels-photo-1181234.jpeg',
    alternatives: ['ratio twitter', 'ratio tiktok'],
    hint: 'Terme utilisé pour surpasser un commentaire'
  },
  {
    id: '8',
    title: 'Ça va pas la tête',
    description: 'Expression française populaire',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181445/pexels-photo-1181445.jpeg',
    alternatives: ['ca va pas la tete', 'pas la tete'],
    hint: 'Expression pour dire que quelqu\'un est fou'
  },

  // YouTube France
  {
    id: '9',
    title: 'Salut les terriens',
    description: 'Intro de Cyprien',
    category: 'youtube',
    imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    alternatives: ['cyprien salut terriens', 'cyprien intro'],
    hint: 'Phrase d\'intro d\'un YouTubeur français célèbre'
  },
  {
    id: '10',
    title: 'Coucou les amis',
    description: 'Intro de Squeezie',
    category: 'youtube',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    alternatives: ['squeezie coucou', 'squeezie intro'],
    hint: 'Salutation d\'un YouTubeur gaming français'
  },
  {
    id: '11',
    title: 'Norman fait des vidéos',
    description: 'Nom de chaîne YouTube culte',
    category: 'youtube',
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    alternatives: ['norman videos', 'norman youtube'],
    hint: 'Nom d\'une chaîne YouTube française très populaire'
  },
  {
    id: '12',
    title: 'Rémi Gaillard',
    description: 'YouTubeur français de pranks',
    category: 'youtube',
    imageUrl: 'https://images.pexels.com/photos/1181425/pexels-photo-1181425.jpeg',
    alternatives: ['remi gaillard', 'gaillard pranks'],
    hint: 'YouTubeur français connu pour ses canulars'
  },

  // TV/Émissions
  {
    id: '13',
    title: 'C\'est du jamais vu',
    description: 'Expression de commentateur sportif',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181523/pexels-photo-1181523.jpeg',
    alternatives: ['jamais vu', 'du jamais vu'],
    hint: 'Expression utilisée par les commentateurs'
  },
  {
    id: '14',
    title: 'Bonne réponse',
    description: 'Phrase de Julien Lepers',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181367/pexels-photo-1181367.jpeg',
    alternatives: ['julien lepers bonne reponse', 'questions champion'],
    hint: 'Phrase culte d\'un animateur de quiz'
  },
  {
    id: '15',
    title: 'Miam miam miam',
    description: 'Alain Chabat dans Burger Quiz',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181489/pexels-photo-1181489.jpeg',
    alternatives: ['burger quiz miam', 'alain chabat miam'],
    hint: 'Son caractéristique d\'une émission de quiz'
  },

  // Memes internet français
  {
    id: '16',
    title: 'Jean-Marie',
    description: 'Meme du prénom français',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181578/pexels-photo-1181578.jpeg',
    alternatives: ['jean marie meme', 'prenom francais'],
    hint: 'Prénom français devenu meme'
  },
  {
    id: '17',
    title: 'Ça passe crème',
    description: 'Expression française moderne',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181634/pexels-photo-1181634.jpeg',
    alternatives: ['passe creme', 'ca passe creme'],
    hint: 'Expression pour dire que ça va bien'
  },
  {
    id: '18',
    title: 'Tranquille',
    description: 'Mot français populaire',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg',
    alternatives: ['tranquille meme', 'tranquille expression'],
    hint: 'Mot français utilisé pour dire "cool"'
  },
  {
    id: '19',
    title: 'Cheh',
    description: 'Expression française internet',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181756/pexels-photo-1181756.jpeg',
    alternatives: ['cheh meme', 'cheh expression'],
    hint: 'Expression pour se moquer gentiment'
  },
  {
    id: '20',
    title: 'Sah quel plaisir',
    description: 'Expression française des jeunes',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181823/pexels-photo-1181823.jpeg',
    alternatives: ['sah quel plaisir', 'quel plaisir'],
    hint: 'Expression ironique française moderne'
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
    gamePhase: 'setup',
    roundsPlayed: 0,
    maxRounds: 10,
    showVideo: false
  });
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | 'timeout' | null>(null);

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
      scores: initialScores,
      gamePhase: 'playing',
      roundsPlayed: 0,
      maxRounds: Math.min(frenchGifs.length, validPlayers.length * 3),
      showVideo: false
    });

    startNewRound();
  };

  const startNewRound = () => {
    if (game.roundsPlayed >= game.maxRounds) {
      endGame();
      return;
    }

    const availableGifs = frenchGifs.filter(gif => 
      !game.currentGif || gif.id !== game.currentGif.id
    );
    const randomGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
    
    setGame(prev => ({
      ...prev,
      currentGif: randomGif,
      timeLeft: 30,
      isTimerRunning: true,
      gamePhase: 'waiting-answer',
      showVideo: false
    }));
    setLastResult(null);
  };

  const handleCorrectAnswer = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer].correct += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
      gamePhase: 'video-playing',
      showVideo: true,
      roundsPlayed: prev.roundsPlayed + 1
    }));

    setLastResult('correct');
    
    // Afficher la vidéo pendant 5 secondes puis passer au suivant
    setTimeout(() => {
      setGame(prev => ({ ...prev, gamePhase: 'round-result', showVideo: false }));
      setTimeout(() => {
        nextPlayer();
      }, 2000);
    }, 5000);
  };

  const handleWrongAnswer = () => {
    const currentPlayer = game.players[game.currentPlayerIndex];
    const newScores = { ...game.scores };
    newScores[currentPlayer].wrong += 1;

    setGame(prev => ({
      ...prev,
      scores: newScores,
      isTimerRunning: false,
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
      scores: {},
      gamePhase: 'setup',
      roundsPlayed: 0,
      maxRounds: 10,
      showVideo: false
    });
    setPlayers(['']);
    setLastResult(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tiktok': return '📱';
      case 'youtube': return '📺';
      case 'tv': return '📻';
      case 'meme': return '😂';
      default: return '🎭';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'tiktok': return 'TikTok';
      case 'youtube': return 'YouTube';
      case 'tv': return 'TV';
      case 'meme': return 'Meme';
      default: return 'Autre';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tiktok': return 'from-pink-400 to-red-500';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'tv': return 'from-blue-500 to-indigo-600';
      case 'meme': return 'from-yellow-400 to-orange-500';
      default: return 'from-purple-500 to-blue-500';
    }
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
    const topPlayers = Object.keys(game.scores).length > 0 ? getTopPlayers() : [];

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

          {topPlayers.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-300">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-800">
                <Trophy size={20} />
                Résultats de la partie précédente
              </h3>
              <div className="space-y-2">
                {topPlayers.slice(0, 3).map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-200 to-yellow-300' : 
                    index === 1 ? 'bg-gradient-to-r from-gray-200 to-gray-300' : 
                    'bg-gradient-to-r from-orange-200 to-orange-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      {player.correct} ✅ | {player.wrong} ❌ | {player.timeout} ⏰
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
              <li>• Si c'est correct, la vidéo complète se lance !</li>
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
            <p className="text-green-700">
              Voici la vidéo complète : <strong>{game.currentGif.title}</strong>
            </p>
          </div>

          <div className="bg-black rounded-lg p-8 mb-6 text-center">
            <div className="text-white mb-4">
              <Video size={48} className="mx-auto mb-4" />
              <p className="text-lg">🎬 Vidéo en cours de lecture...</p>
              <p className="text-sm opacity-75 mt-2">{game.currentGif.description}</p>
            </div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block">
              ✅ {game.currentGif.title}
            </div>
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
                
                <div className={`text-4xl font-bold mb-4 ${
                  game.timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-purple-600'
                }`}>
                  <Timer size={32} className="inline mr-2" />
                  {game.timeLeft}s
                </div>
              </div>

              {/* Simulation du GIF avec une image */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 mb-6 text-center border-2 border-dashed border-gray-300">
                <img 
                  src={game.currentGif.imageUrl} 
                  alt="GIF à deviner" 
                  className="w-full max-w-md mx-auto rounded-lg shadow-md mb-4"
                />
                <div className="bg-gradient-to-r from-black to-gray-800 text-white p-4 rounded-lg">
                  <p className="text-lg font-medium mb-2">
                    🎬 {game.currentGif.description}
                  </p>
                  {game.timeLeft <= 15 && game.currentGif.hint && (
                    <p className="text-yellow-300 text-sm animate-pulse">
                      💡 Indice : {game.currentGif.hint}
                    </p>
                  )}
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
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all font-medium flex items-center justify-center gap-2 shadow-lg"
                >
                  <CheckCircle size={20} />
                  Bonne réponse
                </button>
                <button
                  onClick={handleWrongAnswer}
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