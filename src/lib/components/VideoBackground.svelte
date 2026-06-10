<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { generateComprehensiveVideoStructuredData, validateVideoStructuredData } from '$lib/utils/video-seo.js';

  export let srcMp4 = undefined;
  export let srcWebm = '/img/film.webm';
  export let className = '';
  export let preload = 'metadata';
  export let autoplay = true;
  export let loop = true;
  export let poster = '/img/tlo-1024x550.png';
  export let playOnMobile = false; // opt-in if you really want video on small screens

  let videoRef;
  let hasStarted = false;
  let isVisible = false;
  let shouldLoadVideo = true;
  let posterToUse = poster;
  $: combinedClass = [className, /** @type any */ ($$props?.class)].filter(Boolean).join(' ');

  onMount(() => {
    // Validate video structured data
    if (browser) {
      validateVideoStructuredData();
    }
    
    // Choose a lighter poster for small screens if available
    try {
      const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
      if (isSmallScreen) {
        // Prefer a smaller poster if present; fall back to provided poster
        const smallCandidate = '/img/tlo-1024x550.png';
        posterToUse = smallCandidate || poster;
      } else {
        const largeCandidate = '/img/tlo-1536x825.png';
        posterToUse = largeCandidate || poster;
      }
    } catch {}
    // Respect user data saver and very slow connections
    try {
      const connection = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
      if (connection?.saveData) {
        shouldLoadVideo = false;
      } else if (connection?.effectiveType && /(^slow-?2g$|^2g$)/i.test(connection.effectiveType)) {
        shouldLoadVideo = false;
      }
    } catch {}

    // Load video on small screens if opted in via prop
    try {
      const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
      if (isSmallScreen && !playOnMobile) {
        shouldLoadVideo = false;
      } else if (isSmallScreen && playOnMobile) {
        shouldLoadVideo = true;
      }
    } catch {}

    // If only WebM is provided, verify the browser can play it; otherwise fall back to poster only
    try {
      if (!srcMp4 && srcWebm && typeof document !== 'undefined') {
        const testVideo = document.createElement('video');
        const can = testVideo.canPlayType?.('video/webm; codecs="vp9"') || testVideo.canPlayType?.('video/webm');
        if (!can) {
          shouldLoadVideo = false;
        }
      }
    } catch {}
    const ensureVideoPlayback = () => {
      if (!shouldLoadVideo) return;
      if (!videoRef) return;
      videoRef.muted = true;
      videoRef.setAttribute('muted', '');
      videoRef.playsInline = true;
      videoRef.setAttribute('playsinline', '');
      videoRef.autoplay = autoplay;
      videoRef.loop = loop;
      videoRef.preload = preload;

      try {
        videoRef.currentTime = 0.00001;
      } catch {}

      const maybe = videoRef.play();
      if (maybe && typeof maybe.then === 'function') {
        maybe.then(() => {
          hasStarted = true;
        }).catch(() => {
          // If autoplay fails, wait for first user gesture handlers below
        });
      }
    };

    const handleLoadedMetadata = () => {
      if (!videoRef) return;
      try {
        videoRef.currentTime = 0.00001;
      } catch {}
    };

    const handleCanPlay = () => {
      if (!videoRef) return;
      videoRef.play().then(() => {
        hasStarted = true;
      }).catch(() => {});
    };

    const handleEnded = () => {
      if (!videoRef) return;
      videoRef.currentTime = 0;
      videoRef.play().catch(() => {});
    };

    const handleUserGesture = () => {
      if (!videoRef) return;
      if (!hasStarted) {
        videoRef.play().then(() => {
          hasStarted = true;
        }).catch(() => {});
      }
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
    };

    window.addEventListener('pointerdown', handleUserGesture, { once: true });
    window.addEventListener('touchstart', handleUserGesture, { once: true });
    window.addEventListener('keydown', handleUserGesture, { once: true });

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisible = true;
          if (!videoRef) return;
          if (hasStarted) videoRef.play().catch(() => {});
        } else {
          videoRef?.pause?.();
        }
      }, { threshold: 0.1 });
      if (videoRef) io.observe(videoRef);
    }

    if (shouldLoadVideo) {
      videoRef?.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef?.addEventListener('canplay', handleCanPlay);
      videoRef?.addEventListener('ended', handleEnded);
    }

    ensureVideoPlayback();

    return () => {
      if (shouldLoadVideo) {
        videoRef?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoRef?.removeEventListener('canplay', handleCanPlay);
        videoRef?.removeEventListener('ended', handleEnded);
      }
      window.removeEventListener('pointerdown', handleUserGesture);
      window.removeEventListener('touchstart', handleUserGesture);
      window.removeEventListener('keydown', handleUserGesture);
      io?.disconnect?.();
    };
  });
</script>

<svelte:head>
  <!-- Video structured data for SEO -->
  <script type="application/ld+json">
  {JSON.stringify(generateComprehensiveVideoStructuredData())}
  </script>
  
  <!-- Video meta tags for SEO -->
  <meta name="video:title" content="Dizajnownia - Profesjonalne Projektowanie Graficzne" />
  <meta name="video:description" content="Poznaj nasze usługi projektowania graficznego - wizytówki, ulotki, banery, logo i wiele więcej. Wysokiej jakości wykonanie, szybka realizacja." />
  <meta name="video:thumbnail" content="https://dizajnownia.pl/img/tlo-1024x550.png" />
  <meta name="video:duration" content="30" />
  <meta name="video:upload_date" content="2024-01-01T00:00:00+01:00" />
  <meta name="video:category" content="Business" />
  <meta name="video:family_friendly" content="yes" />
  <meta name="video:requires_subscription" content="no" />
  <meta name="video:live" content="no" />
</svelte:head>

<video
  bind:this={videoRef}
  {autoplay}
  {loop}
  muted
  playsinline
  webkit-playsinline
  {preload}
  {poster}
  width="1920"
  height="1080"
  disablepictureinpicture
  controlslist="nodownload nofullscreen noremoteplayback"
  aria-hidden="true"
  class={combinedClass}
  itemscope
  itemtype="https://schema.org/VideoObject"
  itemprop="video"
  data-video-id="dizajnownia-hero"
  data-video-title="Dizajnownia - Profesjonalne Projektowanie Graficzne"
>
  {#if shouldLoadVideo}
    {#if srcWebm}
      <source src={srcWebm} type="video/webm" />
    {/if}
    {#if srcMp4}
      <source src={srcMp4} type="video/mp4" />
    {/if}
  {/if}
</video>

<style>
  /* no styles; use classes from parent */
  :global(video) {
    /* ensure object-fit cover works consistently */
    object-fit: cover;
  }
  @supports not (object-fit: cover) {
    :global(video) {
      width: 100%;
      height: 100%;
    }
  }
</style>


