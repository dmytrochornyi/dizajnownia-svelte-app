<script>
	import { onMount } from 'svelte';

	// Sample review data (in a real app, you would fetch this from Google API)
	const reviews = [
		{
			name: "Mario Solty",
			rating: 5,
			date: "2 tygodnie temu",
			text: `Wszystkie Twoje potrzeby drukarskie z najwyższą jakością - łatwo i przyjemnie. Dziękuję Dizajnownia za pomoc!`,
			photo: "/img/users-review-photo/mario-solty.png"
		},
		{
			name: "Sasha Semencha",
			rating: 5,
			date: "1 miesiąc temu",
			text: `Zamówiłem usługę oklejania witryny. Dziękuję za wysokiej jakości pracę! Prawdziwi profesjonaliści! Polecam! 👍👍👍`,
			photo: "/img/users-review-photo/sasha-semencha.png"
		},
		{
			name: "Katarzynka 93",
			rating: 5,
			date: "3 tygodnie temu",
			text: `Świetne pomysły, szybka realizacja i bardzo dobry kontakt z wykonawcą. Jestem bardzo zadowolona ze współpracy! Dziękuję! 🤩`,
			photo: "/img/users-review-photo/katarzynka-93.png"
		},
		{
			name: "Miżej",
			rating: 5,
			date: "2 miesiące temu",
			text: `Bardzo rzetelna firma i bardzo mili ludzie. Polecam ich usługi!`,
			photo: "/img/users-review-photo/mizej.png"
		},
		{
			name: "Adam Ciborowski",
			rating: 5,
			date: "3 miesiące temu",
			text: `Polecam. Wykonałem u nich dwa projekty odklejenia samochodów. Świetna robota👍🏼 Profesjonalne doradztwo i obsługa. 😁`,
			photo: "/img/users-review-photo/adam-ciborowski.png"
		},
		{
			name: "W Cz",
			rating: 5,
			date: "3 miesiące temu",
			text: `Pomocna i rzetelna firma. Polecam - projekty wykonane z dbałością o szczegóły.`,
			photo: "/img/users-review-photo/w-cz.png"
		}
	];

	let reviewsContainer;
	let prevBtn;
	let nextBtn;
	let animationId;

	// Drag-to-scroll state
	let isPointerDown = false;
	let pointerStartX = 0;
	let scrollStartLeft = 0;
	let hasDragged = false;
	let isHovered = false;

	// Smooth auto-scroll state
	let autoscrollPausedUntil = 0;
	let lastAutoScrollAt = 0;
	let scrollSpeed = 2.5; // pixels per frame for smooth 60fps - much faster for better engagement
	let isAutoScrolling = false;

	function pauseAutoScrollFor(ms) {
		autoscrollPausedUntil = Math.max(autoscrollPausedUntil, Date.now() + ms);
	}

	function normalizeScrollPosition() {
		if (!reviewsContainer) return;
		const setWidth = reviewsContainer.scrollWidth / 3;
		if (!setWidth) return;
		const x = reviewsContainer.scrollLeft;
		// Preserve offset inside a single set, snap into the middle set for seamless loop
		const offsetWithinSet = ((x - setWidth) % setWidth + setWidth) % setWidth;
		reviewsContainer.scrollLeft = setWidth + offsetWithinSet;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		pauseAutoScrollFor(800);
	}

	function handlePointerDown(e) {
		if (!reviewsContainer) return;
		isPointerDown = true;
		reviewsContainer.classList.add('dragging');
		pointerStartX = e.clientX;
		scrollStartLeft = reviewsContainer.scrollLeft;
		hasDragged = false;
		try { reviewsContainer.setPointerCapture(e.pointerId); } catch {}
	}

	function handlePointerMove(e) {
		if (!reviewsContainer || !isPointerDown) return;
		const deltaX = e.clientX - pointerStartX;
		if (Math.abs(deltaX) > 3) hasDragged = true;
		reviewsContainer.scrollLeft = scrollStartLeft - deltaX;
		e.preventDefault();
		pauseAutoScrollFor(1200);
	}

	function handlePointerUp(e) {
		if (!reviewsContainer) return;
		isPointerDown = false;
		reviewsContainer.classList.remove('dragging');
		normalizeScrollPosition();
		pauseAutoScrollFor(1200);
		try { reviewsContainer.releasePointerCapture(e.pointerId); } catch {}
	}

	function handleClickCapture(e) {
		// Prevent opening links if the user dragged
		if (hasDragged) {
			e.preventDefault();
			e.stopPropagation();
			hasDragged = false;
		}
	}

	// Smooth auto-scroll using requestAnimationFrame
	function autoScroll() {
		if (!reviewsContainer || isHovered || isPointerDown || Date.now() < autoscrollPausedUntil) {
			animationId = requestAnimationFrame(autoScroll);
			return;
		}

		// Smooth scrolling
		reviewsContainer.scrollLeft += scrollSpeed;
		lastAutoScrollAt = Date.now();

		// Check if we need to loop back
		const setWidth = reviewsContainer.scrollWidth / 3;
		if (setWidth > 0) {
			const x = reviewsContainer.scrollLeft;
			if (x < setWidth || x >= setWidth * 2) {
				const offsetWithinSet = ((x - setWidth) % setWidth + setWidth) % setWidth;
				reviewsContainer.scrollLeft = setWidth + offsetWithinSet;
			}
		}

		animationId = requestAnimationFrame(autoScroll);
	}

	function startAutoScroll() {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		isAutoScrolling = true;
		animationId = requestAnimationFrame(autoScroll);
	}

	function stopAutoScroll() {
		if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = null;
		}
		isAutoScrolling = false;
	}

	// Duplicate reviews for infinite scroll
	const infiniteReviews = [...reviews, ...reviews, ...reviews];

	onMount(() => {
		// Navigation buttons functionality
		const scrollAmount = 300;

		const handleNext = () => {
			if (!reviewsContainer) return;
			reviewsContainer.scrollBy({
				left: scrollAmount,
				behavior: 'smooth'
			});
			pauseAutoScrollFor(1500);
		};

		const handlePrev = () => {
			if (!reviewsContainer) return;
			reviewsContainer.scrollBy({
				left: -scrollAmount,
				behavior: 'smooth'
			});
			pauseAutoScrollFor(1500);
		};

		const handleScroll = () => {
			// If scroll wasn't immediately triggered by our auto-tick, treat as user scroll and pause autoscroll
			if (Date.now() - lastAutoScrollAt > 40) {
				pauseAutoScrollFor(1500);
			}
		};

		// Add event listeners with error handling
		try {
			if (nextBtn) nextBtn.addEventListener('click', handleNext);
			if (prevBtn) prevBtn.addEventListener('click', handlePrev);
			if (reviewsContainer) {
				reviewsContainer.addEventListener('scroll', handleScroll);
				reviewsContainer.addEventListener('pointerdown', handlePointerDown);
				reviewsContainer.addEventListener('pointermove', handlePointerMove);
				reviewsContainer.addEventListener('pointerup', handlePointerUp);
				reviewsContainer.addEventListener('pointercancel', handlePointerUp);
				reviewsContainer.addEventListener('click', handleClickCapture, true);
				reviewsContainer.addEventListener('mouseenter', handleMouseEnter);
				reviewsContainer.addEventListener('mouseleave', handleMouseLeave);
			}

			// Initialize scroll position to the middle set of reviews
			if (reviewsContainer) {
				const singleSetWidth = reviewsContainer.scrollWidth / 3;
				reviewsContainer.scrollLeft = singleSetWidth;
			}

			// Start auto-scroll
			startAutoScroll();
		} catch (error) {
			console.error('Error initializing OpiniaSection:', error);
		}

		return () => {
			try {
				if (nextBtn) nextBtn.removeEventListener('click', handleNext);
				if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
				if (reviewsContainer) {
					reviewsContainer.removeEventListener('scroll', handleScroll);
					reviewsContainer.removeEventListener('pointerdown', handlePointerDown);
					reviewsContainer.removeEventListener('pointermove', handlePointerMove);
					reviewsContainer.removeEventListener('pointerup', handlePointerUp);
					reviewsContainer.removeEventListener('pointercancel', handlePointerUp);
					reviewsContainer.removeEventListener('click', handleClickCapture, true);
					reviewsContainer.removeEventListener('mouseenter', handleMouseEnter);
					reviewsContainer.removeEventListener('mouseleave', handleMouseLeave);
				}
				stopAutoScroll();
			} catch (error) {
				console.error('Error cleaning up OpiniaSection:', error);
			}
		};
	});

	function createStars(rating) {
		return Array.from({ length: 5 }, (_, i) => i < rating);
	}
