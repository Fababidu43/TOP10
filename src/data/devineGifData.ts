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
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/OJTa7UPKoI4/hqdefault.jpg',
    videoUrl: 'OJTa7UPKoI4',
    alternatives: ['grosse melissandre', 'melissandre', 'tu es grosse'],
  },
  {
    id: '2',
    title: 'TU COMMENCE PAS À ME CHOPER PARLE LE COLBACK!!!!!',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/96B1YeZLTUU/hqdefault.jpg',
    videoUrl: '96B1YeZLTUU',
    alternatives: ['colback', 'me choper', 'commence pas'],
  },
  {
    id: '3',
    title: 'BAH OUI CONNARD TU EST CHEZ MOI',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/KNIeg_moDu8/hqdefault.jpg',
    videoUrl: 'KNIeg_moDu8',
    alternatives: ['connard tu es chez moi', 'chez moi', 'bah oui connard'],
  },
  {
    id: '4',
    title: 'Les coutures tiennent pas',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/8444Uu-Gdsw/hqdefault.jpg',
    videoUrl: '8444Uu-Gdsw',
    alternatives: ['coutures', 'tiennent pas', 'coutures tiennent'],
  },
  {
    id: '5',
    title: 'LE SIDA ? A CERTAINEMENT PAS !!! Eddy le quartier',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/B4CKTc_WXEE/hqdefault.jpg',
    videoUrl: 'B4CKTc_WXEE',
    alternatives: ['sida certainement pas', 'eddy le quartier', 'certainement pas'],
  },
  {
    id: '6',
    title: 'Comment ça pas mal les bzez apex ?',
    description: '',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/uD-Yl7xbw7M/hqdefault.jpg',
    videoUrl: 'uD-Yl7xbw7M',
    alternatives: ['pas mal bzez apex', 'bzez apex', 'comment ca pas mal'],
  },
  {
    id: '7',
    title: 'J\'ai démoli la mauvaise maison... j\'espère que ça va s\'arranger',
    description: '',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/aG0-NM2NhUw/hqdefault.jpg',
    videoUrl: 'aG0-NM2NhUw',
    alternatives: ['demoli mauvaise maison', 'annevoie', 'mauvaise maison'],
  },
  {
    id: '8',
    title: 'Je ne suis pas raciste je mange dans un kebab pakistanais',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/KhOYFFw1whk/hqdefault.jpg',
    videoUrl: 'KhOYFFw1whk',
    alternatives: ['pas raciste kebab', 'kebab pakistanais', 'mange kebab'],
  },
  {
    id: '9',
    title: 'T\'es pd ?',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/T6jLL7ycJhY/hqdefault.jpg',
    videoUrl: 'T6jLL7ycJhY',
    alternatives: ['tes pd', 'es tu pd', 'pd'],
  },
  {
    id: '10',
    title: 'Non moi je suis coach',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/pDrqxAPPI1g/hqdefault.jpg',
    videoUrl: 'pDrqxAPPI1g',
    alternatives: ['moi je suis coach', 'suis coach', 'non coach'],
  },
  {
    id: '11',
    title: 'T\'es sûrement pas français',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/ZqCy0AqFNT4/hqdefault.jpg',
    videoUrl: 'ZqCy0AqFNT4',
    alternatives: ['surement pas francais', 'pas francais', 'test francais'],
  },
  {
    id: '12',
    title: 'La prévention ivresse - Groland',
    description: '',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/dHYHDqmyIk8/hqdefault.jpg',
    videoUrl: 'dHYHDqmyIk8',
    alternatives: ['prevention ivresse', 'groland', 'zapoi'],
  },
  {
    id: '13',
    title: 'Tu touches à ma sensibilité',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/vnjy-35Lxjg/hqdefault.jpg',
    videoUrl: 'vnjy-35Lxjg',
    alternatives: ['touche sensibilite', 'ma sensibilite', 'touches sensibilite'],
  },
  {
    id: '14',
    title: 'Je vais t\'expliquer un truc : moi je suis un nerveux',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/HGeCH5uKlYQ/hqdefault.jpg',
    videoUrl: 'HGeCH5uKlYQ',
    alternatives: ['je suis un nerveux', 'nerveux', 'expliquer truc'],
  },
  {
    id: '15',
    title: 'Makélélé : Brésil Ou Pas... M\'en bat les couilles !',
    description: '',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/r-xRjqDASyQ/hqdefault.jpg',
    videoUrl: 'r-xRjqDASyQ',
    alternatives: ['makelele bresil', 'men bat les couilles', 'bresil ou pas'],
  },
  {
    id: '16',
    title: 'Puceau moi ?',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/_yt_AZETzIE/hqdefault.jpg',
    videoUrl: '_yt_AZETzIE',
    alternatives: ['puceau moi', 'puceau', 'moi puceau'],
  },
  {
    id: '17',
    title: 'Ça va péter',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/tX0oyVX8KWE/hqdefault.jpg',
    videoUrl: 'tX0oyVX8KWE',
    alternatives: ['ca va peter', 'va peter', 'ça pete'],
  },
  {
    id: '18',
    title: 'Etienne le Bolideur, fan de Bolidage',
    description: '',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/5V2D1aXX_UM/hqdefault.jpg',
    videoUrl: '5V2D1aXX_UM',
    alternatives: ['etienne bolideur', 'bolidage', 'bolideur'],
  },
  {
    id: '19',
    title: 'Kylian Mbappé s\'agace : Tu ne me parles plus d\'âge',
    description: '',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/lZzvb738C_4/hqdefault.jpg',
    videoUrl: 'lZzvb738C_4',
    alternatives: ['mbappe age', 'parles plus age', 'tu ne me parles'],
  },
  {
    id: '20',
    title: 'Je roucoule, je broie la langue de Molière',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/MKr1CA1r5s4/hqdefault.jpg',
    videoUrl: 'MKr1CA1r5s4',
    alternatives: ['roucoule broie', 'langue moliere', 'je roucoule'],
  },
  {
    id: '21',
    title: 'LE RAP des CP',
    description: '',
    category: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/G5H-G2Nvmuk/hqdefault.jpg',
    videoUrl: 'G5H-G2Nvmuk',
    alternatives: ['rap cp', 'rap des cp', 'enfants cp'],
  },
  {
    id: '22',
    title: 'Sid Ho un pissenlit !',
    description: '',
    category: 'viral',
    thumbnailUrl: 'https://img.youtube.com/vi/zoPRg3pPFrc/hqdefault.jpg',
    videoUrl: 'zoPRg3pPFrc',
    alternatives: ['sid ho pissenlit', 'pissenlit', 'sid ho'],
  },
  {
    id: '23',
    title: 'Les meilleurs memes - Haagrah',
    description: '',
    category: 'meme',
    thumbnailUrl: 'https://img.youtube.com/vi/RzvzhEEDm8U/hqdefault.jpg',
    videoUrl: 'RzvzhEEDm8U',
    alternatives: ['haagrah memes', 'meilleurs memes', 'haagrah'],
  },
  {
    id: '24',
    title: 'Le René va mettre une pétée à la Monique !',
    description: '',
    category: 'tv',
    thumbnailUrl: 'https://img.youtube.com/vi/nnyHegZmXDc/hqdefault.jpg',
    videoUrl: 'nnyHegZmXDc',
    alternatives: ['rene petee monique', 'rene monique', 'petee monique'],
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