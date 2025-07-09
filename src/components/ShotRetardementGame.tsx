import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Bomb, Play, ArrowRight } from 'lucide-react';

interface ShotRetardementGameProps {
  onBack: () => void;
}

interface Question {
  id: string;
  text: string;
  category: 'fun' | 'trash' | 'pop-culture' | 'perso' | 'sexe';
}

interface GameState {
  players: string[];
  currentPlayerIndex: number;
  currentQuestion: Question | null;
  timeLeft: number;
  isTimerRunning: boolean;
  bombTimer: number;
  gamePhase: 'setup' | 'playing' | 'exploded';
  enabledCategories: string[];
}

const questions: Question[] = [
  // Fun
  { id: '1', text: 'Une marque de fast food', category: 'fun' },
  { id: '2', text: 'Un animal qui fait peur', category: 'fun' },
  { id: '3', text: 'Une chose qu\'on cache à ses parents', category: 'fun' },
  { id: '4', text: 'Un métier bizarre', category: 'fun' },
  { id: '5', text: 'Une insulte marrante', category: 'fun' },
  { id: '6', text: 'Un objet inutile', category: 'fun' },
  { id: '7', text: 'Une excuse bidon', category: 'fun' },
  { id: '8', text: 'Un surnom ridicule', category: 'fun' },
  { id: '9', text: 'Une phobie bizarre', category: 'fun' },
  { id: '10', text: 'Un talent inutile', category: 'fun' },

  // Trash
  { id: '11', text: 'Une partie du corps', category: 'trash' },
  { id: '12', text: 'Quelque chose qu\'on fait aux toilettes', category: 'trash' },
  { id: '13', text: 'Un truc dégueulasse', category: 'trash' },
  { id: '14', text: 'Une position bizarre', category: 'trash' },
  { id: '15', text: 'Un endroit pour vomir', category: 'trash' },
  { id: '16', text: 'Quelque chose de collant', category: 'trash' },
  { id: '17', text: 'Un bruit embarrassant', category: 'trash' },
  { id: '18', text: 'Une odeur horrible', category: 'trash' },
  { id: '19', text: 'Quelque chose qu\'on lèche', category: 'trash' },
  { id: '20', text: 'Un endroit sale', category: 'trash' },

  // Pop Culture
  { id: '21', text: 'Un film français culte', category: 'pop-culture' },
  { id: '22', text: 'Un rappeur français', category: 'pop-culture' },
  { id: '23', text: 'Une émission TV des années 90', category: 'pop-culture' },
  { id: '24', text: 'Un meme internet', category: 'pop-culture' },
  { id: '25', text: 'Un YouTubeur français', category: 'pop-culture' },
  { id: '26', text: 'Une série Netflix populaire', category: 'pop-culture' },
  { id: '27', text: 'Un jeu vidéo culte', category: 'pop-culture' },
  { id: '28', text: 'Une chanson de Céline Dion', category: 'pop-culture' },
  { id: '29', text: 'Un personnage de Disney', category: 'pop-culture' },
  { id: '30', text: 'Une marque de luxe', category: 'pop-culture' },

  // Perso / Confession
  { id: '31', text: 'Ton plus gros défaut', category: 'perso' },
  { id: '32', text: 'Ta plus grande peur', category: 'perso' },
  { id: '33', text: 'Ton rêve secret', category: 'perso' },
  { id: '34', text: 'Ta plus grosse honte', category: 'perso' },
  { id: '35', text: 'Ton crush secret', category: 'perso' },
  { id: '36', text: 'Ta pire habitude', category: 'perso' },
  { id: '37', text: 'Ton mensonge préféré', category: 'perso' },
  { id: '38', text: 'Ta plus grosse bêtise', category: 'perso' },
  { id: '39', text: 'Ton fantasme inavouable', category: 'perso' },
  { id: '40', text: 'Ta plus grande fierté', category: 'perso' },

  // Sexe
  { id: '41', text: 'Une position du Kama Sutra', category: 'sexe' },
  { id: '42', text: 'Un endroit pour faire l\'amour', category: 'sexe' },
  { id: '43', text: 'Un accessoire coquin', category: 'sexe' },
  { id: '44', text: 'Une partie érogène', category: 'sexe' },
  { id: '45', text: 'Un fantasme courant', category: 'sexe' },
  { id: '46', text: 'Une technique de séduction', category: 'sexe' },
  { id: '47', text: 'Un mot coquin', category: 'sexe' },
  { id: '48', text: 'Une zone interdite', category: 'sexe' },
  { id: '49', text: 'Un jeu de rôle', category: 'sexe' },
  { id: '50', text: 'Une pratique taboue', category: 'sexe' }
];

