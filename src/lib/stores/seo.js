import { writable } from 'svelte/store';

// SEO configuration store
export const seoConfig = writable({
	baseUrl: 'https://dizajnownia.pl',
	siteName: 'Dizajnownia',
	defaultTitle: 'Dizajnownia - Projektowanie Graficzne',
	defaultDescription: 'Profesjonalne usługi projektowania graficznego. Wizytówki, ulotki, banery, logo i wiele więcej. Wysokiej jakości wykonanie, szybka realizacja.',
	defaultKeywords: 'projektowanie graficzne, wizytówki, ulotki, banery, logo, druk, reklama',
	ogImage: '/img/og-image.png',
	twitterCard: 'summary_large_image',
	locale: 'pl_PL',
	type: 'website',
	// Video metadata
	video: {
		mp4: '/img/film.mp4',
		webm: '/img/film.webm',
		width: 1920,
		height: 1080,
		type: 'video/mp4',
		secureUrl: 'https://dizajnownia.pl/img/film.mp4'
	}
});

// Helper function to generate canonical URL
export function getCanonicalUrl(path = '') {
	const baseUrl = 'https://dizajnownia.pl';
	// If path is empty or just '/', return the base URL
	if (!path || path === '/') {
		return baseUrl;
	}
	// Ensure path starts with '/' and return full URL
	return `${baseUrl}${path.startsWith('/') ? path : '/' + path}`;
}

// Helper function to generate SEO meta object
export function generateSeoMeta(page) {
	const canonical = getCanonicalUrl(page.path);
	
	return {
		canonical,
		title: page.title || 'Dizajnownia - Projektowanie Graficzne',
		description: page.description || 'Profesjonalne usługi projektowania graficznego.',
		keywords: page.keywords || 'projektowanie graficzne, dizajnownia',
		ogUrl: canonical,
		ogTitle: page.title || 'Dizajnownia',
		ogDescription: page.description || 'Profesjonalne usługi projektowania graficznego.',
		ogImage: page.ogImage || '/img/og-image.png',
		// Video metadata
		ogVideo: page.ogVideo || 'https://dizajnownia.pl/img/film.mp4',
		ogVideoType: page.ogVideoType || 'video/mp4',
		ogVideoWidth: page.ogVideoWidth || 1920,
		ogVideoHeight: page.ogVideoHeight || 1080,
		ogVideoSecureUrl: page.ogVideoSecureUrl || 'https://dizajnownia.pl/img/film.mp4',
		twitterCard: page.twitterCard || 'player',
		twitterPlayer: page.twitterPlayer || 'https://dizajnownia.pl/img/film.mp4',
		twitterPlayerWidth: page.twitterPlayerWidth || 1920,
		twitterPlayerHeight: page.twitterPlayerHeight || 1080
	};
}
