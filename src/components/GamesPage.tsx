import React, { useState, useMemo } from 'react';
import { GameFilter } from '../types';
import { games } from '../data/games';
import GameCard from './GameCard';
import GameFilters from './GameFilters';

interface GamesPageProps {
  onGameSelect: (gameId: string) => void;
  onPlayGame: (gameId: string) => void;
}

const GamesPage: React.FC<GamesPageProps> = ({ onGameSelect, onPlayGame }) => {
  const [filters, setFilters] = useState<GameFilter>({
    search: '',
    category: '',
    players: '',
    difficulty: ''
  });

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                           game.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || game.category === filters.category;
      const matchesDifficulty = !filters.difficulty || game.difficulty === filters.difficulty;
      
      let matchesPlayers = true;
      if (filters.players) {
        const playerCount = parseInt(game.players.split('-')[0]);
        switch (filters.players) {
          case '3-5':
            matchesPlayers = playerCount >= 3 && playerCount <= 5;
            break;
          case '6-8':
            matchesPlayers = playerCount >= 6 && playerCount <= 8;
            break;
          case '9+':
            matchesPlayers = playerCount >= 9;
            break;
        }
      }
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPlayers;
    });
  }, [filters]);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4" itemProp="name">
          Tous nos jeux
        </h1>
        <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-4" itemProp="description">
          Découvrez notre collection de jeux d'ambiance pour animer vos soirées. 
          Filtrez par catégorie, difficulté ou nombre de joueurs pour trouver le jeu parfait !
        </p>
      </header>

      <GameFilters filters={filters} onFiltersChange={setFilters} />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="main">
        {filteredGames.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onGameSelect}
            onPlay={onPlayGame}
          />
        ))}
      </main>

      {filteredGames.length === 0 && (
        <div className="text-center py-8 md:py-16" role="status" aria-live="polite">
          <div className="text-4xl md:text-6xl mb-4">🔍</div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Aucun jeu trouvé
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
};

export default GamesPage;