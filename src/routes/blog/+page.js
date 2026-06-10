import { blogPosts } from '$lib/utils/blog.js';

export function load() {
    return {
        posts: blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
}

export const prerender = true;
