/**
 * X-Robots-Tag Header Management Utility
 * Provides consistent robot directives across the application
 */

// Default robots directive for most pages
export const DEFAULT_ROBOTS = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

// Robots directives for different page types
export const ROBOTS_DIRECTIVES = {
	// Main pages - fully indexable
	home: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	services: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	
	// Contact and about pages
	contact: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	about: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	
	// Gallery and portfolio pages
	gallery: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	portfolio: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	
	// Service-specific pages
	'wizytowki': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'ulotki': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'banery': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'logo': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'strony-internetowe': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'windery': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'vouchery': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'teczki': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'szyldy': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'rolupy': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'potykacze': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'plakaty': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'oklejanie-witryn': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'oklejanie-aut': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'kasetony': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'fototapety': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'etykiety': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	'3d': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
	
	// Special directives for specific scenarios
	noindex: 'noindex, nofollow',
	noarchive: 'index, follow, noarchive',
	nosnippet: 'index, follow, nosnippet',
	noimageindex: 'index, follow, noimageindex',
	notranslate: 'index, follow, notranslate'
};

/**
 * Get robots directive for a specific page or route
 * @param {string} route - The route path or page identifier
 * @returns {string} The robots directive
 */
export function getRobotsDirective(route) {
	// Extract the route key from the path
	const routeKey = route.replace(/^\//, '').replace(/\/$/, '') || 'home';
	
	// Return the specific directive or default
	return ROBOTS_DIRECTIVES[routeKey] || DEFAULT_ROBOTS;
}

/**
 * Generate X-Robots-Tag header value
 * @param {string} route - The route path
 * @param {Object} options - Additional options
 * @param {boolean} options.noindex - Whether to add noindex directive
 * @param {boolean} options.noarchive - Whether to add noarchive directive
 * @param {boolean} options.nosnippet - Whether to add nosnippet directive
 * @param {boolean} options.noimageindex - Whether to add noimageindex directive
 * @param {boolean} options.notranslate - Whether to add notranslate directive
 * @returns {string} The X-Robots-Tag header value
 */
export function generateXRobotsTag(route, options = {}) {
	let directive = getRobotsDirective(route);
	
	// Apply additional options
	if (options.noindex) {
		directive = directive.replace(/index,?\s*/, 'noindex, ');
	}
	if (options.noarchive) {
		directive = directive.replace(/follow,?\s*/, 'follow, noarchive, ');
	}
	if (options.nosnippet) {
		directive = directive.replace(/max-snippet:-1,?\s*/, 'nosnippet, ');
	}
	if (options.noimageindex) {
		directive = directive.replace(/max-image-preview:large,?\s*/, 'noimageindex, ');
	}
	if (options.notranslate) {
		directive += ', notranslate';
	}
	
	// Clean up any double commas or trailing commas
	directive = directive.replace(/,\s*,/g, ',').replace(/,\s*$/, '');
	
	return directive;
}

/**
 * Get robots directive for service pages with enhanced SEO
 * @param {string} serviceKey - The service key
 * @returns {string} The robots directive
 */
export function getServiceRobotsDirective(serviceKey) {
	return ROBOTS_DIRECTIVES[serviceKey] || DEFAULT_ROBOTS;
}

/**
 * Generate comprehensive robots meta tag content
 * @param {string} route - The route path
 * @param {Object} options - Additional options
 * @returns {string} The robots meta tag content
 */
export function generateRobotsMetaContent(route, options = {}) {
	return generateXRobotsTag(route, options);
}
