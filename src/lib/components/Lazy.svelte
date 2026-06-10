<script>
  import { onMount } from 'svelte';

  // Props: loader is a function that returns an import() Promise
  export let loader;
  export let props = {};
  export let rootMargin = '200px';

  let container;
  let visible = false;
  let mod;

  async function load() {
    if (!loader || mod) return;
    mod = await loader();
  }

  onMount(() => {
    // If IntersectionObserver not supported, load immediately
    if (typeof IntersectionObserver === 'undefined') {
      visible = true;
      load();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        visible = true;
        load();
        io.disconnect();
      }
    }, { rootMargin });
    if (container) io.observe(container);
    return () => io.disconnect();
  });
</script>

<div bind:this={container}>
  {#if visible}
    {#await load() then _}
      {#if mod}
        <svelte:component this={mod.default} {...props} />
      {/if}
    {:catch _}
      <slot name="placeholder" />
    {/await}
  {:else}
    <slot name="placeholder" />
  {/if}
  
</div>


