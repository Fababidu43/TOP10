export interface NeverHaveIQuestion {
  id: string;
  text: string;
  category: 'fun' | 'trash' | 'extreme';
}

export const neverHaveIQuestions: NeverHaveIQuestion[] = [
  // Questions Fun (50 questions)
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
  { id: '16', text: 'Je n\'ai jamais parlé à un animal comme s\'il pouvait me répondre', category: 'fun' },
  { id: '17', text: 'Je n\'ai jamais fait semblant de dormir pour éviter une conversation', category: 'fun' },
  { id: '18', text: 'Je n\'ai jamais eu une chanson coincée dans la tête pendant des jours', category: 'fun' },
  { id: '19', text: 'Je n\'ai jamais essayé de rattraper quelque chose qui tombait et fait tomber autre chose', category: 'fun' },
  { id: '20', text: 'Je n\'ai jamais regardé un épisode entier d\'une série que je déteste', category: 'fun' },
  { id: '21', text: 'Je n\'ai jamais fait semblant de connaître une célébrité dont tout le monde parlait', category: 'fun' },
  { id: '22', text: 'Je n\'ai jamais eu peur du noir étant adulte', category: 'fun' },
  { id: '23', text: 'Je n\'ai jamais mangé directement dans un pot de glace', category: 'fun' },
  { id: '24', text: 'Je n\'ai jamais fait semblant d\'écouter quelqu\'un au téléphone', category: 'fun' },
  { id: '25', text: 'Je n\'ai jamais eu envie de toucher la peinture fraîche', category: 'fun' },
  { id: '26', text: 'Je n\'ai jamais fait des bulles avec mon chewing-gum en public', category: 'fun' },
  { id: '27', text: 'Je n\'ai jamais essayé de deviner le mot de passe WiFi de mes voisins', category: 'fun' },
  { id: '28', text: 'Je n\'ai jamais fait semblant de travailler quand mon patron passait', category: 'fun' },
  { id: '29', text: 'Je n\'ai jamais eu une conversation entière avec quelqu\'un sans retenir son nom', category: 'fun' },
  { id: '30', text: 'Je n\'ai jamais fait semblant d\'aimer un cadeau que je détestais', category: 'fun' },
  { id: '31', text: 'Je n\'ai jamais essayé de faire un selfie parfait pendant 20 minutes', category: 'fun' },
  { id: '32', text: 'Je n\'ai jamais regardé des vidéos de chats pendant des heures', category: 'fun' },
  { id: '33', text: 'Je n\'ai jamais fait semblant de comprendre un accent étranger', category: 'fun' },
  { id: '34', text: 'Je n\'ai jamais eu peur d\'un clown', category: 'fun' },
  { id: '35', text: 'Je n\'ai jamais mangé quelque chose juste parce que c\'était gratuit', category: 'fun' },
  { id: '36', text: 'Je n\'ai jamais fait semblant d\'être occupé(e) pour éviter quelqu\'un', category: 'fun' },
  { id: '37', text: 'Je n\'ai jamais eu une crise de fou rire dans un moment inapproprié', category: 'fun' },
  { id: '38', text: 'Je n\'ai jamais essayé de faire du moonwalk', category: 'fun' },
  { id: '39', text: 'Je n\'ai jamais regardé la même série plusieurs fois', category: 'fun' },
  { id: '40', text: 'Je n\'ai jamais fait semblant de savoir cuisiner', category: 'fun' },
  { id: '41', text: 'Je n\'ai jamais eu peur d\'un insecte minuscule', category: 'fun' },
  { id: '42', text: 'Je n\'ai jamais fait des grimaces devant un miroir', category: 'fun' },
  { id: '43', text: 'Je n\'ai jamais essayé de parler à Siri ou Alexa comme à un humain', category: 'fun' },
  { id: '44', text: 'Je n\'ai jamais fait semblant de comprendre l\'art moderne', category: 'fun' },
  { id: '45', text: 'Je n\'ai jamais eu envie de presser tous les boutons d\'un ascenseur', category: 'fun' },
  { id: '46', text: 'Je n\'ai jamais fait semblant d\'aimer le sport pour impressionner quelqu\'un', category: 'fun' },
  { id: '47', text: 'Je n\'ai jamais essayé de faire des tours avec ma langue', category: 'fun' },
  { id: '48', text: 'Je n\'ai jamais regardé un film juste pour l\'acteur/actrice', category: 'fun' },
  { id: '49', text: 'Je n\'ai jamais fait semblant de comprendre une référence culturelle', category: 'fun' },
  { id: '50', text: 'Je n\'ai jamais eu peur de rater quelque chose d\'important sur les réseaux sociaux', category: 'fun' },

  // Questions Trash (40 questions)
  { id: '51', text: 'Je n\'ai jamais embrassé quelqu\'un au travail ou à l\'école', category: 'trash' },
  { id: '52', text: 'Je n\'ai jamais menti sur mon âge', category: 'trash' },
  { id: '53', text: 'Je n\'ai jamais fouillé dans le téléphone de quelqu\'un d\'autre', category: 'trash' },
  { id: '54', text: 'Je n\'ai jamais fait semblant d\'avoir un orgasme', category: 'trash' },
  { id: '55', text: 'Je n\'ai jamais triché lors d\'un examen', category: 'trash' },
  { id: '56', text: 'Je n\'ai jamais eu un coup d\'un soir', category: 'trash' },
  { id: '57', text: 'Je n\'ai jamais menti sur mon nombre de partenaires', category: 'trash' },
  { id: '58', text: 'Je n\'ai jamais regardé du contenu pour adultes au travail', category: 'trash' },
  { id: '59', text: 'Je n\'ai jamais embrassé quelqu\'un en étant en couple avec quelqu\'un d\'autre', category: 'trash' },
  { id: '60', text: 'Je n\'ai jamais volé quelque chose dans un magasin', category: 'trash' },
  { id: '61', text: 'Je n\'ai jamais eu des pensées inappropriées sur un ami proche', category: 'trash' },
  { id: '62', text: 'Je n\'ai jamais menti à mes parents sur où j\'étais', category: 'trash' },
  { id: '63', text: 'Je n\'ai jamais eu une relation avec quelqu\'un de beaucoup plus âgé/jeune', category: 'trash' },
  { id: '64', text: 'Je n\'ai jamais fait quelque chose de sexuel dans un lieu public', category: 'trash' },
  { id: '65', text: 'Je n\'ai jamais eu envie de quelqu\'un qui était pris(e)', category: 'trash' },
  { id: '66', text: 'Je n\'ai jamais envoyé un message à la mauvaise personne', category: 'trash' },
  { id: '67', text: 'Je n\'ai jamais stalké quelqu\'un sur les réseaux sociaux', category: 'trash' },
  { id: '68', text: 'Je n\'ai jamais fait semblant d\'être quelqu\'un d\'autre en ligne', category: 'trash' },
  { id: '69', text: 'Je n\'ai jamais eu une aventure avec l\'ex de quelqu\'un que je connaissais', category: 'trash' },
  { id: '70', text: 'Je n\'ai jamais menti sur mes revenus ou mon travail', category: 'trash' },
  { id: '71', text: 'Je n\'ai jamais eu des relations sexuelles dans la maison de mes parents', category: 'trash' },
  { id: '72', text: 'Je n\'ai jamais fait semblant d\'être sobre alors que j\'étais ivre', category: 'trash' },
  { id: '73', text: 'Je n\'ai jamais eu une relation secrète', category: 'trash' },
  { id: '74', text: 'Je n\'ai jamais menti sur ma virginité', category: 'trash' },
  { id: '75', text: 'Je n\'ai jamais eu des fantasmes sur une célébrité pendant l\'acte', category: 'trash' },
  { id: '76', text: 'Je n\'ai jamais envoyé une photo compromettante', category: 'trash' },
  { id: '77', text: 'Je n\'ai jamais fait l\'amour dans une voiture', category: 'trash' },
  { id: '78', text: 'Je n\'ai jamais eu une relation avec quelqu\'un juste pour le sexe', category: 'trash' },
  { id: '79', text: 'Je n\'ai jamais menti sur ma taille ou mon poids', category: 'trash' },
  { id: '80', text: 'Je n\'ai jamais regardé du porno avec quelqu\'un d\'autre', category: 'trash' },
  { id: '81', text: 'Je n\'ai jamais eu des relations dans les toilettes publiques', category: 'trash' },
  { id: '82', text: 'Je n\'ai jamais fait semblant d\'aimer quelque chose au lit', category: 'trash' },
  { id: '83', text: 'Je n\'ai jamais eu une aventure d\'un soir avec un inconnu rencontré en soirée', category: 'trash' },
  { id: '84', text: 'Je n\'ai jamais menti sur mon passé sexuel', category: 'trash' },
  { id: '85', text: 'Je n\'ai jamais eu des relations avec quelqu\'un dont j\'ai oublié le nom', category: 'trash' },
  { id: '86', text: 'Je n\'ai jamais fait quelque chose de sexuel pour de l\'argent ou des cadeaux', category: 'trash' },
  { id: '87', text: 'Je n\'ai jamais eu des relations avec deux personnes le même jour', category: 'trash' },
  { id: '88', text: 'Je n\'ai jamais menti sur ma situation amoureuse', category: 'trash' },
  { id: '89', text: 'Je n\'ai jamais eu des relations avec quelqu\'un de ma famille élargie', category: 'trash' },
  { id: '90', text: 'Je n\'ai jamais fait l\'amour en pensant à quelqu\'un d\'autre', category: 'trash' },

  // Questions Extrêmes (30 questions)
  { id: '91', text: 'Je n\'ai jamais eu une relation avec deux personnes en même temps', category: 'extreme' },
  { id: '92', text: 'Je n\'ai jamais consommé de drogues dures', category: 'extreme' },
  { id: '93', text: 'Je n\'ai jamais participé à un plan à trois', category: 'extreme' },
  { id: '94', text: 'Je n\'ai jamais été arrêté(e) par la police', category: 'extreme' },
  { id: '95', text: 'Je n\'ai jamais eu une relation avec le/la partenaire d\'un(e) ami(e)', category: 'extreme' },
  { id: '96', text: 'Je n\'ai jamais fait quelque chose d\'illégal pour de l\'argent', category: 'extreme' },
  { id: '97', text: 'Je n\'ai jamais eu une aventure avec quelqu\'un de marié(e)', category: 'extreme' },
  { id: '98', text: 'Je n\'ai jamais participé à une orgie', category: 'extreme' },
  { id: '99', text: 'Je n\'ai jamais eu des relations sexuelles dans un lieu vraiment inapproprié', category: 'extreme' },
  { id: '100', text: 'Je n\'ai jamais été payé(e) pour des services sexuels', category: 'extreme' },
  { id: '101', text: 'Je n\'ai jamais payé pour des services sexuels', category: 'extreme' },
  { id: '102', text: 'Je n\'ai jamais participé à un échange de partenaires', category: 'extreme' },
  { id: '103', text: 'Je n\'ai jamais été dans une relation abusive', category: 'extreme' },
  { id: '104', text: 'Je n\'ai jamais eu des pensées suicidaires', category: 'extreme' },
  { id: '105', text: 'Je n\'ai jamais fait du chantage à quelqu\'un', category: 'extreme' },
  { id: '106', text: 'Je n\'ai jamais eu une addiction grave', category: 'extreme' },
  { id: '107', text: 'Je n\'ai jamais trompé aux impôts', category: 'extreme' },
  { id: '108', text: 'Je n\'ai jamais eu des relations sexuelles non protégées avec un inconnu', category: 'extreme' },
  { id: '109', text: 'Je n\'ai jamais vendu de la drogue', category: 'extreme' },
  { id: '110', text: 'Je n\'ai jamais eu des relations avec un mineur étant majeur(e)', category: 'extreme' },
  { id: '111', text: 'Je n\'ai jamais fait quelque chose que je regrette profondément', category: 'extreme' },
  { id: '112', text: 'Je n\'ai jamais eu des pensées de violence envers quelqu\'un', category: 'extreme' },
  { id: '113', text: 'Je n\'ai jamais menti sous serment', category: 'extreme' },
  { id: '114', text: 'Je n\'ai jamais eu une relation incestueuse', category: 'extreme' },
  { id: '115', text: 'Je n\'ai jamais fait quelque chose d\'illégal qui aurait pu me mener en prison', category: 'extreme' },
  { id: '116', text: 'Je n\'ai jamais eu des relations avec quelqu\'un contre de l\'argent', category: 'extreme' },
  { id: '117', text: 'Je n\'ai jamais participé à des activités sexuelles extrêmes', category: 'extreme' },
  { id: '118', text: 'Je n\'ai jamais eu des relations avec un(e) prostitué(e)', category: 'extreme' },
  { id: '119', text: 'Je n\'ai jamais fait quelque chose qui a détruit la vie de quelqu\'un', category: 'extreme' },
  { id: '120', text: 'Je n\'ai jamais eu des relations sexuelles filmées sans le consentement de l\'autre', category: 'extreme' }
];

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'fun': return 'from-green-400 to-emerald-500';
    case 'trash': return 'from-orange-400 to-red-500';
    case 'extreme': return 'from-red-500 to-pink-600';
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

export const getCategoryDescription = (category: string) => {
  switch (category) {
    case 'fun': return 'Questions amusantes et légères pour tous';
    case 'trash': return 'Questions plus osées et coquines';
    case 'extreme': return 'Questions très intimes et personnelles (18+)';
    default: return 'Questions diverses';
  }
};