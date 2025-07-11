export interface Top10Category {
  id: string;
  name: string;
  description: string;
  items: Top10Item[];
}

export interface Top10Item {
  rank: number;
  name: string;
  value?: string;
  alternatives?: string[];
  saga?: string;
  sagaItems?: string[];
}

export interface SagaChoice {
  sagaName: string;
  availableItems: Top10Item[];
}

export const top10Categories: Top10Category[] = [
  {
    id: 'films-nominations-oscars',
    name: 'Films les Plus Nommés aux Oscars (Histoire)',
    description: 'Les 10 films avec le plus de nominations aux Oscars de tous les temps (1929-2024)',
    items: [
      { 
        rank: 1,
        name: 'All About Eve',
        value: '14 nominations',
        alternatives: ['all about eve', 'eve', 'bette davis']
      },
      { rank: 2, name: 'Titanic', value: '14 nominations', alternatives: ['titanic 1997', 'leonardo dicaprio', 'james cameron'] },
      { 
        rank: 3,
        name: 'La La Land',
        value: '14 nominations',
        alternatives: ['lalaland', 'la la land', 'ryan gosling', 'emma stone']
      },
      { rank: 4, name: 'Roma', value: '10 nominations', alternatives: ['roma cuaron', 'alfonso cuaron'] },
      { 
        rank: 5,
        name: 'The Shape of Water',
        value: '13 nominations',
        alternatives: ['shape of water', 'guillermo del toro']
      },
      { 
        rank: 6,
        name: 'The Revenant',
        value: '12 nominations',
        alternatives: ['revenant', 'leonardo dicaprio', 'inarritu']
      },
      { rank: 7, name: 'Lincoln', value: '12 nominations', alternatives: ['lincoln spielberg', 'daniel day lewis'] },
      { 
        rank: 8,
        name: 'Life of Pi',
        value: '11 nominations',
        alternatives: ['life of pi', 'ang lee', 'pi']
      },
      { rank: 9, name: 'Hugo', value: '11 nominations', alternatives: ['hugo scorsese', 'martin scorsese'] },
      { 
        rank: 10,
        name: 'The Curious Case of Benjamin Button',
        value: '13 nominations',
        alternatives: ['benjamin button', 'brad pitt', 'curious case']
      }
    ]
  },
  {
    id: 'films-cultes-francais',
    name: 'Films Français Cultes (Box-Office)',
    description: 'Les 10 films français les plus populaires au box-office français (1945-2024)',
    items: [
      { rank: 1, name: 'Intouchables', value: '2011 - Nakache & Toledano', alternatives: ['intouchable', 'omar sy', 'francois cluzet'] },
      { rank: 2, name: 'Amélie Poulain', value: '2001 - Jean-Pierre Jeunet', alternatives: ['amelie', 'fabuleux destin amelie poulain', 'audrey tautou'] },
      { rank: 3, name: 'Bienvenue chez les Ch\'tis', value: '2008 - Dany Boon', alternatives: ['chtis', 'bienvenue chez les chtis', 'kad merad', 'chtit', 'chtits', 'bienvenue chtis'] },
      { rank: 4, name: 'Les Visiteurs', value: '1993 - Jean-Marie Poiré', alternatives: ['visiteurs', 'jean reno', 'christian clavier'] },
      { rank: 5, name: 'Taxi', value: '1998 - Gérard Pirès', alternatives: ['taxi 1', 'samy naceri', 'freddy'] },
      { rank: 6, name: 'Astérix et Obélix: Mission Cléopâtre', value: '2002 - Alain Chabat', alternatives: ['asterix cleopatre', 'mission cleopatre', 'jamel debbouze'] },
      { rank: 7, name: 'La Grande Vadrouille', value: '1966 - Gérard Oury', alternatives: ['grande vadrouille', 'bourvil', 'louis de funes'] },
      { rank: 8, name: 'OSS 117: Le Caire, nid d\'espions', value: '2006 - Michel Hazanavicius', alternatives: ['oss 117', 'jean dujardin', 'caire'] },
      { rank: 9, name: 'Le Dîner de Cons', value: '1998 - Francis Veber', alternatives: ['diner de cons', 'le diner de cons', 'diner cons', 'thierry lhermitte', 'jacques villeret'] },
      { rank: 10, name: 'La Cité de la Peur', value: '1994 - Alain Berbérian', alternatives: ['cite de la peur', 'les nuls', 'chantal lauby', 'la cite de la peur'] }
    ]
  },
  {
    id: 'series-netflix',
    name: 'Séries Netflix les Plus Regardées (2024)',
    description: 'Les 10 séries avec le plus d\'heures de visionnage sur Netflix en 2024',
    items: [
      { rank: 1, name: 'Squid Game', value: '1,65 milliard d\'heures', alternatives: ['squid games', 'jeu du calmar'] },
      { rank: 2, name: 'Wednesday', value: '1,37 milliard d\'heures', alternatives: ['mercredi', 'wednesday addams', 'jenna ortega'] },
      { rank: 3, name: 'Stranger Things 4', value: '1,35 milliard d\'heures', alternatives: ['stranger things saison 4', 'stranger things 4'] },
      { rank: 4, name: 'Dahmer', value: '856 millions d\'heures', alternatives: ['dahmer netflix', 'jeffrey dahmer', 'evan peters'] },
      { rank: 5, name: 'Bridgerton Saison 2', value: '656 millions d\'heures', alternatives: ['bridgerton 2', 'bridgerton saison 2'] },
      { rank: 6, name: 'The Night Agent', value: '605 millions d\'heures', alternatives: ['night agent', 'agent de nuit'] },
      { rank: 7, name: 'Ginny & Georgia Saison 2', value: '582 millions d\'heures', alternatives: ['ginny georgia 2', 'ginny and georgia'] },
      { rank: 8, name: 'Lucifer Saison 5', value: '569 millions d\'heures', alternatives: ['lucifer 5', 'lucifer saison 5'] },
      { rank: 9, name: 'All of Us Are Dead', value: '560 millions d\'heures', alternatives: ['all of us are dead', 'zombies coree'] },
      { rank: 10, name: 'The Witcher Saison 1', value: '541 millions d\'heures', alternatives: ['witcher 1', 'the witcher saison 1', 'geralt'] }
    ]
  },
  {
    id: 'pays-population',
    name: 'Pays les Plus Peuplés (2024)',
    description: 'Les 10 pays avec le plus d\'habitants dans le monde selon les données 2024',
    items: [
      { rank: 1, name: 'Inde', value: '1,43 milliard', alternatives: ['india', 'hindustan'] },
      { rank: 2, name: 'Chine', value: '1,42 milliard', alternatives: ['china', 'république populaire de chine', 'rpc', 'chinois', 'pekin'] },
      { rank: 3, name: 'États-Unis', value: '340 millions', alternatives: ['usa', 'amérique', 'etats unis', 'united states', 'amerique', 'america', 'us', 'washington'] },
      { rank: 4, name: 'Indonésie', value: '278 millions', alternatives: ['indonesia', 'jakarta'] },
      { rank: 5, name: 'Pakistan', value: '240 millions', alternatives: ['islamabad', 'pakistanais'] },
      { rank: 6, name: 'Nigéria', value: '223 millions', alternatives: ['nigeria', 'lagos', 'nigerien'] },
      { rank: 7, name: 'Brésil', value: '216 millions', alternatives: ['brazil', 'bresil', 'brasilia', 'bresilien'] },
      { rank: 8, name: 'Bangladesh', value: '172 millions', alternatives: ['dhaka', 'bengladesh'] },
      { rank: 9, name: 'Russie', value: '144 millions', alternatives: ['russia', 'fédération de russie', 'moscou', 'russe'] },
      { rank: 10, name: 'Mexique', value: '132 millions', alternatives: ['mexico', 'mexicain', 'mexico city'] }
    ]
  },
  {
    id: 'jeux-video-vendus',
    name: 'Jeux Vidéo les Plus Vendus (Tous Temps)',
    description: 'Les 10 jeux vidéo avec le plus de ventes mondiales de tous les temps (données 2024)',
    items: [
      { 
        rank: 1,
        name: 'Minecraft',
        value: '300M copies',
        alternatives: ['mine craft', 'minecraft mojang', 'mojang', 'steve', 'creeper', 'blocs', 'cubes']
      },
      { 
        rank: 2,
        name: 'Grand Theft Auto V',
        value: '195M copies',
        alternatives: ['gta 5', 'gta v', 'grand theft auto 5', 'rockstar', 'los santos', 'gta', 'vol auto']
      },
      { 
        rank: 3,
        name: 'Tetris (EA)',
        value: '100M copies',
        alternatives: ['tetris classic', 'tetris original', 'tetris ea', 'tetris', 'blocs', 'puzzle', 'russe']
      },
      { 
        rank: 4,
        name: 'Wii Sports',
        value: '83M copies',
        alternatives: ['wii sport', 'nintendo wii sports', 'nintendo', 'bowling', 'tennis wii', 'sport wii']
      },
      { 
        rank: 5,
        name: 'PUBG: Battlegrounds',
        value: '75M copies',
        alternatives: ['pubg', 'playerunknown battlegrounds', 'battlegrounds', 'battle royale', 'br']
      },
      { 
        rank: 6,
        name: 'Mario Kart 8 Deluxe',
        value: '60M copies',
        alternatives: ['mario kart 8', 'mk8', 'mario kart switch', 'mario kart', 'nintendo switch', 'mario', 'kart']
      },
      { 
        rank: 7,
        name: 'Super Mario Bros.',
        value: '58M copies',
        alternatives: ['super mario brothers', 'mario bros', 'mario nes', 'mario', 'luigi', 'nintendo', 'champignon']
      },
      { 
        rank: 8,
        name: 'Red Dead Redemption 2',
        value: '55M copies',
        alternatives: ['rdr2', 'red dead 2', 'red dead redemption ii', 'arthur morgan', 'cowboy', 'western', 'far west']
      },
      { 
        rank: 9,
        name: 'Overwatch',
        value: '50M copies',
        alternatives: ['overwatch 1', 'overwatch blizzard', 'blizzard', 'tracer', 'fps', 'heros']
      },
      { 
        rank: 10,
        name: 'The Witcher 3: Wild Hunt',
        value: '50M copies',
        alternatives: ['witcher 3', 'the witcher 3', 'witcher wild hunt', 'geralt', 'cd projekt', 'sorceleur', 'rpg']
      }
    ]
  },
  {
    id: 'langues-parlees',
    name: 'Langues les Plus Parlées (Locuteurs Natifs)',
    description: 'Les 10 langues avec le plus de locuteurs natifs dans le monde (données 2024)',
    items: [
      { rank: 1, name: 'Chinois Mandarin', value: '918 millions', alternatives: ['mandarin', 'chinois', 'chinese'] },
      { rank: 2, name: 'Espagnol', value: '500 millions', alternatives: ['spanish', 'castillan', 'castellano', 'espagne', 'langue espagnole'] },
      { rank: 3, name: 'Anglais', value: '380 millions', alternatives: ['english', 'angleterre', 'langue anglaise', 'britannique'] },
      { rank: 4, name: 'Hindi', value: '341 millions', alternatives: ['hindi indien', 'inde', 'indien', 'langue indienne'] },
      { rank: 5, name: 'Arabe', value: '422 millions', alternatives: ['arabic', 'arabe standard', 'langue arabe', 'arabie'] },
      { rank: 6, name: 'Bengalî', value: '265 millions', alternatives: ['bengali', 'bangla', 'bangladesh', 'bengale'] },
      { rank: 7, name: 'Portugais', value: '260 millions', alternatives: ['portuguese', 'portugais bresilien', 'portugal', 'bresil', 'langue portugaise'] },
      { rank: 8, name: 'Russe', value: '154 millions', alternatives: ['russian', 'russie', 'langue russe', 'sovietique'] },
      { rank: 9, name: 'Japonais', value: '125 millions', alternatives: ['japanese', 'nippon', 'japon', 'langue japonaise'] },
      { rank: 10, name: 'Pendjabi', value: '113 millions', alternatives: ['punjabi', 'panjabi', 'pendjab', 'punjab'] }
    ]
  },
  {
    id: 'marques-valorisees',
    name: 'Marques les Plus Valorisées (2024)',
    description: 'Les 10 marques avec la plus grande valeur boursière mondiale selon Forbes 2024',
    items: [
      { rank: 1, name: 'Apple', value: '516 milliards $', alternatives: ['apple inc', 'iphone'] },
      { rank: 2, name: 'Microsoft', value: '340 milliards $', alternatives: ['microsoft corporation', 'windows', 'xbox', 'office'] },
      { rank: 3, name: 'Amazon', value: '308 milliards $', alternatives: ['amazon.com', 'bezos', 'aws', 'prime'] },
      { rank: 4, name: 'Google', value: '297 milliards $', alternatives: ['alphabet', 'google inc', 'youtube', 'android'] },
      { rank: 5, name: 'Samsung', value: '99 milliards $', alternatives: ['samsung electronics', 'galaxy', 'coreen'] },
      { rank: 6, name: 'Tesla', value: '97 milliards $', alternatives: ['tesla motors', 'elon musk', 'voiture electrique'] },
      { rank: 7, name: 'Meta (Facebook)', value: '89 milliards $', alternatives: ['facebook', 'meta', 'zuckerberg', 'instagram', 'whatsapp'] },
      { rank: 8, name: 'NVIDIA', value: '85 milliards $', alternatives: ['nvidia corporation', 'carte graphique', 'gpu'] },
      { rank: 9, name: 'Toyota', value: '59 milliards $', alternatives: ['toyota motor', 'japonais', 'voiture japonaise'] },
      { rank: 10, name: 'Coca-Cola', value: '57 milliards $', alternatives: ['coca cola', 'coke', 'cola', 'soda'] }
    ]
  },
  {
    id: 'sports-populaires',
    name: 'Sports les Plus Populaires (Fans Mondiaux)',
    description: 'Les 10 sports avec le plus de fans et pratiquants dans le monde (estimation 2024)',
    items: [
      { rank: 1, name: 'Football', value: '4 milliards de fans', alternatives: ['soccer', 'foot', 'football association'] },
      { rank: 2, name: 'Cricket', value: '2,5 milliards de fans', alternatives: ['cricket anglais', 'batte cricket'] },
      { rank: 3, name: 'Hockey sur gazon', value: '2 milliards de fans', alternatives: ['field hockey', 'hockey', 'hockey gazon', 'hockey herbe'] },
      { rank: 4, name: 'Tennis', value: '1 milliard de fans', alternatives: ['tennis de court', 'raquette', 'roland garros', 'wimbledon'] },
      { rank: 5, name: 'Volleyball', value: '900 millions de fans', alternatives: ['volley', 'volley ball', 'beach volley'] },
      { rank: 6, name: 'Tennis de table', value: '875 millions de fans', alternatives: ['ping pong', 'ping-pong', 'raquette ping pong'] },
      { rank: 7, name: 'Basketball', value: '825 millions de fans', alternatives: ['basket', 'basket ball', 'nba', 'panier basket'] },
      { rank: 8, name: 'Baseball', value: '500 millions de fans', alternatives: ['base ball', 'batte baseball', 'mlb'] },
      { rank: 9, name: 'Rugby', value: '475 millions de fans', alternatives: ['rugby union', 'ovale', 'ballon ovale'] },
      { rank: 10, name: 'Golf', value: '450 millions de fans', alternatives: ['club golf', 'balle golf', 'green'] }
    ]
  },
  {
    id: 'youtubers-francais',
    name: 'YouTubeurs Français les Plus Suivis (2024)',
    description: 'Les 10 créateurs de contenu français avec le plus d\'abonnés YouTube en 2024',
    items: [
      { rank: 1, name: 'Squeezie', value: '18,5M abonnés', alternatives: ['lucas hauchard', 'squeezie gaming'] },
      { rank: 2, name: 'Cyprien', value: '14,2M abonnés', alternatives: ['cyprien iov', 'monsieur dream'] },
      { rank: 3, name: 'Norman', value: '12,1M abonnés', alternatives: ['norman fait des videos', 'norman thavaud'] },
      { rank: 4, name: 'Tibo InShape', value: '8,9M abonnés', alternatives: ['tibo inshape', 'thibaud delapart'] },
      { rank: 5, name: 'Amixem', value: '7,8M abonnés', alternatives: ['maxime chabroud'] },
      { rank: 6, name: 'Rémi Gaillard', value: '7,2M abonnés', alternatives: ['remi gaillard', 'gaillard'] },
      { rank: 7, name: 'Michou', value: '7,1M abonnés', alternatives: ['michou youtube'] },
      { rank: 8, name: 'Inoxtag', value: '6,8M abonnés', alternatives: ['inox tag'] },
      { rank: 9, name: 'McFly et Carlito', value: '6,5M abonnés', alternatives: ['mcfly carlito', 'david coscas', 'raphael carlier'] },
      { rank: 10, name: 'Gotaga', value: '4,2M abonnés', alternatives: ['corentin houssein', 'gotaga twitch'] }
    ]
  },
  {
    id: 'artistes-spotify',
    name: 'Artistes les Plus Streamés Spotify (2024)',
    description: 'Les 10 artistes avec le plus d\'écoutes mensuelles sur Spotify en 2024',
    items: [
      { rank: 1, name: 'The Weeknd', value: '107M écoutes/mois', alternatives: ['weeknd', 'abel tesfaye'] },
      { rank: 2, name: 'Taylor Swift', value: '95M écoutes/mois', alternatives: ['taylor', 'swift'] },
      { rank: 3, name: 'Bad Bunny', value: '88M écoutes/mois', alternatives: ['bad bunny reggaeton'] },
      { rank: 4, name: 'Drake', value: '85M écoutes/mois', alternatives: ['drake rapper'] },
      { rank: 5, name: 'Ariana Grande', value: '82M écoutes/mois', alternatives: ['ariana', 'grande'] },
      { rank: 6, name: 'Ed Sheeran', value: '79M écoutes/mois', alternatives: ['ed', 'sheeran'] },
      { rank: 7, name: 'Justin Bieber', value: '77M écoutes/mois', alternatives: ['bieber', 'justin'] },
      { rank: 8, name: 'Billie Eilish', value: '74M écoutes/mois', alternatives: ['billie', 'eilish'] },
      { rank: 9, name: 'Dua Lipa', value: '72M écoutes/mois', alternatives: ['dua', 'lipa'] },
      { rank: 10, name: 'Post Malone', value: '70M écoutes/mois', alternatives: ['post malone', 'malone'] }
    ]
  },
  {
    id: 'jeux-mobiles',
    name: 'Jeux Mobiles les Plus Téléchargés (Tous Temps)',
    description: 'Les 10 jeux mobiles avec le plus de téléchargements de tous les temps (données 2024)',
    items: [
      { rank: 1, name: 'Subway Surfers', value: '4 milliards', alternatives: ['subway surfer'] },
      { rank: 2, name: 'PUBG Mobile', value: '1,3 milliard', alternatives: ['pubg mobile', 'battlegrounds mobile'] },
      { rank: 3, name: 'Candy Crush Saga', value: '1,1 milliard', alternatives: ['candy crush', 'crush saga'] },
      { rank: 4, name: 'Free Fire', value: '1 milliard', alternatives: ['garena free fire', 'free fire garena'] },
      { rank: 5, name: 'Roblox', value: '900 millions', alternatives: ['roblox mobile'] },
      { rank: 6, name: 'Among Us', value: '500 millions', alternatives: ['among us mobile'] },
      { rank: 7, name: 'Temple Run 2', value: '500 millions', alternatives: ['temple run', 'temple run 2'] },
      { rank: 8, name: 'Clash of Clans', value: '500 millions', alternatives: ['clash clans', 'coc'] },
      { rank: 9, name: 'Pokémon GO', value: '500 millions', alternatives: ['pokemon go', 'pokemon mobile'] },
      { rank: 10, name: 'Clash Royale', value: '500 millions', alternatives: ['clash royale', 'royale'] }
    ]
  },
  {
    id: 'rappeurs-francais',
    name: 'Rappeurs Français les Plus Populaires (2024)',
    description: 'Les 10 rappeurs français les plus écoutés sur les plateformes de streaming en 2024',
    items: [
      { rank: 1, name: 'Jul', value: 'Marseille, 30+ albums', alternatives: ['jul marseille', 'jul rap'] },
      { rank: 2, name: 'PNL', value: 'Duo, Ademo & N.O.S', alternatives: ['pnl rap', 'ademo nos'] },
      { rank: 3, name: 'Ninho', value: 'Essonne, M.I.L.S', alternatives: ['ninho rap'] },
      { rank: 4, name: 'SCH', value: 'Marseille, JVLIVS', alternatives: ['sch rap', 'sch marseille'] },
      { rank: 5, name: 'Nekfeu', value: '1995, Feu', alternatives: ['nekfeu rap'] },
      { rank: 6, name: 'Booba', value: 'B2O, Duc de Boulogne', alternatives: ['booba rap', 'b2o'] },
      { rank: 7, name: 'Damso', value: 'Belgique, 92i', alternatives: ['damso rap', 'damso belge'] },
      { rank: 8, name: 'Orelsan', value: 'Caen, OrelSan', alternatives: ['orelsan rap', 'orel san'] },
      { rank: 9, name: 'Gazo', value: 'Drill français', alternatives: ['gazo drill', 'gazo rap'] },
      { rank: 10, name: 'Freeze Corleone', value: 'LMF, 667', alternatives: ['freeze corleone', 'lmf'] }
    ]
  }
];

