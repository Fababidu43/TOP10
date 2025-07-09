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
}

export const top10Categories: Top10Category[] = [
  {
    id: 'films-box-office',
    name: 'Films au Box-Office Mondial',
    description: 'Les 10 films ayant rapporté le plus d\'argent au cinéma',
    items: [
      { rank: 1, name: 'Avatar (2009)', value: '2,9 milliards $', alternatives: ['avatar 2009', 'avatar 1', 'avatar james cameron'] },
      { rank: 2, name: 'Avengers: Endgame', value: '2,8 milliards $', alternatives: ['endgame', 'avengers endgame', 'avengers 4'] },
      { rank: 3, name: 'Avatar: La Voie de l\'eau', value: '2,3 milliards $', alternatives: ['avatar 2', 'avatar la voie de l\'eau', 'avatar way of water'] },
      { rank: 4, name: 'Titanic (1997)', value: '2,2 milliards $', alternatives: ['titanic 1997', 'titanic leonardo'] },
      { rank: 5, name: 'Star Wars: Le Réveil de la Force', value: '2,1 milliards $', alternatives: ['star wars 7', 'le réveil de la force', 'force awakens', 'episode 7'] },
      { rank: 6, name: 'Avengers: Infinity War', value: '2,0 milliards $', alternatives: ['infinity war', 'avengers infinity war', 'avengers 3'] },
      { rank: 7, name: 'Spider-Man: No Way Home', value: '1,9 milliards $', alternatives: ['spiderman no way home', 'no way home', 'spider man 3 tom holland'] },
      { rank: 8, name: 'Jurassic World (2015)', value: '1,7 milliards $', alternatives: ['jurassic world 1', 'jurassic world 2015'] },
      { rank: 9, name: 'Le Roi Lion (2019)', value: '1,7 milliards $', alternatives: ['roi lion', 'le roi lion', 'lion king 2019', 'roi lion remake'] },
      { rank: 10, name: 'The Avengers (2012)', value: '1,5 milliards $', alternatives: ['avengers', 'avengers 1', 'avengers 2012', 'premier avengers'] }
    ]
  },
  {
    id: 'series-netflix',
    name: 'Séries Netflix les Plus Regardées',
    description: 'Les 10 séries les plus populaires sur Netflix',
    items: [
      { rank: 1, name: 'Squid Game', value: '1,65 milliard d\'heures', alternatives: ['squid games', 'jeu du calmar'] },
      { rank: 2, name: 'Stranger Things 4', value: '1,35 milliard d\'heures', alternatives: ['stranger things saison 4', 'stranger things 4'] },
      { rank: 3, name: 'Dahmer', value: '856 millions d\'heures', alternatives: ['dahmer netflix', 'jeffrey dahmer'] },
      { rank: 4, name: 'Bridgerton Saison 2', value: '656 millions d\'heures', alternatives: ['bridgerton 2', 'bridgerton saison 2'] },
      { rank: 5, name: 'Stranger Things 3', value: '582 millions d\'heures', alternatives: ['stranger things saison 3', 'stranger things 3'] },
      { rank: 6, name: 'Lucifer Saison 5', value: '569 millions d\'heures', alternatives: ['lucifer 5', 'lucifer saison 5'] },
      { rank: 7, name: 'All of Us Are Dead', value: '560 millions d\'heures', alternatives: ['all of us are dead', 'zombies coree'] },
      { rank: 8, name: 'The Witcher Saison 1', value: '541 millions d\'heures', alternatives: ['witcher 1', 'the witcher saison 1', 'geralt'] },
      { rank: 9, name: 'Inventing Anna', value: '511 millions d\'heures', alternatives: ['inventing anna', 'anna delvey'] },
      { rank: 10, name: 'The Umbrella Academy Saison 2', value: '434 millions d\'heures', alternatives: ['umbrella academy 2', 'umbrella academy saison 2'] }
    ]
  },
  {
    id: 'pays-population',
    name: 'Pays les Plus Peuplés',
    description: 'Les 10 pays avec le plus d\'habitants dans le monde',
    items: [
      { rank: 1, name: 'Chine', value: '1,4 milliard', alternatives: ['china', 'république populaire de chine', 'rpc'] },
      { rank: 2, name: 'Inde', value: '1,4 milliard', alternatives: ['india', 'hindustan'] },
      { rank: 3, name: 'États-Unis', value: '331 millions', alternatives: ['usa', 'amérique', 'etats unis', 'united states', 'amerique'] },
      { rank: 4, name: 'Indonésie', value: '273 millions', alternatives: ['indonesia'] },
      { rank: 5, name: 'Pakistan', value: '225 millions' },
      { rank: 6, name: 'Brésil', value: '215 millions', alternatives: ['brazil', 'bresil'] },
      { rank: 7, name: 'Nigeria', value: '211 millions' },
      { rank: 8, name: 'Bangladesh', value: '166 millions' },
      { rank: 9, name: 'Russie', value: '146 millions', alternatives: ['russia', 'fédération de russie', 'urss'] },
      { rank: 10, name: 'Mexique', value: '130 millions', alternatives: ['mexico'] }
    ]
  },
  {
    id: 'jeux-video-vendus',
    name: 'Jeux Vidéo les Plus Vendus',
    description: 'Les 10 jeux vidéo avec le plus de ventes mondiales',
    items: [
      { rank: 1, name: 'Minecraft', value: '300M copies', alternatives: ['mine craft', 'minecraft mojang'] },
      { rank: 2, name: 'Grand Theft Auto V', value: '190M copies', alternatives: ['gta 5', 'gta v', 'grand theft auto 5'] },
      { rank: 3, name: 'Tetris', value: '100M copies', alternatives: ['tetris classic', 'tetris original'] },
      { rank: 4, name: 'Wii Sports', value: '83M copies', alternatives: ['wii sport', 'nintendo wii sports'] },
      { rank: 5, name: 'PUBG', value: '75M copies', alternatives: ['playerunknown battlegrounds', 'pubg battlegrounds', 'battlegrounds'] },
      { rank: 6, name: 'Mario Kart 8 Deluxe', value: '70M copies', alternatives: ['mario kart 8', 'mk8', 'mario kart switch'] },
      { rank: 7, name: 'Super Mario Bros.', value: '58M copies', alternatives: ['super mario brothers', 'mario bros', 'mario nes'] },
      { rank: 8, name: 'Red Dead Redemption 2', value: '55M copies', alternatives: ['rdr2', 'red dead 2', 'red dead redemption ii'] },
      { rank: 9, name: 'Overwatch', value: '50M copies', alternatives: ['overwatch 1', 'overwatch blizzard'] },
      { rank: 10, name: 'The Witcher 3: Wild Hunt', value: '50M copies', alternatives: ['witcher 3', 'the witcher 3', 'witcher wild hunt'] }
    ]
  },
  {
    id: 'langues-parlees',
    name: 'Langues les Plus Parlées',
    description: 'Les 10 langues avec le plus de locuteurs natifs',
    items: [
      { rank: 1, name: 'Chinois Mandarin', value: '918 millions', alternatives: ['mandarin', 'chinois', 'chinese'] },
      { rank: 2, name: 'Espagnol', value: '460 millions', alternatives: ['spanish', 'castillan', 'castellano'] },
      { rank: 3, name: 'Anglais', value: '379 millions', alternatives: ['english'] },
      { rank: 4, name: 'Hindi', value: '341 millions', alternatives: ['hindi indien'] },
      { rank: 5, name: 'Arabe', value: '422 millions', alternatives: ['arabic', 'arabe standard'] },
      { rank: 6, name: 'Bengalî', value: '228 millions', alternatives: ['bengali', 'bangla'] },
      { rank: 7, name: 'Portugais', value: '258 millions', alternatives: ['portuguese', 'portugais bresilien'] },
      { rank: 8, name: 'Russe', value: '154 millions', alternatives: ['russian', 'russe'] },
      { rank: 9, name: 'Japonais', value: '128 millions', alternatives: ['japanese', 'nippon'] },
      { rank: 10, name: 'Pendjabi', value: '92 millions', alternatives: ['punjabi', 'panjabi'] }
    ]
  },
  {
    id: 'marques-valorisees',
    name: 'Marques les Plus Valorisées',
    description: 'Les 10 marques avec la plus grande valeur mondiale',
    items: [
      { rank: 1, name: 'Apple', value: '482 milliards $', alternatives: ['apple inc', 'iphone'] },
      { rank: 2, name: 'Microsoft', value: '278 milliards $', alternatives: ['microsoft corporation', 'windows'] },
      { rank: 3, name: 'Amazon', value: '274 milliards $', alternatives: ['amazon.com', 'bezos'] },
      { rank: 4, name: 'Google', value: '251 milliards $', alternatives: ['alphabet', 'google inc'] },
      { rank: 5, name: 'Samsung', value: '107 milliards $', alternatives: ['samsung electronics'] },
      { rank: 6, name: 'Tesla', value: '106 milliards $', alternatives: ['tesla motors', 'elon musk'] },
      { rank: 7, name: 'Meta (Facebook)', value: '101 milliards $', alternatives: ['facebook', 'meta', 'zuckerberg'] },
      { rank: 8, name: 'Toyota', value: '59 milliards $', alternatives: ['toyota motor'] },
      { rank: 9, name: 'Mercedes-Benz', value: '56 milliards $', alternatives: ['mercedes', 'mercedes benz'] },
      { rank: 10, name: 'McDonald\'s', value: '51 milliards $', alternatives: ['mcdo', 'mcdonalds', 'mac do'] }
    ]
  },
  {
    id: 'sports-populaires',
    name: 'Sports les Plus Populaires',
    description: 'Les 10 sports avec le plus de fans dans le monde',
    items: [
      { rank: 1, name: 'Football', value: '4 milliards de fans', alternatives: ['soccer', 'foot', 'football association'] },
      { rank: 2, name: 'Cricket', value: '2,5 milliards de fans', alternatives: ['cricket anglais'] },
      { rank: 3, name: 'Hockey sur gazon', value: '2 milliards de fans', alternatives: ['field hockey', 'hockey'] },
      { rank: 4, name: 'Tennis', value: '1 milliard de fans', alternatives: ['tennis de court'] },
      { rank: 5, name: 'Volleyball', value: '900 millions de fans', alternatives: ['volley', 'volley ball'] },
      { rank: 6, name: 'Tennis de table', value: '875 millions de fans', alternatives: ['ping pong', 'ping-pong'] },
      { rank: 7, name: 'Basketball', value: '825 millions de fans', alternatives: ['basket', 'basket ball'] },
      { rank: 8, name: 'Baseball', value: '500 millions de fans', alternatives: ['base ball'] },
      { rank: 9, name: 'Rugby', value: '475 millions de fans', alternatives: ['rugby union'] },
      { rank: 10, name: 'Golf', value: '450 millions de fans' }
    ]
  },
  {
    id: 'youtubers-francais',
    name: 'YouTubeurs Français les Plus Suivis',
    description: 'Les 10 créateurs français avec le plus d\'abonnés',
    items: [
      { rank: 1, name: 'Squeezie', value: '18M abonnés', alternatives: ['lucas hauchard', 'squeezie gaming'] },
      { rank: 2, name: 'Cyprien', value: '14M abonnés', alternatives: ['cyprien iov', 'monsieur dream'] },
      { rank: 3, name: 'Norman', value: '12M abonnés', alternatives: ['norman fait des videos', 'norman thavaud'] },
      { rank: 4, name: 'Rémi Gaillard', value: '7M abonnés', alternatives: ['remi gaillard', 'gaillard'] },
      { rank: 5, name: 'Tibo InShape', value: '8M abonnés', alternatives: ['tibo inshape', 'thibaud delapart'] },
      { rank: 6, name: 'Michou', value: '7M abonnés', alternatives: ['michou youtube'] },
      { rank: 7, name: 'Gotaga', value: '4M abonnés', alternatives: ['corentin houssein', 'gotaga twitch'] },
      { rank: 8, name: 'Amixem', value: '7M abonnés', alternatives: ['maxime chabroud'] },
      { rank: 9, name: 'Inoxtag', value: '6M abonnés', alternatives: ['inox tag'] },
      { rank: 10, name: 'McFly et Carlito', value: '6M abonnés', alternatives: ['mcfly carlito', 'david coscas', 'raphael carlier'] }
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
       .replace(/[^\w\s]/g, '')
       .replace(/\s+/g, ' ');
  
  const normalizedInput = normalize(input);
  const normalizedTarget = normalize(target);
  
  // Correspondance exacte
  if (normalizedInput === normalizedTarget) return true;
  
  // Vérifier les alternatives
  for (const alt of alternatives) {
    if (normalizedInput === normalize(alt)) return true;
  }
  
  // Correspondance partielle (contient le mot principal)
  const inputWords = normalizedInput.split(' ');
  const targetWords = normalizedTarget.split(' ');
  
  // Si l'input contient tous les mots importants du target
  const importantWords = targetWords.filter(word => word.length > 2);
  const matchedWords = importantWords.filter(word => 
    inputWords.some(inputWord => 
      inputWord.includes(word) || word.includes(inputWord) || 
      levenshteinDistance(inputWord, word) <= 1
    )
  );
  
  if (matchedWords.length >= Math.min(2, importantWords.length)) return true;
  
  // Vérifier les alternatives avec correspondance partielle
  for (const alt of alternatives) {
    const normalizedAlt = normalize(alt);
    const altWords = normalizedAlt.split(' ');
    const importantAltWords = altWords.filter(word => word.length > 2);
    const matchedAltWords = importantAltWords.filter(word => 
      inputWords.some(inputWord => 
        inputWord.includes(word) || word.includes(inputWord) ||
        levenshteinDistance(inputWord, word) <= 1
      )
    );
    
    if (matchedAltWords.length >= Math.min(1, importantAltWords.length)) return true;
  }
  
  // Distance de Levenshtein pour les mots courts
  if (normalizedInput.length <= 6 && normalizedTarget.length <= 6) {
    return levenshteinDistance(normalizedInput, normalizedTarget) <= 2;
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