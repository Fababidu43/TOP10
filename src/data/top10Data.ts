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
      { rank: 1, name: 'Avatar', value: '2,9 milliards $', alternatives: ['avatar 2009'] },
      { rank: 2, name: 'Avengers: Endgame', value: '2,8 milliards $', alternatives: ['endgame', 'avengers endgame'] },
      { rank: 3, name: 'Avatar: La Voie de l\'eau', value: '2,3 milliards $', alternatives: ['avatar 2', 'avatar la voie de l\'eau'] },
      { rank: 4, name: 'Titanic', value: '2,2 milliards $' },
      { rank: 5, name: 'Star Wars: Le Réveil de la Force', value: '2,1 milliards $', alternatives: ['star wars 7', 'le réveil de la force'] },
      { rank: 6, name: 'Avengers: Infinity War', value: '2,0 milliards $', alternatives: ['infinity war', 'avengers infinity war'] },
      { rank: 7, name: 'Spider-Man: No Way Home', value: '1,9 milliards $', alternatives: ['spiderman no way home', 'no way home'] },
      { rank: 8, name: 'Jurassic World', value: '1,7 milliards $' },
      { rank: 9, name: 'Le Roi Lion (2019)', value: '1,7 milliards $', alternatives: ['roi lion', 'le roi lion'] },
      { rank: 10, name: 'The Avengers', value: '1,5 milliards $', alternatives: ['avengers', 'avengers 1'] }
    ]
  },
  {
    id: 'artistes-spotify',
    name: 'Artistes les Plus Streamés sur Spotify',
    description: 'Les 10 artistes avec le plus d\'écoutes mensuelles',
    items: [
      { rank: 1, name: 'The Weeknd', value: '107M écoutes/mois', alternatives: ['weeknd'] },
      { rank: 2, name: 'Miley Cyrus', value: '82M écoutes/mois' },
      { rank: 3, name: 'Shakira', value: '81M écoutes/mois' },
      { rank: 4, name: 'Ariana Grande', value: '80M écoutes/mois' },
      { rank: 5, name: 'Rihanna', value: '78M écoutes/mois' },
      { rank: 6, name: 'Taylor Swift', value: '77M écoutes/mois' },
      { rank: 7, name: 'Ed Sheeran', value: '75M écoutes/mois' },
      { rank: 8, name: 'Harry Styles', value: '70M écoutes/mois' },
      { rank: 9, name: 'Bad Bunny', value: '68M écoutes/mois' },
      { rank: 10, name: 'Justin Bieber', value: '65M écoutes/mois' }
    ]
  },
  {
    id: 'jeux-video-vendus',
    name: 'Jeux Vidéo les Plus Vendus',
    description: 'Les 10 jeux vidéo avec le plus de ventes mondiales',
    items: [
      { rank: 1, name: 'Minecraft', value: '300M copies', alternatives: ['mine craft'] },
      { rank: 2, name: 'Grand Theft Auto V', value: '190M copies', alternatives: ['gta 5', 'gta v'] },
      { rank: 3, name: 'Tetris', value: '100M copies' },
      { rank: 4, name: 'Wii Sports', value: '83M copies' },
      { rank: 5, name: 'PUBG', value: '75M copies', alternatives: ['playerunknown battlegrounds', 'pubg battlegrounds'] },
      { rank: 6, name: 'Mario Kart 8', value: '70M copies', alternatives: ['mario kart 8 deluxe'] },
      { rank: 7, name: 'Super Mario Bros.', value: '58M copies', alternatives: ['super mario brothers'] },
      { rank: 8, name: 'Red Dead Redemption 2', value: '55M copies', alternatives: ['rdr2', 'red dead 2'] },
      { rank: 9, name: 'Overwatch', value: '50M copies' },
      { rank: 10, name: 'The Witcher 3', value: '50M copies', alternatives: ['witcher 3', 'the witcher 3 wild hunt'] }
    ]
  },
  {
    id: 'sportifs-payes',
    name: 'Sportifs les Mieux Payés',
    description: 'Les 10 sportifs avec les plus gros revenus annuels',
    items: [
      { rank: 1, name: 'Cristiano Ronaldo', value: '136M $', alternatives: ['ronaldo', 'cr7'] },
      { rank: 2, name: 'Lionel Messi', value: '130M $', alternatives: ['messi'] },
      { rank: 3, name: 'Kylian Mbappé', value: '120M $', alternatives: ['mbappe', 'mbappé'] },
      { rank: 4, name: 'LeBron James', value: '119M $', alternatives: ['lebron'] },
      { rank: 5, name: 'Canelo Álvarez', value: '110M $', alternatives: ['canelo', 'alvarez'] },
      { rank: 6, name: 'Dustin Johnson', value: '107M $' },
      { rank: 7, name: 'Phil Mickelson', value: '106M $' },
      { rank: 8, name: 'Stephen Curry', value: '95M $', alternatives: ['curry'] },
      { rank: 9, name: 'Roger Federer', value: '90M $', alternatives: ['federer'] },
      { rank: 10, name: 'Kevin Durant', value: '87M $', alternatives: ['durant', 'kd'] }
    ]
  }
];

export const getDrinksForRank = (rank: number): number => {
  if (rank === 1) return 15;
  if (rank >= 2 && rank <= 5) return Math.floor(Math.random() * 6) + 5; // 5-10
  return Math.floor(Math.random() * 3) + 2; // 2-4
};

// Fonction de fuzzy matching simple
export const fuzzyMatch = (input: string, target: string, alternatives: string[] = []): boolean => {
  const normalize = (str: string) => str.toLowerCase().trim().replace(/[^\w\s]/g, '');
  
  const normalizedInput = normalize(input);
  const normalizedTarget = normalize(target);
  
  // Correspondance exacte
  if (normalizedInput === normalizedTarget) return true;
  
  // Vérifier les alternatives
  for (const alt of alternatives) {
    if (normalizedInput === normalize(alt)) return true;
  }
  
  // Correspondance partielle (contient le mot)
  if (normalizedTarget.includes(normalizedInput) || normalizedInput.includes(normalizedTarget)) {
    return true;
  }
  
  // Distance de Levenshtein simple pour les fautes de frappe
  return levenshteinDistance(normalizedInput, normalizedTarget) <= 2;
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