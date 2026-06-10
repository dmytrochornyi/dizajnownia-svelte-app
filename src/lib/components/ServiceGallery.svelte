<script>
	import { onMount } from 'svelte';
	export let service = {};
	export let gallery = [];

	let currentImage = 0;
	let isModalOpen = false;

	function openModal(index) {
		currentImage = index;
		isModalOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		isModalOpen = false;
		document.body.style.overflow = '';
	}

	function nextImage() {
		currentImage = (currentImage + 1) % gallery.length;
	}

	function prevImage() {
		currentImage = currentImage === 0 ? gallery.length - 1 : currentImage - 1;
	}

	function handleKeydown(event) {
		if (!isModalOpen) return;
		
		if (event.key === 'Escape') {
			closeModal();
		} else if (event.key === 'ArrowRight') {
			nextImage();
		} else if (event.key === 'ArrowLeft') {
			prevImage();
		}
	}

	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<section class="py-20 px-6 sm:px-12 lg:px-20 bg-gray-200">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
				Nasze realizacje
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Zobacz przykłady naszych prac w kategorii {service.title?.toLowerCase()}. 
				Każdy projekt wykonujemy z dbałością o najdrobniejsze detale.
			</p>
		</div>

		{#if gallery && gallery.length > 0}
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each gallery as image, index}
									<button 
					class="group relative overflow-hidden rounded-xl shadow-lg bg-gray-100 aspect-square w-full border-0 p-0 cursor-pointer"
					on:click={() => openModal(index)}
					aria-label="Otwórz galerię - realizacja {service.title}, przykład {index + 1}"
				>
					<img 
						src={image} 
						alt="Realizacja {service.title} - przykład {index + 1}"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div class="relative z-10 inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
						<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
							</svg>
						</div>
					</div>
				</button>
				{/each}
			</div>
		{:else}
			<div class="text-center py-16">
				<svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
				</svg>
				<h3 class="text-xl font-semibold text-gray-900 mb-2">Galeria zostanie wkrótce uzupełniona</h3>
				<p class="text-gray-600">Pracujemy nad dodaniem przykładów naszych realizacji.</p>
			</div>
		{/if}
	</div>
</section>

<!-- Modal -->
{#if isModalOpen && gallery.length > 0}
	<div 
		class="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
		on:click={closeModal}
		on:keydown={(e) => e.key === 'Escape' && closeModal()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="0"
	>
		<div class="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
			<!-- Close button -->
			<button 
				class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
				on:click={closeModal}
				aria-label="Zamknij galerię"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<!-- Previous button -->
			{#if gallery.length > 1}
				<button 
					class="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors p-4 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
					on:click={(e) => { e.stopPropagation(); prevImage(); }}
					aria-label="Poprzednie zdjęcie"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
			{/if}

			<!-- Image -->
			<button 
				class="max-w-full max-h-full border-0 p-0 bg-transparent"
				on:click={(e) => e.stopPropagation()}
				aria-label="Zdjęcie w galerii"
			>
				<img 
					src={gallery[currentImage]} 
					alt="Realizacja {service.title} - przykład {currentImage + 1}"
					class="max-w-full max-h-full object-contain"
				/>
			</button>

			<!-- Next button -->
			{#if gallery.length > 1}
				<button 
					class="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors p-4 rounded-full bg-black bg-opacity-30 hover:bg-opacity-50"
					on:click={(e) => { e.stopPropagation(); nextImage(); }}
					aria-label="Następne zdjęcie"
				>
					<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</button>
			{/if}

			<!-- Image counter -->
			{#if gallery.length > 1}
				<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
					{currentImage + 1} / {gallery.length}
				</div>
			{/if}
		</div>
	</div>
{/if}