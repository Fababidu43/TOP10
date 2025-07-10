import React from 'react';
import { Play, Users, Clock, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onPlayGame: (gameId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onPlayGame }) => {
  const features = [
    {
      icon: Play,
      title: 'Jeux Interactifs',
      description: 'Jouez directement en ligne avec vos amis',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Multijoueur',
      description: 'De 3 à 12 joueurs selon les jeux',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Parties Rapides',
      description: 'Des jeux de 10 minutes à 1 heure',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Zap,
      title: 'Facile à Jouer',
      description: 'Règles simples, plaisir garanti',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const quickGames = [
    {
      id: 'top-10',
      title: 'Top 10',
      emoji: '🏆',
      description: 'Devinez les classements',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'never-have-i',
      title: 'Je n\'ai jamais',
      emoji: '🍻',
      description: 'Révélez vos secrets',
      color: 'from-green-400 to-teal-500'
    },
    {
      id: 'devine-gif',
      title: 'Devine le GIF',
      emoji: '🎬',
      description: 'Culture française',
      color: 'from-pink-400 to-red-500'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-8 md:py-16" role="banner">
        <div className="max-w-4xl mx-auto">
          <div className="text-4xl md:text-8xl mb-4 md:mb-6 animate-bounce">🎉</div>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6" itemProp="name">
            Animez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">soirées</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4" itemProp="description">
            Découvrez une collection de jeux interactifs pour animer vos soirées entre amis. 
            Fou rire garanti avec nos jeux d'ambiance colorés et délirants !
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button
              onClick={() => onNavigate('games')}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all font-medium text-base md:text-lg flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
            >
              <Sparkles size={20} />
              Découvrir les jeux
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onPlayGame('top-10')}
              className="border-2 border-purple-500 text-purple-600 py-3 md:py-4 px-6 md:px-8 rounded-full hover:bg-purple-50 transition-all font-medium text-base md:text-lg flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
            >
              <Play size={20} />
              Jouer maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Quick Games Section */}
      <section className="py-8 md:py-16" role="main">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12" id="jeux-populaires">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Jeux Populaires
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8" role="list">
            {quickGames.map((game, index) => (
              <div
                key={game.id}
                onClick={() => onPlayGame(game.id)}
                className={`bg-gradient-to-br ${game.color} p-4 md:p-6 rounded-2xl text-white cursor-pointer transform hover:scale-105 transition-all shadow-lg hover:shadow-xl`}
                role="listitem"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && onPlayGame(game.id)}
                aria-label={`Jouer à ${game.title} - ${game.description}`}
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">{game.emoji}</div>
                <h3 className="text-lg md:text-xl font-bold mb-2" itemProp="name">{game.title}</h3>
                <p className="text-white/90 mb-3 md:mb-4 text-sm md:text-base">{game.description}</p>
                <div className="flex items-center gap-2 text-white/80">
                  <Play size={16} />
                  <span className="text-xs md:text-sm">Cliquez pour jouer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 md:py-16" role="complementary">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12" id="pourquoi-choisir">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Pourquoi choisir FABABICUITE ?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" role="list">
            {features.map((feature, index) => (
              <div key={index} className="text-center group" role="listitem">
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2" itemProp="name">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600" itemProp="description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-2xl md:rounded-3xl mx-4" role="complementary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8" id="statistiques">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Rejoignez la fête !
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8" role="list">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20" role="listitem">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">13</div>
              <div className="text-sm md:text-base text-gray-700">Top 10 Disponibles</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20" role="listitem">
              <div className="text-2xl md:text-3xl font-bold text-pink-600 mb-2">∞</div>
              <div className="text-sm md:text-base text-gray-700">Parties Possibles</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20" role="listitem">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-sm md:text-base text-gray-700">Fun Garanti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8 md:py-16 px-4" role="complementary">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" id="appel-action">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Prêt à animer votre soirée ?
            </span>
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
            Rejoignez des milliers de joueurs qui s'amusent déjà avec nos jeux interactifs colorés et délirants
          </p>
          <button
            onClick={() => onNavigate('games')}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-3 md:py-4 px-6 md:px-8 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all font-medium text-base md:text-lg shadow-lg transform hover:scale-105"
            aria-label="Voir tous les jeux disponibles sur FABABIBOIRE"
          >
            🎮 Voir tous les jeux
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;