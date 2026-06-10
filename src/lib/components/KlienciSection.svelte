<script>
	import { KLIENCI_ITEMS } from '$lib/data.js';
	import ItemGrid from './ItemGrid.svelte';
</script>

<section class="bg-image bg-bbb" id="klienci">
	<div class="flex flex-col items-center px-4 md:px-8 lg:items-start">
        <img
			src="/img/topKlienci.svg"
			alt="top klienci"
            loading="lazy"
            decoding="async"
			class="z-10 my-20 h-auto w-80 max-w-full object-contain md:w-96 lg:w-[500px]"
		/>
		<div class="z-10 w-full">
			<ItemGrid
				square={true}
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-16"
				list={KLIENCI_ITEMS}
			/>
		</div>
	</div>
</section>
