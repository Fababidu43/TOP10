export interface NeverHaveIQuestion {
  id: string;
  text: string;
  category: 'fun' | 'trash' | 'extreme';
}

export const neverHaveIQuestions: NeverHaveIQuestion[] = [
  // Questions Fun
  { id: '1', text: 'Je n\'ai jamais chanté sous la douche', category: 'fun' },
  { id: '2', text: 'Je n\'ai jamais mangé de la pizza froide au petit-déjeuner', category: 'fun' },
  { id: '3', text: 'Je n\'ai jamais dansé seul(e) dans ma chambre', category: 'fun' },
  { id: '4', text: 'Je n\'ai jamais parlé à mon reflet dans le miroir', category: 'fun' },
  { id: '5', text: 'Je n\'ai jamais fait semblant d\'être malade pour éviter quelque chose', category: 'fun' },
  { id: '6', text: 'Je n\'ai jamais ri si fort que j\'ai craché ma boisson', category: 'fun' },
  { id: '7', text: 'Je n\'ai jamais regardé un film d\'horreur en me cachant derrière un coussin', category: 'fun' },
  { id: '8', text: 'Je n\'ai jamais essayé de lécher mon coude', category: 'fun' },
  { id: '9', text: 'Je n\'ai jamais fait du karaoké en public', category: 'fun' },
  { id: '10', text: 'Je n\'ai jamais oublié le nom de quelqu\'un juste après les présentations', category: 'fun' },
  { id: '11', text: 'Je n\'ai jamais fait semblant de comprendre une blague que je n\'avais pas comprise', category: 'fun' },
  { id: '12', text: 'Je n\'ai jamais eu peur d\'un film d\'animation Disney', category: 'fun' },
  { id: '13', text: 'Je n\'ai jamais mangé quelque chose qui était tombé par terre', category: 'fun' },
  { id: '14', text: 'Je n\'ai jamais fait une grimace à un bébé', category: 'fun' },
  { id: '15', text: 'Je n\'ai jamais essayé de faire des tours de magie ratés', category: 'fun' },

  // Questions Trash
  { id: '16', text: 'Je n\'ai jamais embrassé quelqu\'un au travail', category: 'trash' },
  { id: '17', text: 'Je n\'ai jamais menti sur mon âge', category: 'trash' },
  { id: '18', text: 'Je n\'ai jamais fouillé dans le téléphone de quelqu\'un d\'autre', category: 'trash' },
  { id: '19', text: 'Je n\'ai jamais fait semblant d\'avoir un orgasme', category: 'trash' },
  { id: '20', text: 'Je n\'ai jamais trompé lors d\'un examen', category: 'trash' },
  { id: '21', text: 'Je n\'ai jamais eu un coup d\'un soir', category: 'trash' },
  { id: '22', text: 'Je n\'ai jamais menti sur mon nombre de partenaires', category: 'trash' },
  { id: '23', text: 'Je n\'ai jamais regardé du contenu pour adultes au travail', category: 'trash' },
  { id: '24', text: 'Je n\'ai jamais embrassé quelqu\'un en étant en couple avec quelqu\'un d\'autre', category: 'trash' },
  { id: '25', text: 'Je n\'ai jamais volé quelque chose dans un magasin', category: 'trash' },
  { id: '26', text: 'Je n\'ai jamais eu des pensées inappropriées sur un ami proche', category: 'trash' },
  { id: '27', text: 'Je n\'ai jamais menti à mes parents sur où j\'étais', category: 'trash' },
  { id: '28', text: 'Je n\'ai jamais eu une relation avec quelqu\'un de beaucoup plus âgé/jeune', category: 'trash' },
  { id: '29', text: 'Je n\'ai jamais fait quelque chose de sexuel dans un lieu public', category: 'trash' },
  { id: '30', text: 'Je n\'ai jamais eu envie de quelqu\'un qui était pris(e)', category: 'trash' },

  // Questions Extrêmes
  { id: '31', text: 'Je n\'ai jamais eu une relation avec deux personnes en même temps', category: 'extreme' },
  { id: '32', text: 'Je n\'ai jamais consommé de drogues dures', category: 'extreme' },
  { id: '33', text: 'Je n\'ai jamais eu une relation avec quelqu\'un de ma famille élargie', category: 'extreme' },
  { id: '34', text: 'Je n\'ai jamais participé à un plan à trois', category: 'extreme' },
  { id: '35', text: 'Je n\'ai jamais été arrêté(e) par la police', category: 'extreme' },
  { id: '36', text: 'Je n\'ai jamais eu une relation avec le/la partenaire d\'un(e) ami(e)', category: 'extreme' },
  { id: '37', text: 'Je n\'ai jamais fait quelque chose d\'illégal pour de l\'argent', category: 'extreme' },
  { id: '38', text: 'Je n\'ai jamais eu une aventure avec quelqu\'un de marié(e)', category: 'extreme' },
  { id: '39', text: 'Je n\'ai jamais participé à une orgie', category: 'extreme' },
  { id: '40', text: 'Je n\'ai jamais eu des relations sexuelles dans un lieu vraiment inapproprié', category: 'extreme' }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fun': return 'from-green-500 to-teal-500';
    case 'trash': return 'from-orange-500 to-red-500';
    case 'extreme': return 'from-red-600 to-pink-600';
    default: return 'from-purple-500 to-blue-500';
  }
};

export const getCategoryName = (category: string) => {
  switch (category) {
    case 'fun': return 'Fun';
    case 'trash': return 'Trash';
    case 'extreme': return 'Extrême';
    default: return 'Autre';
  }
};