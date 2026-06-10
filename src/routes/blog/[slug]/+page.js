import { blogPosts } from '$lib/utils/blog.js';

export function entries() {
    return blogPosts.map(post => ({
        slug: post.slug
    }));
}

export function load({ params }) {
    const post = blogPosts.find(post => post.slug === params.slug);
    
    if (!post) {
        throw new Error(`Blog post with slug "${params.slug}" not found`);
    }
    
    return {
        post
    };
}

export const prerender = true;
