<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import BlogCard from '$lib/components/BlogCard.svelte';
    import Pagination from '$lib/components/Pagination.svelte';
    import { searchPosts, getPostsByCategory, getPostsByTag, getCategories, getTags } from '$lib/utils/blog.js';

    // Get data from load function
    let { data } = $props();
    let allPosts = data.posts;

    // Get URL parameters for filtering
    let searchQuery = $derived($page.url.searchParams.get('search') || '');
    let category = $derived($page.url.searchParams.get('category') || '');
    let tag = $derived($page.url.searchParams.get('tag') || '');
    
    // Local search input value to maintain focus
    let localSearchValue = $state('');
    
    // Debounce timer for search
    let searchTimeout = $state(null);
    
    // Search loading state
    let isSearching = $state(false);
    
    // Track if user is actively typing
    let isTyping = $state(false);
    
    // Update local search value when URL changes
    $effect(() => {
        localSearchValue = searchQuery;
    });
    
    // Get filtered blog posts based on URL parameters
    let posts = $derived(() => {
        let filteredPosts = allPosts;
        
        if (searchQuery) {
            filteredPosts = searchPosts(searchQuery);
        } else if (category) {
            filteredPosts = getPostsByCategory(category);
        } else if (tag) {
            filteredPosts = getPostsByTag(tag);
        }
        
        return filteredPosts;
    });
    
    // Pagination settings
    const postsPerPage = 6;
    let currentPage = $derived(parseInt($page.url.searchParams.get('page') || '1'));
    let totalPages = $derived(() => Math.ceil(posts().length / postsPerPage));
    
    // Get posts for current page
    let currentPosts = $derived(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        return posts().slice(startIndex, endIndex);
    });
    
    // Debounce function for search
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchTimeout);
                func(...args);
            };
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(later, wait);
        };
    }
    
    // Handle search input with longer debounce (only for auto-search)
    const debouncedSearch = debounce((value) => {
        if (value.trim() && !isTyping) {
            isSearching = true;
            const url = new URL($page.url);
            url.searchParams.set('search', value.trim());
            url.searchParams.delete('category');
            url.searchParams.delete('tag');
            url.searchParams.delete('page');
            goto(url.toString(), { replaceState: true }).then(() => {
                isSearching = false;
            });
        }
    }, 1000); // Increased to 1 second
    
    function handleSearchInput(event) {
        const value = event.target.value;
        isTyping = true;
        
        // Clear typing flag after user stops typing
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            isTyping = false;
        }, 500);
        
        // Only trigger auto-search if there's a substantial query
        if (value.length >= 3) {
            debouncedSearch(value);
        }
    }
    
    // Handle keyboard events
    function handleKeyDown(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            const form = event.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
        }
    }
    
    // Clear search function
    function clearSearch() {
        localSearchValue = '';
        isTyping = false;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        const url = new URL($page.url);
        url.searchParams.delete('search');
        url.searchParams.delete('category');
        url.searchParams.delete('tag');
        url.searchParams.delete('page');
        goto(url.toString(), { replaceState: true });
    }
    
    // Handle search form submission
    function handleSearchSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const searchValue = formData.get('search')?.trim();
        
        // Clear the debounce timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        
        isTyping = false;
        isSearching = true;
        const url = new URL($page.url);
        
        if (searchValue) {
            url.searchParams.set('search', searchValue);
        } else {
            url.searchParams.delete('search');
        }
        
        // Clear other filters when searching
        url.searchParams.delete('category');
        url.searchParams.delete('tag');
        url.searchParams.delete('page');
        
        goto(url.toString(), { replaceState: true }).then(() => {
            isSearching = false;
        });
    }
    
    // SEO data
    const seoData = {
        title: 'Blog - Dizajnownia | Porady i inspiracje z projektowania graficznego',
        description: 'Odkryj porady, inspiracje i najnowsze trendy w projektowaniu graficznym. Artykuły o logo, druku reklamowym, marketingu wizualnym i nie tylko.',
        keywords: 'blog projektowanie graficzne, porady grafik, inspiracje design, logo design, druk reklamowy, marketing wizualny',
        canonical: 'https://dizajnownia.pl/blog',
        ogImage: 'https://dizajnownia.pl/img/og-image.png'
    };
