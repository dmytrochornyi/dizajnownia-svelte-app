<script>
    import { onMount } from 'svelte';
    
    let progress = 0;
    let progressBar;
    let showPercentage = false;
    
    onMount(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
            
            // Show percentage when scrolling down
            if (scrollTop > 100) {
                showPercentage = true;
            } else {
                showPercentage = false;
            }
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial calculation
        
        return () => {
            window.removeEventListener('scroll', updateProgress);
        };
    });
</script>

<!-- Progress Bar Container -->
<div 
    bind:this={progressBar}
    class="fixed top-0 left-0 w-full h-1 bg-gray-200/30 backdrop-blur-sm z-50"
    role="progressbar"
    aria-valuenow={progress}
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Reading progress"
>
    <!-- Progress Bar with Gradient -->
    <div 
        class="h-full transition-all duration-300 ease-out relative progress-glow"
        style="width: {progress}%; background: linear-gradient(90deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%);"
    >
        <!-- Glow effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 blur-sm"></div>
        
        <!-- Percentage indicator -->
        {#if showPercentage && progress > 5}
            <div class="absolute -top-8 right-0 bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded shadow-lg border border-gray-200 transform translate-x-1/2 percentage-indicator">
                {Math.round(progress)}%
            </div>
        {/if}
    </div>
</div>

<style>
    /* Smooth transition for the progress bar */
    div[style*="width"] {
        transition: width 0.3s ease-out;
    }
    
    /* Ensure the progress bar is always on top */
    :global(.reading-progress-bar) {
        z-index: 9999;
    }
    
    /* Animate the percentage indicator */
    .percentage-indicator {
        animation: fadeInUp 0.3s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateX(50%) translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateX(50%) translateY(0);
        }
    }
    
    /* Glow effect for the progress bar */
    .progress-glow {
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
    }
</style>
