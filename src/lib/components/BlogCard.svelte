<script>
    import { formatDate } from '$lib/utils/blog.js';
    
    let { post } = $props();
    
    // Ensure post object has all required properties with fallbacks
    let safePost = $derived({
        slug: post?.slug || '',
        title: post?.title || 'Brak tytułu',
        excerpt: post?.excerpt || 'Brak opisu',
        image: post?.image || '/img/og-image.png',
        date: post?.date || new Date().toISOString().split('T')[0],
        author: post?.author || 'Dizajnownia',
        category: post?.category || 'Ogólne',
        tags: post?.tags || [],
        readTime: post?.readTime || '5 min',
        featured: post?.featured || false
    });
    
    // Format the date for display
    let formattedDate = $derived(formatDate(safePost.date));
</script>

<article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
    <!-- Image -->
    <div class="relative overflow-hidden">
        <img 
            src={safePost.image} 
            alt={safePost.title}
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            aria-describedby="post-excerpt-{safePost.slug}"
        />
        {#if safePost.featured}
            <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg" aria-label="Artykuł polecany">
                    Polecane
                </span>
            </div>
        {/if}
        <div class="absolute top-4 right-4">
            <span class="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs shadow-lg" aria-label="Czas czytania: {safePost.readTime}">
                {safePost.readTime}
            </span>
        </div>
    </div>
    
    <!-- Content -->
    <div class="p-6">
        <!-- Category -->
        <div class="mb-3">
            <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium" aria-label="Kategoria: {safePost.category}">
                {safePost.category}
            </span>
        </div>
        
        <!-- Title -->
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
            <a href="/blog/{safePost.slug}" class="block" aria-describedby="post-excerpt-{safePost.slug}">
                {safePost.title}
            </a>
        </h3>
        
        <!-- Excerpt -->
        <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3" id="post-excerpt-{safePost.slug}">
            {safePost.excerpt}
        </p>
        
        <!-- Meta -->
        <div class="flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-2">
                <span class="font-medium" aria-label="Autor: {safePost.author}">{safePost.author}</span>
                <span aria-hidden="true">•</span>
                <time datetime={safePost.date} aria-label="Data publikacji: {formattedDate}">{formattedDate}</time>
            </div>
            
            <!-- Tags -->
            <div class="flex space-x-1" role="list" aria-label="Tagi artykułu">
                {#each safePost.tags.slice(0, 2) as tag}
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs" role="listitem">
                        #{tag}
                    </span>
                {/each}
                {#if safePost.tags.length > 2}
                    <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs" role="listitem" aria-label="I {safePost.tags.length - 2} więcej tagów">
                        +{safePost.tags.length - 2}
                    </span>
                {/if}
            </div>
        </div>
        
        <!-- Read More Button -->
        <div class="mt-4">
            <a 
                href="/blog/{safePost.slug}" 
                class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline transition-colors duration-200"
                aria-label="Czytaj więcej artykułu: {safePost.title}"
            >
                Czytaj więcej
                <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </a>
        </div>
    </div>
</article>

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-clamp: 3;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        /* Fallback for browsers that don't support line-clamp */
        max-height: 4.5em; /* 3 lines * 1.5em line-height */
    }
    
    /* Fallback for browsers without line-clamp support */
    @supports not (-webkit-line-clamp: 3) {
        .line-clamp-3 {
            position: relative;
            max-height: 4.5em;
            overflow: hidden;
        }
        
        .line-clamp-3::after {
            content: '...';
            position: absolute;
            bottom: 0;
            right: 0;
            background: white;
            padding-left: 4px;
        }
    }
</style>