const ShotRetardementGame: React.FC<ShotRetardementGameProps> = ({ onBack }) => {
  const [players, setPlayers] = useState<string[]>(['']);
  const [game, setGame] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    currentQuestion: null,
    timeLeft: 0,
    isTimerRunning: false,
    bombTimer: 0,
    gamePhase: 'setup',
    enabledCategories: ['fun']
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (game.isTimerRunning && game.bombTimer > 0) {
      interval = setInterval(() => {
        setGame(prev => ({ ...prev, bombTimer: prev.bombTimer - 1 }));
      }, 1000);
    } else if (game.bombTimer === 0 && game.isTimerRunning) {
      explodeBomb();
    }
    return () => clearInterval(interval);
  }, [game.isTimerRunning, game.bombTimer]);

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

  const toggleCategory = (category: string) => {
    const newCategories = game.enabledCategories.includes(category)
      ? game.enabledCategories.filter(c => c !== category)
      : [...game.enabledCategories, category];
    
    setGame({ ...game, enabledCategories: newCategories });
  };

  const startGame = () => {
    const validPlayers = players.filter(p => p.trim());
    if (validPlayers.length < 3) return;

    const randomPlayerIndex = Math.floor(Math.random() * validPlayers.length);
    const bombTime = Math.floor(Math.random() * 31) + 15; // 15-45 secondes

    setGame({
      players: validPlayers,
      currentPlayerIndex: randomPlayerIndex,
      currentQuestion: null,
      timeLeft: 0,
      isTimerRunning: true,
      bombTimer: bombTime,
      gamePhase: 'playing',
      enabledCategories: game.enabledCategories
    });

    getNextQuestion();
  };

  const getNextQuestion = () => {
    const availableQuestions = questions.filter(q => 
      game.enabledCategories.includes(q.category)
    );
    
    if (availableQuestions.length === 0) return;

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    setGame(prev => ({ ...prev, currentQuestion: randomQuestion }));
  };

  const nextPlayer = () => {
    const nextIndex = (game.currentPlayerIndex + 1) % game.players.length;
    setGame(prev => ({ 
      ...prev, 
      currentPlayerIndex: nextIndex 
    }));
    getNextQuestion();
  };

  const explodeBomb = () => {
    setGame(prev => ({ 
      ...prev, 
      isTimerRunning: false,
      gamePhase: 'exploded'
    }));
  };

  const resetGame = () => {
    setGame({
      players: [],
      currentPlayerIndex: 0,
      currentQuestion: null,
      timeLeft: 0,
      isTimerRunning: false,
      bombTimer: 0,
      gamePhase: 'setup',
      enabledCategories: ['fun']
    });
    setPlayers(['']);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fun': return '😄';
      case 'trash': return '🤢';
      case 'pop-culture': return '🎬';
      case 'perso': return '🤐';
      case 'sexe': return '🔞';
      default: return '❓';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'fun': return 'Fun';
      case 'trash': return 'Trash';
      case 'pop-culture': return 'Pop Culture';
      case 'perso': return 'Personnel';
      case 'sexe': return 'Sexe';
      default: return 'Autre';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fun': return 'from-green-500 to-teal-500';
      case 'trash': return 'from-orange-500 to-red-500';
      case 'pop-culture': return 'from-blue-500 to-purple-500';
      case 'perso': return 'from-purple-500 to-pink-500';
      case 'sexe': return 'from-red-600 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
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
            <div className="text-6xl mb-4">💣</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Shot à Retardement</h1>
            <p className="text-gray-600">
              Répondez aux questions avant que la bombe explose !
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

          {/* Sélection des catégories */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Catégories de questions</h3>
            <div className="space-y-3">
              {[
                { id: 'fun', name: 'Fun', description: 'Questions amusantes et légères' },
                { id: 'trash', name: 'Trash', description: 'Questions plus osées' },
                { id: 'pop-culture', name: 'Pop Culture', description: 'Films, musique, célébrités' },
                { id: 'perso', name: 'Personnel', description: 'Questions personnelles' },
                { id: 'sexe', name: 'Sexe', description: 'Questions intimes (18+)' }
              ].map((category) => (
                <div key={category.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={game.enabledCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor={category.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getCategoryIcon(category.id)}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Comment jouer :</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Un joueur commence, tiré au sort</li>
              <li>• Répondez rapidement à la question affichée</li>
              <li>• Cliquez "Suivant" pour passer au joueur suivant</li>
              <li>• La bombe explose aléatoirement entre 15 et 45 secondes</li>
              <li>• Celui qui joue au moment de l'explosion boit 5 gorgées !</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={players.filter(p => p.trim()).length < 3 || game.enabledCategories.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Allumer la bombe 💣
          </button>
        </div>
      </div>
    );
  }

  if (game.gamePhase === 'playing' && game.currentQuestion) {
    const currentPlayer = game.players[game.currentPlayerIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className={`text-6xl mb-4 ${game.bombTimer <= 10 ? 'animate-bounce' : ''}`}>
              💣
            </div>
            <div className={`text-4xl font-bold mb-4 ${
              game.bombTimer <= 10 ? 'text-red-600 animate-pulse' : 'text-orange-600'
            }`}>
              {game.bombTimer}s
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Tour de {currentPlayer}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-lg p-6 mb-6 border border-red-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(game.currentQuestion.category)}`}>
                {getCategoryIcon(game.currentQuestion.category)}
                <span className="ml-1">{getCategoryName(game.currentQuestion.category)}</span>
              </span>
            </div>
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {game.currentQuestion.text}
            </h3>
            <p className="text-center text-red-700 font-medium">
              {currentPlayer}, réponds à voix haute !
            </p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm text-center">
              ⚠️ La bombe peut exploser à tout moment ! Dépêche-toi de répondre !
            </p>
          </div>

          <button
            onClick={nextPlayer}
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium text-lg flex items-center justify-center gap-2"
          >
            Joueur suivant
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (game.gamePhase === 'exploded') {
    const explodedPlayer = game.players[game.currentPlayerIndex];

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4 animate-bounce">💥</div>
            <h2 className="text-3xl font-bold text-red-600 mb-2">
              BOOOOOM !
            </h2>
            <p className="text-gray-600 text-lg">
              La bombe a explosé !
            </p>
          </div>

          <div className="bg-red-100 border border-red-300 rounded-lg p-6 mb-8">
            <div className="text-center">
              <div className="text-4xl mb-4">😵</div>
              <h3 className="text-2xl font-bold text-red-800 mb-2">
                {explodedPlayer} a explosé !
              </h3>
              <p className="text-red-700 mb-4">
                Tu étais en train de jouer quand la bombe a explosé...
              </p>
              
              <div className="bg-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🍺 Punition :</h4>
                <p className="text-red-700">
                  • {explodedPlayer} boit <strong>5 gorgées</strong>
                </p>
                <p className="text-red-600 text-sm mt-2">
                  + Tous les autres peuvent lui distribuer 1 gorgée chacun pour le chambrer !
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const bombTime = Math.floor(Math.random() * 31) + 15;
                const randomPlayerIndex = Math.floor(Math.random() * game.players.length);
                setGame({
                  ...game,
                  currentPlayerIndex: randomPlayerIndex,
                  bombTimer: bombTime,
                  isTimerRunning: true,
                  gamePhase: 'playing'
                });
                getNextQuestion();
              }}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-medium flex items-center justify-center gap-2"
            >
              <Bomb size={20} />
              Nouvelle bombe
            </button>
            <button
              onClick={resetGame}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Nouvelle partie
            </button>
          </div>

          <button
            onClick={onBack}
            className="w-full mt-4 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all font-medium flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour aux jeux
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ShotRetardementGame;