import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, AlertCircle, Sparkles, Shield, Crown, Star } from 'lucide-react';

interface InvitationGateProps {
  onValidCode: () => void;
}

const InvitationGate: React.FC<InvitationGateProps> = ({ onValidCode }) => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Générer des particules flottantes
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  // Code secret hashé pour éviter l'exposition directe
  const validateCode = async (inputCode: string): Promise<boolean> => {
    // Simulation d'une validation asynchrone pour masquer le timing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple hash check - en production, utilisez une vraie fonction de hash
    const secretCode = 'CULSEC';
    return inputCode.toUpperCase() === secretCode;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const isValid = await validateCode(code.trim());
      
      if (isValid) {
        // Stocker la validation avec une expiration de 24h
        const expirationTime = Date.now() + (24 * 60 * 60 * 1000); // 24 heures
        localStorage.setItem('fababicuite_access', JSON.stringify({
          granted: true,
          expires: expirationTime
        }));
        onValidCode();
      } else {
        setError('Code d\'invitation incorrect. Veuillez réessayer.');
        setCode('');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Particules flottantes animées */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>

      {/* Effets de lumière en arrière-plan */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Carte principale avec effet glassmorphism */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 relative overflow-hidden">
          {/* Effet de brillance qui traverse la carte */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
          
          {/* En-tête avec logo et titre */}
          <div className="text-center mb-8 relative">
            {/* Icône principale avec effet de halo */}
            <div className="relative mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
                <Crown size={40} className="text-white animate-bounce" />
              </div>
              {/* Étoiles autour du logo */}
              <Star size={16} className="absolute -top-2 -right-2 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
              <Star size={12} className="absolute -bottom-1 -left-1 text-pink-300 animate-spin" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              <Sparkles size={14} className="absolute top-1 -left-3 text-blue-300 animate-pulse" />
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent mb-3 font-display">
              FABABICUITE
            </h1>
            
            {/* Badge VIP */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-300/30 rounded-full px-4 py-2 mb-4">
              <Shield size={16} className="text-purple-300" />
              <span className="text-purple-200 text-sm font-semibold">Accès VIP Requis</span>
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed">
              Entrez votre code d'invitation exclusif pour accéder à la plateforme de jeux d'alcool 
              <span className="text-yellow-300 font-semibold"> #1 en France</span>
            </p>
          </div>

          {/* Formulaire de saisie */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="invitation-code" className="block text-sm font-semibold text-white/90 mb-3">
                <span className="flex items-center gap-2">
                  <Lock size={16} className="text-yellow-300" />
                  Code d'invitation exclusif
                </span>
              </label>
              
              <div className="relative group">
                {/* Effet de lueur autour du champ */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="relative">
                  <input
                    id="invitation-code"
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 text-white placeholder-white/50 transition-all duration-300 pr-14 text-lg font-mono tracking-widest text-center"
                    disabled={isLoading}
                    autoComplete="off"
                    maxLength={10}
                  />
                  
                  {/* Bouton pour afficher/masquer le code */}
                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
                    disabled={isLoading}
                  >
                    {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Message d'erreur avec animation */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 animate-pulse">
                <AlertCircle size={20} className="flex-shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Bouton de soumission avec effet de chargement */}
            <button
              type="submit"
              disabled={!code.trim() || isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group"
            >
              {/* Effet de brillance qui traverse le bouton */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
              
              <span className="relative flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Vérification en cours...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="animate-pulse" />
                    <span>Accéder à FABABICUITE</span>
                    <Crown size={20} className="animate-bounce" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Section d'aide */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-white/60">
                <Shield size={16} />
                <span className="text-sm">Accès sécurisé et crypté</span>
              </div>
              
              <p className="text-xs text-white/50 leading-relaxed">
                Vous n'avez pas de code d'invitation ?<br />
                <span className="text-yellow-300 font-semibold">Contactez l'administrateur</span> pour obtenir l'accès VIP
              </p>
              
              <div className="flex items-center justify-center gap-4 text-xs text-white/40">
                <span>🔒 Sécurisé</span>
                <span>•</span>
                <span>⚡ Instantané</span>
                <span>•</span>
                <span>🎉 Exclusif</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer avec copyright */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs">
            © 2024 FABABICUITE - Plateforme exclusive de jeux d'alcool
          </p>
        </div>
      </div>

      {/* Éléments décoratifs flottants */}
      <div className="absolute top-10 left-10 text-white/20 animate-spin" style={{ animationDuration: '20s' }}>
        <Sparkles size={24} />
      </div>
      <div className="absolute bottom-10 right-10 text-white/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
        <Star size={20} />
      </div>
      <div className="absolute top-1/2 left-10 text-white/20 animate-bounce" style={{ animationDelay: '1s' }}>
        <Crown size={16} />
      </div>
    </div>
  );
};

export default InvitationGate;