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
        value: '14 nominations'
      },
      { rank: 2, name: 'Titanic', value: '14 nominations' },
      { 
        rank: 3,
        name: 'La La Land',
        value: '14 nominations'
      },
      { rank: 4, name: 'Roma', value: '10 nominations' },
      { 
        rank: 5,
        name: 'The Shape of Water',
        value: '13 nominations'
      },
      { 
        rank: 6,
        name: 'The Revenant',
        value: '12 nominations'
      },
      { rank: 7, name: 'Lincoln', value: '12 nominations' },
      { 
        rank: 8,
        name: 'Life of Pi',
        value: '11 nominations'
      },
      { rank: 9, name: 'Hugo', value: '11 nominations' },
      { 
        rank: 10,
        name: 'The Curious Case of Benjamin Button',
        value: '13 nominations'
      }
    ]
  },
  {
    id: 'films-cultes-francais',
    name: 'Films Français Cultes (Box-Office)',
    description: 'Les 10 films français les plus populaires au box-office français (1945-2024)',
    items: [
      { rank: 1, name: 'Intouchables', value: '2011 - Nakache & Toledano' },
      { rank: 2, name: 'Amélie Poulain', value: '2001 - Jean-Pierre Jeunet' },
      { rank: 3, name: 'Bienvenue chez les Ch\'tis', value: '2008 - Dany Boon' },
      { rank: 4, name: 'Les Visiteurs', value: '1993 - Jean-Marie Poiré' },
      { rank: 5, name: 'Taxi', value: '1998 - Gérard Pirès' },
      { rank: 6, name: 'Astérix et Obélix: Mission Cléopâtre', value: '2002 - Alain Chabat' },
      { rank: 7, name: 'La Grande Vadrouille', value: '1966 - Gérard Oury' },
      { rank: 8, name: 'OSS 117: Le Caire, nid d\'espions', value: '2006 - Michel Hazanavicius' },
      { rank: 9, name: 'Le Dîner de Cons', value: '1998 - Francis Veber' },
      { rank: 10, name: 'La Cité de la Peur', value: '1994 - Alain Berbérian' }
    ]
  },
  {
    id: 'series-netflix',
    name: 'Séries Netflix les Plus Regardées (2024)',
    description: 'Les 10 séries avec le plus d\'heures de visionnage sur Netflix en 2024',
    items: [
      { rank: 1, name: 'Squid Game', value: '1,65 milliard d\'heures' },
      { rank: 2, name: 'Wednesday', value: '1,37 milliard d\'heures' },
      { rank: 3, name: 'Stranger Things 4', value: '1,35 milliard d\'heures' },
      { rank: 4, name: 'Dahmer', value: '856 millions d\'heures' },
      { rank: 5, name: 'Bridgerton Saison 2', value: '656 millions d\'heures' },
      { rank: 6, name: 'The Night Agent', value: '605 millions d\'heures' },
      { rank: 7, name: 'Ginny & Georgia Saison 2', value: '582 millions d\'heures' },
      { rank: 8, name: 'Lucifer Saison 5', value: '569 millions d\'heures' },
      { rank: 9, name: 'All of Us Are Dead', value: '560 millions d\'heures' },
      { rank: 10, name: 'The Witcher Saison 1', value: '541 millions d\'heures' }
    ]
  },
  {
    id: 'pays-population',
    name: 'Pays les Plus Peuplés (2024)',
    description: 'Les 10 pays avec le plus d\'habitants dans le monde selon les données 2024',
    items: [
      { rank: 1, name: 'Inde', value: '1,43 milliard' },
      { rank: 2, name: 'Chine', value: '1,42 milliard' },
      { rank: 3, name: 'États-Unis', value: '340 millions' },
      { rank: 4, name: 'Indonésie', value: '278 millions' },
      { rank: 5, name: 'Pakistan', value: '240 millions' },
      { rank: 6, name: 'Nigéria', value: '223 millions' },
      { rank: 7, name: 'Brésil', value: '216 millions' },
      { rank: 8, name: 'Bangladesh', value: '172 millions' },
      { rank: 9, name: 'Russie', value: '144 millions' },
      { rank: 10, name: 'Mexique', value: '132 millions' }
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
        value: '300M copies'
      },
      { 
        rank: 2,
        name: 'Grand Theft Auto V',
        value: '195M copies'
      },
      { 
        rank: 3,
        name: 'Tetris (EA)',
        value: '100M copies'
      },
      { 
        rank: 4,
        name: 'Wii Sports',
        value: '83M copies'
      },
      { 
        rank: 5,
        name: 'PUBG: Battlegrounds',
        value: '75M copies'
      },
      { 
        rank: 6,
        name: 'Mario Kart 8 Deluxe',
        value: '60M copies'
      },
      { 
        rank: 7,
        name: 'Super Mario Bros.',
        value: '58M copies'
      },
      { 
        rank: 8,
        name: 'Red Dead Redemption 2',
        value: '55M copies'
      },
      { 
        rank: 9,
        name: 'Overwatch',
        value: '50M copies'
      },
      { 
        rank: 10,
        name: 'The Witcher 3: Wild Hunt',
        value: '50M copies'
      }
    ]
  },
  {
    id: 'langues-parlees',
    name: 'Langues les Plus Parlées (Locuteurs Natifs)',
    description: 'Les 10 langues avec le plus de locuteurs natifs dans le monde (données 2024)',
    items: [
      { rank: 1, name: 'Chinois Mandarin', value: '918 millions' },
      { rank: 2, name: 'Espagnol', value: '500 millions' },
      { rank: 3, name: 'Anglais', value: '380 millions' },
      { rank: 4, name: 'Hindi', value: '341 millions' },
      { rank: 5, name: 'Arabe', value: '422 millions' },
      { rank: 6, name: 'Bengalî', value: '265 millions' },
      { rank: 7, name: 'Portugais', value: '260 millions' },
      { rank: 8, name: 'Russe', value: '154 millions' },
      { rank: 9, name: 'Japonais', value: '125 millions' },
      { rank: 10, name: 'Pendjabi', value: '113 millions' }
    ]
  },
  {
    id: 'marques-valorisees',
    name: 'Marques les Plus Valorisées (2024)',
    description: 'Les 10 marques avec la plus grande valeur boursière mondiale selon Forbes 2024',
    items: [
      { rank: 1, name: 'Apple', value: '516 milliards $' },
      { rank: 2, name: 'Microsoft', value: '340 milliards $' },
      { rank: 3, name: 'Amazon', value: '308 milliards $' },
      { rank: 4, name: 'Google', value: '297 milliards $' },
      { rank: 5, name: 'Samsung', value: '99 milliards $' },
      { rank: 6, name: 'Tesla', value: '97 milliards $' },
      { rank: 7, name: 'Meta (Facebook)', value: '89 milliards $' },
      { rank: 8, name: 'NVIDIA', value: '85 milliards $' },
      { rank: 9, name: 'Toyota', value: '59 milliards $' },
      { rank: 10, name: 'Coca-Cola', value: '57 milliards $' }
    ]
  },
  {
    id: 'sports-populaires',
    name: 'Sports les Plus Populaires (Fans Mondiaux)',
    description: 'Les 10 sports avec le plus de fans et pratiquants dans le monde (estimation 2024)',
    items: [
      { rank: 1, name: 'Football', value: '4 milliards de fans' },
      { rank: 2, name: 'Cricket', value: '2,5 milliards de fans' },
      { rank: 3, name: 'Hockey sur gazon', value: '2 milliards de fans' },
      { rank: 4, name: 'Tennis', value: '1 milliard de fans' },
      { rank: 5, name: 'Volleyball', value: '900 millions de fans' },
      { rank: 6, name: 'Tennis de table', value: '875 millions de fans' },
      { rank: 7, name: 'Basketball', value: '825 millions de fans' },
      { rank: 8, name: 'Baseball', value: '500 millions de fans' },
      { rank: 9, name: 'Rugby', value: '475 millions de fans' },
      { rank: 10, name: 'Golf', value: '450 millions de fans' }
    ]
  },
  {
    id: 'youtubers-francais',
    name: 'YouTubeurs Français les Plus Suivis (2024)',
    description: 'Les 10 créateurs de contenu français avec le plus d\'abonnés YouTube en 2024',
    items: [
      { rank: 1, name: 'Squeezie', value: '18,5M abonnés' },
      { rank: 2, name: 'Cyprien', value: '14,2M abonnés' },
      { rank: 3, name: 'Norman', value: '12,1M abonnés' },
      { rank: 4, name: 'Tibo InShape', value: '8,9M abonnés' },
      { rank: 5, name: 'Amixem', value: '7,8M abonnés' },
      { rank: 6, name: 'Rémi Gaillard', value: '7,2M abonnés' },
      { rank: 7, name: 'Michou', value: '7,1M abonnés' },
      { rank: 8, name: 'Inoxtag', value: '6,8M abonnés' },
      { rank: 9, name: 'McFly et Carlito', value: '6,5M abonnés' },
      { rank: 10, name: 'Gotaga', value: '4,2M abonnés' }
    ]
  },
  {
    id: 'artistes-spotify',
    name: 'Artistes les Plus Streamés Spotify (2024)',
    description: 'Les 10 artistes avec le plus d\'écoutes mensuelles sur Spotify en 2024',
    items: [
      { rank: 1, name: 'The Weeknd', value: '107M écoutes/mois' },
      { rank: 2, name: 'Taylor Swift', value: '95M écoutes/mois' },
      { rank: 3, name: 'Bad Bunny', value: '88M écoutes/mois' },
      { rank: 4, name: 'Drake', value: '85M écoutes/mois' },
      { rank: 5, name: 'Ariana Grande', value: '82M écoutes/mois' },
      { rank: 6, name: 'Ed Sheeran', value: '79M écoutes/mois' },
      { rank: 7, name: 'Justin Bieber', value: '77M écoutes/mois' },
      { rank: 8, name: 'Billie Eilish', value: '74M écoutes/mois' },
      { rank: 9, name: 'Dua Lipa', value: '72M écoutes/mois' },
      { rank: 10, name: 'Post Malone', value: '70M écoutes/mois' }
    ]
  },
  {
    id: 'jeux-mobiles',
    name: 'Jeux Mobiles les Plus Téléchargés (Tous Temps)',
    description: 'Les 10 jeux mobiles avec le plus de téléchargements de tous les temps (données 2024)',
    items: [
      { rank: 1, name: 'Subway Surfers', value: '4 milliards' },
      { rank: 2, name: 'PUBG Mobile', value: '1,3 milliard' },
      { rank: 3, name: 'Candy Crush Saga', value: '1,1 milliard' },
      { rank: 4, name: 'Free Fire', value: '1 milliard' },
      { rank: 5, name: 'Roblox', value: '900 millions' },
      { rank: 6, name: 'Among Us', value: '500 millions' },
      { rank: 7, name: 'Temple Run 2', value: '500 millions' },
      { rank: 8, name: 'Clash of Clans', value: '500 millions' },
      { rank: 9, name: 'Pokémon GO', value: '500 millions' },
      { rank: 10, name: 'Clash Royale', value: '500 millions' }
    ]
  },
  {
    id: 'rappeurs-francais',
    name: 'Rappeurs Français les Plus Populaires (2024)',
    description: 'Les 10 rappeurs français les plus écoutés sur les plateformes de streaming en 2024',
    items: [
      { rank: 1, name: 'Jul', value: 'Marseille, 30+ albums' },
      { rank: 2, name: 'PNL', value: 'Duo, Ademo & N.O.S' },
      { rank: 3, name: 'Ninho', value: 'Essonne, M.I.L.S' },
      { rank: 4, name: 'SCH', value: 'Marseille, JVLIVS' },
      { rank: 5, name: 'Nekfeu', value: '1995, Feu' },
      { rank: 6, name: 'Booba', value: 'B2O, Duc de Boulogne' },
      { rank: 7, name: 'Damso', value: 'Belgique, 92i' },
      { rank: 8, name: 'Orelsan', value: 'Caen, OrelSan' },
      { rank: 9, name: 'Gazo', value: 'Drill français' },
      { rank: 10, name: 'Freeze Corleone', value: 'LMF, 667' }
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
export const fuzzyMatch = (input: string, target: string): boolean => {
  const normalize = (str: string) => 
    str.toLowerCase()
       .trim()
       // Normaliser les accents
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       // Supprimer la ponctuation et caractères spéciaux
       .replace(/[^\w\s]/g, '')
       // Supprimer les doubles lettres (fautes de frappe)
       .replace(/(.)\1+/g, '$1')
       // Supprimer les articles courants
       .replace(/\b(le|la|les|un|une|des|du|de|d|l|the|a|an|and|et|of)\b/g, '')
       // Normaliser les espaces
       .replace(/\s+/g, ' ')
       .trim();
  
  const normalizedInput = normalize(input);
  const normalizedTarget = normalize(target);
  
  // Correspondance exacte après normalisation
  if (normalizedInput === normalizedTarget) return true;
  
  const inputWords = normalizedInput.split(' ').filter(word => word.length > 0);
  const targetWords = normalizedTarget.split(' ').filter(word => word.length > 0);
  
  // Si pas de mots valides, pas de match
  if (inputWords.length === 0 || targetWords.length === 0) return false;
  
  // Pour les noms composés (2+ mots), si la moitié des mots matchent c'est bon
  if (targetWords.length >= 2) {
    const matchedWords = targetWords.filter(targetWord => 
      inputWords.some(inputWord => {
        // Correspondance exacte
        if (inputWord === targetWord) return true;
        
        // Tolérance aux fautes pour les mots de 4+ caractères
        if (targetWord.length >= 4 && inputWord.length >= 3) {
          const maxDistance = Math.floor(targetWord.length * 0.3); // 30% de tolérance
          return levenshteinDistance(inputWord, targetWord) <= maxDistance;
        }
        
        // Pour les mots courts, vérifier si l'un contient l'autre
        if (targetWord.length >= 3 && inputWord.length >= 3) {
          return targetWord.includes(inputWord) || inputWord.includes(targetWord);
        }
        
        return false;
      })
    );
    
    // Au moins 50% des mots du target doivent matcher
    const matchRatio = matchedWords.length / targetWords.length;
    return matchRatio >= 0.5;
  }
  
  // Pour les noms simples (1 mot), correspondance plus stricte
  if (targetWords.length === 1 && inputWords.length === 1) {
    const targetWord = targetWords[0];
    const inputWord = inputWords[0];
    
    // Correspondance exacte
    if (inputWord === targetWord) return true;
    
    // Tolérance aux fautes pour les mots longs
    if (targetWord.length >= 4 && inputWord.length >= 3) {
      const maxDistance = Math.floor(targetWord.length * 0.25); // 25% de tolérance
      return levenshteinDistance(inputWord, targetWord) <= maxDistance;
    }
    
    // Pour les mots courts, vérifier si l'un contient l'autre
    if (targetWord.length >= 3 && inputWord.length >= 3) {
      return targetWord.includes(inputWord) || inputWord.includes(targetWord);
    }
  }
  
  // Pour les cas mixtes (input multiple mots, target un mot ou vice versa)
  if (inputWords.length !== targetWords.length) {
    // Vérifier si tous les mots de l'input sont dans le target ou vice versa
    const allInputWordsMatch = inputWords.every(inputWord =>
      targetWords.some(targetWord => {
        if (inputWord === targetWord) return true;
        if (targetWord.length >= 4 && inputWord.length >= 3) {
          const maxDistance = Math.floor(targetWord.length * 0.3);
          return levenshteinDistance(inputWord, targetWord) <= maxDistance;
        }
        return targetWord.includes(inputWord) || inputWord.includes(targetWord);
      })
    );
    
    if (allInputWordsMatch) return true;
    
    // Ou vérifier si au moins 50% des mots du target sont dans l'input
    const matchedTargetWords = targetWords.filter(targetWord =>
      inputWords.some(inputWord => {
        if (inputWord === targetWord) return true;
        if (targetWord.length >= 4 && inputWord.length >= 3) {
          const maxDistance = Math.floor(targetWord.length * 0.3);
          return levenshteinDistance(inputWord, targetWord) <= maxDistance;
        }
        return targetWord.includes(inputWord) || inputWord.includes(targetWord);
      })
    );
    
    const targetMatchRatio = matchedTargetWords.length / targetWords.length;
    return targetMatchRatio >= 0.5;
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