<script>
import { onMount } from 'svelte';
import { GALERIA_ITEMS, LOGO_ITEMS } from '$lib/data.js';
import ItemGrid from './ItemGrid.svelte';

let logosContainer;

// Duplicate logos for seamless infinite loop
const infiniteLogos = [...LOGO_ITEMS, ...LOGO_ITEMS, ...LOGO_ITEMS];

// Drag-to-scroll state and autoscroll controls
let isPointerDown = false;
let pointerStartX = 0;
let scrollStartLeft = 0;
let hasDragged = false;
let isHovered = false;
let animationId;
let autoscrollPausedUntil = 0;
let lastAutoScrollAt = 0;
let scrollSpeed = 1.8; // pixels per frame for smooth 60fps
let isAutoScrolling = false;

function pauseAutoScrollFor(ms) {
  autoscrollPausedUntil = Math.max(autoscrollPausedUntil, Date.now() + ms);
}

function normalizeScrollPosition() {
  if (!logosContainer) return;
  const setWidth = logosContainer.scrollWidth / 3;
  if (!setWidth) return;
  const x = logosContainer.scrollLeft;
  const offsetWithinSet = ((x - setWidth) % setWidth + setWidth) % setWidth;
  logosContainer.scrollLeft = setWidth + offsetWithinSet;
}

// Smooth auto-scroll using requestAnimationFrame
function autoScroll() {
  if (!logosContainer || isHovered || isPointerDown || Date.now() < autoscrollPausedUntil) {
    animationId = requestAnimationFrame(autoScroll);
    return;
  }

  // Smooth scrolling
  logosContainer.scrollLeft += scrollSpeed;
  lastAutoScrollAt = Date.now();

  // Check if we need to loop back
  const setWidth = logosContainer.scrollWidth / 3;
  if (setWidth > 0) {
    const x = logosContainer.scrollLeft;
    if (x < setWidth || x >= setWidth * 2) {
      const offsetWithinSet = ((x - setWidth) % setWidth + setWidth) % setWidth;
      logosContainer.scrollLeft = setWidth + offsetWithinSet;
    }
  }

  animationId = requestAnimationFrame(autoScroll);
}

function startAutoScroll() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  isAutoScrolling = true;
  animationId = requestAnimationFrame(autoScroll);
}

function stopAutoScroll() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  isAutoScrolling = false;
}

function handlePointerDown(e) {
  if (!logosContainer) return;
  isPointerDown = true;
  logosContainer.classList.add('dragging');
  pointerStartX = e.clientX;
  scrollStartLeft = logosContainer.scrollLeft;
  hasDragged = false;
  try { 
    logosContainer.setPointerCapture(e.pointerId); 
  } catch (error) {
    console.warn('Failed to set pointer capture:', error);
  }
}

function handlePointerMove(e) {
  if (!logosContainer || !isPointerDown) return;
  const deltaX = e.clientX - pointerStartX;
  if (Math.abs(deltaX) > 3) hasDragged = true;
  logosContainer.scrollLeft = scrollStartLeft - deltaX;
  e.preventDefault();
  pauseAutoScrollFor(1200);
}

function handlePointerUp(e) {
  if (!logosContainer) return;
  isPointerDown = false;
  logosContainer.classList.remove('dragging');
  normalizeScrollPosition();
  pauseAutoScrollFor(1200);
  try { 
    logosContainer.releasePointerCapture(e.pointerId); 
  } catch (error) {
    console.warn('Failed to release pointer capture:', error);
  }
}

function handleClickCapture(e) {
  if (hasDragged) {
    e.preventDefault();
    e.stopPropagation();
    hasDragged = false;
  }
}

function handleMouseEnter() {
  isHovered = true;
}

function handleMouseLeave() {
  isHovered = false;
  pauseAutoScrollFor(800);
}

function handleKeyDown(e) {
  if (!logosContainer) return;
  
  const step = 100;
  switch (e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      logosContainer.scrollLeft -= step;
      pauseAutoScrollFor(1200);
      break;
    case 'ArrowRight':
      e.preventDefault();
      logosContainer.scrollLeft += step;
      pauseAutoScrollFor(1200);
      break;
  }
}

function handleImageError(e) {
  console.warn('Failed to load image:', e.target.src);
  e.target.style.display = 'none';
}

