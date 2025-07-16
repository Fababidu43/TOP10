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
  hint?: string;
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
        hint: 'Film de 1950 avec Bette Davis'
      },
      { rank: 2, name: 'Titanic', value: '14 nominations', hint: 'Film de James Cameron de 1997' },
      { 
        rank: 3,
        name: 'La La Land',
        value: '14 nominations',
        hint: 'Comédie musicale avec Emma Stone'
      },
      { rank: 4, name: 'Roma', value: '10 nominations', hint: 'Film mexicain d\'Alfonso Cuarón' },
      { 
        rank: 5,
        name: 'The Shape of Water',
        value: '13 nominations',
        hint: 'Film fantastique de Guillermo del Toro'
      },
      { 
        rank: 6,
        name: 'The Revenant',
        value: '12 nominations',
        hint: 'Film de survie avec Leonardo DiCaprio'
      },
      { rank: 7, name: 'Lincoln', value: '12 nominations', hint: 'Biopic présidentiel de Spielberg' },
      { 
        rank: 8,
        name: 'Life of Pi',
        value: '11 nominations',
        hint: 'Aventure avec un tigre sur un bateau'
      },
      { rank: 9, name: 'Hugo', value: '11 nominations', hint: 'Film de Scorsese sur le cinéma' },
      { 
        rank: 10,
        name: 'The Curious Case of Benjamin Button',
        value: '13 nominations',
        hint: 'Brad Pitt vieillit à l\'envers'
      }
    ]
  },
  {
    id: 'films-cultes-francais',
    name: 'Films Français Cultes (Box-Office)',
    description: 'Les 10 films français les plus populaires au box-office français (1945-2024)',
    items: [
      { rank: 1, name: 'Intouchables', value: '2011 - Nakache & Toledano', hint: 'Omar Sy et François Cluzet' },
      { rank: 2, name: 'Amélie Poulain', value: '2001 - Jean-Pierre Jeunet', hint: 'Audrey Tautou à Montmartre' },
      { rank: 3, name: 'Bienvenue chez les Ch\'tis', value: '2008 - Dany Boon', hint: 'Nord de la France et accent' },
      { rank: 4, name: 'Les Visiteurs', value: '1993 - Jean-Marie Poiré', hint: 'Godefroy de Montmirail' },
      { rank: 5, name: 'Taxi', value: '1998 - Gérard Pirès', hint: 'Samy Naceri et Peugeot 406' },
      { rank: 6, name: 'Astérix et Obélix: Mission Cléopâtre', value: '2002 - Alain Chabat', hint: 'Jamel Debbouze et pyramides' },
      { rank: 7, name: 'La Grande Vadrouille', value: '1966 - Gérard Oury', hint: 'Bourvil et Louis de Funès' },
      { rank: 8, name: 'OSS 117: Le Caire, nid d\'espions', value: '2006 - Michel Hazanavicius', hint: 'Jean Dujardin agent secret' },
      { rank: 9, name: 'Le Dîner de Cons', value: '1998 - Francis Veber', hint: 'Jacques Villeret et maquettes' },
      { rank: 10, name: 'La Cité de la Peur', value: '1994 - Alain Berbérian', hint: 'Les Nuls au Festival de Cannes' }
    ]
  },
  {
    id: 'series-netflix',
    name: 'Séries Netflix les Plus Regardées (2024)',
    description: 'Les 10 séries avec le plus d\'heures de visionnage sur Netflix en 2024',
    items: [
      { rank: 1, name: 'Squid Game', value: '1,65 milliard d\'heures', hint: 'Série coréenne avec jeux d\'enfants mortels' },
      { rank: 2, name: 'Wednesday', value: '1,37 milliard d\'heures', hint: 'Fille d\'Addams dans un pensionnat' },
      { rank: 3, name: 'Stranger Things', value: '1,35 milliard d\'heures', hint: 'Enfants et monde à l\'envers' },
      { rank: 4, name: 'Dahmer', value: '856 millions d\'heures', hint: 'Série sur le tueur en série' },
      { rank: 5, name: 'Bridgerton', value: '656 millions d\'heures', hint: 'Romance dans l\'Angleterre du 19e' },
      { rank: 6, name: 'The Night Agent', value: '605 millions d\'heures', hint: 'Agent FBI et conspirations' },
      { rank: 7, name: 'Ginny & Georgia', value: '582 millions d\'heures', hint: 'Mère et fille recommencent à zéro' },
      { rank: 8, name: 'Lucifer', value: '569 millions d\'heures', hint: 'Le diable aide la police de LA' },
      { rank: 9, name: 'All of Us Are Dead', value: '560 millions d\'heures', hint: 'Zombies dans un lycée coréen' },
      { rank: 10, name: 'The Witcher', value: '541 millions d\'heures', hint: 'Geralt de Riv et monstres' }
    ]
  },
  {
    id: 'pays-population',
    name: 'Pays les Plus Peuplés (2024)',
    description: 'Les 10 pays avec le plus d\'habitants dans le monde selon les données 2024',
    items: [
      { rank: 1, name: 'Inde', value: '1,43 milliard', hint: 'Pays de Gandhi et Bollywood' },
      { rank: 2, name: 'Chine', value: '1,42 milliard', hint: 'Empire du Milieu et Grande Muraille' },
      { rank: 3, name: 'États-Unis', value: '340 millions', hint: 'Oncle Sam et 50 états' },
      { rank: 4, name: 'Indonésie', value: '278 millions', hint: 'Archipel de Java et Bali' },
      { rank: 5, name: 'Pakistan', value: '240 millions', hint: 'Voisin de l\'Inde, capitale Islamabad' },
      { rank: 6, name: 'Nigéria', value: '223 millions', hint: 'Géant de l\'Afrique de l\'Ouest' },
      { rank: 7, name: 'Brésil', value: '216 millions', hint: 'Samba, football et Amazonie' },
      { rank: 8, name: 'Bangladesh', value: '172 millions', hint: 'Delta du Gange, capitale Dhaka' },
      { rank: 9, name: 'Russie', value: '144 millions', hint: 'Plus grand pays du monde' },
      { rank: 10, name: 'Mexique', value: '132 millions', hint: 'Tacos, tequila et Aztèques' }
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
        hint: 'Jeu de construction avec des cubes'
      },
      { 
        rank: 2,
        name: 'Grand Theft Auto V',
        value: '195M copies',
        hint: 'Crime à Los Santos'
      },
      { 
        rank: 3,
        name: 'Tetris',
        value: '100M copies',
        hint: 'Blocs qui tombent à assembler'
      },
      { 
        rank: 4,
        name: 'Wii Sports',
        value: '83M copies',
        hint: 'Jeu inclus avec la console Nintendo'
      },
      { 
        rank: 5,
        name: 'PUBG',
        value: '75M copies',
        hint: 'Battle royale sur une île'
      },
      { 
        rank: 6,
        name: 'Mario Kart 8',
        value: '60M copies',
        hint: 'Course avec le plombier moustachu'
      },
      { 
        rank: 7,
        name: 'Super Mario Bros',
        value: '58M copies',
        hint: 'Premier jeu iconique de Mario'
      },
      { 
        rank: 8,
        name: 'Red Dead Redemption 2',
        value: '55M copies',
        hint: 'Western avec Arthur Morgan'
      },
      { 
        rank: 9,
        name: 'Overwatch',
        value: '50M copies',
        hint: 'FPS héros de Blizzard'
      },
      { 
        rank: 10,
        name: 'The Witcher 3',
        value: '50M copies',
        hint: 'Geralt cherche Ciri'
      }
    ]
  },
  {
    id: 'langues-parlees',
    name: 'Langues les Plus Parlées (Locuteurs Natifs)',
    description: 'Les 10 langues avec le plus de locuteurs natifs dans le monde (données 2024)',
    items: [
      { rank: 1, name: 'Chinois Mandarin', value: '918 millions', hint: 'Langue officielle de la Chine' },
      { rank: 2, name: 'Espagnol', value: '500 millions', hint: 'Hola, de Madrid à Mexico' },
      { rank: 3, name: 'Anglais', value: '380 millions', hint: 'Hello, langue de Shakespeare' },
      { rank: 4, name: 'Hindi', value: '341 millions', hint: 'Namaste, langue de l\'Inde' },
      { rank: 5, name: 'Arabe', value: '422 millions', hint: 'Salam, du Maroc à l\'Irak' },
      { rank: 6, name: 'Bengalî', value: '265 millions', hint: 'Bangladesh et Bengale occidental' },
      { rank: 7, name: 'Portugais', value: '260 millions', hint: 'Olá, du Brésil au Portugal' },
      { rank: 8, name: 'Russe', value: '154 millions', hint: 'Priviet, langue de Poutine' },
      { rank: 9, name: 'Japonais', value: '125 millions', hint: 'Konnichiwa, langue des mangas' },
      { rank: 10, name: 'Pendjabi', value: '113 millions', hint: 'Région du Punjab en Inde' }
    ]
  },
  {
    id: 'marques-valorisees',
    name: 'Marques les Plus Valorisées (2024)',
    description: 'Les 10 marques avec la plus grande valeur boursière mondiale selon Forbes 2024',
    items: [
      { rank: 1, name: 'Apple', value: '516 milliards $', hint: 'iPhone et pomme croquée' },
      { rank: 2, name: 'Microsoft', value: '340 milliards $', hint: 'Windows et Bill Gates' },
      { rank: 3, name: 'Amazon', value: '308 milliards $', hint: 'Jeff Bezos et livraisons' },
      { rank: 4, name: 'Google', value: '297 milliards $', hint: 'Moteur de recherche numéro 1' },
      { rank: 5, name: 'Samsung', value: '99 milliards $', hint: 'Rival coréen d\'Apple' },
      { rank: 6, name: 'Tesla', value: '97 milliards $', hint: 'Voitures électriques d\'Elon Musk' },
      { rank: 7, name: 'Meta', value: '89 milliards $', hint: 'Facebook, Instagram, WhatsApp' },
      { rank: 8, name: 'NVIDIA', value: '85 milliards $', hint: 'Cartes graphiques et IA' },
      { rank: 9, name: 'Toyota', value: '59 milliards $', hint: 'Constructeur automobile japonais' },
      { rank: 10, name: 'Coca-Cola', value: '57 milliards $', hint: 'Boisson gazeuse rouge iconique' }
    ]
  },
  {
    id: 'sports-populaires',
    name: 'Sports les Plus Populaires (Fans Mondiaux)',
    description: 'Les 10 sports avec le plus de fans et pratiquants dans le monde (estimation 2024)',
    items: [
      { rank: 1, name: 'Football', value: '4 milliards de fans', hint: 'Ballon rond, Messi et Ronaldo' },
      { rank: 2, name: 'Cricket', value: '2,5 milliards de fans', hint: 'Sport populaire en Inde et Angleterre' },
      { rank: 3, name: 'Hockey sur gazon', value: '2 milliards de fans', hint: 'Crosse et balle sur gazon' },
      { rank: 4, name: 'Tennis', value: '1 milliard de fans', hint: 'Raquette, Wimbledon et Roland-Garros' },
      { rank: 5, name: 'Volleyball', value: '900 millions de fans', hint: 'Filet et smash au-dessus' },
      { rank: 6, name: 'Tennis de table', value: '875 millions de fans', hint: 'Ping-pong avec raquettes' },
      { rank: 7, name: 'Basketball', value: '825 millions de fans', hint: 'Panier, NBA et Michael Jordan' },
      { rank: 8, name: 'Baseball', value: '500 millions de fans', hint: 'Batte, gant et home run' },
      { rank: 9, name: 'Rugby', value: '475 millions de fans', hint: 'Ballon ovale et mêlées' },
      { rank: 10, name: 'Golf', value: '450 millions de fans', hint: 'Clubs, trous et Tiger Woods' }
    ]
  },
  {
    id: 'youtubers-francais',
    name: 'YouTubeurs Français les Plus Suivis (2024)',
    description: 'Les 10 créateurs de contenu français avec le plus d\'abonnés YouTube en 2024',
    items: [
      { rank: 1, name: 'Squeezie', value: '18,5M abonnés', hint: 'Lucas, gaming et réactions' },
      { rank: 2, name: 'Cyprien', value: '14,2M abonnés', hint: 'Sketches et Mr. Poulpe' },
      { rank: 3, name: 'Norman', value: '12,1M abonnés', hint: 'Norman fait des vidéos' },
      { rank: 4, name: 'Tibo InShape', value: '8,9M abonnés', hint: 'Musculation et fitness' },
      { rank: 5, name: 'Amixem', value: '7,8M abonnés', hint: 'Maxime et gaming' },
      { rank: 6, name: 'Rémi Gaillard', value: '7,2M abonnés', hint: 'Pranks et "C\'est en faisant n\'importe quoi..."' },
      { rank: 7, name: 'Michou', value: '7,1M abonnés', hint: 'Cheveux violets et gaming' },
      { rank: 8, name: 'Inoxtag', value: '6,8M abonnés', hint: 'Inès et aventures extrêmes' },
      { rank: 9, name: 'McFly et Carlito', value: '6,5M abonnés', hint: 'Duo d\'humoristes' },
      { rank: 10, name: 'Gotaga', value: '4,2M abonnés', hint: 'Pro gamer et streams' }
    ]
  },
  {
    id: 'artistes-spotify',
    name: 'Artistes les Plus Streamés Spotify (2024)',
    description: 'Les 10 artistes avec le plus d\'écoutes mensuelles sur Spotify en 2024',
    items: [
      { rank: 1, name: 'The Weeknd', value: '107M écoutes/mois', hint: 'Blinding Lights et After Hours' },
      { rank: 2, name: 'Taylor Swift', value: '95M écoutes/mois', hint: 'Pop country et Eras Tour' },
      { rank: 3, name: 'Bad Bunny', value: '88M écoutes/mois', hint: 'Reggaeton portoricain' },
      { rank: 4, name: 'Drake', value: '85M écoutes/mois', hint: 'Rappeur canadien de Toronto' },
      { rank: 5, name: 'Ariana Grande', value: '82M écoutes/mois', hint: 'Thank U, Next et queue de cheval' },
      { rank: 6, name: 'Ed Sheeran', value: '79M écoutes/mois', hint: 'Guitare, roux et Shape of You' },
      { rank: 7, name: 'Justin Bieber', value: '77M écoutes/mois', hint: 'Baby et Sorry' },
      { rank: 8, name: 'Billie Eilish', value: '74M écoutes/mois', hint: 'Bad Guy et cheveux verts' },
      { rank: 9, name: 'Dua Lipa', value: '72M écoutes/mois', hint: 'Don\'t Start Now et Levitating' },
      { rank: 10, name: 'Post Malone', value: '70M écoutes/mois', hint: 'Tatouages et Circles' }
    ]
  },
  {
    id: 'jeux-mobiles',
    name: 'Jeux Mobiles les Plus Téléchargés (Tous Temps)',
    description: 'Les 10 jeux mobiles avec le plus de téléchargements de tous les temps (données 2024)',
    items: [
      { rank: 1, name: 'Subway Surfers', value: '4 milliards', hint: 'Course dans le métro' },
      { rank: 2, name: 'PUBG Mobile', value: '1,3 milliard', hint: 'Battle royale sur mobile' },
      { rank: 3, name: 'Candy Crush Saga', value: '1,1 milliard', hint: 'Match-3 avec des bonbons' },
      { rank: 4, name: 'Free Fire', value: '1 milliard', hint: 'Battle royale de Garena' },
      { rank: 5, name: 'Roblox', value: '900 millions', hint: 'Plateforme de jeux créés par users' },
      { rank: 6, name: 'Among Us', value: '500 millions', hint: 'Imposteurs dans l\'espace' },
      { rank: 7, name: 'Temple Run 2', value: '500 millions', hint: 'Course infinie dans temple' },
      { rank: 8, name: 'Clash of Clans', value: '500 millions', hint: 'Stratégie avec villages' },
      { rank: 9, name: 'Pokémon GO', value: '500 millions', hint: 'Attraper Pokémon en réalité augmentée' },
      { rank: 10, name: 'Clash Royale', value: '500 millions', hint: 'Cartes et tours en temps réel' }
    ]
  },
  {
    id: 'rappeurs-francais',
    name: 'Rappeurs Français les Plus Populaires (2024)',
    description: 'Les 10 rappeurs français les plus écoutés sur les plateformes de streaming en 2024',
    items: [
      { rank: 1, name: 'Jul', value: 'Marseille, 30+ albums', hint: 'Roi du rap marseillais' },
      { rank: 2, name: 'PNL', value: 'Duo, Ademo & N.O.S', hint: 'Deux frères de Corbeil-Essonnes' },
      { rank: 3, name: 'Ninho', value: 'Essonne, M.I.L.S', hint: 'Rappeur de Longjumeau' },
      { rank: 4, name: 'SCH', value: 'Marseille, JVLIVS', hint: 'Rappeur des quartiers Nord' },
      { rank: 5, name: 'Nekfeu', value: '1995, Feu', hint: 'Ex-1995 devenu solo' },
      { rank: 6, name: 'Booba', value: 'B2O, Duc de Boulogne', hint: 'Pionnier du rap français' },
      { rank: 7, name: 'Damso', value: 'Belgique, 92i', hint: 'Rappeur belge d\'origine congolaise' },
      { rank: 8, name: 'Orelsan', value: 'Caen, OrelSan', hint: 'Rappeur normand et réalisateur' },
      { rank: 9, name: 'Gazo', value: 'Drill français', hint: 'Nouveau roi de la drill' },
      { rank: 10, name: 'Freeze Corleone', value: 'LMF, 667', hint: 'Rappeur masqué controversé' }
    ]
  },
  // 10 nouveaux Top 10
  {
    id: 'monuments-visites',
    name: 'Monuments les Plus Visités au Monde (2024)',
    description: 'Les 10 monuments et sites touristiques les plus visités chaque année',
    items: [
      { rank: 1, name: 'Tour Eiffel', value: '7 millions/an', hint: 'Dame de fer parisienne' },
      { rank: 2, name: 'Grande Muraille de Chine', value: '6,5 millions/an', hint: 'Fortification de 20 000 km' },
      { rank: 3, name: 'Colisée', value: '6 millions/an', hint: 'Amphithéâtre romain antique' },
      { rank: 4, name: 'Statue de la Liberté', value: '5,2 millions/an', hint: 'Cadeau de la France à New York' },
      { rank: 5, name: 'Machu Picchu', value: '1,5 millions/an', hint: 'Cité inca perchée au Pérou' },
      { rank: 6, name: 'Taj Mahal', value: '8 millions/an', hint: 'Mausolée blanc en Inde' },
      { rank: 7, name: 'Sagrada Familia', value: '4,7 millions/an', hint: 'Basilique de Gaudí à Barcelone' },
      { rank: 8, name: 'Stonehenge', value: '1,6 millions/an', hint: 'Cercle de pierres en Angleterre' },
      { rank: 9, name: 'Pyramides de Gizeh', value: '14,7 millions/an', hint: 'Tombeaux des pharaons égyptiens' },
      { rank: 10, name: 'Angkor Wat', value: '2,6 millions/an', hint: 'Temple khmer au Cambodge' }
    ]
  },
  {
    id: 'animaux-dangereux',
    name: 'Animaux les Plus Dangereux pour l\'Homme',
    description: 'Les 10 animaux qui causent le plus de morts humaines chaque année',
    items: [
      { rank: 1, name: 'Moustique', value: '1 million de morts/an', hint: 'Transmet paludisme et dengue' },
      { rank: 2, name: 'Serpent', value: '50 000 morts/an', hint: 'Venin mortel en quelques heures' },
      { rank: 3, name: 'Chien', value: '25 000 morts/an', hint: 'Rage et attaques' },
      { rank: 4, name: 'Mouche Tsé-tsé', value: '10 000 morts/an', hint: 'Maladie du sommeil en Afrique' },
      { rank: 5, name: 'Crocodile', value: '1 000 morts/an', hint: 'Mâchoires les plus puissantes' },
      { rank: 6, name: 'Hippopotame', value: '500 morts/an', hint: 'Herbivore très agressif' },
      { rank: 7, name: 'Éléphant', value: '400 morts/an', hint: 'Géant aux défenses d\'ivoire' },
      { rank: 8, name: 'Lion', value: '250 morts/an', hint: 'Roi de la savane africaine' },
      { rank: 9, name: 'Abeille', value: '200 morts/an', hint: 'Piqûres allergiques mortelles' },
      { rank: 10, name: 'Requin', value: '10 morts/an', hint: 'Prédateur des océans' }
    ]
  },
  {
    id: 'villes-france-population',
    name: 'Villes de France les Plus Peuplées (2024)',
    description: 'Les 10 villes françaises avec le plus d\'habitants (aire urbaine)',
    items: [
      { rank: 1, name: 'Paris', value: '12,4 millions', hint: 'Capitale et Tour Eiffel' },
      { rank: 2, name: 'Lyon', value: '2,3 millions', hint: 'Capitale des Gaules' },
      { rank: 3, name: 'Marseille', value: '1,9 millions', hint: 'Cité phocéenne et bouillabaisse' },
      { rank: 4, name: 'Lille', value: '1,2 millions', hint: 'Capitale des Flandres' },
      { rank: 5, name: 'Toulouse', value: '1,0 millions', hint: 'Ville rose et Airbus' },
      { rank: 6, name: 'Bordeaux', value: '0,9 millions', hint: 'Capitale du vin' },
      { rank: 7, name: 'Nice', value: '0,9 millions', hint: 'Baie des Anges et Côte d\'Azur' },
      { rank: 8, name: 'Nantes', value: '0,7 millions', hint: 'Machines de l\'île' },
      { rank: 9, name: 'Strasbourg', value: '0,5 millions', hint: 'Parlement européen' },
      { rank: 10, name: 'Rennes', value: '0,4 millions', hint: 'Capitale bretonne' }
    ]
  },
  {
    id: 'marques-voitures',
    name: 'Marques de Voitures les Plus Vendues (2024)',
    description: 'Les 10 constructeurs automobiles avec le plus de ventes mondiales',
    items: [
      { rank: 1, name: 'Toyota', value: '11,2 millions', hint: 'Constructeur japonais fiable' },
      { rank: 2, name: 'Volkswagen', value: '9,3 millions', hint: 'Groupe allemand et Coccinelle' },
      { rank: 3, name: 'General Motors', value: '6,2 millions', hint: 'Chevrolet et Cadillac' },
      { rank: 4, name: 'Stellantis', value: '6,1 millions', hint: 'Fusion Peugeot-Fiat-Chrysler' },
      { rank: 5, name: 'Ford', value: '4,4 millions', hint: 'Mustang et F-150' },
      { rank: 6, name: 'Honda', value: '4,0 millions', hint: 'Civic et motos' },
      { rank: 7, name: 'Nissan', value: '3,4 millions', hint: 'Leaf électrique et GT-R' },
      { rank: 8, name: 'Hyundai', value: '3,9 millions', hint: 'Constructeur sud-coréen' },
      { rank: 9, name: 'Kia', value: '2,9 millions', hint: 'Autre marque coréenne' },
      { rank: 10, name: 'Mercedes-Benz', value: '2,4 millions', hint: 'Étoile allemande de luxe' }
    ]
  },
  {
    id: 'reseaux-sociaux-utilisateurs',
    name: 'Réseaux Sociaux les Plus Utilisés (2024)',
    description: 'Les 10 plateformes sociales avec le plus d\'utilisateurs actifs mensuels',
    items: [
      { rank: 1, name: 'Facebook', value: '3,0 milliards', hint: 'Réseau de Mark Zuckerberg' },
      { rank: 2, name: 'YouTube', value: '2,7 milliards', hint: 'Plateforme vidéo de Google' },
      { rank: 3, name: 'WhatsApp', value: '2,4 milliards', hint: 'Messagerie instantanée' },
      { rank: 4, name: 'Instagram', value: '2,0 milliards', hint: 'Photos et stories' },
      { rank: 5, name: 'WeChat', value: '1,3 milliards', hint: 'Super-app chinoise' },
      { rank: 6, name: 'TikTok', value: '1,0 milliards', hint: 'Vidéos courtes et danse' },
      { rank: 7, name: 'Telegram', value: '800 millions', hint: 'Messagerie sécurisée' },
      { rank: 8, name: 'Snapchat', value: '750 millions', hint: 'Messages éphémères' },
      { rank: 9, name: 'Twitter', value: '450 millions', hint: 'Microblogging en 280 caractères' },
      { rank: 10, name: 'LinkedIn', value: '900 millions', hint: 'Réseau professionnel' }
    ]
  },
  {
    id: 'plats-francais-populaires',
    name: 'Plats Français les Plus Populaires',
    description: 'Les 10 spécialités culinaires françaises les plus appréciées dans le monde',
    items: [
      { rank: 1, name: 'Boeuf Bourguignon', value: 'Bourgogne', hint: 'Viande mijotée au vin rouge' },
      { rank: 2, name: 'Coq au Vin', value: 'Traditionnel', hint: 'Volaille braisée au vin' },
      { rank: 3, name: 'Ratatouille', value: 'Provence', hint: 'Légumes du soleil mijotés' },
      { rank: 4, name: 'Bouillabaisse', value: 'Marseille', hint: 'Soupe de poissons méditerranéenne' },
      { rank: 5, name: 'Cassoulet', value: 'Toulouse', hint: 'Haricots blancs et confit' },
      { rank: 6, name: 'Pot-au-feu', value: 'National', hint: 'Viande et légumes bouillis' },
      { rank: 7, name: 'Quiche Lorraine', value: 'Lorraine', hint: 'Tarte salée aux lardons' },
      { rank: 8, name: 'Escargots de Bourgogne', value: 'Bourgogne', hint: 'Gastéropodes au beurre persillé' },
      { rank: 9, name: 'Foie Gras', value: 'Sud-Ouest', hint: 'Mets de luxe controversé' },
      { rank: 10, name: 'Crêpes', value: 'Bretagne', hint: 'Galettes fines sucrées ou salées' }
    ]
  },
  {
    id: 'super-heros-populaires',
    name: 'Super-Héros les Plus Populaires (2024)',
    description: 'Les 10 super-héros les plus aimés selon les sondages et box-office',
    items: [
      { rank: 1, name: 'Spider-Man', value: 'Marvel', hint: 'Homme-araignée de New York' },
      { rank: 2, name: 'Batman', value: 'DC Comics', hint: 'Chevalier noir de Gotham' },
      { rank: 3, name: 'Superman', value: 'DC Comics', hint: 'Homme d\'acier de Krypton' },
      { rank: 4, name: 'Iron Man', value: 'Marvel', hint: 'Tony Stark en armure' },
      { rank: 5, name: 'Captain America', value: 'Marvel', hint: 'Soldat du futur au bouclier' },
      { rank: 6, name: 'Wonder Woman', value: 'DC Comics', hint: 'Amazone au lasso de vérité' },
      { rank: 7, name: 'Hulk', value: 'Marvel', hint: 'Géant vert en colère' },
      { rank: 8, name: 'Thor', value: 'Marvel', hint: 'Dieu nordique au marteau' },
      { rank: 9, name: 'Flash', value: 'DC Comics', hint: 'Homme le plus rapide du monde' },
      { rank: 10, name: 'Wolverine', value: 'Marvel', hint: 'Mutant aux griffes d\'adamantium' }
    ]
  },
  {
    id: 'festivals-musique-france',
    name: 'Festivals de Musique Français les Plus Fréquentés',
    description: 'Les 10 festivals musicaux français avec le plus de spectateurs',
    items: [
      { rank: 1, name: 'Hellfest', value: '180 000 spectateurs', hint: 'Metal à Clisson' },
      { rank: 2, name: 'Les Vieilles Charrues', value: '280 000 spectateurs', hint: 'Festival breton à Carhaix' },
      { rank: 3, name: 'Main Square Festival', value: '132 000 spectateurs', hint: 'Rock à Arras' },
      { rank: 4, name: 'Solidays', value: '180 000 spectateurs', hint: 'Solidarité contre le SIDA' },
      { rank: 5, name: 'Rock en Seine', value: '110 000 spectateurs', hint: 'Rock au Domaine de Saint-Cloud' },
      { rank: 6, name: 'Les Francofolies', value: '150 000 spectateurs', hint: 'Chanson française à La Rochelle' },
      { rank: 7, name: 'Garorock', value: '150 000 spectateurs', hint: 'Festival à Marmande' },
      { rank: 8, name: 'Eurockéennes', value: '130 000 spectateurs', hint: 'Rock à Belfort' },
      { rank: 9, name: 'Festival de Nîmes', value: '150 000 spectateurs', hint: 'Arènes romaines' },
      { rank: 10, name: 'Lollapalooza Paris', value: '85 000 spectateurs', hint: 'Version française du festival US' }
    ]
  },
  {
    id: 'desserts-francais',
    name: 'Desserts Français les Plus Célèbres',
    description: 'Les 10 pâtisseries et desserts français les plus reconnus mondialement',
    items: [
      { rank: 1, name: 'Crème Brûlée', value: 'Classique', hint: 'Crème vanille caramélisée au chalumeau' },
      { rank: 2, name: 'Tarte Tatin', value: 'Sologne', hint: 'Tarte aux pommes renversée' },
      { rank: 3, name: 'Macarons', value: 'Ladurée', hint: 'Petits gâteaux colorés à la ganache' },
      { rank: 4, name: 'Éclair', value: 'Pâtisserie', hint: 'Choux allongé fourré à la crème' },
      { rank: 5, name: 'Mille-feuille', value: 'Napoléon', hint: 'Feuilletage et crème pâtissière' },
      { rank: 6, name: 'Profiteroles', value: 'Choux', hint: 'Choux à la glace et chocolat chaud' },
      { rank: 7, name: 'Clafoutis', value: 'Limousin', hint: 'Cerises dans pâte à flan' },
      { rank: 8, name: 'Mousse au Chocolat', value: 'Classique', hint: 'Dessert aéré au cacao' },
      { rank: 9, name: 'Croquembouche', value: 'Mariage', hint: 'Pyramide de choux caramélisés' },
      { rank: 10, name: 'Soufflé', value: 'Technique', hint: 'Dessert gonflé qui retombe' }
    ]
  },
  {
    id: 'inventions-francaises',
    name: 'Inventions Françaises Célèbres',
    description: 'Les 10 inventions françaises qui ont marqué l\'histoire mondiale',
    items: [
      { rank: 1, name: 'Cinéma', value: 'Frères Lumière 1895', hint: 'Première projection publique' },
      { rank: 2, name: 'Photographie', value: 'Niépce 1826', hint: 'Première image fixée' },
      { rank: 3, name: 'Pasteurisation', value: 'Pasteur 1864', hint: 'Conservation des aliments' },
      { rank: 4, name: 'Stéthoscope', value: 'Laennec 1816', hint: 'Écouter le cœur' },
      { rank: 5, name: 'Parachute', value: 'Garnerin 1797', hint: 'Saut en sécurité' },
      { rank: 6, name: 'Braille', value: 'Louis Braille 1829', hint: 'Écriture pour aveugles' },
      { rank: 7, name: 'Aspirine', value: 'Gerhardt 1838', hint: 'Médicament anti-douleur' },
      { rank: 8, name: 'Margarine', value: 'Mège-Mouriès 1869', hint: 'Alternative au beurre' },
      { rank: 9, name: 'Bikini', value: 'Réard 1946', hint: 'Maillot de bain deux pièces' },
      { rank: 10, name: 'Carte à puce', value: 'Moreno 1974', hint: 'Paiement électronique' }
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
          const maxDistance = Math.floor(targetWord.length * 0.25); // 25% de tolérance
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
      const maxDistance = Math.floor(targetWord.length * 0.2); // 20% de tolérance
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
          const maxDistance = Math.floor(targetWord.length * 0.25);
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
          const maxDistance = Math.floor(targetWord.length * 0.25);
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