</script>

<svelte:head>
    <title>{seoData.title}</title>
    <meta name="description" content={seoData.description} />
    <meta name="keywords" content={seoData.keywords} />
    <link rel="canonical" href={seoData.canonical} />
    
    <!-- Open Graph -->
    <meta property="og:title" content={seoData.title} />
    <meta property="og:description" content={seoData.description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={seoData.canonical} />
    <meta property="og:image" content={seoData.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:site_name" content="Dizajnownia" />
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seoData.title} />
    <meta name="twitter:description" content={seoData.description} />
    <meta name="twitter:image" content={seoData.ogImage} />
    
    <!-- Additional SEO -->
    <meta name="author" content="Dizajnownia" />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="Polish" />
    
    <!-- Schema.org for Blog -->
    <script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog Dizajnownia",
        "description": "Porady i inspiracje z projektowania graficznego",
        "url": "https://dizajnownia.pl/blog",
        "publisher": {
            "@type": "Organization",
            "name": "Dizajnownia",
            "logo": {
                "@type": "ImageObject",
                "url": "https://dizajnownia.pl/img/logo.svg"
            }
        },
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": posts().map((post, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "description": post.excerpt,
                    "url": `https://dizajnownia.pl/blog/${post.slug}`,
                    "datePublished": post.date,
                    "author": {
                        "@type": "Organization",
                        "name": "Dizajnownia"
                    }
                }
            }))
        }
    })}
    </script>
</svelte:head>

<!-- Hero Section -->
<section class="relative py-20 overflow-hidden text-white bg-black">
    <!-- Background video -->
    <video 
        class="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        autoplay 
        loop 
        muted 
        playsinline
        webkit-playsinline
        poster="/img/tlo-1024x550.png"
    >
        <source src="/img/film.webm" type="video/webm">
        <source src="/img/film.mp4" type="video/mp4">
    </video>

    <!-- Semi-transparent gradient overlay -->
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-purple-800/50 to-pink-800/60"></div>
    <div class="absolute inset-0 z-10 bg-gradient-to-r from-black/50 to-grey-800/60"></div>

    <div class="container mx-auto px-4 relative z-20">
        <div class="text-center max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">
                Blog Dizajnownia
            </h1>
            <p class="text-xl text-gray-200 mb-8">
                Odkryj porady, inspiracje i najnowsze trendy w projektowaniu graficznym
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Projektowanie graficzne
                </span>
                <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Logo design
                </span>
                <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Druk reklamowy
                </span>
                <span class="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                    Marketing wizualny
                </span>
            </div>
        </div>
    </div>