onMount(() => {
  const handleScroll = () => {
    if (Date.now() - lastAutoScrollAt > 40) {
      pauseAutoScrollFor(1500);
    }
  };

  const addEventListeners = () => {
    if (!logosContainer) return;
    
    logosContainer.addEventListener('scroll', handleScroll);
    logosContainer.addEventListener('pointerdown', handlePointerDown);
    logosContainer.addEventListener('pointermove', handlePointerMove);
    logosContainer.addEventListener('pointerup', handlePointerUp);
    logosContainer.addEventListener('pointercancel', handlePointerUp);
    logosContainer.addEventListener('click', handleClickCapture, true);
    logosContainer.addEventListener('mouseenter', handleMouseEnter);
    logosContainer.addEventListener('mouseleave', handleMouseLeave);
  };

  const removeEventListeners = () => {
    if (!logosContainer) return;
    
    logosContainer.removeEventListener('scroll', handleScroll);
    logosContainer.removeEventListener('pointerdown', handlePointerDown);
    logosContainer.removeEventListener('pointermove', handlePointerMove);
    logosContainer.removeEventListener('pointerup', handlePointerUp);
    logosContainer.removeEventListener('pointercancel', handlePointerUp);
    logosContainer.removeEventListener('click', handleClickCapture, true);
    logosContainer.removeEventListener('mouseenter', handleMouseEnter);
    logosContainer.removeEventListener('mouseleave', handleMouseLeave);
  };

  // Wait for the next tick to ensure logosContainer is bound
  setTimeout(() => {
    if (logosContainer) {
      addEventListeners();
      
      // Initialize at middle set
      const setWidth = logosContainer.scrollWidth / 3;
      if (setWidth > 0) {
        logosContainer.scrollLeft = setWidth;
      }
      
      startAutoScroll();
    }
  }, 0);

  return () => {
    removeEventListeners();
    stopAutoScroll();
  };
});
</script>

<section class="bg-image bg-primary relative" id="galeria">
	<div class="container mx-auto px-6 py-16">
		<div class="mb-16 flex justify-center lg:justify-end lg:pr-30">
            <img
				src="/img/galeria.svg"
				alt="nasze prace"
                loading="lazy"
                decoding="async"
				class="relative z-10 h-auto w-80 max-w-full object-contain md:w-96 lg:w-[500px]"
			/>
		</div>
	<ItemGrid
	  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2 relative z-10"
	  list={GALERIA_ITEMS}
	/>

  <div
	class="mt-20 flex justify-center text-2xl font-light tracking-wide text-[#eee] md:text-3xl"
  >
	WE CREATE WITH PASSION
  </div>
  <!-- Infinite Logo Gallery (full-bleed, drag + auto-scroll) -->
  <div class="mt-16">
    <div class="relative">
      <button
        bind:this={logosContainer}
        class="logos-container edge-to-edge flex items-center bg-transparent isolate"
        aria-label="Logo gallery - drag to scroll or use arrow keys"
        on:keydown={handleKeyDown}
        type="button"
      >
        {#each infiniteLogos as logo, index}
          <div class="logo-item flex-shrink-0">
            <img 
              src={logo.img} 
              alt="Client logo {index + 1}" 
              loading="lazy" 
              decoding="async" 
              class="h-40 w-40 md:h-56 md:w-56 grayscale hover:grayscale-0 transition-all duration-300" 
              on:error={handleImageError}
            />
          </div>
        {/each}
      </button>
    </div>
  </div>
  </div>
</section>

<style>
  /* Scroll container styles */
  .logos-container {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    cursor: grab;
    padding-top: 1rem;
    padding-bottom: 1rem;
    outline: none; /* Remove focus outline for better visual */
    border: none;
    background: transparent;
    font-family: inherit;
    /* Performance optimizations for smooth scrolling */
    will-change: scroll-position;
    transform: translateZ(0); /* Force hardware acceleration */
    backface-visibility: hidden;
    perspective: 1000px;
  }
  .logos-container::-webkit-scrollbar {
    display: none;
  }
  :global(.logos-container.dragging) {
    cursor: grabbing;
    user-select: none;
  }

  .logo-item {
    flex: 0 0 auto;
    position: relative;
    z-index: 0;
  }
  .logo-item:hover { z-index: 5; }
  .logo-item img { 
    display: block; 
    will-change: transform; 
    /* Performance optimizations */
    transform: translateZ(0); /* Force hardware acceleration */
    backface-visibility: hidden;
  }
  .logo-item:hover img { transform: scale(1.08) translateZ(0); }

  /* Make the container full-bleed */
  .edge-to-edge {
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
    width: 100vw;
  }

  /* Focus styles for keyboard navigation */
  .logos-container:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
</style>
