<script>
	export let list = [];
	export let className = '';
</script>

{#if list && list.length > 0}
	<div class="{className} oferta-grid items-start">
		{#each list as item, index (item.img || index)}
			{#if item.url}
				<a href={item.url} class="flex flex-col items-center justify-center group transition-all duration-300 hover:scale-105">
					<div class="icon-wrapper">
						<img src={item.img} alt={item.desc || ''} class="icon-img" />
					</div>
					{#if item.desc}
						<div class="label group-hover:text-black transition-colors duration-300">
							{item.desc}
						</div>
					{/if}
				</a>
			{:else}
				<div class="flex flex-col items-center justify-center">
					<div class="icon-wrapper">
						<img src={item.img} alt={item.desc || ''} class="icon-img" />
					</div>
					{#if item.desc}
						<div class="label">
							{item.desc}
						</div>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
{:else}
	<div style="color: red; padding: 20px">No items to display</div>
{/if}

<style>
	.oferta-grid {
		gap: 2rem !important;
	}
	.icon-wrapper {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
	}
	.icon-img {
		width: 64px;
		height: 64px;
		object-fit: contain;
		transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.icon-img:hover {
		transform: scale(1.08);
	}
	.label {
		margin-top: 0.5rem;
		font-size: 1rem;
		font-weight: 300;
		text-transform: uppercase;
		opacity: 0.7;
		text-align: center;
		letter-spacing: 0.04em;
	}
</style>
