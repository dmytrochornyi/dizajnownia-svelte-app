/**
 * SEO Enhancement Utilities for Service Pages
 * Provides consistent SEO improvements across all service pages
 */

// SEO keywords mapping for different services
export const SEO_KEYWORDS = {
	'wizytowki': 'wizytówki, druk wizytówek, projekt wizytówki, profesjonalne wizytówki, wizytówki firmowe, wizytówki biznesowe, projektowanie wizytówek, drukarnia wizytówki',
	'ulotki': 'ulotki, ulotki reklamowe, projekt ulotki, profesjonalne ulotki, druk ulotek, ulotki firmowe, projektowanie ulotek, drukarnia ulotki',
	'banery': 'banery, banery reklamowe, projekt banera, profesjonalne banery, druk banerów, banery firmowe, projektowanie banerów, drukarnia banery',
	'logo': 'logo, logo reklamowe, projekt logo, profesjonalne logo, identyfikacja wizualna, branding, projektowanie logo, logo firmowe',
	'strony-internetowe': 'strony internetowe, strony WWW, projektowanie stron, tworzenie stron, strony reklamowe, projekt strony internetowej, profesjonalne strony internetowe, responsywne strony',
	'windery': 'windery, windery reklamowe, projekt windera, profesjonalne windery, druk winderów, windery firmowe, projektowanie winderów',
	'vouchery': 'vouchery, vouchery reklamowe, projekt voucherów, profesjonalne vouchery, druk voucherów, vouchery firmowe, projektowanie voucherów',
	'teczki': 'teczki, teczki reklamowe, projekt teczek, profesjonalne teczki, druk teczek, teczki firmowe, projektowanie teczek',
	'szyldy': 'szyldy, szyldy reklamowe, projekt szyldu, profesjonalne szyldy, produkcja szyldów, szyldy firmowe, projektowanie szyldów',
	'rolupy': 'rolupy, rolupy reklamowe, projekt rolupy, profesjonalne rolupy, druk rolupów, rolupy firmowe, projektowanie rolupów',
	'potykacze': 'potykacze, potykacze reklamowe, projekt potykacza, profesjonalne potykacze, druk potykaczy, potykacze firmowe, projektowanie potykaczy',
	'plakaty': 'plakaty, plakaty reklamowe, projekt plakatu, profesjonalne plakaty, druk plakatów, plakaty firmowe, projektowanie plakatów',
	'oklejanie-witryn': 'oklejanie witryn, oklejanie sklepów, projekt oklejania, profesjonalne oklejanie, folie okienne, oklejanie firmowe',
	'oklejanie-aut': 'oklejanie aut, oklejanie samochodów, projekt oklejania, profesjonalne oklejanie, folie samochodowe, oklejanie firmowe',
	'kasetony': 'kasetony, kasetony reklamowe, projekt kasetonu, profesjonalne kasetony, produkcja kasetonów, kasetony firmowe',
	'fototapety': 'fototapety, fototapety reklamowe, projekt fototapety, profesjonalne fototapety, druk fototapet, fototapety firmowe',
	'etykiety': 'etykiety, etykiety reklamowe, projekt etykiety, profesjonalne etykiety, druk etykiet, etykiety firmowe',
	'3d': 'projektowanie 3d, modele 3d, wizualizacje 3d, profesjonalne 3d, projektowanie przestrzenne, wizualizacje architektoniczne'
};

