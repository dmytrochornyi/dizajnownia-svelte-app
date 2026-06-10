<script>
  export let src;
  export let alt = '';
  export let className = '';
  export let loading = 'lazy';
  export let decoding = 'async';
  export let sizes = undefined;
  export let width = undefined;
  export let height = undefined;

  // Only generate sources for raster images
  const isRaster = typeof src === 'string' && /\.(png|jpe?g)$/i.test(src);
  const srcWebp = isRaster ? src.replace(/\.(png|jpe?g)$/i, '.webp') : undefined;
  const srcAvif = isRaster ? src.replace(/\.(png|jpe?g)$/i, '.avif') : undefined;
</script>

{#if isRaster}
  <picture>
    <!-- Modern formats first. If file doesn't exist, browser ignores the source. -->
    <source srcset={srcAvif} type="image/avif" />
    <source srcset={srcWebp} type="image/webp" />
    <img src={src} alt={alt} class={className} {loading} {decoding} {sizes} {width} {height} />
  </picture>
{:else}
  <img src={src} alt={alt} class={className} {loading} {decoding} {sizes} {width} {height} />
{/if}


