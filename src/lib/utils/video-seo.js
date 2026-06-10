// Video SEO utility functions

export const videoSeoConfig = {
  baseUrl: 'https://dizajnownia.pl',
  videoFiles: {
    mp4: '/img/film.mp4',
    webm: '/img/film.webm'
  },
  dimensions: {
    width: 1920,
    height: 1080
  },
  metadata: {
    title: 'Dizajnownia - Profesjonalne Projektowanie Graficzne',
    description: 'Poznaj nasze usługi projektowania graficznego - wizytówki, ulotki, banery, logo i wiele więcej. Wysokiej jakości wykonanie, szybka realizacja.',
    thumbnail: '/img/tlo-1024x550.png',
    duration: 'PT30S',
    uploadDate: '2024-01-01T00:00:00+01:00',
    tags: ['projektowanie graficzne', 'dizajnownia', 'wizytówki', 'ulotki', 'banery', 'logo'],
    category: 'Business'
  }
};

export function generateVideoStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": videoSeoConfig.metadata.title,
    "description": videoSeoConfig.metadata.description,
    "thumbnailUrl": `${videoSeoConfig.baseUrl}${videoSeoConfig.metadata.thumbnail}`,
    "uploadDate": videoSeoConfig.metadata.uploadDate,
    "duration": videoSeoConfig.metadata.duration,
    "contentUrl": `${videoSeoConfig.baseUrl}${videoSeoConfig.videoFiles.mp4}`,
    "embedUrl": videoSeoConfig.baseUrl,
    "width": videoSeoConfig.dimensions.width,
    "height": videoSeoConfig.dimensions.height,
    "inLanguage": "pl-PL",
    "genre": videoSeoConfig.metadata.category,
    "keywords": videoSeoConfig.metadata.tags.join(', '),
    "publisher": {
      "@type": "Organization",
      "name": "Dizajnownia",
      "alternateName": "Dizajnownia - Agencja Reklamowa",
      "url": videoSeoConfig.baseUrl,
      "logo": `${videoSeoConfig.baseUrl}/img/logo.svg`,
      "description": "Profesjonalne usługi projektowania graficznego i reklamy",
      "telephone": "+48793666397",
      "email": "kontakt@dizajnownia.pl",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PL",
        "addressLocality": "Poland"
      },
      "areaServed": "Poland",
      "sameAs": [
        "https://www.instagram.com/dizajnownia/",
        "https://facebook.com/dizajnownia/"
      ]
    }
  };
}

export function generateVideoMetaTags() {
  return {
    'og:video': `${videoSeoConfig.baseUrl}${videoSeoConfig.videoFiles.mp4}`,
    'og:video:type': 'video/mp4',
    'og:video:width': videoSeoConfig.dimensions.width.toString(),
    'og:video:height': videoSeoConfig.dimensions.height.toString(),
    'og:video:secure_url': `${videoSeoConfig.baseUrl}${videoSeoConfig.videoFiles.mp4}`,
    'twitter:card': 'player',
    'twitter:player': `${videoSeoConfig.baseUrl}${videoSeoConfig.videoFiles.mp4}`,
    'twitter:player:width': videoSeoConfig.dimensions.width.toString(),
    'twitter:player:height': videoSeoConfig.dimensions.height.toString()
  };
}

export function generateVideoPreloadLinks() {
  return [
    {
      rel: 'preload',
      as: 'video',
      href: videoSeoConfig.videoFiles.webm,
      type: 'video/webm'
    },
    {
      rel: 'preload',
      as: 'video',
      href: videoSeoConfig.videoFiles.mp4,
      type: 'video/mp4'
    }
  ];
}

export function validateVideoStructuredData() {
  const data = generateVideoStructuredData();
  const requiredFields = ['name', 'description', 'uploadDate', 'thumbnailUrl', 'contentUrl', 'embedUrl'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    console.warn('Missing required video structured data fields:', missingFields);
    return false;
  }
  
  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;
  if (!dateRegex.test(data.uploadDate)) {
    console.warn('Invalid uploadDate format. Expected ISO 8601 format with timezone.');
    return false;
  }
  
  // Validate URL formats
  const urlFields = ['thumbnailUrl', 'contentUrl', 'embedUrl'];
  const invalidUrls = urlFields.filter(field => {
    try {
      new URL(data[field]);
      return false;
    } catch {
      return true;
    }
  });
  
  if (invalidUrls.length > 0) {
    console.warn('Invalid URL format in fields:', invalidUrls);
    return false;
  }
  
  // Validate duration format (ISO 8601 duration)
  const durationRegex = /^PT\d+S$/;
  if (!durationRegex.test(data.duration)) {
    console.warn('Invalid duration format. Expected ISO 8601 duration format (e.g., PT30S).');
    return false;
  }
  
  return true;
}

export function generateComprehensiveVideoStructuredData() {
  const baseData = generateVideoStructuredData();
  
  return {
    ...baseData,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 1000
    },
    "potentialAction": {
      "@type": "WatchAction",
      "target": videoSeoConfig.baseUrl
    },
    "isFamilyFriendly": true,
    "requiresSubscription": false,
    "live": false
  };
}
