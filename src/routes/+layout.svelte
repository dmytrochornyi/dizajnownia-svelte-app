<script>
    import '../app.css';
    import { page } from '$app/stores';
    import { generateRobotsMetaContent } from '$lib/utils/robots-headers.js';
    import { getCanonicalUrl } from '$lib/stores/seo.js';
    import { browser } from '$app/environment';

	let { children } = $props();
	
	// Check for WordPress-style query parameters (static-safe)
	let hasWordPressParams = $derived(() => {
		if (!browser) return false; // During SSR/prerendering, assume no WordPress params
		
		const url = $page.url;
		const wordpressParams = ['p', 'page_id', 'post_id', 'id'];
		
		// Check if any WordPress parameter exists in the URL
		const hasParam = wordpressParams.some(param => url.searchParams.has(param));
		
		// Also check the raw search string for patterns like ?p=123
		const searchString = url.search;
		const hasWordPressPattern = /[?&](p|page_id|post_id|id)=[0-9]+/.test(searchString);
		
		return hasParam || hasWordPressPattern;
	});
	
	// Generate robots directive based on current route
	let robotsDirective = $derived(hasWordPressParams ? 'noindex, nofollow, noarchive, nosnippet, noimageindex' : generateRobotsMetaContent($page.url.pathname));
	
	// Generate canonical URL based on current path (always homepage for WordPress params)
	let canonicalUrl = $derived(hasWordPressParams ? 'https://dizajnownia.pl/' : getCanonicalUrl($page.url.pathname));
</script>

<svelte:head>
    <!-- Dynamic canonical URL -->
    <link rel="canonical" href={canonicalUrl} />
    
    <!-- Dynamic robots meta tag -->
    <meta name="robots" content={robotsDirective} />
    
    <!-- Preload hero media to improve LCP -->
    <link rel="preload" as="image" href="/img/graphics.svg" />
    <link rel="preload" as="image" href="/img/d.svg" />
    <link rel="preload" as="image" href="/img/tlo-1024x550.png" />
    
    <!-- Video files loaded on-demand by components -->
</svelte:head>

{@render children?.()}