// Enhanced meta descriptions for services
export const SEO_DESCRIPTIONS = {
	'wizytowki': 'Profesjonalne projektowanie wizytówek firmowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena wizytówek.',
	'ulotki': 'Profesjonalne projektowanie ulotek reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena ulotek.',
	'banery': 'Profesjonalne projektowanie banerów reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena banerów.',
	'logo': 'Profesjonalne projektowanie logo firmowego. Unikalne logo, identyfikacja wizualna, branding. Wysokiej jakości projekt graficzny, szybka realizacja. Darmowa wycena logo.',
	'strony-internetowe': 'Profesjonalne projektowanie i tworzenie stron internetowych. Nowoczesne strony WWW, responsywne design, SEO. Wysokiej jakości wykonanie, szybka realizacja. Darmowa wycena stron internetowych.',
	'windery': 'Profesjonalne projektowanie winderów reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena winderów.',
	'vouchery': 'Profesjonalne projektowanie voucherów reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena voucherów.',
	'teczki': 'Profesjonalne projektowanie teczek reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena teczek.',
	'szyldy': 'Profesjonalne projektowanie szyldów reklamowych. Wysokiej jakości produkcja, indywidualny projekt, szybka realizacja. Darmowa wycena szyldów.',
	'rolupy': 'Profesjonalne projektowanie rolupów reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena rolupów.',
	'potykacze': 'Profesjonalne projektowanie potykaczy reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena potykaczy.',
	'plakaty': 'Profesjonalne projektowanie plakatów reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena plakatów.',
	'oklejanie-witryn': 'Profesjonalne oklejanie witryn i sklepów. Wysokiej jakości folie, indywidualny projekt, szybka realizacja. Darmowa wycena oklejania.',
	'oklejanie-aut': 'Profesjonalne oklejanie samochodów. Wysokiej jakości folie, indywidualny projekt, szybka realizacja. Darmowa wycena oklejania aut.',
	'kasetony': 'Profesjonalne projektowanie kasetonów reklamowych. Wysokiej jakości produkcja, indywidualny projekt, szybka realizacja. Darmowa wycena kasetonów.',
	'fototapety': 'Profesjonalne projektowanie fototapet. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena fototapet.',
	'etykiety': 'Profesjonalne projektowanie etykiet reklamowych. Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja. Darmowa wycena etykiet.',
	'3d': 'Profesjonalne projektowanie 3D i wizualizacje. Wysokiej jakości modele 3D, indywidualny projekt, szybka realizacja. Darmowa wycena projektów 3D.'
};

// Service categories for Schema.org
export const SERVICE_CATEGORIES = {
	'wizytowki': 'Business Cards',
	'ulotki': 'Flyers',
	'banery': 'Banners',
	'logo': 'Logo Design',
	'strony-internetowe': 'Website Development',
	'windery': 'Roller Banners',
	'vouchery': 'Vouchers',
	'teczki': 'Folders',
	'szyldy': 'Signs',
	'rolupy': 'Roll-ups',
	'potykacze': 'A-Frames',
	'plakaty': 'Posters',
	'oklejanie-witryn': 'Window Graphics',
	'oklejanie-aut': 'Vehicle Wrapping',
	'kasetony': 'Light Boxes',
	'fototapety': 'Wallpapers',
	'etykiety': 'Labels',
	'3d': '3D Design'
};

// Service types for Schema.org
export const SERVICE_TYPES = {
	'wizytowki': 'Graphic Design',
	'ulotki': 'Graphic Design',
	'banery': 'Graphic Design',
	'logo': 'Graphic Design',
	'strony-internetowe': 'Web Design',
	'windery': 'Graphic Design',
	'vouchery': 'Graphic Design',
	'teczki': 'Graphic Design',
	'szyldy': 'Graphic Design',
	'rolupy': 'Graphic Design',
	'potykacze': 'Graphic Design',
	'plakaty': 'Graphic Design',
	'oklejanie-witryn': 'Installation',
	'oklejanie-aut': 'Installation',
	'kasetony': 'Graphic Design',
	'fototapety': 'Graphic Design',
	'etykiety': 'Graphic Design',
	'3d': '3D Design'
};

/**
 * Generate enhanced SEO data for a service page
 * @param {string} serviceKey - The service key (e.g., 'wizytowki')
 * @param {Object} service - The service data object
 * @param {string} canonicalUrl - The canonical URL for the page
 * @returns {Object} Enhanced SEO data
 */