</script>

<style>
	/* Custom scrollbar */
	.reviews-container::-webkit-scrollbar {
		height: 6px;
	}
	.reviews-container::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}
	.reviews-container::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}
	.reviews-container::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	/* Hide scrollbar for a cleaner look */
	.reviews-container {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		-webkit-overflow-scrolling: touch; /* iOS momentum scroll */
		overflow-x: auto;
		overflow-y: hidden;
		overscroll-behavior-x: contain;
		touch-action: pan-x;
		/* Performance optimizations for smooth scrolling */
		will-change: scroll-position;
		transform: translateZ(0); /* Force hardware acceleration */
		backface-visibility: hidden;
		perspective: 1000px;
	}
	.reviews-container::-webkit-scrollbar {
		display: none; /* WebKit */
	}

	/* Animation for scroll hint */
	@keyframes bounce {
		0%, 20%, 50%, 80%, 100% {
			transform: translateX(0);
		}
		40% {
			transform: translateX(-10px);
		}
		60% {
			transform: translateX(-5px);
		}
	}
	.scroll-hint {
		animation: bounce 2s infinite;
	}

	/* Review card - no hover effects */
	.review-card {
		/* Performance optimizations */
		will-change: transform;
		transform: translateZ(0); /* Force hardware acceleration */
		backface-visibility: hidden;
	}

	/* Drag cursor feedback */
	.reviews-container {
		cursor: grab;
	}
	:global(.reviews-container.dragging) {
		cursor: grabbing;
		user-select: none;
	}

	.star-filled {
		color: #fbbf24;
	}
	.star-empty {
		color: #d1d5db;
	}

	/* Text truncation with ellipsis */
	.line-clamp-4 {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		-webkit-hyphens: auto;
		hyphens: auto;
	}

	/* Make the reviews container full-bleed (no left/right borders) */
	.edge-to-edge {
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);
		width: 100vw;
	}
