<script>
	import { OFERTA_ITEMS } from '$lib/data.js';
	import OfertaGrid from './OfertaGrid.svelte';
</script>

<section class="bg-image bg-ccc" id="oferta">
<div class="flex flex-col items-start px-6 sm:px-12 lg:flex-row lg:items-start lg:px-20">
	   <div class="z-10 lg:w-1/2 lg:justify-start">
		   <img
			   src="/img/oferta.svg"
			   alt="nasza oferta"
			   class="z-10 mb-2 h-auto w-80 max-w-full object-contain md:w-80 lg:w-[500px]"
		   />
	   </div>
		<div
			class="z-10 mb-16 flex w-full text-center leading-relaxed lg:mb-0 lg:w-1/2 lg:pr-10 lg:pl-8 lg:text-start"
		>
			<p class="text-base lg:text-lg">
				Oferujemy <strong>pełen zakres usług</strong> od projektu do realizacji i gwarantujemy
				<strong>pełen profesjonalizm</strong> na każdym etapie naszej współpracy.
				<br /><br />
				Wiemy, że <strong>dbałość o detale popłaca</strong> dlatego niezależnie od wielkości
				realizowanego zamówienia, czy jest to najprostszy element identyfikacji wizualnej, czy
				wielkie przedsięwzięcie przykładamy ogromną wagę do szczegółów.
				<br /><br />
				Nie boimy się wyzwań, odważnych rozwiązań i skomplikowanych briefów. Zależy nam na
				<strong>mierzalnym sukcesie Waszej firmy</strong>.
			</p>
		</div>
	</div>
	<div>
		<OfertaGrid
			className="grid gap-12 lg:gap-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 px-20"
			list={OFERTA_ITEMS}
		/>
	</div>
</section>
