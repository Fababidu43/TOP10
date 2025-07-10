export interface GifItem {
  id: string;
  title: string;
  description: string;
  category: 'youtube' | 'tv' | 'meme' | 'viral';
  thumbnailUrl: string;
  videoUrl: string;
  alternatives?: string[];
  hint?: string;
}

// Base de données des vidéos virales françaises
export const frenchGifs: GifItem[] = [
  {
    id: '1',
    title: 'Tu es grosse Melissandre',
    description: 'Vidéo virale française devenue meme',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/OJTa7UPKoI4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/OJTa7UPKoI4',
    alternatives: ['grosse melissandre', 'melissandre', 'tu es grosse'],
    hint: 'Phrase culte devenue meme sur les réseaux sociaux'
  },
  {
    id: '2',
    title: 'TU COMMENCE PAS À ME CHOPER PARLE LE COLBACK!!!!!',
    description: 'Vidéo virale avec accent du sud',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/96B1YeZLTUU/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/96B1YeZLTUU',
    alternatives: ['colback', 'me choper', 'commence pas'],
    hint: 'Vidéo avec un accent du sud très prononcé'
  },
  {
    id: '3',
    title: 'BAH OUI CONNARD TU EST CHEZ MOI',
    description: 'Réplique culte française',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/KNIeg_moDu8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/KNIeg_moDu8',
    alternatives: ['connard tu es chez moi', 'chez moi', 'bah oui connard'],
    hint: 'Phrase de quelqu\'un qui défend son territoire'
  },
  {
    id: '4',
    title: 'Les coutures tiennent pas',
    description: 'Vidéo française virale',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/8444Uu-Gdsw/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/8444Uu-Gdsw',
    alternatives: ['coutures', 'tiennent pas', 'coutures tiennent'],
    hint: 'Problème de vêtement qui devient viral'
  },
  {
    id: '5',
    title: 'LE SIDA ? A CERTAINEMENT PAS !!! Eddy le quartier',
    description: 'Eddy le quartier - vidéo culte',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/B4CKTc_WXEE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/B4CKTc_WXEE',
    alternatives: ['sida certainement pas', 'eddy le quartier', 'certainement pas'],
    hint: 'Personnage internet français très connu'
  },
  {
    id: '6',
    title: 'Comment ça pas mal les bzez apex ?',
    description: 'Vidéo gaming française',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/uD-Yl7xbw7M/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/uD-Yl7xbw7M',
    alternatives: ['pas mal bzez apex', 'bzez apex', 'comment ca pas mal'],
    hint: 'Référence au jeu vidéo Apex Legends'
  },
  {
    id: '7',
    title: 'J\'ai démoli la mauvaise maison... j\'espère que ça va s\'arranger',
    description: 'Annevoie - erreur de démolition',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/aG0-NM2NhUw/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/aG0-NM2NhUw',
    alternatives: ['demoli mauvaise maison', 'annevoie', 'mauvaise maison'],
    hint: 'Erreur de démolition qui fait le buzz'
  },
  {
    id: '8',
    title: 'Je ne suis pas raciste je mange dans un kebab pakistanais',
    description: 'Phrase polémique devenue meme',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/KhOYFFw1whk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/KhOYFFw1whk',
    alternatives: ['pas raciste kebab', 'kebab pakistanais', 'mange kebab'],
    hint: 'Phrase contradictoire devenue célèbre'
  },
  {
    id: '9',
    title: 'T\'es pd ?',
    description: 'Question directe virale',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/T6jLL7ycJhY/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/T6jLL7ycJhY',
    alternatives: ['tes pd', 'es tu pd', 'pd'],
    hint: 'Question très directe et inattendue'
  },
  {
    id: '10',
    title: 'Non moi je suis coach',
    description: 'Réponse inattendue',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/pDrqxAPPI1g/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/pDrqxAPPI1g',
    alternatives: ['moi je suis coach', 'suis coach', 'non coach'],
    hint: 'Réponse surprenante à une question'
  },
  {
    id: '11',
    title: 'T\'es sûrement pas français',
    description: 'Test de nationalité viral TikTok',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/ZqCy0AqFNT4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/ZqCy0AqFNT4',
    alternatives: ['surement pas francais', 'pas francais', 'test francais'],
    hint: 'Vidéo TikTok qui teste si on est français'
  },
  {
    id: '12',
    title: 'La prévention ivresse - Groland',
    description: 'Sketch Groland sur Canal+',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/dHYHDqmyIk8/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/dHYHDqmyIk8',
    alternatives: ['prevention ivresse', 'groland', 'zapoi'],
    hint: 'Émission parodique de Canal+'
  },
  {
    id: '13',
    title: 'Tu touches à ma sensibilité',
    description: 'Phrase émotionnelle virale',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/vnjy-35Lxjg/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vnjy-35Lxjg',
    alternatives: ['touche sensibilite', 'ma sensibilite', 'touches sensibilite'],
    hint: 'Phrase très émotionnelle et dramatique'
  },
  {
    id: '14',
    title: 'Je vais t\'expliquer un truc : moi je suis un nerveux',
    description: 'Confession d\'un tempérament',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/HGeCH5uKlYQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HGeCH5uKlYQ',
    alternatives: ['je suis un nerveux', 'nerveux', 'expliquer truc'],
    hint: 'Quelqu\'un qui explique son caractère'
  },
  {
    id: '15',
    title: 'Makélélé : Brésil Ou Pas... M\'en bat les couilles !',
    description: 'Makélélé en interview',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/r-xRjqDASyQ/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/r-xRjqDASyQ',
    alternatives: ['makelele bresil', 'men bat les couilles', 'bresil ou pas'],
    hint: 'Footballeur français en interview'
  },
  {
    id: '16',
    title: 'Puceau moi ?',
    description: 'Question d\'incrédulité',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/_yt_AZETzIE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/_yt_AZETzIE',
    alternatives: ['puceau moi', 'puceau', 'moi puceau'],
    hint: 'Question d\'incrédulité totale'
  },
  {
    id: '17',
    title: 'Ça va péter',
    description: 'Avertissement dramatique',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/tX0oyVX8KWE/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/tX0oyVX8KWE',
    alternatives: ['ca va peter', 'va peter', 'ça pete'],
    hint: 'Avertissement que ça va mal se passer'
  },
  {
    id: '18',
    title: 'Etienne le Bolideur, fan de Bolidage',
    description: 'Personnage internet français',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/5V2D1aXX_UM/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/5V2D1aXX_UM',
    alternatives: ['etienne bolideur', 'bolidage', 'bolideur'],
    hint: 'Personnage obsédé par les voitures'
  },
  {
    id: '19',
    title: 'Kylian Mbappé s\'agace : Tu ne me parles plus d\'âge',
    description: 'Mbappé en interview',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/lZzvb738C_4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/lZzvb738C_4',
    alternatives: ['mbappe age', 'parles plus age', 'tu ne me parles'],
    hint: 'Footballeur français agacé par une question'
  },
  {
    id: '20',
    title: 'Je roucoule, je broie la langue de Molière',
    description: 'Phrase poétique virale',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/MKr1CA1r5s4/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/MKr1CA1r5s4',
    alternatives: ['roucoule broie', 'langue moliere', 'je roucoule'],
    hint: 'Phrase très poétique et sophistiquée'
  },
  {
    id: '21',
    title: 'LE RAP des CP',
    description: 'Rap d\'enfants de CP',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/G5H-G2Nvmuk/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/G5H-G2Nvmuk',
    alternatives: ['rap cp', 'rap des cp', 'enfants cp'],
    hint: 'Enfants de cours préparatoire qui rappent'
  },
  {
    id: '22',
    title: 'Sid Ho un pissenlit !',
    description: 'Exclamation virale',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/zoPRg3pPFrc/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/zoPRg3pPFrc',
    alternatives: ['sid ho pissenlit', 'pissenlit', 'sid ho'],
    hint: 'Exclamation très particulière et mémorable'
  },
  {
    id: '23',
    title: 'Les meilleurs memes - Haagrah',
    description: 'Compilation de memes français',
    category: 'meme',
    thumbnailUrl: 'https://img.youtube.com/vi/RzvzhEEDm8U/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/RzvzhEEDm8U',
    alternatives: ['haagrah memes', 'meilleurs memes', 'haagrah'],
    hint: 'Compilation de memes français populaires'
  },
  {
    id: '24',
    title: 'Le René va mettre une pétée à la Monique !',
    description: 'Sketch Groland',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/nnyHegZmXDc/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/nnyHegZmXDc',
    alternatives: ['rene petee monique', 'rene monique', 'petee monique'],
    hint: 'Sketch de l\'émission Groland'
  }
];

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'youtube': return '📺';
    case 'tv': return '📻';
    case 'viral': return '🔥';
    case 'meme': return '😂';
    default: return '🎭';
  }
};

export const getCategoryName = (category: string) => {
  switch (category) {
    case 'youtube': return 'YouTube';
    case 'tv': return 'TV';
    case 'viral': return 'Viral';
    case 'meme': return 'Meme';
    default: return 'Autre';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'youtube': return 'from-red-500 to-red-600';
    case 'tv': return 'from-blue-500 to-indigo-600';
    case 'viral': return 'from-orange-500 to-red-500';
    case 'meme': return 'from-yellow-400 to-orange-500';
    default: return 'from-purple-500 to-blue-500';
  }
};