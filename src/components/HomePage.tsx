import React from 'react';
import { Play, Users, Clock, Zap, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onPlayGame: (gameId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPlayGame }) => {
  const features = [
    {
      icon: Play,
      title: 'Jeux Interactifs',
      description: 'Jouez directement en ligne avec vos amis'
    },
    {
      icon: Users,
      title: 'Multijoueur',
      description: 'De 3 à 12 joueurs selon les jeux'
    },
    {
      icon: Clock,
      title: 'Parties Rapides',
      description: 'Des jeux de 10 minutes à 1 heure'
    },
    {
      icon: Zap,
      title: 'Facile à Jouer',
      description: 'Règles simples, plaisir garanti'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Animez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">soirées</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez une collection de jeux interactifs pour animer vos soirées entre amis. 
            Fou rire garanti avec nos jeux d'ambiance !
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('games')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-8 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all font-medium text-lg flex items-center gap-2"
            >
              Découvrir les jeux
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onPlayGame('telephone-arabe')}
              className="border-2 border-purple-500 text-purple-600 py-4 px-8 rounded-full hover:bg-purple-50 transition-all font-medium text-lg flex items-center gap-2"
            >
              <Play size={20} />
              Jouer maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Pourquoi choisir Jeux2Soirée ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Game */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Jeu vedette
          </h2>
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-bold mb-4">Téléphone Arabe</h3>
                <p className="text-purple-100 mb-6">
                  Le jeu d'ambiance par excellence ! Découvrez comment une phrase simple peut 
                  se transformer en message hilarant en passant de joueur en joueur.
                </p>
                <div className="flex items-center gap-4 text-purple-100 mb-6">
                  <span>👥 4-10 joueurs</span>
                  <span>⏱️ 15-30 min</span>
                  <span>🎯 Facile</span>
                </div>
                <button
                  onClick={() => onPlayGame('telephone-arabe')}
                  className="bg-white text-purple-600 py-3 px-6 rounded-full hover:bg-purple-50 transition-all font-medium flex items-center gap-2"
                >
                  <Play size={20} />
                  Jouer maintenant
                </button>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl mb-4">📱</div>
                  <h4 className="text-lg font-semibold mb-2">Version Interactive</h4>
                  <p className="text-purple-100 text-sm">
                    Jouez directement en ligne avec interface guidée et 
                    révélation automatique des résultats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Prêt à animer votre soirée ?
          </h2>
          <p className="text-gray-600 mb-8">
            Rejoignez des milliers de joueurs qui s'amusent déjà avec nos jeux interactifs
          </p>
          <button
            onClick={() => onNavigate('games')}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 px-8 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all font-medium text-lg"
          >
            Voir tous les jeux
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;