<script>
    import { SERVICES_DATA } from '$lib/data.js';
        import Navigation from '$lib/components/Navigation.svelte';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import ServiceHero from '$lib/components/ServiceHero.svelte';
    import ServiceFeatures from '$lib/components/ServiceFeatures.svelte';
    import ServiceGallery from '$lib/components/ServiceGallery.svelte';
    import KontaktSection from '$lib/components/KontaktSection.svelte';
    import Footer from '$lib/components/Footer.svelte';

    const service = SERVICES_DATA['logo'];
        const ogImage = 'https://dizajnownia.pl/img/og-logo.png';
</script>

<svelte:head>
	<title>{service.title} - Dizajnownia | Profesjonalne {service.title.toLowerCase()} - Projektowanie identyfikacji wizualnej</title>
	<meta name="description" content="{service.seoDescription}" />
	<meta name="keywords" content="logo, logo reklamowe, projekt logo, profesjonalne logo, identyfikacja wizualna, branding, projektowanie logo, logo firmowe" />
	<!-- Open Graph -->
	<meta property="og:title" content="{service.title} - Dizajnownia | Profesjonalne projektowanie identyfikacji wizualnej" />
	<meta property="og:description" content="{service.description} Unikalne logo, identyfikacja wizualna, branding. Wysokiej jakości projekt graficzny." />
	<meta property="og:type" content="website" />
    <meta property="og:url" content="https://dizajnownia.pl/logo" />
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
		"category": "Logo Design",
		"offers": {
			"@type": "Offer",
			"availability": "https://schema.org/InStock",
			"priceCurrency": "PLN"
		},
		"hasOfferCatalog": {
			"@type": "OfferCatalog",
			"name": "Logo",
			"itemListElement": [
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Logo podstawowe",
						"description": "Podstawowe logo firmowe",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "234"
						}
					}
				},
				{
					"@type": "Offer",
					"itemOffered": {
						"@type": "Product",
						"name": "Identyfikacja wizualna",
						"description": "Pełna identyfikacja wizualna firmy",
						"offers": {
							"@type": "Offer",
							"availability": "https://schema.org/InStock",
							"priceCurrency": "PLN"
						},
						"aggregateRating": {
							"@type": "AggregateRating",
							"ratingValue": "4.9",
							"reviewCount": "178"
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
				"item": "https://dizajnownia.pl/logo"
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