<script>
	import VideoBackground from './VideoBackground.svelte';
	import { onMount } from 'svelte';
	export let service = {};
	let containerRef;

	onMount(() => {
		// No-op; kept for future container-bound logic
	});
</script>

<svelte:head></svelte:head>

<section class="relative py-20 px-6 sm:px-12 lg:px-20 text-white overflow-hidden" bind:this={containerRef}>
   <!-- Background video -->
   <VideoBackground
    	srcWebm="/img/film.webm"
   	class="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
   />

   <!-- Semi-transparent gradient overlay -->
   <div class="absolute inset-0 -z-10 bg-gradient-to-r from-purple-800/30 to-pink-800/40"></div>
   <div class="absolute inset-0 -z-10 bg-gradient-to-r from-black/30 to-grey-800/40"></div>

   <!-- Background animation -->
   <div class="absolute inset-0 opacity-20 z-0">
	   <div class="absolute top-10 left-10 w-32 h-32 bg-gray-200 rounded-full opacity-10 animate-pulse"></div>
	   <div class="absolute bottom-20 right-20 w-24 h-24 bg-gray-200 rounded-full opacity-5 animate-pulse animation-delay-1000"></div>
	   <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-gray-200 rounded-full opacity-15 animate-pulse animation-delay-2000"></div>
   </div>

   <div class="relative z-10 max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<!-- Content -->
			<div class="order-2 lg:order-1">
				<div class="flex items-center mb-6">
					<img 
						src={service.icon} 
						alt={service.title}
						class="w-16 h-16 mr-4 filter brightness-0 invert"
					/>
					<div>
						<p class="text-sm uppercase tracking-wide text-gray-300 mb-1">Usługa</p>
						<h1 class="text-4xl lg:text-6xl font-bold">{service.hero?.title || service.title}</h1>
					</div>
				</div>
				
				<h2 class="text-xl lg:text-2xl text-gray-300 mb-6 font-light">
					{service.hero?.subtitle || ''}
				</h2>
				
				<p class="text-lg lg:text-xl leading-relaxed mb-8 text-gray-200">
					{service.hero?.description || service.description}
				</p>

				<div class="flex flex-col sm:flex-row gap-4">
					<a 
						href="#kontakt" 
						class="inline-flex items-center px-8 py-3 bg-gray-200 text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 text-center justify-center"
					>
						<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
						</svg>
						Skontaktuj się z nami
					</a>
					<a 
						href="#szczegoly" 
						class="inline-flex items-center px-8 py-3 border-2 border-gray-200 text-white font-semibold rounded-lg hover:bg-gray-200 hover:text-black transition-colors duration-300 text-center justify-center"
					>
						Dowiedz się więcej
						<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</a>
				</div>
			</div>

			<!-- Icon/Visual -->
			<div class="order-1 lg:order-2 flex justify-center">
				<div class="relative">
					<div class="absolute inset-0 bg-gray-200 rounded-full opacity-20 scale-150 animate-ping"></div>
					<img 
						src={service.icon} 
						alt={service.title}
						class="relative z-10 w-48 h-48 lg:w-64 lg:h-64 filter brightness-0 invert"
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.animation-delay-1000 {
		animation-delay: 1s;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
</style>