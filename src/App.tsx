import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GamesPage from './components/GamesPage';
import AboutPage from './components/AboutPage';
import GameDetail from './components/GameDetail';
import TelephoneGame from './components/TelephoneGame';
import { games } from './data/games';

type AppPage = 'home' | 'games' | 'about' | 'game-detail' | 'telephone-game';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as AppPage);
    if (page !== 'game-detail') {
      setSelectedGameId(null);
    }
  };

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentPage('game-detail');
  };

  const handlePlayGame = (gameId: string) => {
    if (gameId === 'telephone-arabe') {
      setCurrentPage('telephone-game');
    } else {
      // For non-interactive games, show the game detail
      handleGameSelect(gameId);
    }
  };

  const handleBack = () => {
    setCurrentPage('games');
    setSelectedGameId(null);
  };

  const selectedGame = selectedGameId ? games.find(g => g.id === selectedGameId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onPlayGame={handlePlayGame} />
        )}
        
        {currentPage === 'games' && (
          <GamesPage onGameSelect={handleGameSelect} onPlayGame={handlePlayGame} />
        )}
        
        {currentPage === 'about' && <AboutPage />}
        
        {currentPage === 'game-detail' && selectedGame && (
          <GameDetail 
            game={selectedGame} 
            onBack={handleBack}
            onPlay={handlePlayGame}
          />
        )}
        
        {currentPage === 'telephone-game' && (
          <TelephoneGame onBack={handleBack} />
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Jeux2Soirée - Animez vos soirées avec style !
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;