export function generateEnhancedSEO(serviceKey, service, canonicalUrl) {
	const keywords = SEO_KEYWORDS[serviceKey] || '';
	const description = SEO_DESCRIPTIONS[serviceKey] || service.description;
	const category = SERVICE_CATEGORIES[serviceKey] || 'Graphic Design';
	const serviceType = SERVICE_TYPES[serviceKey] || 'Graphic Design';
	
	return {
		title: `${service.title} - Dizajnownia | Profesjonalne ${service.title.toLowerCase()} - Projektowanie i druk`,
		description: description,
		keywords: keywords,
		canonicalUrl: canonicalUrl,
		ogTitle: `${service.title} - Dizajnownia | Profesjonalne projektowanie i druk`,
		ogDescription: `${service.description} Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja.`,
		ogImage: `https://dizajnownia.pl/img/og-${serviceKey}.png`,
		category: category,
		serviceType: serviceType
	};
}

/**
 * Generate Schema.org structured data for a service
 * @param {string} serviceKey - The service key
 * @param {Object} service - The service data
 * @param {string} canonicalUrl - The canonical URL
 * @returns {Object} Schema.org structured data
 */
export function generateServiceSchema(serviceKey, service, canonicalUrl) {
	const category = SERVICE_CATEGORIES[serviceKey] || 'Graphic Design';
	const serviceType = SERVICE_TYPES[serviceKey] || 'Graphic Design';
	
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		"name": service.title,
		"description": service.description,
		"provider": {
			"@type": "Organization",
			"name": "Dizajnownia",
			"url": "https://dizajnownia.pl"
		},
		"areaServed": "Poland",
		"serviceType": serviceType,
		"category": category,
		"offers": {
			"@type": "Offer",
			"availability": "https://schema.org/InStock",
			"priceCurrency": "PLN"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": service.title,
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": `${service.title} standardowe`
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": `${service.title} premium`
					}
				}
			]
		}
	};
}

/**
 * Generate breadcrumb Schema.org structured data
 * @param {string} serviceTitle - The service title
 * @param {string} canonicalUrl - The canonical URL
 * @returns {Object} Breadcrumb Schema.org structured data
 */
export function generateBreadcrumbSchema(serviceTitle, canonicalUrl) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": [
			{
				"@type": "ListItem",
				"position": 1,
				"name": "Strona główna",
				"item": "https://dizajnownia.pl/"
			},
			{
				"@type": "ListItem",
				"position": 2,
				"name": "Oferta",
				"item": "https://dizajnownia.pl/#oferta"
			},
			{
				"@type": "ListItem",
				"position": 3,
				"name": serviceTitle,
				"item": canonicalUrl
			}
		]
	};
}

/**
 * Generate publisher meta tags for enhanced SEO
 * @returns {Object} Publisher meta tags object
 */
export function generatePublisherMetaTags() {
  return {
    'publisher': 'Dizajnownia',
    'article:publisher': 'https://dizajnownia.pl',
    'og:site_name': 'Dizajnownia',
    'twitter:site': '@dizajnownia',
    'twitter:creator': '@dizajnownia'
  };
}

/**
 * Generate comprehensive publisher Schema.org structured data
 * @returns {Object} Publisher Schema.org object
 */
export function generatePublisherStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Publisher",
    "name": "Dizajnownia",
    "alternateName": "Dizajnownia - Agencja Reklamowa",
    "url": "https://dizajnownia.pl",
    "logo": "https://dizajnownia.pl/img/logo.svg",
    "description": "Profesjonalne usługi projektowania graficznego i reklamy. Wizytówki, ulotki, banery, logo, strony internetowe i wiele więcej.",
    "telephone": "+48793666397",
    "email": "kontakt@dizajnownia.pl",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PL",
      "addressLocality": "Poland"
    },
    "areaServed": "Poland",
    "serviceType": "Graphic Design, Advertising, Web Design",
    "sameAs": [
      "https://www.instagram.com/dizajnownia/",
      "https://facebook.com/dizajnownia/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+48793666397",
      "contactType": "Customer Service",
      "availableLanguage": "Polish"
    },
    "foundingDate": "2020",
    "knowsAbout": [
      "Projektowanie graficzne",
      "Druk reklamowy",
      "Strony internetowe",
      "Logo design",
      "Marketing wizualny"
    ]
  };
}
