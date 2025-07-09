import React from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "FABABICUITE - Jeux d'Alcool Interactifs pour Animer vos Soirées",
  description = "Découvrez FABABICUITE, la plateforme de jeux d'alcool interactifs pour animer vos soirées entre amis. Top 10, Je n'ai jamais, Devine le GIF et plus encore !",
  keywords = "jeux d'alcool, jeux de soirée, jeux entre amis, animation soirée, jeux interactifs",
  canonical = "https://fababicuite.fr/",
  ogImage = "https://fababicuite.fr/og-image.jpg",
  noindex = false
}) => {
  React.useEffect(() => {
    // Mettre à jour le titre
    document.title = title;
    
    // Mettre à jour les meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Meta tags standards
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonical, true);

    // Twitter Card
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

  }, [title, description, keywords, canonical, ogImage, noindex]);

  return null;
};

export default SEOHead;