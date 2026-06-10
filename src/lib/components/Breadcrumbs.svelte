<script>
	export let serviceName = '';
	export let items = [];
</script>

<nav class="py-4 px-6 sm:px-12 lg:px-20 bg-gray-200 mt-18" aria-label="Nawigacja okruszkowa">
	<ol class="flex items-center space-x-2 text-sm text-gray-600">
		{#if items && items.length > 0}
			{#each items as item, index}
				<li class="flex items-center">
					{#if index > 0}
						<svg class="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
						</svg>
					{/if}
					
					{#if item.url && index < items.length - 1}
						<a href={item.url} class="hover:text-black transition-colors duration-200">
							{item.name}
						</a>
					{:else}
						<span class="font-medium text-black" aria-current="page">
							{item.name}
						</span>
					{/if}
				</li>
			{/each}
		{:else}
			<!-- Fallback to original structure for backward compatibility -->
			<li>
				<a href="/" class="hover:text-black transition-colors duration-200">
					Strona główna
				</a>
			</li>
			<li class="flex items-center">
				<svg class="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
				</svg>
				<a href="/#oferta" class="hover:text-black transition-colors duration-200">
					Oferta
				</a>
			</li>
			<li class="flex items-center">
				<svg class="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
				</svg>
				<span class="font-medium text-black" aria-current="page">
					{serviceName}
				</span>
			</li>
		{/if}
	</ol>
</nav>