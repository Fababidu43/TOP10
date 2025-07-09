import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Timer, CheckCircle, XCircle, Trophy, Target } from 'lucide-react';

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
  hint?: string;
}

interface GameState {
  players: string[];
  currentPlayerIndex: number;
  currentGif: GifItem | null;
  timeLeft: number;
  isTimerRunning: boolean;
  scores: { [playerName: string]: { correct: number; wrong: number; timeout: number } };
  gamePhase: 'setup' | 'playing' | 'waiting-answer' | 'round-result';
  roundsPlayed: number;
  maxRounds: number;
}

// Base de données étendue de GIFs français
const frenchGifs: GifItem[] = [
  // Films français cultes
  {
    id: '1',
    title: 'Les Visiteurs',
    description: 'Scène culte : "C\'est quoi ce bordel ?"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    alternatives: ['visiteurs', 'jean reno', 'christian clavier', 'godefroy'],
    hint: 'Film avec Jean Reno et Christian Clavier'
  },
  {
    id: '2',
    title: 'OSS 117',
    description: 'Jean Dujardin qui fait son arrogant',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    alternatives: ['oss', 'jean dujardin', 'hubert bonisseur', 'agent secret'],
    hint: 'Agent secret français très arrogant'
  },
  {
    id: '3',
    title: 'Astérix Mission Cléopâtre',
    description: 'Jamel qui dit "C\'est du brutal !"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg',
    alternatives: ['astérix', 'cléopâtre', 'jamel', 'brutal', 'mission cleopatre'],
    hint: 'Film avec Jamel Debbouze en Égypte'
  },
  {
    id: '4',
    title: 'Intouchables',
    description: 'Omar Sy qui rigole avec François Cluzet',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181319/pexels-photo-1181319.jpeg',
    alternatives: ['intouchables', 'omar sy', 'françois cluzet', 'driss'],
    hint: 'Film sur l\'amitié entre un tétraplégique et son aide-soignant'
  },
  {
    id: '5',
    title: 'La Cité de la Peur',
    description: 'Les Nuls : "Ça va couper chérie !"',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg',
    alternatives: ['cité de la peur', 'les nuls', 'couper chérie', 'cannes'],
    hint: 'Film des Nuls au Festival de Cannes'
  },
  {
    id: '6',
    title: 'Le Dîner de Cons',
    description: 'Jacques Villeret qui fait l\'innocent',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181351/pexels-photo-1181351.jpeg',
    alternatives: ['dîner de cons', 'jacques villeret', 'cons', 'pignon'],
    hint: 'Film avec Jacques Villeret et Thierry Lhermitte'
  },
  {
    id: '7',
    title: 'Bienvenue chez les Ch\'tis',
    description: 'Dany Boon et son accent du Nord',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181234/pexels-photo-1181234.jpeg',
    alternatives: ['chtis', 'ch\'tis', 'dany boon', 'nord', 'bienvenue'],
    hint: 'Film sur les préjugés entre le Nord et le Sud'
  },
  {
    id: '8',
    title: 'Qu\'est-ce qu\'on a fait au Bon Dieu',
    description: 'Christian Clavier face à ses gendres',
    category: 'film',
    imageUrl: 'https://images.pexels.com/photos/1181445/pexels-photo-1181445.jpeg',
    alternatives: ['bon dieu', 'christian clavier', 'gendres', 'mariage'],
    hint: 'Comédie sur les mariages mixtes'
  },

  // Séries et émissions TV
  {
    id: '9',
    title: 'Kaamelott',
    description: 'Arthur qui soupire face à ses chevaliers',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
    alternatives: ['kaamelott', 'arthur', 'alexandre astier', 'chevaliers'],
    hint: 'Série sur le Roi Arthur et ses chevaliers'
  },
  {
    id: '10',
    title: 'Burger Quiz',
    description: 'Alain Chabat qui fait "Miam miam miam"',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    alternatives: ['burger quiz', 'alain chabat', 'miam', 'quiz'],
    hint: 'Émission de quiz déjantée avec Alain Chabat'
  },
  {
    id: '11',
    title: 'Koh-Lanta',
    description: 'Denis Brogniart qui annonce une épreuve',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    alternatives: ['koh lanta', 'denis brogniart', 'épreuve', 'survie'],
    hint: 'Émission de survie présentée par Denis Brogniart'
  },
  {
    id: '12',
    title: 'TPMP',
    description: 'Cyril Hanouna qui fait le fou',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181425/pexels-photo-1181425.jpeg',
    alternatives: ['tpmp', 'cyril hanouna', 'baba', 'touche pas'],
    hint: 'Émission de Cyril Hanouna sur C8'
  },
  {
    id: '13',
    title: 'Fort Boyard',
    description: 'Père Fouras et ses énigmes',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181523/pexels-photo-1181523.jpeg',
    alternatives: ['fort boyard', 'père fouras', 'énigmes', 'fort'],
    hint: 'Jeu dans un fort avec des épreuves et énigmes'
  },
  {
    id: '14',
    title: 'Questions pour un Champion',
    description: 'Julien Lepers et son "Bonne réponse !"',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181367/pexels-photo-1181367.jpeg',
    alternatives: ['questions champion', 'julien lepers', 'bonne réponse', 'quiz'],
    hint: 'Quiz de culture générale avec Julien Lepers'
  },
  {
    id: '15',
    title: 'Les Guignols',
    description: 'Marionnettes satiriques de Canal+',
    category: 'tv',
    imageUrl: 'https://images.pexels.com/photos/1181489/pexels-photo-1181489.jpeg',
    alternatives: ['guignols', 'marionnettes', 'canal+', 'ppda'],
    hint: 'Émission satirique avec des marionnettes'
  },

  // Memes et culture internet
  {
    id: '16',
    title: 'Risitas',
    description: 'L\'homme qui rit aux éclats',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181578/pexels-photo-1181578.jpeg',
    alternatives: ['risitas', 'rire', 'espagnol', 'kekw'],
    hint: 'Meme de l\'homme qui rit de manière contagieuse'
  },
  {
    id: '17',
    title: 'Mais t\'es qui toi ?',
    description: 'Meme français viral',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181634/pexels-photo-1181634.jpeg',
    alternatives: ['mais t\'es qui', 'toi', 'meme français'],
    hint: 'Phrase devenue meme sur internet'
  },
  {
    id: '18',
    title: 'C\'est pas faux',
    description: 'Réplique culte de Kaamelott',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg',
    alternatives: ['c\'est pas faux', 'kaamelott', 'perceval'],
    hint: 'Réplique de Perceval dans Kaamelott'
  },
  {
    id: '19',
    title: 'Oui oui oui',
    description: 'Meme de validation enthousiaste',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181756/pexels-photo-1181756.jpeg',
    alternatives: ['oui oui oui', 'validation', 'enthousiaste'],
    hint: 'Expression d\'approbation enthousiaste'
  },
  {
    id: '20',
    title: 'Ah non mais là',
    description: 'Expression d\'indignation française',
    category: 'meme',
    imageUrl: 'https://images.pexels.com/photos/1181823/pexels-photo-1181823.jpeg',
    alternatives: ['ah non mais là', 'indignation', 'français'],
    hint: 'Expression typiquement française d\'indignation'
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
    maxRounds: 10
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
      maxRounds: Math.min(frenchGifs.length, validPlayers.length * 3)
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
      gamePhase: 'waiting-answer'
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
      maxRounds: 10
    });
    setPlayers(['']);
    setLastResult(null);
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

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎬</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Devine le GIF</h1>
            <p className="text-gray-600">
              Devinez le contenu de GIFs issus de la culture française !
            </p>
          </div>

          {topPlayers.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-800">
                <Trophy size={20} />
                Résultats de la partie précédente
              </h3>
              <div className="space-y-2">
                {topPlayers.slice(0, 3).map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-2 rounded ${
                    index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : 'bg-orange-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {player.correct} ✅ | {player.wrong} ❌ | {player.timeout} ⏰
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  game.timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-purple-600'
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
                <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg">
                  <p className="text-lg font-medium mb-2">
                    🎬 {game.currentGif.description}
                  </p>
                  {game.timeLeft <= 15 && game.currentGif.hint && (
                    <p className="text-yellow-300 text-sm">
                      💡 Indice : {game.currentGif.hint}
                    </p>
                  )}
                </div>
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
                <Target size={20} />
                Progression
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Manche {game.roundsPlayed + 1}</span>
                  <span>{game.roundsPlayed + 1}/{game.maxRounds}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((game.roundsPlayed + 1) / game.maxRounds) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🏆 Scores
              </h3>
              <div className="space-y-3">
                {getTopPlayers().map((player, index) => (
                  <div key={player.name} className={`flex items-center justify-between p-2 rounded ${
                    player.name === currentPlayer ? 'bg-purple-100 border border-purple-300' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-2">
                      {index === 0 && player.total > 0 && <span className="text-yellow-500">👑</span>}
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

  if (game.gamePhase === 'round-result' && game.currentGif) {
    const currentPlayer = game.players[game.currentPlayerIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
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

          <div className={`rounded-lg p-6 mb-6 text-center ${
            lastResult === 'correct' ? 'bg-green-100 border border-green-300' : 
            lastResult === 'wrong' ? 'bg-red-100 border border-red-300' : 'bg-orange-100 border border-orange-300'
          }`}>
            <h3 className={`text-lg font-bold mb-2 ${
              lastResult === 'correct' ? 'text-green-800' : 
              lastResult === 'wrong' ? 'text-red-800' : 'text-orange-800'
            }`}>
              {currentPlayer}
            </h3>
            <p className={`${
              lastResult === 'correct' ? 'text-green-700' : 
              lastResult === 'wrong' ? 'text-red-700' : 'text-orange-700'
            }`}>
              {lastResult === 'correct' ? 'Distribue 4 gorgées aux autres joueurs !' : 
               lastResult === 'wrong' ? 'Boit 3 gorgées !' : 'Boit 5 gorgées !'}
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