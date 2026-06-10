<script>
import { onMount } from 'svelte';
import SectionTitle from './SectionTitle.svelte';

	// Sample review data (in a real app, you would fetch this from Google API)
	const reviews = [
		{
			name: "Anna Kowalska",
			rating: 5,
			date: "2 tygodnie temu",
			text: "Absolutnie fantastyczna usługa! Zespół przekroczył moje oczekiwania w realizacji projektu. Nie mogłam być bardziej zadowolona z rezultatów.",
			photo: "https://randomuser.me/api/portraits/women/44.jpg"
		},
		{
			name: "Michał Nowak",
			rating: 5,
			date: "1 miesiąc temu",
			text: "Profesjonalnie i sprawnie. Dostarczyli dokładnie to, co zostało obiecane i na czas. Zdecydowanie skorzystam z ich usług ponownie.",
			photo: "https://randomuser.me/api/portraits/men/32.jpg"
		},
		{
			name: "Ewa Wiśniewska",
			rating: 4,
			date: "3 tygodnie temu",
			text: "Świetne doświadczenie ogólnie. Jedyny powód, dla którego nie daję 5 gwiazdek to to, że początkowa odpowiedź zajęła trochę dłużej niż oczekiwano.",
			photo: "https://randomuser.me/api/portraits/women/63.jpg"
		},
		{
			name: "Piotr Zieliński",
			rating: 5,
			date: "2 miesiące temu",
			text: "Wyjątkowa jakość i dbałość o szczegóły. Polecałem ich wszystkim moim partnerom biznesowym.",
			photo: "https://randomuser.me/api/portraits/men/76.jpg"
		},
		{
			name: "Katarzyna Mazur",
			rating: 5,
			date: "1 tydzień temu",
			text: "Najlepsza decyzja jaką podjęłam to wybór tej firmy. Ich ekspertyza oszczędziła mi czas i pieniądze.",
			photo: "https://randomuser.me/api/portraits/women/82.jpg"
		},
		{
			name: "Tomasz Jankowski",
			rating: 5,
			date: "3 miesiące temu",
			text: "Konsekwentnie doskonała obsługa przez wiele lat. Naprawdę dbają o swoich klientów.",
			photo: "https://randomuser.me/api/portraits/men/45.jpg"
		}
	];

	let reviewsContainer;
	let prevBtn;
	let nextBtn;
	let autoScrollInterval;
	let isHovered = false;

	// Duplicate reviews for infinite scroll
	const infiniteReviews = [...reviews, ...reviews, ...reviews];

	onMount(() => {
		// Auto-scroll functionality
		const startAutoScroll = () => {
			autoScrollInterval = setInterval(() => {
				if (!isHovered && reviewsContainer) {
					const scrollAmount = 3; // Slow scroll speed
					reviewsContainer.scrollLeft += scrollAmount;
					
					// Reset to beginning for infinite scroll
					const maxScroll = reviewsContainer.scrollWidth / 3; // Divide by 3 since we have 3 copies
					if (reviewsContainer.scrollLeft >= maxScroll) {
						reviewsContainer.scrollLeft = 0;
					}
				}
			}, 20); // 20ms interval for smooth scrolling
		};

		const stopAutoScroll = () => {
			if (autoScrollInterval) {
				clearInterval(autoScrollInterval);
			}
		};

		// Navigation buttons functionality
		const scrollAmount = 300;

		const handleNext = () => {
			reviewsContainer.scrollBy({
				left: scrollAmount,
				behavior: 'smooth'
			});
		};

		const handlePrev = () => {
			reviewsContainer.scrollBy({
				left: -scrollAmount,
				behavior: 'smooth'
			});
		};

		const handleScroll = () => {
			// For infinite scroll, always show both buttons
			if (prevBtn && nextBtn) {
				prevBtn.classList.remove('opacity-0');
				prevBtn.classList.add('opacity-100');
				nextBtn.classList.remove('opacity-0');
				nextBtn.classList.add('opacity-100');
			}
		};

		const handleMouseEnter = () => {
			isHovered = true;
		};

		const handleMouseLeave = () => {
			isHovered = false;
		};

		// Add event listeners
		if (nextBtn) nextBtn.addEventListener('click', handleNext);
		if (prevBtn) prevBtn.addEventListener('click', handlePrev);
		if (reviewsContainer) {
			reviewsContainer.addEventListener('scroll', handleScroll);
			reviewsContainer.addEventListener('mouseenter', handleMouseEnter);
			reviewsContainer.addEventListener('mouseleave', handleMouseLeave);
		}

		// Initialize auto-scroll
		startAutoScroll();

		// Initialize scroll position to the middle set of reviews
		if (reviewsContainer) {
			const singleSetWidth = reviewsContainer.scrollWidth / 3;
			reviewsContainer.scrollLeft = singleSetWidth;
		}

		return () => {
			stopAutoScroll();
			if (nextBtn) nextBtn.removeEventListener('click', handleNext);
			if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
			if (reviewsContainer) {
				reviewsContainer.removeEventListener('scroll', handleScroll);
				reviewsContainer.removeEventListener('mouseenter', handleMouseEnter);
				reviewsContainer.removeEventListener('mouseleave', handleMouseLeave);
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

	/* Review card animation */
	.review-card {
		transition: transform 0.3s ease;
	}
	.review-card:hover {
		transform: translateY(-2px);
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
</style>

<section class="bg-image bg-bbb">
  <div class="m-10 w-full flex justify-start px-4 md:px-8 pt-12 pb-4">
	<SectionTitle line1="ARTYKUŁY" line2="NASZYCH" line3="EKSPERTÓW" />
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
				class="reviews-container flex overflow-x-auto pt-15 pb-6 space-x-0 scroll-smooth bg-white"
			>
				{#each infiniteReviews as review, index}
					<div class="review-card flex-shrink-0 w-80 bg-white overflow-hidden p-6 flex flex-col h-64">
						<div class="flex items-center mb-4">
                            <img
								src={review.photo}
								alt={review.name}
                                loading="lazy"
                                decoding="async"
								class="w-12 h-12 rounded-full object-cover mr-4"
							/>
							<div>
								<h4 class="font-semibold text-gray-800">{review.name}</h4>
								<div class="flex items-center">
									{#each createStars(review.rating) as filled}
                                    {#if filled}
                                        <svg class="star-filled" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.211l8.2-1.193z"/></svg>
                                    {:else}
                                        <svg class="star-empty" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.945 9.211l-8.2-1.193L12 .587 9.255 8.018l-8.2 1.193 5.934 5.787-1.402 8.168L12 18.896l7.336 3.87-1.402-8.168 5.011-4.936zM12 16.896l-4.968 2.622.95-5.532-4.018-3.92 5.554-.807L12 4.62l2.482 5.639 5.554.807-4.018 3.92.95 5.532L12 16.896z"/></svg>
                                    {/if}
									{/each}
									<span class="text-gray-500 text-sm ml-2">{review.date}</span>
								</div>
							</div>
						</div>
						<div class="flex-grow flex flex-col">
							<p class="text-gray-600 flex-grow line-clamp-4 max-h-24 leading-6">"{review.text}"</p>
							<div class="mt-4 flex justify-end">
                                <svg class="text-purple-500" width="18" height="18" viewBox="0 0 533.5 544.3" fill="currentColor" aria-hidden="true"><path d="M533.5 278.4c0-18.6-1.5-37.3-4.8-55.5H272v105h147.2c-6.3 34-25.3 62.7-54.2 81.8v67h87.7c51.3-47.2 80.8-116.9 80.8-198.3z"/><path d="M272 544.3c73.4 0 135-24.2 180-65.7l-87.7-67c-24.4 16.4-55.8 26-92.3 26-70.9 0-131-47.8-152.5-112.3h-90v70.7c45.3 89.7 138.2 147.3 242.5 147.3z"/><path d="M119.5 325.3c-10.2-30.5-10.2-63.5 0-94l.1-70.7h-90c-37.6 74.9-37.6 160.5 0 235.4l89.9-70.7z"/><path d="M272 107.7c39.8-.6 78.1 12.8 108.1 37.9l80.7-80.7C413.3 24.8 344.7-.2 272 0 167.7 0 74.8 57.7 29.5 147.3l90 70.7C140.9 153.6 201.1 105.9 272 107.7z"/></svg>
							</div>
						</div>
					</div>
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
