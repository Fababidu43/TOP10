import React from 'react';
import { Search, Filter } from 'lucide-react';
import { GameFilter } from '../types';
import { categories, difficulties } from '../data/games';

interface GameFiltersProps {
  filters: GameFilter;
  onFiltersChange: (filters: GameFilter) => void;
}

const GameFilters: React.FC<GameFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key: keyof GameFilter, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Filtres</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un jeu..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
        
        <select
          value={filters.players}
          onChange={(e) => handleFilterChange('players', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Tous les joueurs</option>
          <option value="3-5">3-5 joueurs</option>
          <option value="6-8">6-8 joueurs</option>
          <option value="9+">9+ joueurs</option>
        </select>
        
        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="">Toutes les difficultés</option>
          {difficulties.map(difficulty => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GameFilters;