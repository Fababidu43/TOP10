import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GamesPage from './components/GamesPage';
import AboutPage from './components/AboutPage';
import GameDetail from './components/GameDetail';
import Top10Game from './components/Top10Game';
import NeverHaveIGame from './components/NeverHaveIGame';
import QuiMentGame from './components/QuiMentGame';
import DevineGifGame from './components/DevineGifGame';
import ShotRetardementGame from './components/ShotRetardementGame';
import { games } from './data/games';

type AppPage = 'home' | 'games' | 'about' | 'game-detail' | 'top10-game' | 'never-have-i-game' | 'qui-ment-game' | 'devine-gif-game' | 'shot-retardement-game';

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
    if (gameId === 'top-10') {
      setCurrentPage('top10-game');
    } else if (gameId === 'never-have-i') {
      setCurrentPage('never-have-i-game');
    } else if (gameId === 'qui-ment') {
      setCurrentPage('qui-ment-game');
    } else if (gameId === 'devine-gif') {
      setCurrentPage('devine-gif-game');
    } else if (gameId === 'shot-retardement') {
      setCurrentPage('shot-retardement-game');
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
        
        
        {currentPage === 'top10-game' && (
          <Top10Game onBack={handleBack} />
        )}
        
        {currentPage === 'never-have-i-game' && (
          <NeverHaveIGame onBack={handleBack} />
        )}
        
        {currentPage === 'qui-ment-game' && (
          <QuiMentGame onBack={handleBack} />
        )}
        
        {currentPage === 'devine-gif-game' && (
          <DevineGifGame onBack={handleBack} />
        )}
        
        {currentPage === 'shot-retardement-game' && (
          <ShotRetardementGame onBack={handleBack} />
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