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
      { rank: 1, name: 'Avatar', value: '2,9 milliards $', alternatives: ['avatar 2009', 'avatar 1'] },
      { rank: 2, name: 'Avengers: Endgame', value: '2,8 milliards $', alternatives: ['endgame', 'avengers endgame', 'avengers 4'] },
      { rank: 3, name: 'Avatar: La Voie de l\'eau', value: '2,3 milliards $', alternatives: ['avatar 2', 'avatar la voie de l\'eau', 'avatar way of water'] },
      { rank: 4, name: 'Titanic', value: '2,2 milliards $', alternatives: ['titanic 1997'] },
      { rank: 5, name: 'Star Wars: Le Réveil de la Force', value: '2,1 milliards $', alternatives: ['star wars 7', 'le réveil de la force', 'force awakens'] },
      { rank: 6, name: 'Avengers: Infinity War', value: '2,0 milliards $', alternatives: ['infinity war', 'avengers infinity war', 'avengers 3'] },
      { rank: 7, name: 'Spider-Man: No Way Home', value: '1,9 milliards $', alternatives: ['spiderman no way home', 'no way home', 'spider man 3'] },
      { rank: 8, name: 'Jurassic World', value: '1,7 milliards $', alternatives: ['jurassic world 1'] },
      { rank: 9, name: 'Le Roi Lion (2019)', value: '1,7 milliards $', alternatives: ['roi lion', 'le roi lion', 'lion king'] },
      { rank: 10, name: 'The Avengers', value: '1,5 milliards $', alternatives: ['avengers', 'avengers 1', 'avengers 2012'] }
    ]
  },
  {
    id: 'pays-population',
    name: 'Pays les Plus Peuplés',
    description: 'Les 10 pays avec le plus d\'habitants dans le monde',
    items: [
      { rank: 1, name: 'Chine', value: '1,4 milliard', alternatives: ['china', 'république populaire de chine'] },
      { rank: 2, name: 'Inde', value: '1,4 milliard', alternatives: ['india'] },
      { rank: 3, name: 'États-Unis', value: '331 millions', alternatives: ['usa', 'amérique', 'etats unis', 'united states'] },
      { rank: 4, name: 'Indonésie', value: '273 millions', alternatives: ['indonesia'] },
      { rank: 5, name: 'Pakistan', value: '225 millions' },
      { rank: 6, name: 'Brésil', value: '215 millions', alternatives: ['brazil', 'bresil'] },
      { rank: 7, name: 'Nigeria', value: '211 millions' },
      { rank: 8, name: 'Bangladesh', value: '166 millions' },
      { rank: 9, name: 'Russie', value: '146 millions', alternatives: ['russia', 'fédération de russie'] },
      { rank: 10, name: 'Mexique', value: '130 millions', alternatives: ['mexico'] }
    ]
  },
  {
    id: 'jeux-video-vendus',
    name: 'Jeux Vidéo les Plus Vendus',
    description: 'Les 10 jeux vidéo avec le plus de ventes mondiales',
    items: [
      { rank: 1, name: 'Minecraft', value: '300M copies', alternatives: ['mine craft'] },
      { rank: 2, name: 'Grand Theft Auto V', value: '190M copies', alternatives: ['gta 5', 'gta v', 'grand theft auto 5'] },
      { rank: 3, name: 'Tetris', value: '100M copies', alternatives: ['tetris classic'] },
      { rank: 4, name: 'Wii Sports', value: '83M copies', alternatives: ['wii sport'] },
      { rank: 5, name: 'PUBG', value: '75M copies', alternatives: ['playerunknown battlegrounds', 'pubg battlegrounds', 'battlegrounds'] },
      { rank: 6, name: 'Mario Kart 8', value: '70M copies', alternatives: ['mario kart 8 deluxe', 'mk8'] },
      { rank: 7, name: 'Super Mario Bros.', value: '58M copies', alternatives: ['super mario brothers', 'mario bros'] },
      { rank: 8, name: 'Red Dead Redemption 2', value: '55M copies', alternatives: ['rdr2', 'red dead 2'] },
      { rank: 9, name: 'Overwatch', value: '50M copies', alternatives: ['overwatch 1'] },
      { rank: 10, name: 'The Witcher 3', value: '50M copies', alternatives: ['witcher 3', 'the witcher 3 wild hunt', 'witcher'] }
    ]
  },
  {
    id: 'langues-parlees',
    name: 'Langues les Plus Parlées',
    description: 'Les 10 langues avec le plus de locuteurs natifs',
    items: [
      { rank: 1, name: 'Chinois Mandarin', value: '918 millions', alternatives: ['mandarin', 'chinois', 'chinese'] },
      { rank: 2, name: 'Espagnol', value: '460 millions', alternatives: ['spanish', 'castillan'] },
      { rank: 3, name: 'Anglais', value: '379 millions', alternatives: ['english'] },
      { rank: 4, name: 'Hindi', value: '341 millions' },
      { rank: 5, name: 'Arabe', value: '422 millions', alternatives: ['arabic'] },
      { rank: 6, name: 'Bengalî', value: '228 millions', alternatives: ['bengali'] },
      { rank: 7, name: 'Portugais', value: '258 millions', alternatives: ['portuguese'] },
      { rank: 8, name: 'Russe', value: '154 millions', alternatives: ['russian'] },
      { rank: 9, name: 'Japonais', value: '128 millions', alternatives: ['japanese'] },
      { rank: 10, name: 'Pendjabi', value: '92 millions', alternatives: ['punjabi'] }
    ]
  },
  {
    id: 'marques-valorisees',
    name: 'Marques les Plus Valorisées',
    description: 'Les 10 marques avec la plus grande valeur mondiale',
    items: [
      { rank: 1, name: 'Apple', value: '482 milliards $' },
      { rank: 2, name: 'Microsoft', value: '278 milliards $' },
      { rank: 3, name: 'Amazon', value: '274 milliards $' },
      { rank: 4, name: 'Google', value: '251 milliards $', alternatives: ['alphabet'] },
      { rank: 5, name: 'Samsung', value: '107 milliards $' },
      { rank: 6, name: 'Tesla', value: '106 milliards $' },
      { rank: 7, name: 'Facebook', value: '101 milliards $', alternatives: ['meta'] },
      { rank: 8, name: 'Toyota', value: '59 milliards $' },
      { rank: 9, name: 'Mercedes-Benz', value: '56 milliards $', alternatives: ['mercedes'] },
      { rank: 10, name: 'McDonald\'s', value: '51 milliards $', alternatives: ['mcdo', 'mcdonalds'] }
    ]
  },
  {
    id: 'sports-populaires',
    name: 'Sports les Plus Populaires',
    description: 'Les 10 sports avec le plus de fans dans le monde',
    items: [
      { rank: 1, name: 'Football', value: '4 milliards de fans', alternatives: ['soccer', 'foot'] },
      { rank: 2, name: 'Cricket', value: '2,5 milliards de fans' },
      { rank: 3, name: 'Hockey sur gazon', value: '2 milliards de fans', alternatives: ['field hockey', 'hockey'] },
      { rank: 4, name: 'Tennis', value: '1 milliard de fans' },
      { rank: 5, name: 'Volleyball', value: '900 millions de fans', alternatives: ['volley'] },
      { rank: 6, name: 'Tennis de table', value: '875 millions de fans', alternatives: ['ping pong'] },
      { rank: 7, name: 'Basketball', value: '825 millions de fans', alternatives: ['basket'] },
      { rank: 8, name: 'Baseball', value: '500 millions de fans' },
      { rank: 9, name: 'Rugby', value: '475 millions de fans' },
      { rank: 10, name: 'Golf', value: '450 millions de fans' }
    ]
  }
];

export const getDrinksForRank = (rank: number): number => {
  if (rank === 1) return 15;
  if (rank === 2) return 10;
  if (rank === 3) return 8;
  if (rank === 4) return 6;
  if (rank === 5) return 5;
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