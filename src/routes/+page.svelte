<script>
    import { onMount } from 'svelte';
    import { generateComprehensiveVideoStructuredData, validateVideoStructuredData } from '$lib/utils/video-seo.js';

    import Navigation from '$lib/components/Navigation.svelte';
    import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
    import HeroSection from '$lib/components/HeroSection.svelte';
    import OfertaSection from '$lib/components/OfertaSection.svelte';
    import Lazy from '$lib/components/Lazy.svelte';

    onMount(() => {
        // Validate video structured data
        validateVideoStructuredData();
    });
</script>

<svelte:head>
	<title>Dizajnownia - Projektowanie Graficzne | Wizytówki, Ulotki, Banery, Logo</title>
	<meta
		name="description"
		content="Profesjonalne projektowanie graficzne. Wizytówki, ulotki, banery, logo, strony internetowe. Wysokiej jakości druk, szybka realizacja."
	/>
	<meta name="keywords" content="projektowanie graficzne, wizytówki, ulotki, banery, logo, druk, reklama, Dizajnownia, grafik, projekt" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://dizajnownia.pl/" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="Dizajnownia - Projektowanie Graficzne" />
	<meta property="og:description" content="Profesjonalne projektowanie graficzne. Wizytówki, ulotki, banery, logo, strony internetowe. Wysokiej jakości druk, szybka realizacja." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://dizajnownia.pl/" />
    <meta property="og:image" content="https://dizajnownia.pl/img/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="pl_PL" />
	<meta property="og:site_name" content="Dizajnownia" />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Dizajnownia - Projektowanie Graficzne" />
	<meta name="twitter:description" content="Profesjonalne projektowanie graficzne. Wizytówki, ulotki, banery, logo, strony internetowe. Wysokiej jakości druk, szybka realizacja." />
  <meta name="twitter:image" content="https://dizajnownia.pl/img/og-image.png" />
	
	<!-- Additional SEO -->
	<meta name="author" content="Dizajnownia" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="Polish" />
	<meta name="geo.region" content="PL" />
	<meta name="geo.placename" content="Poland" />
	
	<!-- Enhanced Schema.org for Homepage -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebPage",
		"name": "Dizajnownia - Projektowanie Graficzne",
		"description": "Profesjonalne projektowanie graficzne. Wizytówki, ulotki, banery, logo, strony internetowe. Wysokiej jakości druk, szybka realizacja.",
		"url": "https://dizajnownia.pl/",
		"mainEntity": {
			"@type": "Organization",
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
		},
		"breadcrumb": {
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "Strona główna",
					"item": "https://dizajnownia.pl/"
				}
			]
		}
	}
	</script>
	
	<!-- WebSite Schema -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Dizajnownia",
		"url": "https://dizajnownia.pl",
		"description": "Profesjonalne usługi projektowania graficznego i reklamy",
		"publisher": {
			"@type": "Organization",
			"name": "Dizajnownia"
		},
		"potentialAction": {
			"@type": "SearchAction",
			"target": "https://dizajnownia.pl/search?q={search_term_string}",
			"query-input": "required name=search_term_string"
		}
	}
	</script>
	
	<!-- Video structured data for SEO -->
	<script type="application/ld+json">
	{JSON.stringify(generateComprehensiveVideoStructuredData())}
	</script>
	
	<!-- Video meta tags for SEO -->
	<meta name="video:title" content="Dizajnownia - Profesjonalne Projektowanie Graficzne" />
	<meta name="video:description" content="Poznaj nasze usługi projektowania graficznego - wizytówki, ulotki, banery, logo i wiele więcej. Wysokiej jakości wykonanie, szybka realizacja." />
	<meta name="video:thumbnail" content="https://dizajnownia.pl/img/tlo-1024x550.png" />
	<meta name="video:duration" content="30" />
	<meta name="video:upload_date" content="2024-01-01T00:00:00+01:00" />
	<meta name="video:category" content="Business" />
	<meta name="video:family_friendly" content="yes" />
	<meta name="video:requires_subscription" content="no" />
	<meta name="video:live" content="no" />