</style>

<section class="bg-image bg-bbb">
  <div class="w-full flex justify-start px-4 md:px-8">
    <img
	  src="/img/opinie.svg"
	  alt="opinie naszych klientów"
      loading="lazy"
      decoding="async"
	  class="z-10 my-20 h-auto w-80 max-w-full object-contain md:w-96 lg:w-[500px]"
	/>
  </div>
  
	<div class="w-full">

		<div class="relative">
			<!-- Scroll hint for mobile -->
			<div class="md:hidden flex justify-center mb-4">
				<div class="scroll-hint text-white flex items-center">
                    <span class="mr-2">Przesuń, aby zobaczyć więcej</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>
				</div>
			</div>

			<!-- Reviews container -->
			<div
				bind:this={reviewsContainer}
				class="reviews-container edge-to-edge flex pt-15 pb-6 space-x-0 scroll-smooth bg-transparent"
			>
			   {#each infiniteReviews as review, index}
				   <a 
					   href="https://www.google.com/maps/place/Dizajnownia/@51.7872803,19.4436481,17z/data=!3m1!4b1!4m6!3m5!1s0x471a332830f6ba89:0x3d7d8ff1547b7b52!8m2!3d51.787277!4d19.446223!16s%2Fg%2F11b6ynr2c2?entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D" 
					   target="_blank" 
					   rel="noopener noreferrer" 
					   class="review-card flex-shrink-0 w-80 bg-white overflow-hidden p-6 flex flex-col h-64 outline-none"
					   aria-label="Opinia klienta {review.name} - {review.rating} gwiazdek"
				   >
					   <div class="flex items-center mb-4">
                           <img
							   src={review.photo}
							   alt={`Zdjęcie profilowe ${review.name}`}
                               loading="lazy"
                               decoding="async"
							   class="w-12 h-12 rounded-full object-cover mr-4"
							   on:error={(e) => e.target.style.display = 'none'}
						   />
						   <div>
							   <h4 class="font-semibold text-gray-800">{review.name}</h4>
							   <div class="flex items-center">
								   <div class="flex" role="img" aria-label="{review.rating} z 5 gwiazdek">
									   {#each createStars(review.rating) as filled}
									   {#if filled}
										   <svg class="star-filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z"/></svg>
									   {:else}
										   <svg class="star-empty" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.945 9.211l-8.2-1.193L12 .587 9.255 8.018l-8.2 1.193 5.934 5.787-1.402 8.168L12 18.896l7.336 3.87-1.402-8.168 5.011-4.936zM12 16.896l-4.968 2.622.95-5.532-4.018-3.92 5.554-.807L12 4.62l2.482 5.639 5.554.807-4.018 3.92.95 5.532L12 16.896z"/></svg>
									   {/if}
									   {/each}
								   </div>
								   {#if review.date}
									   <span class="text-gray-500 text-sm ml-2">{review.date}</span>
								   {/if}
							   </div>
						   </div>
					   </div>
					   <div class="flex-grow flex flex-col">
						   <p class="text-gray-600 flex-grow line-clamp-4 max-h-24 leading-6">"{review.text}"</p>
                           <div class="mt-4 flex justify-end">
                               <svg class="text-purple-500" width="18" height="18" viewBox="0 0 533.5 544.3" fill="currentColor" aria-label="Google Reviews" aria-hidden="true"><path d="M533.5 278.4c0-18.6-1.5-37.3-4.8-55.5H272v105h147.2c-6.3 34-25.3 62.7-54.2 81.8v67h87.7c51.3-47.2 80.8-116.9 80.8-198.3z"/><path d="M272 544.3c73.4 0 135-24.2 180-65.7l-87.7-67c-24.4 16.4-55.8 26-92.3 26-70.9 0-131-47.8-152.5-112.3h-90v70.7c45.3 89.7 138.2 147.3 242.5 147.3z"/><path d="M119.5 325.3c-10.2-30.5-10.2-63.5 0-94l.1-70.7h-90c-37.6 74.9-37.6 160.5 0 235.4l89.9-70.7z"/><path d="M272 107.7c39.8-.6 78.1 12.8 108.1 37.9l80.7-80.7C413.3 24.8 344.7-.2 272 0 167.7 0 74.8 57.7 29.5 147.3l90 70.7C140.9 153.6 201.1 105.9 272 107.7z"/></svg>
                           </div>
					   </div>
				   </a>
				{/each}
			</div>

			<!-- Navigation buttons -->
            <button
				bind:this={prevBtn}
				aria-label="Poprzednie opinie"
				class="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -ml-6 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition z-10"
			>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
			</button>
			<button
				bind:this={nextBtn}
				aria-label="Następne opinie"
				class="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 -mr-6 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition z-10"
			>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
			</button>
		</div>

	</div>
</section>
