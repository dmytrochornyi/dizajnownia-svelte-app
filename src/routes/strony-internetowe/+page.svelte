<script>
    import { SERVICES_DATA } from '$lib/data.js';

    import Navigation from '$lib/components/Navigation.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import ServiceHero from '$lib/components/ServiceHero.svelte';
    import ServiceFeatures from '$lib/components/ServiceFeatures.svelte';
    import ServiceGallery from '$lib/components/ServiceGallery.svelte';
    import KontaktSection from '$lib/components/KontaktSection.svelte';
    import Footer from '$lib/components/Footer.svelte';

    const service = SERVICES_DATA['strony-internetowe'];

    const ogImage = 'https://dizajnownia.pl/img/og-strony-internetowe.png';
</script>

<svelte:head>
	<title>{service.title} - Dizajnownia | Profesjonalne {service.title.toLowerCase()} - Projektowanie i tworzenie stron WWW</title>
	<meta name="description" content="{service.seoDescription}" />
	<meta name="keywords" content="strony internetowe, strony WWW, projektowanie stron, tworzenie stron, strony reklamowe, projekt strony internetowej, profesjonalne strony internetowe, responsywne strony" />
    


	<!-- Open Graph -->
	<meta property="og:title" content="{service.title} - Dizajnownia | Profesjonalne projektowanie i tworzenie stron WWW" />
	<meta property="og:description" content="{service.description} Nowoczesne strony WWW, responsywne design, SEO. Wysokiej jakości wykonanie." />
	<meta property="og:type" content="website" />
    <meta property="og:url" content="https://dizajnownia.pl/strony-internetowe" />
    <meta property="og:image" content="{ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:site_name" content="Dizajnownia" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{service.title} - Dizajnownia" />
    <meta name="twitter:description" content="{service.description}" />
    <meta name="twitter:image" content="{ogImage}" />
	
	<!-- Enhanced Schema.org -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Service",
		"name": "{service.title}",
		"description": "{service.description}",
		"provider": {
			"@type": "Organization",
			"name": "Dizajnownia",
			"url": "https://dizajnownia.pl"
		},
		"areaServed": "Poland",
		"serviceType": "Web Design",
		"category": "Website Development",
		"offers": {
			"@type": "Offer",
			"availability": "https://schema.org/InStock",
			"priceCurrency": "PLN"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Strony internetowe",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Strona wizytówka",
						"description": "Podstawowa strona wizytówka",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.8",
							"reviewCount": "145"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Strona firmowa",
						"description": "Rozbudowana strona firmowa",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "123"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Sklep internetowy",
						"description": "Pełnoprawny sklep internetowy",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "98"
						}
					}
				}
			]
		}
	}
	</script>
	
	<!-- Breadcrumb Schema -->
	<script type="application/ld+json">
	{
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
				"name": "{service.title}",
				"item": "https://dizajnownia.pl/strony-internetowe"
			}
		]
	}
	</script>
</svelte:head>

<!-- Navigation -->
<Navigation />

<!-- Breadcrumbs -->
<Breadcrumbs serviceName={service.title} />

<!-- Hero Section -->
<ServiceHero {service} />

<!-- Features Section -->
<ServiceFeatures {service} features={service.features} />

<!-- Gallery Section -->
<ServiceGallery {service} gallery={service.gallery} />

<!-- Contact Section -->
<KontaktSection />

<!-- Footer -->
<Footer />