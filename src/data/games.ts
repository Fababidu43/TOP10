import { Game } from '../types';

export const games: Game[] = [
  {
    id: 'top-10',
    title: 'Top 10',
    description: 'Devinez les éléments d\'un classement et buvez selon votre performance ! Plus votre réponse est bien classée, plus vous faites boire vos adversaires.',
    shortDescription: 'Devinez les éléments d\'un top 10',
    players: '2-8 joueurs',
    duration: '20-40 minutes',
    difficulty: 'moyen',
    category: 'reflexion',
    interactive: true,
    rules: [
      'Choisissez une catégorie de classement parmi celles disponibles',
      'À tour de rôle, devinez un élément du top 10',
      'Les réponses sont validées automatiquement avec tolérance aux fautes',
      'Plus votre réponse est bien classée, plus vous faites boire',
      'Top 1 = 15 gorgées, Top 2-5 = 5-10 gorgées, Top 6-10 = 2-4 gorgées',
      'Continuez jusqu\'à trouver tous les éléments ou abandonner'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode compétitif : comptage des points par joueur',
      'Mode coopératif : tous contre le classement',
      'Mode rapide : changement de catégorie à chaque manche'
    ]
  },
  {
    id: 'devine-gif',
    title: 'Devine le GIF',
    description: 'Devinez le contenu de GIFs issus de la culture française en 30 secondes ! Films, séries TV, memes... testez vos connaissances !',
    shortDescription: 'Devinez les GIFs de la culture française',
    players: '3-10 joueurs',
    duration: '15-30 minutes',
    difficulty: 'moyen',
    category: 'reflexion',
    interactive: true,
    rules: [
      'Un joueur est tiré au sort pour chaque manche',
      'L\'application affiche un GIF de la culture française',
      'Le joueur a 30 secondes pour deviner à voix haute',
      'Les autres joueurs valident si la réponse est correcte',
      'Bonne réponse = distribue 4 gorgées aux autres',
      'Mauvaise réponse = boit 3 gorgées',
      'Temps écoulé = boit 5 gorgées'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode films : uniquement des films français cultes',
      'Mode TV : émissions et séries françaises',
      'Mode memes : culture internet et réseaux sociaux'
    ]
  },
  {
    id: 'never-have-i',
    title: 'Je n\'ai jamais',
    description: 'Révélez vos secrets et faites boire vos amis avec ce classique des soirées ! Choisissez vos catégories et ajoutez vos propres questions.',
    shortDescription: 'Révélez vos expériences secrètes',
    players: '3-12 joueurs',
    duration: '15-45 minutes',
    difficulty: 'facile',
    category: 'ambiance',
    interactive: true,
    rules: [
      'Une phrase "Je n\'ai jamais..." s\'affiche à l\'écran',
      'Tous ceux qui ont déjà fait l\'action boivent une gorgée',
      'Choisissez vos catégories : fun, trash, extrême',
      'Ajoutez vos propres questions personnalisées',
      'Découvrez les secrets et anecdotes de vos amis',
      'Aucun gagnant, juste du plaisir et des révélations !'
    ],
    materials: ['Application', 'Boissons'],
    variants: [
      'Mode thématique : questions sur un sujet précis',
      'Mode personnalisé : uniquement vos questions custom',
      'Mode escalade : questions de plus en plus osées'
    ]
  }
];

export const categories = [
  { id: 'reflexion', name: 'Réflexion', icon: '🧠' },
  { id: 'ambiance', name: 'Ambiance', icon: '🎉' }
];

export const difficulties = [
  { id: 'facile', name: 'Facile', color: 'text-green-600' },
  { id: 'moyen', name: 'Moyen', color: 'text-yellow-600' },
  { id: 'difficile', name: 'Difficile', color: 'text-red-600' }
];