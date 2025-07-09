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
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-6xl font-bold mb-6">
            Animez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">soirées</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez une collection de jeux interactifs pour animer vos soirées entre amis. 
            Fou rire garanti avec nos jeux d'ambiance colorés et délirants !
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('games')}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-4 px-8 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all font-medium text-lg flex items-center gap-2 shadow-lg transform hover:scale-105"
            >
              <Sparkles size={20} />
              Découvrir les jeux
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onPlayGame('top-10')}
              className="border-2 border-purple-500 text-purple-600 py-4 px-8 rounded-full hover:bg-purple-50 transition-all font-medium text-lg flex items-center gap-2 shadow-lg transform hover:scale-105"
            >
              <Play size={20} />
              Jouer maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Quick Games Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Jeux Populaires
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickGames.map((game, index) => (
              <div
                key={game.id}
                onClick={() => onPlayGame(game.id)}
                className={`bg-gradient-to-br ${game.color} p-6 rounded-2xl text-white cursor-pointer transform hover:scale-105 transition-all shadow-lg hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{game.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                <p className="text-white/90 mb-4">{game.description}</p>
                <div className="flex items-center gap-2 text-white/80">
                  <Play size={16} />
                  <span className="text-sm">Cliquez pour jouer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Pourquoi choisir FABABIBOIRE ?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 rounded-3xl mx-4">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Rejoignez la fête !
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-gray-700">Jeux Disponibles</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-pink-600 mb-2">∞</div>
              <div className="text-gray-700">Parties Possibles</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-700">Fun Garanti</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Prêt à animer votre soirée ?
            </span>
          </h2>
          <p className="text-gray-600 mb-8">
            Rejoignez des milliers de joueurs qui s'amusent déjà avec nos jeux interactifs colorés et délirants
          </p>
          <button
            onClick={() => onNavigate('games')}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white py-4 px-8 rounded-full hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all font-medium text-lg shadow-lg transform hover:scale-105"
          >
            🎮 Voir tous les jeux
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;