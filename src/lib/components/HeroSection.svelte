<script>
    import { onMount } from 'svelte';
    import VideoBackground from './VideoBackground.svelte';

	let containerRef;

    let srcWebmUrl = '/img/film.webm';

    onMount(async () => {
        // Keep desktop-quality video on mobile as requested

        const schedule = typeof window !== 'undefined' && 'requestIdleCallback' in window
            ? /** @type any */ (window).requestIdleCallback
            : (cb) => setTimeout(cb, 200);

        let ctx;
        schedule(async () => {
            try {
                const { gsap } = await import('gsap');
                
                // Set GSAP for maximum performance
                gsap.config({
                    nullTargetWarn: false,
                    autoSleep: 60,
                    force3D: true,
                    autoRevert: false
                });
                
                ctx = gsap.context(() => {
                    // Logo animation with smoother easing
                    gsap.from('#logo', { 
                        y: '+=100', 
                        duration: 1.8, 
                        opacity: 0,
                        ease: 'power3.out',
                        clearProps: 'y'
                    });
                    
                    // Decorative element animation with better performance
                    gsap.from('#d', {
                        y: '+=400',
                        xPercent: '-50',
                        opacity: 0,
                        duration: 2.2,
                        ease: 'power3.out',
                        clearProps: 'y,xPercent'
                    });

                    // Smoother infinite horizontal animation for #d
                    gsap.to('#d', {
                        x: 80, // move right 80px
                        duration: 6,
                        yoyo: true,
                        repeat: -1,
                        ease: 'power2.inOut',
                        delay: 0.5
                    });
                }, containerRef);
            } catch (error) {
                console.warn('Failed to load GSAP animations:', error);
            }
        });

		return () => {
            ctx?.revert?.();
		};
	});
</script>

<svelte:head></svelte:head>

<style>
	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-100%);
		}
	}

   .marquee-container {
	   animation: marquee 20s linear infinite;
	   display: flex;
	   white-space: nowrap;
   }

	.marquee-container:hover {
		animation-play-state: paused;
	}

	.marquee-text {
		font-family: 'Montserrat', sans-serif;
		font-weight: 800;
	}

	/* Performance optimizations for GSAP animations */
	#logo, #d {
		will-change: transform, opacity;
		transform: translateZ(0); /* Force hardware acceleration */
		backface-visibility: hidden;
		perspective: 1000px;
		transform-style: preserve-3d;
	}

	/* Prevent layout thrashing during animations */
	section {
		contain: layout style paint;
	}

	/* Optimize for 60fps animations */
	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

		<section
	class="relative flex min-h-screen items-center justify-center overflow-hidden py-8 md:py-0"
	bind:this={containerRef}
	role="banner"
	aria-label="Hero section with company branding"
>
    <VideoBackground
        srcWebm={srcWebmUrl}
        srcMp4="/img/film.mp4"
        preload="metadata"
        playOnMobile={true}
        class="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
    />
	<div class="flex w-full max-w-4xl items-center justify-center px-4">
        <img
            id="logo"
            src="/img/graphics.svg"
            alt="dizajnownia"
            width="800"
            height="300"
            fetchpriority="high"
            decoding="async"
            class="h-auto w-full max-w-sm object-contain md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
	</div>
    <img id="d" src="/img/d.svg" alt="Decorative design element" width="500" height="700" fetchpriority="low" decoding="async" class="absolute -right-20 bottom-32 h-[500px] lg:h-[700px]" aria-hidden="true" />
	
	<!-- Marquee Text Animation at Bottom -->
	<div class="absolute bottom-0 left-0 w-full overflow-hidden" role="marquee" aria-label="Scrolling company slogan">
		<div class="marquee-container py-4">
			<!-- First set -->
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				z serca projektujemy z sercem realizujemy
			</span>
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				❘
			</span>
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				z serca projektujemy z sercem realizujemy
			</span>
			<!-- Second set (duplicate for seamless loop) -->
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				z serca projektujemy z sercem realizujemy
			</span>
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				❘
			</span>
			<span class="inline-block text-white/20 text-4xl md:text-6xl uppercase tracking-wider mx-8 marquee-text">
				z serca projektujemy z sercem realizujemy
			</span>
		</div>
	</div>
</section>
