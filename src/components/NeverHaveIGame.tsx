import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, RotateCcw, Plus, Flame, Heart, Zap, Shuffle, Settings, Info } from 'lucide-react';
import { neverHaveIQuestions, NeverHaveIQuestion, getCategoryColor, getCategoryName, getCategoryDescription } from '../data/neverHaveIData';

interface NeverHaveIGameProps {
  onBack: () => void;
}

interface GameSettings {
  players: string[];
  enabledCategories: string[];
  customQuestions: string[];
  autoAdvance: boolean;
  showStats: boolean;
}

interface GameStats {
  questionsShown: number;
  categoriesUsed: { [category: string]: number };
  playersActive: string[];
}

const NeverHaveIGame: React.FC<NeverHaveIGameProps> = ({ onBack }) => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [players, setPlayers] = useState<string[]>(['']);
  const [settings, setSettings] = useState<GameSettings>({
    players: [],
    enabledCategories: ['fun'],
    customQuestions: [],
    autoAdvance: false,
    showStats: true
  });
  const [currentQuestion, setCurrentQuestion] = useState<NeverHaveIQuestion | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState<GameStats>({
    questionsShown: 0,
    categoriesUsed: {},
    playersActive: []
  });

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
    const newCategories = settings.enabledCategories.includes(category)
      ? settings.enabledCategories.filter(c => c !== category)
      : [...settings.enabledCategories, category];
    
    setSettings({ ...settings, enabledCategories: newCategories });
  };

  const addCustomQuestion = () => {
    if (customQuestionInput.trim()) {
      const questionText = customQuestionInput.trim().startsWith('Je n\'ai jamais') 
        ? customQuestionInput.trim()
        : `Je n'ai jamais ${customQuestionInput.trim()}`;
      
      setSettings({
        ...settings,
        customQuestions: [...settings.customQuestions, questionText]
      });
      setCustomQuestionInput('');
      setShowCustomInput(false);
    }
  };

  const removeCustomQuestion = (index: number) => {
    setSettings({
      ...settings,
      customQuestions: settings.customQuestions.filter((_, i) => i !== index)
    });
  };

  const startGame = () => {
    const validPlayers = players.filter(p => p.trim());
    if (validPlayers.length < 2) return;

    setSettings({ ...settings, players: validPlayers });
    setUsedQuestions([]);
    setStats({
      questionsShown: 0,
      categoriesUsed: {},
      playersActive: validPlayers
    });
    setGameState('playing');
    getNextQuestion();
  };

  const getNextQuestion = () => {
    // Filtrer les questions selon les catégories activées
    const availableQuestions = neverHaveIQuestions.filter(q => 
      settings.enabledCategories.includes(q.category) && 
      !usedQuestions.includes(q.id)
    );

    // Ajouter les questions personnalisées
    const customQs: NeverHaveIQuestion[] = settings.customQuestions
      .filter((_, index) => !usedQuestions.includes(`custom-${index}`))
      .map((text, index) => ({
        id: `custom-${index}`,
        text,
        category: 'fun' as const
      }));

    const allAvailable = [...availableQuestions, ...customQs];

    if (allAvailable.length === 0) {
      // Réinitialiser si toutes les questions ont été utilisées
      setUsedQuestions([]);
      const firstQuestion = neverHaveIQuestions.find(q => 
        settings.enabledCategories.includes(q.category)
      ) || neverHaveIQuestions[0];
      setCurrentQuestion(firstQuestion);
      updateStats(firstQuestion);
      return;
    }

    const randomQuestion = allAvailable[Math.floor(Math.random() * allAvailable.length)];
    setCurrentQuestion(randomQuestion);
    setUsedQuestions([...usedQuestions, randomQuestion.id]);
    updateStats(randomQuestion);
  };

  const updateStats = (question: NeverHaveIQuestion) => {
    setStats(prev => ({
      ...prev,
      questionsShown: prev.questionsShown + 1,
      categoriesUsed: {
        ...prev.categoriesUsed,
        [question.category]: (prev.categoriesUsed[question.category] || 0) + 1
      }
    }));
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers(['']);
    setSettings({
      players: [],
      enabledCategories: ['fun'],
      customQuestions: [],
      autoAdvance: false,
      showStats: true
    });
    setCurrentQuestion(null);
    setUsedQuestions([]);
    setCustomQuestionInput('');
    setShowCustomInput(false);
    setShowSettings(false);
    setStats({
      questionsShown: 0,
      categoriesUsed: {},
      playersActive: []
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fun': return <Heart size={16} />;
      case 'trash': return <Flame size={16} />;
      case 'extreme': return <Zap size={16} />;
      default: return <Heart size={16} />;
    }
  };

  const getAvailableQuestionsCount = () => {
    const categoryQuestions = neverHaveIQuestions.filter(q => 
      settings.enabledCategories.includes(q.category)
    ).length;
    return categoryQuestions + settings.customQuestions.length;
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
            <div className="text-6xl mb-4">🍻</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Je n'ai jamais</h1>
            <p className="text-gray-600">
              Révélez vos secrets et faites boire vos amis !
            </p>
          </div>

          {/* Configuration des joueurs */}
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
                { id: 'fun', name: 'Fun', description: getCategoryDescription('fun') },
                { id: 'trash', name: 'Trash', description: getCategoryDescription('trash') },
                { id: 'extreme', name: 'Extrême', description: getCategoryDescription('extreme') }
              ].map((category) => (
                <div key={category.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={category.id}
                    checked={settings.enabledCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor={category.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category.id)}
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {neverHaveIQuestions.filter(q => q.category === category.id).length} questions
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Total disponible : {getAvailableQuestionsCount()} questions
            </div>
          </div>

          {/* Questions personnalisées */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Questions personnalisées</h3>
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
              >
                <Plus size={16} />
                Ajouter
              </button>
            </div>

            {showCustomInput && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={customQuestionInput}
                  onChange={(e) => setCustomQuestionInput(e.target.value)}
                  placeholder="Ex: mangé de la nourriture périmée"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addCustomQuestion}
                    disabled={!customQuestionInput.trim()}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Ajouter
                  </button>
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {settings.customQuestions.length > 0 && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {settings.customQuestions.map((question, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                    <span className="flex-1 text-sm">{question}</span>
                    <button
                      onClick={() => removeCustomQuestion(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paramètres avancés */}
          <div className="mb-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm mb-3"
            >
              <Settings size={16} />
              Paramètres avancés
            </button>
            
            {showSettings && (
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoAdvance"
                    checked={settings.autoAdvance}
                    onChange={(e) => setSettings({ ...settings, autoAdvance: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="autoAdvance" className="text-sm">
                    Passage automatique (toutes les 10 secondes)
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showStats"
                    checked={settings.showStats}
                    onChange={(e) => setSettings({ ...settings, showStats: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="showStats" className="text-sm">
                    Afficher les statistiques pendant le jeu
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Info size={16} />
              Comment jouer :
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Une question "Je n'ai jamais..." s'affiche</li>
              <li>• Tous ceux qui ont déjà fait l'action boivent une gorgée</li>
              <li>• Cliquez sur "Question suivante" pour continuer</li>
              <li>• Amusez-vous et découvrez vos amis !</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            disabled={players.filter(p => p.trim()).length < 2 || settings.enabledCategories.length === 0}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            Commencer la partie
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'playing' && currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Zone de jeu principale */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🍻</div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getCategoryColor(currentQuestion.category)}`}>
                    {getCategoryIcon(currentQuestion.category)}
                    <span className="ml-1">{getCategoryName(currentQuestion.category)}</span>
                  </span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  {currentQuestion.text}
                </h2>
                <p className="text-center text-purple-700 font-medium">
                  Si vous avez déjà fait ça, buvez une gorgée ! 🍺
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={getNextQuestion}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 transition-all font-medium text-lg flex items-center justify-center gap-2"
                >
                  <Shuffle size={20} />
                  Question suivante
                </button>
                <button
                  onClick={resetGame}
                  className="bg-gray-500 text-white py-4 px-6 rounded-lg hover:bg-gray-600 transition-all font-medium flex items-center gap-2"
                >
                  <RotateCcw size={20} />
                  Nouvelle partie
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Joueurs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users size={20} />
                Joueurs présents
              </h3>
              <div className="flex flex-wrap gap-2">
                {settings.players.map((player, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    {player}
                  </span>
                ))}
              </div>
            </div>

            {/* Statistiques */}
            {settings.showStats && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">📊 Statistiques</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions vues :</span>
                    <span className="font-medium">{stats.questionsShown}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions restantes :</span>
                    <span className="font-medium">{getAvailableQuestionsCount() - usedQuestions.length}</span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-gray-600 text-sm">Catégories utilisées :</span>
                    {Object.entries(stats.categoriesUsed).map(([category, count]) => (
                      <div key={category} className="flex justify-between text-sm">
                        <span className="flex items-center gap-1">
                          {getCategoryIcon(category)}
                          {getCategoryName(category)}
                        </span>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Règles */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-800 mb-3">🍺 Règles d'alcool</h3>
              <div className="space-y-2 text-sm">
                <p className="text-purple-700">
                  • Si tu as déjà fait l'action : <strong>bois 1 gorgée</strong>
                </p>
                <p className="text-purple-700">
                  • Si tu n'as jamais fait : <strong>ne bois pas</strong>
                </p>
                <p className="text-purple-600 text-xs mt-3">
                  💡 Conseil : Soyez honnêtes pour plus de fun !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default NeverHaveIGame;