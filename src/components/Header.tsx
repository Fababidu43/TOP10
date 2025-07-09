import React from 'react';
import { Gamepad2, Home, List, Info } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'games', label: 'Jeux', icon: List },
    { id: 'about', label: 'À propos', icon: Info }
  ];

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-xl">
      <div className="container mx-auto px-3 md:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div 
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-white/20 p-1.5 md:p-2 rounded-full">
              <Gamepad2 size={24} className="text-yellow-300 md:w-8 md:h-8" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                FABABICUITE
              </h1>
              <p className="text-purple-200 text-xs md:text-sm">Animez vos soirées ! 🎉</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 md:space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1.5 md:py-2 rounded-full transition-all hover:bg-white/20 ${
                  currentPage === id ? 'bg-white/30 shadow-lg' : ''
                }`}
              >
                <Icon size={16} className="md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;