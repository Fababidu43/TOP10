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
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div 
            className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-white/25 p-2 md:p-3 rounded-full shadow-lg">
              <Gamepad2 size={28} className="text-yellow-300 md:w-10 md:h-10" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-display">
                FABABICUITE
              </h1>
              <p className="text-purple-200 text-sm md:text-base font-medium">🏆 #1 en France ! 🎉</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 md:space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-2 md:py-3 rounded-full transition-all hover:bg-white/25 hover:shadow-lg ${
                  currentPage === id ? 'bg-white/35 shadow-xl border border-white/30' : ''
                }`}
              >
                <Icon size={18} className="md:w-6 md:h-6" />
                <span className="font-semibold text-sm md:text-base hidden sm:inline">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;