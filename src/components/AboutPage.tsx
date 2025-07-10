import React from 'react';
import { Heart, Users, Star, Mail, Send, X } from 'lucide-react';

const AboutPage: React.FC = () => {
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Utiliser EmailJS ou un service similaire pour envoyer l'email
      // Pour l'instant, on simule l'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous pourriez intégrer EmailJS ou un autre service d'email
      console.log('Email à envoyer:', {
        to: 'fabian.measson.pro@gmail.com',
        from: formData.email,
        message: formData.message
      });
      
      setSubmitStatus('success');
      setFormData({ email: '', message: '' });
      setTimeout(() => {
        setShowContactForm(false);
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4" itemProp="name">
          À propos de FABABICUITE
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto" itemProp="description">
          J'ai crée une expériences ludiques pour rassembler les gens et créer des moments inoubliables.
        </p>
      </header>

      <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white" role="main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4" id="notre-mission">Notre Mission</h2>
            <p className="text-purple-100 mb-4">
              FABABICUITE est né d'une passion simple : rassembler les gens autour de jeux
              d'ambiance qui créent des souvenirs durables et des fous rires garantis.
            </p>
            <p className="text-purple-100">
              Je crois que les meilleurs moments se créent quand on se retrouve entre amis, 
              sans écran, juste avec de l'imagination et de la bonne humeur.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2" id="notre-objectif">Notre Objectif</h3>
              <p className="text-purple-100 text-sm">
                Rendre les jeux d'ambiance accessibles à tous, partout et à tout moment
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8" role="complementary">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2" itemProp="name">
            Fait avec ❤️
          </h3>
          <p className="text-gray-600" itemProp="description">
            Chaque jeu est soigneusement sélectionné et testé pour garantir des moments de joie partagée.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2" itemProp="name">
            Communauté
          </h3>
          <p className="text-gray-600" itemProp="description">
            Rejoignez une communauté de passionnés qui partagent leurs expériences et suggestions.
          </p>
        </div>

        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2" itemProp="name">
            Qualité
          </h3>
          <p className="text-gray-600" itemProp="description">
            Interface soignée, jeux testés et expérience utilisateur optimisée pour tous les appareils.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 rounded-2xl p-8" role="complementary">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center" id="nos-valeurs">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1" itemProp="name">Simplicité</h3>
              <p className="text-gray-600 text-sm">
                Des règles claires et une interface intuitive pour se concentrer sur l'essentiel : s'amuser !
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1" itemProp="name">Inclusion</h3>
              <p className="text-gray-600 text-sm">
                Tous les jeux sont conçus pour être accessibles à tous, quel que soit l'âge ou le niveau.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1" itemProp="name">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Nous modernisons les jeux traditionnels avec des versions interactives et numériques.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold">4</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1" itemProp="name">Convivialité</h3>
              <p className="text-gray-600 text-sm">
                Favoriser les échanges, les rires et les moments de complicité entre les joueurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border border-green-200" role="complementary">
        <div className="text-center">
          <div className="text-4xl mb-4">💌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4" id="contact">
            Contactez-moi
          </h2>
          <p className="text-gray-600 mb-6">
            Une question ? Une suggestion ? Une idée de nouveau jeu ? 
            Je serais ravi d'échanger avec vous !
          </p>
          <button
            onClick={() => setShowContactForm(true)}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-8 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all font-bold flex items-center gap-2 mx-auto shadow-lg transform hover:scale-105"
          >
            <Mail size={20} />
            Envoyer un message
          </button>
        </div>
      </section>

      {/* Modal de contact */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Contactez-moi</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <X size={20} />
              </button>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
                ✅ Message envoyé avec succès !
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
                ❌ Erreur lors de l'envoi. Réessayez plus tard.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.email || !formData.message}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send size={16} />
                      Envoyer
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 transition-all font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;