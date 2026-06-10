<script>
    import { SERVICES_DATA } from '$lib/data.js';
        import Navigation from '$lib/components/Navigation.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import ServiceHero from '$lib/components/ServiceHero.svelte';
    import ServiceFeatures from '$lib/components/ServiceFeatures.svelte';
    import ServiceGallery from '$lib/components/ServiceGallery.svelte';
    import KontaktSection from '$lib/components/KontaktSection.svelte';
    import Footer from '$lib/components/Footer.svelte';

    const service = SERVICES_DATA['ulotki'];
        const ogImage = 'https://dizajnownia.pl/img/og-ulotki.png';
</script>

<svelte:head>
	<title>{service.title} - Dizajnownia | Profesjonalne {service.title.toLowerCase()} - Projektowanie i druk</title>
	<meta name="description" content="{service.seoDescription}" />
	<meta name="keywords" content="ulotki, ulotki reklamowe, projekt ulotki, profesjonalne ulotki, druk ulotek, ulotki firmowe, projektowanie ulotek, drukarnia ulotki" />
	<!-- Open Graph -->
	<meta property="og:title" content="{service.title} - Dizajnownia | Profesjonalne projektowanie i druk" />
	<meta property="og:description" content="{service.description} Wysokiej jakości druk, indywidualny projekt graficzny, szybka realizacja." />
	<meta property="og:type" content="website" />
    <meta property="og:url" content="https://dizajnownia.pl/ulotki" />
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
		"serviceType": "Graphic Design",
		"category": "Flyers",
		"offers": {
			"@type": "Offer",
			"availability": "https://schema.org/InStock",
			"priceCurrency": "PLN"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Ulotki",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Ulotki standardowe",
						"description": "Standardowe ulotki reklamowe",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.7",
							"reviewCount": "234"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Ulotki premium",
						"description": "Premium ulotki z dodatkowymi opcjami",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "167"
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
				"item": "https://dizajnownia.pl/ulotki"
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