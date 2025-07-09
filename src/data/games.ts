import { Game } from '../types';

export const games: Game[] = [
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
    id: 'qui-ment',
    title: 'Qui Ment ?',
    description: 'Un jeu d\'interaction sociale où vous devez identifier le menteur parmi les joueurs !',
    shortDescription: 'Identifiez le menteur parmi vous',
    players: '4-8 joueurs',
    duration: '20-40 minutes',
    difficulty: 'moyen',
    category: 'ambiance',
    interactive: true,
    rules: [
      'Un joueur est secrètement désigné comme menteur',
      'Chaque joueur raconte une anecdote à voix haute',
      'Le menteur doit inventer son histoire',
      'Les autres racontent des anecdotes vraies',
      'Tous votent pour identifier le menteur',
      'L\'application révèle qui mentait vraiment'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode thématique : anecdotes sur un sujet précis',
      'Mode double menteur : deux menteurs simultanés',
      'Mode révélation : le menteur peut se dénoncer'
    ]
  },
  {
    id: 'devine-gif',
    title: 'Devine le GIF',
    description: 'Devinez le contenu de GIFs issus de la culture française en 30 secondes !',
    shortDescription: 'Devinez les GIFs de la culture française',
    players: '3-10 joueurs',
    duration: '15-30 minutes',
    difficulty: 'moyen',
    category: 'reflexion',
    interactive: true,
    rules: [
      'Un joueur est tiré au sort',
      'L\'application affiche un GIF français',
      'Le joueur a 30 secondes pour deviner',
      'Les autres valident si la réponse est correcte',
      'Cliquez sur "Bonne réponse" ou "Faux"',
      'Passez au joueur suivant'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode films : uniquement des films français',
      'Mode TV : émissions et séries françaises',
      'Mode memes : culture internet française'
    ]
  },
  {
    id: 'shot-retardement',
    title: 'Shot à Retardement',
    description: 'Répondez aux questions avant que la bombe explose ! Tension garantie !',
    shortDescription: 'Répondez avant l\'explosion',
    players: '3-8 joueurs',
    duration: '10-25 minutes',
    difficulty: 'facile',
    category: 'ambiance',
    interactive: true,
    rules: [
      'Un joueur commence, tiré au sort',
      'L\'application affiche une question',
      'Répondez à voix haute rapidement',
      'Cliquez "Suivant" pour passer au joueur suivant',
      'La bombe explose aléatoirement (15-45s)',
      'Celui qui joue au moment de l\'explosion boit !'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode rapide : explosions plus fréquentes',
      'Mode thématique : questions sur un sujet',
      'Mode escalade : questions de plus en plus difficiles'
    ]
  },
  {
    id: 'top-10',
    title: 'Top 10',
    description: 'Devinez les éléments d\'un classement et buvez selon votre performance !',
    shortDescription: 'Devinez les éléments d\'un top 10',
    players: '2-8 joueurs',
    duration: '20-40 minutes',
    difficulty: 'moyen',
    category: 'reflexion',
    interactive: true,
    rules: [
      'Choisissez une catégorie de classement',
      'À tour de rôle, devinez un élément du top 10',
      'Les réponses sont validées automatiquement',
      'Plus votre réponse est bien classée, plus vous faites boire',
      'Top 1 = 15 gorgées, Top 2-5 = 5-10 gorgées, Top 6-10 = 2-4 gorgées',
      'Continuez jusqu\'à trouver tous les éléments'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode prolongé : même classement plusieurs manches',
      'Mode rapide : changement de catégorie à chaque manche',
      'Mode équipe : jouez en équipes'
    ]
  },
  {
    id: 'never-have-i',
    title: 'Je n\'ai jamais',
    description: 'Révélez vos secrets et faites boire vos amis avec ce classique des soirées !',
    shortDescription: 'Révélez vos expériences secrètes',
    players: '3-12 joueurs',
    duration: '15-45 minutes',
    difficulty: 'facile',
    category: 'ambiance',
    interactive: true,
    rules: [
      'Une phrase "Je n\'ai jamais..." s\'affiche',
      'Tous ceux qui ont déjà fait l\'action boivent',
      'Choisissez vos catégories : fun, trash, extrême',
      'Ajoutez vos propres questions personnalisées',
      'Découvrez les secrets de vos amis',
      'Aucun gagnant, juste du fun !'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode thématique : questions sur un sujet précis',
      'Mode personnalisé : uniquement vos questions',
      'Mode escalade : questions de plus en plus osées'
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