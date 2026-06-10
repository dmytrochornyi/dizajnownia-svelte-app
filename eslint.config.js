import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	prettier,
	...svelte.configs.recommended,
	{
		rules: {
			// Disable TypeScript-specific rules
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-implicit-any': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'@typescript-eslint/no-inferrable-types': 'off',
			// Allow any types
			'no-undef': 'off',
			'no-unused-vars': 'warn'
		},
		languageOptions: {
			globals: {
				// Add any global variables you need
				console: 'readonly',
				window: 'readonly',
				document: 'readonly',
				fetch: 'readonly'
			}
		}
	}
];
