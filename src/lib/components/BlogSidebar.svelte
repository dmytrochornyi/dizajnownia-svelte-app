<script>
    import { createEventDispatcher } from 'svelte';
    import { getCategories, getTags, getFeaturedPosts } from '$lib/utils/blog.js';
    
    let { searchQuery = '', selectedCategory = '', selectedTag = '' } = $props();
    
    const dispatch = createEventDispatcher();
    
    // Get data
    const categories = getCategories();
    const tags = getTags();
    const featuredPosts = getFeaturedPosts(3);
    
    function handleSearch(event) {
        const query = event.target.value;
        dispatch('search', { query });
    }
    
    function handleCategoryClick(category) {
        dispatch('category', { category });
    }
    
    function handleTagClick(tag) {
        dispatch('tag', { tag });
    }
    
    function handleContactClick() {
        // Navigate to contact section on homepage
        window.location.href = '/#kontakt';
    }
</script>

<aside class="w-full lg:w-80 space-y-8" aria-label="Panel boczny bloga">
    <!-- Search -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4" id="search-heading">Szukaj artykułów</h3>
        <div class="relative">
            <input
                type="text"
                placeholder="Wpisz słowo kluczowe..."
                value={searchQuery}
                oninput={handleSearch}
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-labelledby="search-heading"
                aria-describedby="search-description"
            />
            <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </div>
        <p id="search-description" class="sr-only">Wyszukaj artykuły po słowach kluczowych</p>
    </div>
    
    <!-- Categories -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4" id="categories-heading">Kategorie</h3>
        <div class="space-y-2" aria-labelledby="categories-heading">
            {#each categories as category}
                <button
                    class="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center {selectedCategory === category.name ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}"
                    onclick={() => handleCategoryClick(category.name)}
                    aria-pressed={selectedCategory === category.name}
                    aria-label="Filtruj po kategorii: {category.name} ({category.count} artykułów)"
                >
                    <span>{category.name}</span>
                    <span class="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                        {category.count}
                    </span>
                </button>
            {/each}
        </div>
    </div>
    
    <!-- Tags -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4" id="tags-heading">Popularne tagi</h3>
        <div class="flex flex-wrap gap-2" aria-labelledby="tags-heading">
            {#each tags.slice(0, 15) as tag}
                <button
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200 {selectedTag === tag.name ? 'bg-blue-100 text-blue-700' : ''}"
                    onclick={() => handleTagClick(tag.name)}
                    aria-pressed={selectedTag === tag.name}
                    aria-label="Filtruj po tagu: {tag.name} ({tag.count} artykułów)"
                >
                    #{tag.name}
                    <span class="ml-1 text-xs text-gray-500">({tag.count})</span>
                </button>
            {/each}
        </div>
    </div>
    
    <!-- Featured Posts -->
    <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4" id="featured-heading">Polecane artykuły</h3>
        <div class="space-y-4" aria-labelledby="featured-heading">
            {#each featuredPosts as post}
                <article class="flex space-x-3">
                    <img 
                        src={post.image} 
                        alt=""
                        class="w-16 h-16 object-cover rounded-md flex-shrink-0 shadow-sm"
                        loading="lazy"
                        aria-hidden="true"
                    />
                    <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                            <a href="/blog/{post.slug}" class="hover:text-blue-600 transition-colors duration-200" aria-label="Czytaj artykuł: {post.title}">
                                {post.title}
                            </a>
                        </h4>
                        <p class="text-xs text-gray-500">
                            {new Date(post.date).toLocaleDateString('pl-PL', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>
                </article>
            {/each}
        </div>
    </div>
    
    <!-- Contact Section -->
    <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h3 class="text-lg font-semibold mb-2" id="contact-heading">Skontaktuj się z nami</h3>
        <p class="text-blue-100 text-sm mb-4" id="contact-description">
            Masz pytania? Chcesz omówić projekt? Napisz do nas!
        </p>
        <a
            href="/#kontakt"
            class="block w-full px-4 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200 text-center"
            aria-label="Przejdź do sekcji kontaktowej"
        >
            Skontaktuj się
        </a>
    </div>
</aside>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-clamp: 2;
        overflow: hidden;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>
