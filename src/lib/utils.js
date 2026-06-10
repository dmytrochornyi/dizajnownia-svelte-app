// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Funkcja do mieszania tablicy (Fisher-Yates shuffle)
export function shuffleArray(array) {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// Funkcja do wykrywania rozmiaru ekranu
export function getScreenSize() {
	if (typeof window === 'undefined') return 'default';

	const width = window.innerWidth;
	if (width >= 1536) return '2xl';
	else if (width >= 1280) return 'xl';
	else if (width >= 1024) return 'lg';
	else if (width >= 768) return 'md';
	else if (width >= 640) return 'sm';
	else return 'xs';
}
