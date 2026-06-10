import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Static adapter for hosting on any static web server
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html', // This creates a fallback page for SPA routing
			precompress: false,
			strict: true
		})
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
			extensions: ['.md'],
			remarkPlugins: [remarkGfm],
			rehypePlugins: [rehypeSlug, rehypeHighlight],
			smartypants: {
				dashes: 'oldschool'
			}
		})
	]
};

export default config;
