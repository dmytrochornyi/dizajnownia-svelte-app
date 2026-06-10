<script>
	import { shuffleArray } from '$lib/utils.js';

	export let list = [];
	export let className = '';
	export let square = false;

	$: shuffledItems = shuffleArray([...list]);

	$: if (!list || list.length === 0) {
		console.warn('No items to display in ItemGrid');
	}

	function handleImageError(e) {
		console.warn('Failed to load image:', e.target.src);
		e.target.style.display = 'none';
		const fallback = e.target.nextElementSibling;
		if (fallback) {
			fallback.style.display = 'block';
		}
	}
</script>

{#if list && list.length > 0}
	<div class="{className} items-start">
		{#each shuffledItems as item, index (item.img || index)}
			<div class="flex flex-col items-center justify-center">
                <img
					src={item.img}
					alt={item.desc || `Gallery image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
					class="transition-all hover:scale-105 {square
						? 'h-32 w-32 object-contain md:h-40 md:w-40 lg:h-48 lg:w-48'
						: 'h-auto w-full object-cover'}"
					on:error={handleImageError}
				/>
				{#if item.desc}
					<div class="mt-4 flex items-center justify-center text-center uppercase opacity-70">
						{item.desc}
					</div>
				{/if}
				<!-- Fallback for failed images -->
				<div class="hidden mt-4 text-center text-gray-500 text-sm">
					Image unavailable
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="text-center text-gray-500 p-5" role="status" aria-live="polite">
		No items to display
	</div>
{/if}
