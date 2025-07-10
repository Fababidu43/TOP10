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
  return (
    <div className="space-y-8 px-4">
      <header className="text-center">
        <div className="text-4xl md:text-6xl mb-6">🎮</div>
        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6" itemProp="name">
          Nos Jeux d'Alcool
        </h1>
        <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed" itemProp="description">
          Découvrez notre collection exclusive de <strong>jeux d'ambiance interactifs</strong> pour animer vos soirées entre amis. 
          Des moments de <span className="text-orange-600 font-semibold">fou rire garantis</span> !
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto" role="main">
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onSelect={onGameSelect}
            onPlay={onPlayGame}
          />
        ))}
      </main>

      {games.length === 0 && (
        <div className="text-center py-8 md:py-16" role="status" aria-live="polite">
          <div className="text-4xl md:text-6xl mb-4">🔍</div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Aucun jeu trouvé
          </h3>
          <p className="text-base text-gray-600">
            Essayez de modifier vos critères de recherche
          </p>
        </div>
      )}
    </div>
  );
};

export default GamesPage;