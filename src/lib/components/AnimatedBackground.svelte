<script>
    import { onMount } from 'svelte';

	let elementRef;

    onMount(async () => {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        // Batch read/writes with RAF to avoid sync reflow during init
        requestAnimationFrame(() => {
            gsap.to(elementRef, {
                y: 250,
                x: 500,
                ease: 'none',
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 3
                }
            });
        });
    });
</script>

<div
	style="position: fixed; top: 10%; left: 20%; transform: translateX(-50%); width: 600px; opacity: 50%; z-index: 1; pointer-events: none;"
>
    <img bind:this={elementRef} src="/img/d1.svg" alt="Logo SVG" loading="lazy" decoding="async" style="width: 100%; height: auto;" />
</div>