// Fonction pour sélection aléatoire
export const getRandomCategory = (): Top10Category => {
  return top10Categories[Math.floor(Math.random() * top10Categories.length)];
};

export const getDrinksForRank = (rank: number): number => {
  if (rank === 1) return 15;
  if (rank === 2) return 12;
  if (rank === 3) return 10;
  if (rank === 4) return 8;
  if (rank === 5) return 6;
  if (rank >= 6 && rank <= 8) return 4;
  if (rank >= 9 && rank <= 10) return 2;
  return 0;
};

// Fonction de fuzzy matching améliorée
export const fuzzyMatch = (input: string, target: string, alternatives: string[] = []): boolean => {
  const normalize = (str: string) => 
    str.toLowerCase()
       .trim()
       // Normaliser les accents
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       // Remplacer la ponctuation par des espaces
       .replace(/[^\w\s]/g, ' ')
       // Supprimer les articles courants
       .replace(/\b(le|la|les|un|une|des|du|de|d|l)\b/g, ' ')
       // Normaliser les espaces
       .replace(/\s+/g, ' ');
  
  const normalizedInput = normalize(input);
  const normalizedTarget = normalize(target);
  
  console.log('Matching:', { input, normalizedInput, target, normalizedTarget });
  
  // Correspondance exacte
  if (normalizedInput === normalizedTarget) return true;
  
  // Vérifier les alternatives
  for (const alt of alternatives) {
    const normalizedAlt = normalize(alt);
    console.log('Checking alternative:', { alt, normalizedAlt });
    if (normalizedInput === normalizedAlt) return true;
  }
  
  // Correspondance partielle avec tolérance aux fautes
  const inputWords = normalizedInput.split(' ');
  const targetWords = normalizedTarget.split(' ');
  
  // Filtrer les mots importants (longueur > 2)
  const importantWords = targetWords.filter(word => word.length > 2);
  if (importantWords.length === 0) return false;
  
  // Vérifier chaque mot important
  const matchedWords = importantWords.filter(word => 
    inputWords.some(inputWord => {
      // Correspondance exacte
      if (inputWord === word) return true;
      
      // Tolérance aux fautes pour les mots de 4+ caractères
      if (word.length >= 4 && inputWord.length >= 3) {
        const maxDistance = Math.floor(word.length * 0.25); // 25% de tolérance
        return levenshteinDistance(inputWord, word) <= maxDistance;
      }
      
      // Pour les mots courts, correspondance exacte requise
      return false;
    })
  );
  
  console.log('Word matching:', { importantWords, matchedWords, inputWords });
  
  // Ratio de correspondance plus strict
  const matchRatio = matchedWords.length / importantWords.length;
  if (matchRatio >= 0.8) return true; // 80% des mots doivent matcher
  
  // Vérifier les alternatives avec correspondance partielle
  for (const alt of alternatives) {
    const normalizedAlt = normalize(alt);
    if (normalizedInput === normalizedAlt) return true;
    
    const altWords = normalizedAlt.split(' ');
    const importantAltWords = altWords.filter(word => word.length > 2);
    if (importantAltWords.length === 0) continue;
    
    const matchedAltWords = importantAltWords.filter(word => 
      inputWords.some(inputWord => 
        inputWord === word ||
        (word.length >= 4 && inputWord.length >= 3 && 
         levenshteinDistance(inputWord, word) <= Math.floor(word.length * 0.25))
      )
    );
    
    if (altMatchRatio >= 0.8) return true;
  }
  
  return false;
};

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Fonction pour détecter si l'input correspond à une saga
export const detectSaga = (input: string, categories: Top10Category[]): SagaChoice | null => {
  const normalize = (str: string) => 
    str.toLowerCase()
       .trim()
       .replace(/[^\w\s]/g, '')
       .replace(/\s+/g, ' ');
  
  const normalizedInput = normalize(input);
  
  // Chercher dans toutes les catégories
  for (const category of categories) {
    for (const item of category.items) {
      if (item.saga && item.sagaItems) {
        const sagaName = normalize(item.saga);
        
        // Vérifier si l'input correspond au nom de la saga
        if (normalizedInput.includes(sagaName) || sagaName.includes(normalizedInput)) {
          // Retourner tous les films de cette saga qui sont dans le top 10
          const availableItems = category.items.filter(categoryItem => 
            categoryItem.saga === item.saga && 
            item.sagaItems!.includes(categoryItem.name)
          );
          
          if (availableItems.length > 1) {
            return {
              sagaName: item.saga,
              availableItems
            };
          }
        }
      }
    }
  }
  
  return null;
};

// Fonction pour vérifier si l'input correspond à un nom de saga générique
export const isSagaInput = (input: string): boolean => {
  const normalize = (str: string) => 
    str.toLowerCase()
       .trim()
       .replace(/[^\w\s]/g, '')
       .replace(/\s+/g, ' ');
  
  const normalizedInput = normalize(input);
  const sagaKeywords = ['avatar', 'avengers', 'star wars', 'jurassic'];
  
  return sagaKeywords.some(keyword => 
    normalizedInput === keyword || 
    (normalizedInput.includes(keyword) && normalizedInput.split(' ').length <= 2)
  );
};