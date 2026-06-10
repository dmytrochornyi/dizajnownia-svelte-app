// Blog utility functions
import { dev } from '$app/environment';

// Import all markdown files
const blogModules = import.meta.glob('/src/routes/blog/*.md', { eager: true });

// Convert markdown files to blog posts array
export const blogPosts = Object.entries(blogModules).map(([path, module]) => {
    try {
        const slug = path.split('/').pop().replace('.md', '');
        const { metadata } = module;
        
        // Check if the module has the expected structure
        if (!metadata || !module.default) {
            if (dev) {
                console.warn(`Skipping ${slug}: missing metadata or default export`);
            }
            return null;
        }
        
        return {
            slug,
            title: metadata.title,
            excerpt: metadata.excerpt,
            content: module.default, // This is the Svelte component from mdsvex
            date: metadata.date,
            author: metadata.author,
            category: metadata.category,
            tags: metadata.tags || [],
            image: metadata.image,
            readTime: metadata.readTime,
            featured: metadata.featured || false
        };
    } catch (error) {
        console.error(`Error processing ${path}:`, error);
        return null;
    }
}).filter(Boolean); // Remove any null entries

/**
 * Get all blog posts
 * @returns {Array} Array of blog posts
 */
export function getBlogPosts() {
    return blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get featured blog posts
 * @param {number} limit - Maximum number of posts to return
 * @returns {Array} Array of featured blog posts
 */
export function getFeaturedPosts(limit = 3) {
    return blogPosts
        .filter(post => post.featured)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

/**
 * Get blog post by slug
 * @param {string} slug - Post slug
 * @returns {Object|null} Blog post or null if not found
 */
export function getPostBySlug(slug) {
    return blogPosts.find(post => post.slug === slug) || null;
}

/**
 * Get posts by category
 * @param {string} category - Category name
 * @returns {Array} Array of posts in category
 */
export function getPostsByCategory(category) {
    return blogPosts
        .filter(post => post.category.toLowerCase() === category.toLowerCase())
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get posts by tag
 * @param {string} tag - Tag name
 * @returns {Array} Array of posts with tag
 */
export function getPostsByTag(tag) {
    return blogPosts
        .filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()))
        .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get all categories
 * @returns {Array} Array of unique categories
 */
export function getCategories() {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    return categories.map(category => ({
        name: category,
        count: blogPosts.filter(post => post.category === category).length
    }));
}

/**
 * Get all tags
 * @returns {Array} Array of unique tags
 */
export function getTags() {
    const allTags = blogPosts.flatMap(post => post.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.map(tag => ({
        name: tag,
        count: allTags.filter(t => t === tag).length
    }));
}

/**
 * Search posts by query
 * @param {string} query - Search query
 * @returns {Array} Array of matching posts
 */
export function searchPosts(query) {
    const searchTerm = query.toLowerCase();
    return blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
    );
}

/**
 * Get related posts
 * @param {string} currentSlug - Current post slug
 * @param {number} limit - Maximum number of related posts
 * @returns {Array} Array of related posts
 */
export function getRelatedPosts(currentSlug, limit = 3) {
    const currentPost = getPostBySlug(currentSlug);
    if (!currentPost) return [];

    return blogPosts
        .filter(post => 
            post.slug !== currentSlug &&
            (post.category === currentPost.category ||
             post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}

/**
 * Format date for display
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
    if (!dateString) {
        return 'Data nieznana';
    }
    
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return 'Data nieznana';
    }
    
    try {
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        // Fallback to basic date formatting if locale is not supported
        return date.toLocaleDateString();
    }
}

/**
 * Generate excerpt from content
 * @param {string} content - Post content
 * @param {number} maxLength - Maximum length of excerpt
 * @returns {string} Generated excerpt
 */
export function generateExcerpt(content, maxLength = 160) {
    if (!content) return '';
    
    // Remove HTML tags
    const textContent = content.replace(/<[^>]*>/g, '');
    
    if (textContent.length <= maxLength) {
        return textContent;
    }
    
    return textContent.substring(0, maxLength).trim() + '...';
}
