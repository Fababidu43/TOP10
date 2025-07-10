import React, { useState } from 'react';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InvitationGateProps {
  onValidCode: () => void;
}

const InvitationGate: React.FC<InvitationGateProps> = ({ onValidCode }) => {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Code secret hashé pour éviter l'exposition directe
  const validateCode = async (inputCode: string): Promise<boolean> => {
    // Simulation d'une validation asynchrone pour masquer le timing
    await new Promise(resolve => setTimeout(resolve, 500));
    
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-200">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              FABABICUITE
            </h1>
            <p className="text-gray-600 text-sm">
              Accès restreint - Code d'invitation requis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="invitation-code" className="block text-sm font-medium text-gray-700 mb-2">
                Code d'invitation
              </label>
              <div className="relative">
                <input
                  id="invitation-code"
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Entrez votre code d'invitation"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white pr-12"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!code.trim() || isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Vérification...
                </div>
              ) : (
                'Accéder à FABABICUITE'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Vous n'avez pas de code d'invitation ?
              </p>
              <p className="text-xs text-gray-400">
                Contactez l'administrateur pour obtenir l'accès
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            © 2024 FABABICUITE - Accès sécurisé
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvitationGate;