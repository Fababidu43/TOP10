import React, { useState } from 'react';
import InvitationGate from './components/InvitationGate';
import SEOHead from './components/SEOHead';
import Header from './components/Header';
import HomePage from './components/HomePage';
import GamesPage from './components/GamesPage';
import AboutPage from './components/AboutPage';
import GameDetail from './components/GameDetail';
import Top10Game from './components/Top10Game';
import NeverHaveIGame from './components/NeverHaveIGame';
import DevineGifGame from './components/DevineGifGame';
import { games } from './data/games';

type AppPage = 'home' | 'games' | 'about' | 'game-detail' | 'top10-game' | 'never-have-i-game' | 'devine-gif-game';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [hasAccess, setHasAccess] = useState(() => {
    // Vérifier si l'utilisateur a déjà validé le code
    return localStorage.getItem('fababicuite_access') === 'granted';
  });

  const handleValidCode = () => {
    setHasAccess(true);
  };

  // Si l'utilisateur n'a pas accès, afficher la page de code d'invitation
  if (!hasAccess) {
    return <InvitationGate onValidCode={handleValidCode} />;
  }

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
    } else if (gameId === 'devine-gif') {
      setCurrentPage('devine-gif-game');
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

  // Configuration SEO dynamique selon la page
  const getSEOConfig = () => {
    switch (currentPage) {
      case 'games':
        return {
          title: "Tous nos Jeux d'Alcool Interactifs | FABABICUITE",
          description: "Découvrez notre collection complète de jeux d'alcool pour animer vos soirées : Top 10, Je n'ai jamais, Devine le GIF et bien plus encore !",
          keywords: "jeux d'alcool, collection jeux soirée, top 10, je n'ai jamais, devine gif, jeux multijoueurs",
          canonical: "https://fababicuite.fr/jeux"
        };
      case 'about':
        return {
          title: "À Propos de FABABICUITE - Notre Mission et Valeurs",
          description: "Découvrez l'histoire de FABABICUITE, notre mission d'animer vos soirées et nos valeurs de convivialité et de partage entre amis.",
          keywords: "à propos fababicuite, mission, valeurs, équipe, histoire",
          canonical: "https://fababicuite.fr/a-propos"
        };
      case 'top10-game':
        return {
          title: "Jeu Top 10 Interactif - Devinez les Classements | FABABICUITE",
          description: "Jouez au Top 10 interactif ! Devinez les éléments des classements mondiaux et faites boire vos amis selon vos performances.",
          keywords: "top 10, jeu classement, quiz interactif, jeu multijoueur, deviner classement",
          canonical: "https://fababicuite.fr/top-10"
        };
      case 'never-have-i-game':
        return {
          title: "Je N'ai Jamais Interactif - Révélez vos Secrets | FABABICUITE",
          description: "Jouez à Je n'ai jamais avec vos amis ! Questions personnalisables, catégories variées, révélations garanties pour animer vos soirées.",
          keywords: "je n'ai jamais, jeu révélation, questions personnalisées, jeu intime, secrets amis",
          canonical: "https://fababicuite.fr/je-nai-jamais"
        };
      case 'devine-gif-game':
        return {
          title: "Devine le GIF - Culture Française Interactive | FABABICUITE",
          description: "Testez votre culture française avec Devine le GIF ! Films, séries, memes... 30 secondes pour deviner et faire boire vos amis.",
          keywords: "devine gif, culture française, quiz culture, memes français, jeu culture",
          canonical: "https://fababicuite.fr/devine-gif"
        };
      case 'game-detail':
        if (selectedGame) {
          return {
            title: `${selectedGame.title} - Règles et Guide Complet | FABABICUITE`,
            description: `Découvrez les règles complètes de ${selectedGame.title} : ${selectedGame.description}`,
            keywords: `${selectedGame.title.toLowerCase()}, règles jeu, guide complet, ${selectedGame.category}`,
            canonical: `https://fababicuite.fr/jeu/${selectedGame.id}`
          };
        }
        break;
      default:
        return {
          title: "FABABICUITE - Jeux d'Alcool Interactifs pour Animer vos Soirées",
          description: "Découvrez FABABICUITE, la plateforme de jeux d'alcool interactifs pour animer vos soirées entre amis. Top 10, Je n'ai jamais, Devine le GIF et plus encore !",
          keywords: "jeux d'alcool, jeux de soirée, jeux entre amis, animation soirée, jeux interactifs, fababicuite",
          canonical: "https://fababicuite.fr/"
        };
    }
    
    return {
      title: "FABABICUITE - Jeux d'Alcool Interactifs pour Animer vos Soirées",
      description: "Découvrez FABABICUITE, la plateforme de jeux d'alcool interactifs pour animer vos soirées entre amis. Top 10, Je n'ai jamais, Devine le GIF et plus encore !",
      keywords: "jeux d'alcool, jeux de soirée, jeux entre amis, animation soirée, jeux interactifs, fababicuite",
      canonical: "https://fababicuite.fr/"
    };
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <SEOHead {...getSEOConfig()} />
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
        
        {currentPage === 'devine-gif-game' && (
          <DevineGifGame onBack={handleBack} />
        )}
      </main>
      
      <footer className="bg-gradient-to-r from-purple-800 to-pink-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-purple-200">
            © 2024 FABABICUITE - Anime tes soirées avec style ! 🎉
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;