// Configuration Google Analytics 4
export const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Remplacez par votre ID GA4

// Fonction pour initialiser Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Charger le script Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialiser gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Rendre gtag disponible globalement
    (window as any).gtag = gtag;
  }
};

// Fonction pour tracker les événements
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Fonction pour tracker les pages vues
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_title: title,
      page_location: url,
    });
  }
};

// Événements spécifiques pour FABABIBOIRE
export const trackGameStart = (gameName: string, playerCount: number) => {
  trackEvent('game_start', 'Games', gameName, playerCount);
};

export const trackGameComplete = (gameName: string, duration: number) => {
  trackEvent('game_complete', 'Games', gameName, duration);
};

export const trackCategorySelect = (categoryName: string) => {
  trackEvent('category_select', 'Top10', categoryName);
};

export const trackCorrectAnswer = (gameName: string, rank: number) => {
  trackEvent('correct_answer', 'Games', gameName, rank);
};

// Configuration Google Search Console
export const GSC_VERIFICATION = 'your-google-search-console-verification-code';

// Configuration pour les Core Web Vitals
export const reportWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
};