</section>

    <!-- Breadcrumbs -->
    <div class="-mt-18">
        <Breadcrumbs items={[
            { name: 'Strona główna', url: '/' },
            { name: 'Blog', url: '/blog' }
        ]} />
    </div>

    <!-- Search and Filters Section -->
    <section class="py-8 bg-gray-50 relative">
        <!-- Decorative separator -->
        <div class="absolute bottom-0 left-0 right-0">
            <div class="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
            <div class="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent mt-px"></div>
        </div>
        <div class="container mx-auto px-4">
            <!-- Search Bar -->
            <div class="max-w-md mx-auto mb-8">
                <form onsubmit={handleSearchSubmit} class="relative">
                    <input
                        type="text"
                        name="search"
                        placeholder="Wyszukaj artykuły... (naciśnij Enter)"
                        bind:value={localSearchValue}
                        oninput={handleSearchInput}
                        onkeydown={handleKeyDown}
                        class="w-full px-4 py-2 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm pr-20"
                        aria-label="Wyszukaj artykuły"
                        disabled={isSearching}
                    />
                    
                    <!-- Clear button -->
                    {#if localSearchValue && !isSearching}
                        <button
                            type="button"
                            onclick={clearSearch}
                            class="absolute right-12 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            aria-label="Wyczyść wyszukiwanie"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    {/if}
                    
                    <!-- Search button -->
                    <button
                        type="submit"
                        class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
                        aria-label="Szukaj"
                        disabled={isSearching}
                    >
                        {#if isSearching}
                            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        {:else}
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        {/if}
                    </button>
                </form>
                
                <!-- Search hint -->
                {#if localSearchValue && !searchQuery && !isSearching}
                    <div class="text-center mt-2 text-sm text-gray-500">
                        Naciśnij Enter lub kliknij ikonę wyszukiwania, aby wyszukać
                    </div>
                {/if}
                
                <!-- Search Results Count -->
                {#if searchQuery && !isSearching}
                    <div class="text-center mt-2 text-sm text-gray-600">
                        Znaleziono {posts().length} {posts().length === 1 ? 'artykuł' : posts().length < 5 ? 'artykuły' : 'artykułów'} dla "{searchQuery}"
                    </div>
                {/if}
            </div>

            <!-- Categories and Tags -->
            <div class="max-w-4xl mx-auto">
                <!-- Categories -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Kategorie</h3>
                    <div class="flex flex-wrap gap-2">
                        <a 
                            href="/blog" 
                            class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 {!category ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                        >
                            Wszystkie
                        </a>
                        {#each getCategories() as cat}
                            <a 
                                href="/blog?category={encodeURIComponent(cat.name)}" 
                                class="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 {category === cat.name ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                            >
                                {cat.name} ({cat.count})
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Popular Tags -->
                <div class="mb-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">Popularne tagi</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each getTags().slice(0, 12) as tagItem}
                            <a 
                                href="/blog?tag={encodeURIComponent(tagItem.name)}" 
                                class="px-3 py-1 rounded-full text-sm transition-colors duration-200 {tag === tagItem.name ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
                            >
                                #{tagItem.name}
                            </a>
                        {/each}
                    </div>
                </div>

                <!-- Active Filters -->
                {#if searchQuery || category || tag}
                    <div class="p-4 bg-blue-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="text-sm text-gray-600">Aktywne filtry:</span>
                                {#if searchQuery}
                                    <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                        Szukaj: "{searchQuery}"
                                    </span>
                                {/if}
                                {#if category}
                                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                        Kategoria: {category}
                                    </span>
                                {/if}
                                {#if tag}
                                    <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                        Tag: #{tag}
                                    </span>
                                {/if}
                            </div>
                            <a 
                                href="/blog" 
                                class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                Wyczyść wszystkie
                            </a>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            
            {#if currentPosts().length > 0}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {#each currentPosts() as post}
                        <BlogCard {post} />
                    {/each}
                </div>
                
                <!-- Pagination -->
                {#if totalPages() > 1}
                    <Pagination 
                        currentPage={currentPage()} 
                        totalPages={totalPages()} 
                        baseUrl="/blog" 
                    />
                {/if}
            {:else if isSearching}
                <div class="text-center py-16">
                    <div class="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                        Wyszukiwanie...
                    </h3>
                    <p class="text-gray-600">
                        Szukamy artykułów dla Ciebie.
                    </p>
                </div>
            {:else if searchQuery}
                <div class="text-center py-16">
                    <div class="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                        Brak wyników wyszukiwania
                    </h3>
                    <p class="text-gray-600 mb-4">
                        Nie znaleziono artykułów dla zapytania "{searchQuery}".
                    </p>
                    <div class="space-y-2">
                        <p class="text-sm text-gray-500">Spróbuj:</p>
                        <ul class="text-sm text-gray-500 space-y-1">
                            <li>• Sprawdzić pisownię</li>
                            <li>• Użyć innych słów kluczowych</li>
                            <li>• Sprawdzić kategorie lub tagi</li>
                        </ul>
                    </div>
                    <a 
                        href="/blog" 
                        class="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Zobacz wszystkie artykuły
                    </a>
                </div>
            {:else}
                <div class="text-center py-16">
                    <div class="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">
                        Brak artykułów
                    </h3>
                    <p class="text-gray-600">
                        Wkrótce pojawią się pierwsze artykuły na naszym blogu.
                    </p>
                </div>
            {/if}
        </div>
    </section>
