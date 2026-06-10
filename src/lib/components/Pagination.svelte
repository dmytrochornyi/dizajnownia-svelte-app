<script>
    let { currentPage, totalPages, baseUrl } = $props();
    
    // Generate page numbers to display
    let pages = $derived(generatePageNumbers(currentPage, totalPages));
    
    function generatePageNumbers(current, total) {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];
        
        for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
            range.push(i);
        }
        
        if (current - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }
        
        rangeWithDots.push(...range);
        
        if (current + delta < total - 1) {
            rangeWithDots.push('...', total);
        } else if (total > 1) {
            rangeWithDots.push(total);
        }
        
        return rangeWithDots;
    }
    
    function getPageUrl(page) {
        const url = new URL(baseUrl, window.location.origin);
        
        // Preserve existing search parameters
        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;
        
        // Copy existing parameters (except page)
        for (const [key, value] of searchParams.entries()) {
            if (key !== 'page') {
                url.searchParams.set(key, value);
            }
        }
        
        // Add page parameter if not page 1
        if (page > 1) {
            url.searchParams.set('page', page.toString());
        }
        
        return url.pathname + url.search;
    }
</script>

{#if totalPages > 1}
    <nav class="flex items-center justify-center space-x-2" aria-label="Nawigacja stron">
        <!-- Previous Button -->
        {#if currentPage > 1}
            <a 
                href={getPageUrl(currentPage - 1)}
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                aria-label="Poprzednia strona"
            >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Poprzednia
            </a>
        {:else}
            <span class="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Poprzednia
            </span>
        {/if}
        
        <!-- Page Numbers -->
        {#each pages as page}
            {#if page === '...'}
                <span class="px-3 py-2 text-sm font-medium text-gray-500">...</span>
            {:else if page === currentPage}
                <span class="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md">
                    {page}
                </span>
            {:else}
                <a 
                    href={getPageUrl(page)}
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                >
                    {page}
                </a>
            {/if}
        {/each}
        
        <!-- Next Button -->
        {#if currentPage < totalPages}
            <a 
                href={getPageUrl(currentPage + 1)}
                class="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 transition-colors duration-200"
                aria-label="Następna strona"
            >
                Następna
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        {:else}
            <span class="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                Następna
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </span>
        {/if}
    </nav>
    
    <!-- Page Info -->
    <div class="text-center mt-4 text-sm text-gray-500">
        Strona {currentPage} z {totalPages}
    </div>
{/if}
