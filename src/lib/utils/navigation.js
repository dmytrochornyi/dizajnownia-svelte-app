/**
 * Navigation utilities for enhanced user experience
 */

/**
 * Smooth scroll to a target element with offset
 * @param {string} targetId - The ID of the target element
 * @param {number} offset - Offset from top in pixels (default: 80px for header)
 */
export function smoothScrollTo(targetId, offset = 80) {
	const targetElement = document.getElementById(targetId);
	
	if (!targetElement) {
		console.warn(`Element with ID "${targetId}" not found`);
		return false;
	}

	const targetPosition = targetElement.offsetTop - offset;
	
	window.scrollTo({
		top: Math.max(0, targetPosition),
		behavior: 'smooth'
	});
	
	return true;
}

/**
 * Find the currently active section based on scroll position
 * @param {Array} navigationItems - Array of navigation items with link property
 * @param {number} offset - Offset for detection (default: 100px)
 * @returns {string} The ID of the active section
 */
export function findActiveSection(navigationItems, offset = 100) {
    const scrollPosition = window.scrollY + offset;

    // Use getBoundingClientRect to avoid offsetTop reflow chains
    const sections = navigationItems
        .map((item) => {
            const id = item.link.replace('#', '');
            const element = document.getElementById(id);
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            const top = rect.top + window.scrollY; // convert to document coordinates without walking offsetTop chain
            return { id, top };
        })
        .filter(Boolean)
        .sort((a, b) => a.top - b.top);

    let activeId = '';
    for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].top <= scrollPosition) {
            activeId = sections[i].id;
            break;
        }
    }

    if (!activeId && sections.length > 0 && scrollPosition < sections[0].top) {
        activeId = sections[0].id;
    }

    return activeId;
}

/**
 * Debounce function to limit scroll event frequency
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 16) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Handle navigation click with smooth scrolling or page navigation
 * @param {Event} event - Click event
 * @param {string} link - Target link (e.g., "#about" or "/path")
 * @param {Function} closeMenu - Function to close mobile menu
 */
export function handleNavigationClick(event, link, closeMenu) {
	// Close mobile menu if provided
	if (closeMenu) {
		closeMenu();
	}
	
	// Check if it's an anchor link (starts with #)
	if (link.startsWith('#')) {
		event.preventDefault();
		
		// Check if we're on the homepage
		const isHomePage = window.location.pathname === '/';
		
		if (isHomePage) {
			// Extract section ID and scroll on homepage
			const targetId = link.replace('#', '');
			smoothScrollTo(targetId);
			
			// Update URL hash without triggering scroll
			if (history.replaceState) {
				history.replaceState(null, null, link);
			}
		} else {
			// Navigate to homepage with hash
			window.location.href = '/' + link;
		}
	}
	// For regular links, let the browser handle navigation naturally
}

/**
 * Set up intersection observer for section detection (alternative approach)
 * @param {Array} navigationItems - Navigation items
 * @param {Function} callback - Callback to handle active section change
 * @returns {IntersectionObserver} Observer instance
 */
export function createSectionObserver(navigationItems, callback) {
	const options = {
		root: null,
		rootMargin: '-20% 0px -80% 0px',
		threshold: 0
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				callback(entry.target.id);
			}
		});
	}, options);

	// Observe all sections
	navigationItems.forEach(item => {
		const id = item.link.replace('#', '');
		const element = document.getElementById(id);
		if (element) {
			observer.observe(element);
		}
	});

	return observer;
}