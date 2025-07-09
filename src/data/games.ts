import { Game } from '../types';

export const games: Game[] = [
  {
    id: 'telephone-arabe',
    title: 'Téléphone Arabe',
    description: 'Un jeu hilarant où les phrases se transforment en passant de joueur en joueur !',
    shortDescription: 'Transformez les phrases en les transmettant',
    players: '4-10 joueurs',
    duration: '15-30 minutes',
    difficulty: 'facile',
    category: 'expression',
    interactive: true,
    rules: [
      'Les joueurs s\'assoient en cercle',
      'Le premier joueur écrit une phrase secrète',
      'Il la chuchote à l\'oreille de son voisin',
      'Le message passe de joueur en joueur',
      'Le dernier joueur révèle ce qu\'il a entendu',
      'Comparez avec la phrase originale !'
    ],
    materials: ['Papier', 'Stylos'],
    variants: [
      'Version dessin : alternez phrases et dessins',
      'Version téléphone : utilisez des téléphones cassés',
      'Version multilingue : changez de langue à chaque tour'
    ]
  },
  {
    id: 'qui-suis-je',
    title: 'Qui Suis-Je ?',
    description: 'Devinez le personnage mystère collé sur votre front !',
    shortDescription: 'Devinez votre personnage mystère',
    players: '3-8 joueurs',
    duration: '20-45 minutes',
    difficulty: 'moyen',
    category: 'reflexion',
    interactive: false,
    rules: [
      'Chaque joueur reçoit un post-it avec un personnage',
      'Collez-le sur votre front sans le regarder',
      'Posez des questions fermées pour deviner',
      'Les autres répondent par oui ou non',
      'Premier à deviner son personnage gagne !'
    ],
    materials: ['Post-it', 'Stylos'],
    variants: [
      'Version thématique : films, animaux, célébrités',
      'Version collaborative : aidez-vous mutuellement',
      'Version challenge : temps limité par question'
    ]
  },
  {
    id: 'pictionary',
    title: 'Pictionary',
    description: 'Dessinez et devinez dans ce classique indémodable !',
    shortDescription: 'Dessinez pour faire deviner',
    players: '4-12 joueurs',
    duration: '30-60 minutes',
    difficulty: 'moyen',
    category: 'creativite',
    interactive: false,
    rules: [
      'Formez des équipes',
      'Un joueur dessine le mot donné',
      'Son équipe doit deviner en temps limité',
      'Pas de lettres, chiffres ou paroles',
      'L\'équipe qui devine le plus gagne !'
    ],
    materials: ['Papier', 'Crayons', 'Cartes de mots', 'Chronomètre'],
    variants: [
      'Version sculpture : modelez avec de la pâte',
      'Version mime : pas de dessin, que des gestes',
      'Version speed : dessins ultra-rapides'
    ]
  },
  {
    id: 'story-building',
    title: 'Histoire Collaborative',
    description: 'Créez ensemble une histoire loufoque et imprévisible !',
    shortDescription: 'Construisez une histoire ensemble',
    players: '3-8 joueurs',
    duration: '15-30 minutes',
    difficulty: 'facile',
    category: 'creativite',
    interactive: false,
    rules: [
      'Le premier joueur commence une histoire',
      'Chaque joueur ajoute une phrase',
      'L\'histoire évolue de manière imprévisible',
      'Soyez créatifs et drôles',
      'Terminez quand l\'histoire est complète'
    ],
    materials: ['Imagination'],
    variants: [
      'Version écrite : chacun écrit sa partie',
      'Version thématique : imposez un genre',
      'Version contrainte : mots interdits'
    ]
  },
  {
    id: 'mime-time',
    title: 'Time\'s Up Mime',
    description: 'Mimez, décrivez et devinez dans ce jeu d\'ambiance !',
    shortDescription: 'Trois manches, trois façons de jouer',
    players: '4-12 joueurs',
    duration: '45-60 minutes',
    difficulty: 'moyen',
    category: 'ambiance',
    interactive: false,
    rules: [
      'Manche 1 : Décrivez librement',
      'Manche 2 : Un seul mot autorisé',
      'Manche 3 : Mimez uniquement',
      'Même pile de cartes pour les 3 manches',
      'Équipe avec le plus de points gagne'
    ],
    materials: ['Cartes personnages', 'Chronomètre'],
    variants: [
      'Version sons : ajoutez des bruitages',
      'Version objets : utilisez des accessoires',
      'Version thème : spécialisez les cartes'
    ]
  },
  {
    id: 'word-association',
    title: 'Association d\'Idées',
    description: 'Enchaînez les mots le plus rapidement possible !',
    shortDescription: 'Enchaînez les associations d\'idées',
    players: '3-10 joueurs',
    duration: '10-20 minutes',
    difficulty: 'facile',
    category: 'reflexion',
    interactive: false,
    rules: [
      'Le premier joueur dit un mot',
      'Le suivant dit un mot associé',
      'Continuez l\'enchaînement rapidement',
      'Pas de répétition autorisée',
      'Élimination si vous hésitez trop'
    ],
    materials: ['Rien !'],
    variants: [
      'Version thème : restez dans un domaine',
      'Version alphabet : ordre alphabétique',
      'Version opposé : trouvez l\'antonyme'
    ]
  }
];

export const categories = [
  { id: 'expression', name: 'Expression', icon: '🎭' },
  { id: 'reflexion', name: 'Réflexion', icon: '🧠' },
  { id: 'creativite', name: 'Créativité', icon: '🎨' },
  { id: 'ambiance', name: 'Ambiance', icon: '🎉' }
];

export const difficulties = [
  { id: 'facile', name: 'Facile', color: 'text-green-600' },
  { id: 'moyen', name: 'Moyen', color: 'text-yellow-600' },
  { id: 'difficile', name: 'Difficile', color: 'text-red-600' }
];