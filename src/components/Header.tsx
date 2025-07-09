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
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-white/20 p-2 rounded-full">
              <Gamepad2 size={32} className="text-yellow-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                FABABIBOIRE
              </h1>
              <p className="text-purple-200 text-sm">Animez vos soirées ! 🎉</p>
            </div>
          </div>
          
          <nav className="flex space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all hover:bg-white/20 ${
                  currentPage === id ? 'bg-white/30 shadow-lg' : ''
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;