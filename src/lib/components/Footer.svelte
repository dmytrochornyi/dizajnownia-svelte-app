<script>
	import { OFERTA_ITEMS } from '$lib/data.js';
	import FacebookIcon from './FacebookIcon.svelte';
	import InstagramIcon from './InstagramIcon.svelte';
	import PhoneIcon from './PhoneIcon.svelte';
	
	// Get current year for copyright
	const currentYear = new Date().getFullYear();
	
	// Contact information
	const contactInfo = {
		phone: '+48 793 666 397',
		email: 'dizajnowniabiuro@gmail.com',
		instagram: 'https://www.instagram.com/dizajnownia/',
		facebook: 'https://facebook.com/dizajnownia/'
	};
	
	// Get first 6 services for footer links
	const footerServices = OFERTA_ITEMS.slice(0, 6);
</script>

<footer class="w-full bg-[#000] text-[#eee]">
	<div class="container mx-auto px-5 py-8">
		<!-- Main footer content -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
			
			<!-- Company info and logo -->
			<div class="space-y-4">
				<div class="flex h-12 items-center">
					<img 
						src="/img/logo.svg" 
						alt="Dizajnownia - Profesjonalne usługi poligraficzne i reklamowe" 
						loading="lazy" 
						decoding="async"
						class="h-8 w-auto"
					/>
				</div>
				<p class="text-sm leading-relaxed">
					Profesjonalne usługi poligraficzne i reklamowe. Projektujemy i drukujemy materiały, które przyciągają uwagę i budują markę.
				</p>
				<div class="flex space-x-4">
					<a 
						href={contactInfo.instagram}
						aria-label="Odwiedź nasz profil na Instagramie"
						class="text-[#eee] hover:text-white transition-colors duration-200"
						rel="noopener noreferrer"
					>
						<InstagramIcon />
					</a>
					<a 
						href={contactInfo.facebook}
						aria-label="Odwiedź nasz profil na Facebooku"
						class="text-[#eee] hover:text-white transition-colors duration-200"
						rel="noopener noreferrer"
					>
						<FacebookIcon />
					</a>
				</div>
			</div>

			<!-- Contact information -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Kontakt</h3>
				<div class="space-y-3">
					<a 
						href="tel:{contactInfo.phone}"
						class="flex items-center space-x-2 text-sm hover:text-white transition-colors duration-200"
						aria-label="Zadzwoń do nas: {contactInfo.phone}"
					>
						<PhoneIcon className="w-4 h-4" />
						<span>{contactInfo.phone}</span>
					</a>
					<a 
						href="mailto:{contactInfo.email}"
						class="flex items-center space-x-2 text-sm hover:text-white transition-colors duration-200"
						aria-label="Napisz do nas: {contactInfo.email}"
					>
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
							<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
						</svg>
						<span>{contactInfo.email}</span>
					</a>
				</div>
				<div class="text-sm">
					<p class="font-medium mb-1">Godziny pracy:</p>
					<p>Poniedziałek - Piątek: 8:00 - 16:00</p>
					<p class="text-gray-400 mt-1">Sobota - Niedziela: Zamknięte</p>
				</div>
			</div>

			<!-- Quick services links -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Nasze usługi</h3>
				<nav class="space-y-2">
					{#each footerServices as service}
						<a 
							href={service.url}
							class="block text-sm hover:text-white transition-colors duration-200"
							aria-label="Przejdź do strony: {service.desc}"
						>
							{service.desc}
						</a>
					{/each}
					<a 
						href="/#oferta"
						class="block text-sm hover:text-white transition-colors duration-200 font-medium"
						aria-label="Zobacz wszystkie usługi"
					>
						Wszystkie usługi →
					</a>
				</nav>
			</div>

			<!-- Additional links -->
			<div class="space-y-4">
				<h3 class="text-lg font-semibold">Informacje</h3>
				<nav class="space-y-2">
					<a 
						href="/#galeria"
						class="block text-sm hover:text-white transition-colors duration-200"
						aria-label="Zobacz galerię naszych prac"
					>
						Galeria
					</a>
					<a 
						href="/#klienci"
						class="block text-sm hover:text-white transition-colors duration-200"
						aria-label="Zobacz naszych klientów"
					>
						Klienci
					</a>
					<a 
						href="/#kontakt"
						class="block text-sm hover:text-white transition-colors duration-200"
						aria-label="Skontaktuj się z nami"
					>
						Kontakt
					</a>
				</nav>
			</div>
		</div>

		<!-- Bottom section with copyright -->
		<!-- <div class="mt-8 pt-6 border-t border-gray-800">
			<div class="flex flex-col items-center justify-between space-y-4 text-sm text-gray-400 lg:flex-row lg:space-y-0">
				<div class="text-center lg:text-left">
					<p>&copy; {currentYear} Dizajnownia. Wszystkie prawa zastrzeżone.</p>
				</div>
				<div class="flex space-x-6">
					<a 
						href="/polityka-prywatnosci"
						class="hover:text-white transition-colors duration-200"
						aria-label="Polityka prywatności"
					>
						Polityka prywatności
					</a>
					<a 
						href="/regulamin"
						class="hover:text-white transition-colors duration-200"
						aria-label="Regulamin"
					>
						Regulamin
					</a>
				</div>
			</div>
		</div> -->
	</div>

	<!-- Structured data for SEO -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Dizajnownia",
			"url": "https://dizajnownia.pl",
			"logo": "https://dizajnownia.pl/img/logo.svg",
			"description": "Profesjonalne usługi poligraficzne i reklamowe. Projektujemy i drukujemy materiały, które przyciągają uwagę i budują markę.",
			"telephone": "{contactInfo.phone}",
			"email": "{contactInfo.email}",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "PL"
			},
			"sameAs": [
				"{contactInfo.instagram}",
				"{contactInfo.facebook}"
			],
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": "{contactInfo.phone}",
				"contactType": "Customer Service",
				"availableLanguage": "Polish"
			},
			"openingHours": [
				"Mo-Fr 08:00-16:00"
			]
		}
	</script>
</footer>
