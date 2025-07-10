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
    
    // Indices vraiment utiles selon la catégorie
    const getSpecificHints = (item: Top10Item, category: Top10Category) => {
      const hints: string[] = [];
      
      // Indices génériques utiles
      hints.push(`💡 Un élément commence par "${item.name.charAt(0).toUpperCase()}"`);
      hints.push(`🔤 Il y a un élément de ${item.name.length} caractères (espaces inclus)`);
      
      // Indices spécifiques selon la catégorie
      switch (category.id) {
        case 'films-oscars':
          if (item.value?.includes('1959')) hints.push(`🎬 Un film épique de 1959 avec Charlton Heston`);
          if (item.value?.includes('1997')) hints.push(`🚢 Un film catastrophe de 1997 avec Leonardo DiCaprio`);
          if (item.value?.includes('Seigneur')) hints.push(`⚔️ Un film fantasy de Peter Jackson`);
          if (item.value?.includes('1961')) hints.push(`🎭 Une comédie musicale de 1961`);
          if (item.value?.includes('1958')) hints.push(`👑 Un film musical français de 1958`);
          if (item.value?.includes('Empereur')) hints.push(`🏯 Un film sur la Chine impériale`);
          if (item.value?.includes('1964')) hints.push(`🎩 Un film avec Audrey Hepburn de 1964`);
          if (item.value?.includes('1972')) hints.push(`🎪 Un film musical avec Liza Minnelli`);
          if (item.value?.includes('1982')) hints.push(`🕊️ Un film biographique sur un leader indien`);
          if (item.value?.includes('1984')) hints.push(`🎼 Un film sur un compositeur célèbre`);
          break;
          
        case 'films-cultes-francais':
          if (item.name.includes('Intouchables')) hints.push(`♿ Film avec Omar Sy et François Cluzet`);
          if (item.name.includes('Amélie')) hints.push(`🥄 Film de Jean-Pierre Jeunet avec Audrey Tautou`);
          if (item.name.includes('Ch\'tis')) hints.push(`🏠 Comédie de Dany Boon dans le Nord`);
          if (item.name.includes('Visiteurs')) hints.push(`⚔️ "La casse du siècle !" avec Jean Reno`);
          if (item.name.includes('Taxi')) hints.push(`🚗 Film avec Samy Naceri et une Peugeot`);
          if (item.name.includes('Astérix')) hints.push(`🏺 "C'est une bonne situation ça, scribe ?"`);
          if (item.name.includes('Vadrouille')) hints.push(`✈️ Film de guerre avec Bourvil et De Funès`);
          if (item.name.includes('OSS 117')) hints.push(`🕴️ Parodie d'espion avec Jean Dujardin`);
          if (item.name.includes('Dîner')) hints.push(`🍽️ "Il s'appelle Juste Leblanc"`);
          if (item.name.includes('Cité')) hints.push(`😱 "Ça va couper chérie !"`);
          break;
          
        case 'series-netflix':
          if (item.name.includes('Squid')) hints.push(`🔴 Série coréenne avec des jeux d'enfants mortels`);
          if (item.name.includes('Wednesday')) hints.push(`🖤 Série sur la fille de la famille Addams`);
          if (item.name.includes('Stranger Things 4')) hints.push(`🙃 Saison 4 de la série avec Eleven`);
          if (item.name.includes('Dahmer')) hints.push(`🔪 Série sur un tueur en série américain`);
          if (item.name.includes('Bridgerton')) hints.push(`👗 Série d'époque romantique britannique`);
          if (item.name.includes('Night Agent')) hints.push(`📞 Thriller avec un agent du FBI`);
          if (item.name.includes('Ginny')) hints.push(`👩‍👧 Série sur une mère et sa fille`);
          if (item.name.includes('Lucifer')) hints.push(`😈 Série sur le diable qui aide la police`);
          if (item.name.includes('All of Us')) hints.push(`🧟 Série de zombies dans un lycée coréen`);
          if (item.name.includes('Witcher')) hints.push(`⚔️ Série fantasy avec Geralt de Riv`);
          break;
          
        case 'pays-population':
          if (item.name.includes('Inde')) hints.push(`🇮🇳 Pays de Bollywood et du curry`);
          if (item.name.includes('Chine')) hints.push(`🇨🇳 Pays de la Grande Muraille`);
          if (item.name.includes('États-Unis')) hints.push(`🇺🇸 Pays de Hollywood et de la Statue de la Liberté`);
          if (item.name.includes('Indonésie')) hints.push(`🏝️ Plus grand archipel du monde`);
          if (item.name.includes('Pakistan')) hints.push(`🇵🇰 Pays voisin de l'Inde`);
          if (item.name.includes('Nigéria')) hints.push(`🇳🇬 Plus grand pays d'Afrique par population`);
          if (item.name.includes('Brésil')) hints.push(`🇧🇷 Pays du carnaval de Rio`);
          if (item.name.includes('Bangladesh')) hints.push(`🇧🇩 Pays du delta du Gange`);
          if (item.name.includes('Russie')) hints.push(`🇷🇺 Plus grand pays du monde par superficie`);
          if (item.name.includes('Mexique')) hints.push(`🇲🇽 Pays des tacos et de la tequila`);
          break;
          
        case 'jeux-video-vendus':
          if (item.name.includes('Minecraft')) hints.push(`⛏️ Jeu de construction avec des blocs`);
          if (item.name.includes('GTA V')) hints.push(`🚗 Jeu de crime dans une ville fictive`);
          if (item.name.includes('Tetris')) hints.push(`🧩 Jeu de puzzle avec des formes qui tombent`);
          if (item.name.includes('Wii Sports')) hints.push(`🎾 Jeu de sport inclus avec la console Nintendo`);
          if (item.name.includes('PUBG')) hints.push(`🔫 Battle royale sur une île`);
          if (item.name.includes('Mario Kart')) hints.push(`🏎️ Course avec des personnages Nintendo`);
          if (item.name.includes('Super Mario Bros')) hints.push(`🍄 Jeu de plateforme avec un plombier`);
          if (item.name.includes('Red Dead')) hints.push(`🤠 Jeu de western avec des cowboys`);
          if (item.name.includes('Overwatch')) hints.push(`🎯 Jeu de tir en équipe de Blizzard`);
          if (item.name.includes('Witcher 3')) hints.push(`🐺 RPG avec Geralt de Riv`);
          break;
          
        case 'langues-parlees':
          if (item.name.includes('Mandarin')) hints.push(`🇨🇳 Langue officielle de la Chine`);
          if (item.name.includes('Espagnol')) hints.push(`🇪🇸 Langue de l'Espagne et de l'Amérique latine`);
          if (item.name.includes('Anglais')) hints.push(`🇬🇧 Langue de Shakespeare`);
          if (item.name.includes('Hindi')) hints.push(`🇮🇳 Langue principale de l'Inde`);
          if (item.name.includes('Arabe')) hints.push(`🕌 Langue du Coran`);
          if (item.name.includes('Bengalî')) hints.push(`🇧🇩 Langue du Bangladesh`);
          if (item.name.includes('Portugais')) hints.push(`🇵🇹 Langue du Brésil et du Portugal`);
          if (item.name.includes('Russe')) hints.push(`🇷🇺 Langue de Tolstoï`);
          if (item.name.includes('Japonais')) hints.push(`🇯🇵 Langue des mangas`);
          if (item.name.includes('Pendjabi')) hints.push(`🇮🇳 Langue du Punjab`);
          break;
          
        case 'marques-valorisees':
          if (item.name.includes('Apple')) hints.push(`🍎 Marque de l'iPhone et du Mac`);
          if (item.name.includes('Microsoft')) hints.push(`💻 Créateur de Windows et Xbox`);
          if (item.name.includes('Amazon')) hints.push(`📦 Géant du e-commerce de Jeff Bezos`);
          if (item.name.includes('Google')) hints.push(`🔍 Moteur de recherche le plus utilisé`);
          if (item.name.includes('Samsung')) hints.push(`📱 Rival coréen d'Apple`);
          if (item.name.includes('Tesla')) hints.push(`⚡ Voitures électriques d'Elon Musk`);
          if (item.name.includes('Meta')) hints.push(`👥 Ancien nom : Facebook`);
          if (item.name.includes('NVIDIA')) hints.push(`🎮 Cartes graphiques pour gamers`);
          if (item.name.includes('Toyota')) hints.push(`🚗 Constructeur automobile japonais`);
          if (item.name.includes('Coca-Cola')) hints.push(`🥤 Boisson gazeuse rouge et blanche`);
          break;
          
        case 'sports-populaires':
          if (item.name.includes('Football')) hints.push(`⚽ Sport avec 11 joueurs et un ballon rond`);
          if (item.name.includes('Cricket')) hints.push(`🏏 Sport très populaire en Inde et Angleterre`);
          if (item.name.includes('Hockey')) hints.push(`🏑 Sport avec des crosses sur gazon`);
          if (item.name.includes('Tennis')) hints.push(`🎾 Sport de raquette avec Federer et Nadal`);
          if (item.name.includes('Volleyball')) hints.push(`🏐 Sport avec un filet et 6 joueurs par équipe`);
          if (item.name.includes('Tennis de table')) hints.push(`🏓 Version miniature du tennis`);
          if (item.name.includes('Basketball')) hints.push(`🏀 Sport avec des paniers à 3m05`);
          if (item.name.includes('Baseball')) hints.push(`⚾ Sport américain avec une batte`);
          if (item.name.includes('Rugby')) hints.push(`🏉 Sport avec un ballon ovale`);
          if (item.name.includes('Golf')) hints.push(`⛳ Sport avec des clubs et des trous`);
          break;
          
        case 'youtubers-francais':
          if (item.name.includes('Squeezie')) hints.push(`🎮 YouTubeur gaming, Lucas de son prénom`);
          if (item.name.includes('Cyprien')) hints.push(`😂 YouTubeur humoriste, Cyprien Iov`);
          if (item.name.includes('Norman')) hints.push(`🎭 "Norman fait des vidéos"`);
          if (item.name.includes('Tibo')) hints.push(`💪 YouTubeur fitness et musculation`);
          if (item.name.includes('Amixem')) hints.push(`🎬 YouTubeur lifestyle, Maxime de son prénom`);
          if (item.name.includes('Rémi Gaillard')) hints.push(`🤡 YouTubeur de canulars de Montpellier`);
          if (item.name.includes('Michou')) hints.push(`🌈 YouTubeur aux cheveux colorés`);
          if (item.name.includes('Inoxtag')) hints.push(`🎪 YouTubeur aventure et défis`);
          if (item.name.includes('McFly')) hints.push(`🎵 Duo de YouTubeurs musiciens`);
          if (item.name.includes('Gotaga')) hints.push(`🎮 Streameur et YouTubeur gaming`);
          break;
          
        case 'artistes-spotify':
          if (item.name.includes('Weeknd')) hints.push(`🌙 Chanteur de "Blinding Lights"`);
          if (item.name.includes('Taylor Swift')) hints.push(`💄 Chanteuse de "Shake It Off"`);
          if (item.name.includes('Bad Bunny')) hints.push(`🐰 Rappeur portoricain de reggaeton`);
          if (item.name.includes('Drake')) hints.push(`🦉 Rappeur canadien de "God's Plan"`);
          if (item.name.includes('Ariana Grande')) hints.push(`🎀 Chanteuse de "Thank U, Next"`);
          if (item.name.includes('Ed Sheeran')) hints.push(`🎸 Chanteur roux de "Shape of You"`);
          if (item.name.includes('Justin Bieber')) hints.push(`🎤 Chanteur canadien de "Baby"`);
          if (item.name.includes('Billie Eilish')) hints.push(`💚 Chanteuse de "Bad Guy"`);
          if (item.name.includes('Dua Lipa')) hints.push(`💃 Chanteuse de "Levitating"`);
          if (item.name.includes('Post Malone')) hints.push(`🎵 Rappeur de "Circles"`);
          break;
          
        case 'jeux-mobiles':
          if (item.name.includes('Subway Surfers')) hints.push(`🚇 Jeu de course dans le métro`);
          if (item.name.includes('PUBG Mobile')) hints.push(`📱 Version mobile du battle royale`);
          if (item.name.includes('Candy Crush')) hints.push(`🍭 Jeu de match-3 avec des bonbons`);
          if (item.name.includes('Free Fire')) hints.push(`🔥 Battle royale de Garena`);
          if (item.name.includes('Roblox')) hints.push(`🧱 Plateforme de jeux créés par les joueurs`);
          if (item.name.includes('Among Us')) hints.push(`👨‍🚀 Jeu de déduction avec des imposteurs`);
          if (item.name.includes('Temple Run')) hints.push(`🏃 Jeu de course infinie dans un temple`);
          if (item.name.includes('Clash of Clans')) hints.push(`⚔️ Jeu de stratégie avec des villages`);
          if (item.name.includes('Pokémon GO')) hints.push(`📍 Jeu Pokémon en réalité augmentée`);
          if (item.name.includes('Clash Royale')) hints.push(`👑 Jeu de cartes en temps réel`);
          break;
          
        case 'rappeurs-francais':
          if (item.name.includes('Jul')) hints.push(`🎤 Rappeur marseillais très prolifique`);
          if (item.name.includes('PNL')) hints.push(`👥 Duo de rap, Ademo et N.O.S`);
          if (item.name.includes('Ninho')) hints.push(`🎵 Rappeur de l'Essonne`);
          if (item.name.includes('SCH')) hints.push(`🌊 Rappeur marseillais, "JVLIVS"`);
          if (item.name.includes('Nekfeu')) hints.push(`🔥 Rappeur du 1995, "Feu"`);
          if (item.name.includes('Booba')) hints.push(`👑 "Duc de Boulogne", B2O`);
          if (item.name.includes('Damso')) hints.push(`🇧🇪 Rappeur belge du 92i`);
          if (item.name.includes('Orelsan')) hints.push(`🎭 Rappeur de Caen, "San"`);
          if (item.name.includes('Gazo')) hints.push(`🔥 Rappeur drill français`);
          if (item.name.includes('Freeze Corleone')) hints.push(`❄️ Rappeur du LMF, 667`);
          break;
      }
      
      // Ajouter des indices sur la position si c'est dans le top 3
      if (item.rank <= 3) {
        hints.push(`🏆 Cet élément est dans le TOP 3 !`);
      } else if (item.rank <= 5) {
        hints.push(`🥉 Cet élément est dans le TOP 5 !`);
      } else {
        hints.push(`📊 Cet élément est dans la seconde moitié du classement`);
      }
      
      // Indice sur la valeur si disponible
      if (item.value) {
        const words = item.value.split(' ');
        if (words.length > 1) {
          hints.push(`📈 Sa valeur contient le mot "${words[0]}"`);
        }
      }
      
      return hints;
    };
    
    const availableHints = getSpecificHints(randomItem, game.category);
    return availableHints[Math.floor(Math.random() * availableHints.length)];
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
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2 shadow-lg text-sm md:text-base"
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