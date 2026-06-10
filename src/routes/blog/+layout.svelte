<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { searchPosts, getPostsByCategory, getPostsByTag } from '$lib/utils/blog.js';
    
    let { children } = $props();
    
    // Get URL parameters
    let searchQuery = $derived($page.url.searchParams.get('search') || '');
    let category = $derived($page.url.searchParams.get('category') || '');
    let tag = $derived($page.url.searchParams.get('tag') || '');
    
    function handleSearch(event) {
        const query = event.detail.query;
        const url = new URL($page.url);
        
        if (query) {
            url.searchParams.set('search', query);
        } else {
            url.searchParams.delete('search');
        }
        
        // Clear other filters when searching
        url.searchParams.delete('category');
        url.searchParams.delete('tag');
        url.searchParams.delete('page');
        
        goto(url.toString());
    }
    
    function handleCategory(event) {
        const categoryName = event.detail.category;
        const url = new URL($page.url);
        
        if (categoryName) {
            url.searchParams.set('category', categoryName);
        } else {
            url.searchParams.delete('category');
        }
        
        // Clear other filters
        url.searchParams.delete('search');
        url.searchParams.delete('tag');
        url.searchParams.delete('page');
        
        goto(url.toString());
    }
    
    function handleTag(event) {
        const tagName = event.detail.tag;
        const url = new URL($page.url);
        
        if (tagName) {
            url.searchParams.set('tag', tagName);
        } else {
            url.searchParams.delete('tag');
        }
        
        // Clear other filters
        url.searchParams.delete('search');
        url.searchParams.delete('category');
        url.searchParams.delete('page');
        
        goto(url.toString());
    }
</script>

<div class="min-h-screen bg-gray-50">
    <Navigation />
    
    {#if $page.url.pathname === '/blog'}
        <!-- Blog listing page - full width -->
        <div class="pt-20">
            {@render children?.()}
        </div>
    {:else}
        <!-- Individual blog post - full width -->
        <div class="pt-20">
            {@render children?.()}
        </div>
    {/if}
    
    <Footer />
</div>
