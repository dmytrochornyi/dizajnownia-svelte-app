<script>
    import { page } from '$app/stores';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import BlogCard from '$lib/components/BlogCard.svelte';
    import ReadingProgressBar from '$lib/components/ReadingProgressBar.svelte';
    import { 
        getRelatedPosts, 
        formatDate
    } from '$lib/utils/blog.js';

    // Get the post data from the load function
    const { data } = $props();
    const { post } = data;
    
    // Get related posts
    const relatedPosts = getRelatedPosts(post.slug, 3);
    
    // Format date
    let formattedDate = $derived(formatDate(post.date));
    
    // SEO data
    let seoData = $derived({
        title: `${post.title} - Blog Dizajnownia`,
        description: post.excerpt,
        keywords: post.tags.join(', '),
        canonical: `https://dizajnownia.pl/blog/${post.slug}`,
        ogImage: post.image.startsWith('http') ? post.image : `https://dizajnownia.pl${post.image}`,
        publishedTime: post.date,
        modifiedTime: post.date,
        author: post.author,
        category: post.category
    });
</script>

<svelte:head>
    <title>{seoData.title}</title>
    <meta name="description" content={seoData.description} />
    <meta name="keywords" content={seoData.keywords} />
    <link rel="canonical" href={seoData.canonical} />
    
    <!-- Open Graph -->
    <meta property="og:title" content={seoData.title} />
    <meta property="og:description" content={seoData.description} />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={seoData.canonical} />
    <meta property="og:image" content={seoData.ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:site_name" content="Dizajnownia" />
    <meta property="article:published_time" content={seoData.publishedTime} />
    <meta property="article:modified_time" content={seoData.modifiedTime} />
    <meta property="article:author" content={seoData.author} />
    <meta property="article:section" content={seoData.category} />
    {#each post.tags as tag}
        <meta property="article:tag" content={tag} />
    {/each}
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seoData.title} />
    <meta name="twitter:description" content={seoData.description} />
    <meta name="twitter:image" content={seoData.ogImage} />
    
    <!-- Additional SEO -->
    <meta name="author" content={seoData.author} />
    <meta name="robots" content="index, follow" />
    <meta name="language" content="Polish" />
    
    <!-- Schema.org for Blog Post -->
    <script type="application/ld+json">
    {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "image": seoData.ogImage,
        "author": {
            "@type": "Organization",
            "name": post.author,
            "url": "https://dizajnownia.pl"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Dizajnownia",
            "logo": {
                "@type": "ImageObject",
                "url": "https://dizajnownia.pl/img/logo.svg"
            }
        },
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": seoData.canonical
        },
        "articleSection": post.category,
        "keywords": post.tags.join(', '),
        "wordCount": post.content ? post.content.split(' ').length : 0,
        "timeRequired": `PT${post.readTime.replace(' min', 'M')}`
    })}
    </script>
</svelte:head>

<!-- Reading Progress Bar -->
<ReadingProgressBar />

<!-- Breadcrumbs -->
<div class="-mt-18 bg-white">
    <Breadcrumbs items={[
        { name: 'Strona główna', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${post.slug}` }
    ]} />
</div>

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
        <div class="max-w-4xl mx-auto">
            
            <!-- Article Header -->
            <div class="mt-8">
                    <div class="mb-6">
                        <span class="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                            {post.category}
                        </span>
                    </div>
                    
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>
                    
                    <p class="text-xl text-gray-200 mb-8 leading-relaxed">
                        {post.excerpt}
                    </p>
                    
                    <!-- Article Meta -->
                    <div class="flex flex-wrap items-center gap-6 text-sm text-gray-300 border-t border-gray-400 pt-6">
                        <div class="flex items-center space-x-2">
                            <span class="font-medium">{post.author}</span>
                            <span>•</span>
                            <time datetime={post.date}>{formattedDate}</time>
                        </div>
                        
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{post.readTime}</span>
                        </div>
                        
                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2">
                            {#each post.tags as tag}
                                <a 
                                    href="/blog?tag={tag}" 
                                    class="bg-white/20 text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm"
                                >
                                    #{tag}
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Article Content -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="max-w-4xl mx-auto">
                <!-- Featured Image -->
                <div class="mb-12">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        class="w-full h-64 md:h-96 object-cover rounded-lg shadow-xl"
                        loading="lazy"
                    />
                </div>
                
                <!-- Article Body -->
                <article class="blog-content">
                    {#if post.content}
                        {@render post.content()}
                    {/if}
                </article>
                
                <!-- Share Buttons -->
                <div class="mt-12 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Udostępnij artykuł</h3>
                    <div class="flex space-x-4">
                        <a 
                            href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(seoData.canonical)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                            Facebook
                        </a>
                        
                        <a 
                            href="https://twitter.com/intent/tweet?url={encodeURIComponent(seoData.canonical)}&text={encodeURIComponent(post.title)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors duration-200"
                        >
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                            Twitter
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/sharing/share-offsite/?url={encodeURIComponent(seoData.canonical)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors duration-200"
                        >
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Related Posts -->
    {#if relatedPosts.length > 0}
        <section class="py-16 bg-gray-50">
            <div class="container mx-auto px-4">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Powiązane artykuły
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {#each relatedPosts as relatedPost}
                            <BlogCard post={relatedPost} />
                        {/each}
                    </div>
                </div>
            </div>
        </section>
    {/if}