</svelte:head>

<!-- Hidden H1 for SEO -->
<h1 class="visually-hidden">Dizajnownia - Profesjonalne Projektowanie Graficzne i Usługi Reklamowe</h1>

<!-- Hidden SEO Navigation for Crawlers -->
<nav class="seo-hidden" aria-label="SEO Navigation">
	<h2>Mapa strony</h2>
	<ul>
		<li><a href="/">Strona główna</a></li>
		<li><a href="/wizytowki">Wizytówki</a></li>
		<li><a href="/ulotki">Ulotki</a></li>
		<li><a href="/banery">Banery</a></li>
		<li><a href="/logo">Logo</a></li>
		<li><a href="/strony-internetowe">Strony internetowe</a></li>
		<li><a href="/windery">Windery</a></li>
		<li><a href="/vouchery">Vouchery</a></li>
		<li><a href="/teczki">Teczki</a></li>
		<li><a href="/szyldy">Szyldy</a></li>
		<li><a href="/rolupy">Rolupy</a></li>
		<li><a href="/potykacze">Potykacze</a></li>
		<li><a href="/plakaty">Plakaty</a></li>
		<li><a href="/oklejanie-witryn">Oklejanie witryn</a></li>
		<li><a href="/oklejanie-aut">Oklejanie aut</a></li>
		<li><a href="/kasetony">Kasetony</a></li>
		<li><a href="/fototapety">Fototapety</a></li>
		<li><a href="/etykiety">Etykiety</a></li>
		<li><a href="/3d">Projektowanie 3D</a></li>
	</ul>
</nav>

<!-- Hidden External Links for SEO -->
<footer class="seo-hidden">
	<h3>Powiązane usługi i zasoby</h3>
	<ul>
		<li><a href="https://www.instagram.com/dizajnownia/" rel="noopener">Instagram Dizajnownia</a></li>
		<li><a href="https://facebook.com/dizajnownia/" rel="noopener">Facebook Dizajnownia</a></li>
		<li><a href="https://www.google.com/maps" rel="noopener">Google Maps</a></li>
		<li><a href="https://www.pinterest.com" rel="noopener">Pinterest - Inspiracje projektowe</a></li>
		<li><a href="https://www.behance.net" rel="noopener">Behance - Portfolio projektów</a></li>
	</ul>
</footer>

<!-- Komponenty pomocnicze -->
<Navigation />

<!-- Sekcje strony (place LCP hero early for faster discovery) -->
<HeroSection />
<AnimatedBackground />
<OfertaSection />
<Lazy loader={() => import('$lib/components/GaleriaSection.svelte')}>
    <div slot="placeholder" style="height:600px"></div>
</Lazy>
<Lazy loader={() => import('$lib/components/KlienciSection.svelte')}>
    <div slot="placeholder" style="height:400px"></div>
</Lazy>
<Lazy loader={() => import('$lib/components/ZespolSection.svelte')}>
    <div slot="placeholder" style="height:400px"></div>
</Lazy>
<Lazy loader={() => import('$lib/components/InstagramSection.svelte')}>
    <div slot="placeholder" style="height:300px"></div>
</Lazy>
<Lazy loader={() => import('$lib/components/OpiniaSection.svelte')}>
    <div slot="placeholder" style="height:400px"></div>
</Lazy>
<!-- <Lazy loader={() => import('$lib/components/ArticleSection.svelte')} /> -->
<Lazy loader={() => import('$lib/components/KontaktSection.svelte')}>
    <div slot="placeholder" style="height:600px"></div>
</Lazy>
<Lazy loader={() => import('$lib/components/Footer.svelte')}>
    <div slot="placeholder" style="height:120px"></div>
</Lazy>
