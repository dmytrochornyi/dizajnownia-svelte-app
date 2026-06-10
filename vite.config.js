import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		allowedHosts: ['0f601836dcbc.ngrok-free.app']
	},
	assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.ogg'],
	build: {
		// Add minification
		minify: 'terser'
	}
});
