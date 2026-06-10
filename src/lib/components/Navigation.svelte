<script>
    import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';
	import { NAVIGATION_ITEMS, OFERTA_ITEMS } from '$lib/data.js';
	import { 
		smoothScrollTo, 
		findActiveSection, 
		debounce, 
		handleNavigationClick 
	} from '$lib/utils/navigation.js';
	import HamburgerIcon from './HamburgerIcon.svelte';
	import CloseIcon from './CloseIcon.svelte';
	import PhoneIcon from './PhoneIcon.svelte';

	let isMenuOpen = false;
	let isOfertaDropdownOpen = false;
	let isScrolled = false;
	let activeSection = '';
	let hoverTimeout = null;
    let ofertaPanelRef;
    
    function updateOfertaPanelMaxHeight() {
        if (!ofertaPanelRef) return;
        const rect = ofertaPanelRef.getBoundingClientRect();
        const paddingPx = 16;
        const available = Math.max(200, Math.floor(window.innerHeight - rect.top - paddingPx));
        ofertaPanelRef.style.maxHeight = `${available}px`;
    }
    
    $: if (isOfertaDropdownOpen) {
        // Defer until DOM updates
        tick().then(() => updateOfertaPanelMaxHeight());
    }

	// Reactive variable to check if we are on the home page
	$: isHome = $page.url.pathname === '/';
	
	// Check if current page is an oferta subpage
	$: isOfertaSubpage = OFERTA_ITEMS.some(item => $page.url.pathname === item.url);
	
	// Determine if Oferta should be active (either on home page or on subpages)
	$: isOfertaActive = activeSection === 'oferta' || isOfertaSubpage;

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		// Prevent body scroll when menu is open
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		isOfertaDropdownOpen = false; // Reset dropdown when closing mobile menu
		document.body.style.overflow = '';
	}

	function toggleOfertaDropdown(event) {
		// Prevent event bubbling to avoid conflicts
		if (event) {
			event.stopPropagation();
		}
		isOfertaDropdownOpen = !isOfertaDropdownOpen;
	}

	function closeOfertaDropdown() {
		isOfertaDropdownOpen = false;
	}

	function handleDropdownMouseEnter() {
		// Clear any pending close timeout
		if (hoverTimeout) {
			clearTimeout(hoverTimeout);
			hoverTimeout = null;
		}
		isOfertaDropdownOpen = true;
	}

	function handleDropdownMouseLeave() {
		// Set a timeout to close the dropdown, allowing time to move to dropdown content
		hoverTimeout = setTimeout(() => {
			isOfertaDropdownOpen = false;
			hoverTimeout = null;
		}, 300); // Increased timeout for better UX
	}

	function handleNavClick(event, link) {
		handleNavigationClick(event, link, closeMenu);
	}

	function handleKeyDown(event) {
		if (event.key === 'Escape') {
			if (isMenuOpen) {
				closeMenu();
			}
			if (isOfertaDropdownOpen) {
				closeOfertaDropdown();
			}
		}
	}

	function handleOutsideClick(event) {
		// Close dropdown when clicking outside - only for desktop
		// Don't interfere with mobile menu interactions
		if (isOfertaDropdownOpen && !event.target.closest('.group') && !isMenuOpen) {
			closeOfertaDropdown();
		}
	}

	// Debounced scroll handler for better performance
	const debouncedScrollHandler = debounce(() => {
		const currentScrollY = window.scrollY;
		isScrolled = currentScrollY > 50;
		activeSection = findActiveSection(NAVIGATION_ITEMS);
	}, 16);

	function handleScroll() {
		// Immediate check for scroll state without debounce
		isScrolled = window.scrollY > 50;
		// Debounced check for active section
		debouncedScrollHandler();
	}

	onMount(() => {
		// Initial setup
		isScrolled = window.scrollY > 50;
		activeSection = findActiveSection(NAVIGATION_ITEMS);

		// Event listeners
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('click', handleOutsideClick);
        window.addEventListener('resize', updateOfertaPanelMaxHeight);
        window.addEventListener('orientationchange', updateOfertaPanelMaxHeight);
		
		// Cleanup function
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('click', handleOutsideClick);
            window.removeEventListener('resize', updateOfertaPanelMaxHeight);
            window.removeEventListener('orientationchange', updateOfertaPanelMaxHeight);
			// Clear any pending hover timeout
			if (hoverTimeout) {
				clearTimeout(hoverTimeout);
			}
			// Restore body scroll if component unmounts with menu open
			document.body.style.overflow = '';
		};
	});
</script>

<style>
	/* Custom animations for menu items */
	@keyframes fadeInUp {
		from { 
			opacity: 0; 
			transform: translateY(10px); 
		}
		to { 
			opacity: 1; 
			transform: translateY(0); 
		}
	}
	
	.menu-item {
		animation: fadeInUp 0.3s ease-out forwards;
		opacity: 0;
	}
	
	
	/* Active link indicator for desktop */
	.nav-hover-effect::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background-color: white;
		transition: width 0.3s ease;
	}
	
	.nav-hover-effect:hover::after,
	.nav-link-active::after {
		width: 100%;
	}
	
	/* Ensure mobile dropdown button is always clickable */
	.mobile-dropdown-button {
		position: relative;
		z-index: 10;
		pointer-events: auto;
	}
	
	/* Improve hover area for dropdown */
	.dropdown-container {
		position: relative;
	}
	
	.dropdown-container::before {
		content: '';
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		height: 8px;
		background: transparent;
		z-index: 49;
	}
	
	/* Fix dropdown item hover styles to match navigation */
	.dropdown-item {
		transition: all 0.3s ease;
	}
	
	/* Desktop dropdown items - keep white text on dark background */
	.dropdown-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
	}
	
	/* Mobile dropdown items - use black text on white background */
	#mobile-menu .dropdown-item:hover {
		background-color: rgba(255, 255, 255, 0.1);
		color: black;
	}
	
	/* Ensure icons maintain consistent opacity */
	.dropdown-icon {
		transition: opacity 0.3s ease;
		opacity: 0.7;
	}
	
	.dropdown-item:hover .dropdown-icon {
		opacity: 1;
	}
	
	/* Keep icon opacity consistent even when dropdown is open */
	.dropdown-item .dropdown-icon {
		opacity: 0.7;
	}
	
	.dropdown-item:hover .dropdown-icon {
		opacity: 1;
	}
</style>

<!-- Header -->
<header 
	class="fixed top-0 left-0 right-0 z-50 py-4 text-[#fff] transition-all duration-300 ease-in-out {isHome ? (isScrolled ? 'bg-[#000] backdrop-blur-sm shadow-lg py-3' : 'bg-transparent') : 'bg-[#000] shadow-lg py-3'}"
>
	<div class="flex w-full items-center justify-between px-5 lg:px-8">
		<!-- Logo -->
	   <a href="/" class="flex items-center transition-transform duration-300 hover:scale-105 logo-container" aria-label="Strona główna">
           <img 
               src="/img/logo.svg" 
               alt="Dizajnownia - Agencja reklamowa" 
               width="132"
               height="40"
               fetchpriority="high"
               decoding="async"
               class="h-8 w-auto md:h-10 lg:h-11 transition-all duration-300"
           />
	   </a>

		<!-- Desktop Navigation -->
		<nav class="hidden gap-10 text-[#fff] uppercase md:flex nav-elegant-extra xl:gap-12" aria-label="Główna nawigacja">
			{#each NAVIGATION_ITEMS as { name, link } (link)}
				{#if name === 'oferta'}
					<!-- Oferta Dropdown -->
					<div 
						class="relative group dropdown-container"
						on:mouseenter={handleDropdownMouseEnter}
						on:mouseleave={handleDropdownMouseLeave}
						role="menubar"
						aria-label="Dropdown nawigacji oferty"
						tabindex="0"
					>
						<button 
							on:click={toggleOfertaDropdown}
							type="button"
							class="relative px-4 py-1 transition-all duration-300 hover:text-opacity-80 focus:outline-none nav-hover-effect flex items-center
							{isOfertaActive ? 'text-white font-semibold nav-link-active' : 'text-gray-200'}"
							aria-current={isOfertaActive ? 'page' : undefined}
							aria-expanded={isOfertaDropdownOpen}
							aria-haspopup="true"
						>
							{name.toUpperCase()}
							<svg class="w-4 h-4 ml-1 transition-transform duration-200 {isOfertaDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
							<!-- Active indicator -->
							{#if isOfertaActive}
								<span 
									class="absolute bottom-0 left-0 h-0.5 w-full bg-white transition-all duration-300"
									aria-hidden="true"
								></span>
							{/if}
						</button>
						
						<!-- Dropdown Menu -->
						{#if isOfertaDropdownOpen}
                            <div 
                                class="absolute top-full left-0 pt-2 w-64 sm:w-72 md:w-80 lg:w-96 max-w-[95vw] z-50"
								role="menu"
								aria-label="Dropdown menu oferty"
								tabindex="-1"
							>
                                <div bind:this={ofertaPanelRef} class="bg-black bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 max-h-[70vh] overflow-y-auto overscroll-contain">
									<div class="p-2">
									{#each OFERTA_ITEMS as item}
										<a 
											href={item.url}
											class="dropdown-item flex items-center px-3 py-2 text-sm text-gray-200 rounded-md transition-all duration-200 group"
											on:click={closeOfertaDropdown}
										>
                                            <img 
                                                src={item.img} 
                                                alt={item.desc}
                                                loading="lazy"
                                                decoding="async"
                                                class="dropdown-icon w-5 h-5 mr-3 filter brightness-0 invert"
                                            />
											<span class="uppercase">{item.desc}</span>
										</a>
									{/each}
								</div>
								<!-- See all services link -->
								<div class="border-t border-gray-700 p-2">
									<a 
										href="/#oferta"
										on:click={(e) => handleNavClick(e, '#oferta')}
										class="dropdown-item flex items-center px-3 py-2 text-sm text-gray-200 rounded-md transition-all duration-200 group"
									>
										<svg class="w-5 h-5 mr-3 filter brightness-0 invert dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
										</svg>
										<span class="uppercase">Zobacz wszystkie usługi</span>
									</a>
								</div>
								</div>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Regular Navigation Items -->
					<a 
						href={link} 
						on:click={(e) => handleNavClick(e, link)}
						class="relative px-4 py-1 transition-all duration-300 hover:text-opacity-80 focus:outline-none nav-hover-effect
						{!isOfertaSubpage && activeSection === link.replace('#', '') ? 'text-white font-semibold nav-link-active' : 'text-gray-200'}"
						aria-current={!isOfertaSubpage && activeSection === link.replace('#', '') ? 'page' : undefined}
					>
						{name}
						<!-- Active indicator -->
						{#if !isOfertaSubpage && activeSection === link.replace('#', '')}
							<span 
								class="absolute bottom-0 left-0 h-0.5 w-full bg-white transition-all duration-300"
								aria-hidden="true"
							></span>
						{/if}
					</a>
				{/if}
			{/each}
		</nav>

		<!-- Mobile Menu Button -->
		<button
			class="flex w-auto justify-end text-2xl md:hidden relative z-[70] p-2 rounded-md transition-all duration-300 hover:bg-white hover:bg-opacity-10 focus:outline-none text-white mobile-nav-button group"
			on:click={toggleMenu}
			aria-label={isMenuOpen ? 'Zamknij menu nawigacyjne' : 'Otwórz menu nawigacyjne'}
			aria-expanded={isMenuOpen}
			aria-controls="mobile-menu"
		>
			<div class="transition-transform duration-300 {isMenuOpen ? 'rotate-180' : ''}">
				{#if isMenuOpen}
					<CloseIcon className="w-6 h-6 text-white fill-white" />
				{:else}
					<HamburgerIcon className="w-6 h-6 text-white fill-white group-hover:text-black group-hover:fill-black" />
				{/if}
			</div>
		</button>
	</div>
</header>

<!-- Mobile menu overlay -->
{#if isMenuOpen}
	<div
		class="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm md:hidden transition-opacity duration-300"
		on:click={closeMenu}
		on:keydown={(e) => e.key === 'Escape' && closeMenu()}
		role="button"
		tabindex="0"
		aria-label="Zamknij menu nawigacyjne"
	></div>
{/if}

<!-- Mobile Navigation Menu -->
<nav
	id="mobile-menu"
	class="fixed top-0 right-0 z-[60] h-full w-80 max-w-full bg-black shadow-xl transition-transform duration-300 ease-out md:hidden overflow-y-auto {isMenuOpen
		? 'translate-x-0'
		: 'translate-x-full'}"
	aria-label="Mobilna nawigacja"
	aria-hidden={!isMenuOpen}
>
	<div class="flex h-full flex-col">
		<!-- Menu Header -->
		<div class="flex items-center justify-between p-4 border-b border-gray-700 bg-black">
			<img 
				src="/img/logo.svg" 
				alt="Dizajnownia" 
				class="h-8 w-auto"
			/>
			<button
				class="text-gray-400 hover:text-white focus:outline-none p-2 rounded-md transition-colors"
				on:click={closeMenu}
				aria-label="Zamknij menu"
			>
				<CloseIcon className="w-6 h-6" />
			</button>
		</div>

		<!-- Menu Items -->
		<div class="flex-1 p-4 space-y-2">
			{#each NAVIGATION_ITEMS as { name, link }, index (link)}
				{#if name === 'oferta'}
					<!-- Mobile Oferta Dropdown -->
					<div class="menu-item" style="animation-delay: {index * 100}ms; opacity: {isMenuOpen ? '1' : '0'}; transform: translateY({isMenuOpen ? '0' : '10px'});">
						<button 
							on:click={toggleOfertaDropdown}
							type="button"
							class="mobile-dropdown-button relative w-full flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 font-medium uppercase tracking-wide text-left
							{isOfertaActive ? 'text-white font-semibold' : 'text-gray-200 hover:text-black hover:bg-white hover:bg-opacity-10'}"
							tabindex={isMenuOpen ? "0" : "-1"}
							aria-expanded={isOfertaDropdownOpen}
							aria-haspopup="true"
						>
							{name.toUpperCase()}
							<svg class="w-4 h-4 transition-transform duration-200 {isOfertaDropdownOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
							<!-- Active indicator -->
							{#if isOfertaActive}
								<span 
									class="absolute bottom-0 left-4 right-4 h-0.5 bg-white transition-all duration-300"
									aria-hidden="true"
								></span>
							{/if}
						</button>
						
						<!-- Mobile Dropdown Content -->
						{#if isOfertaDropdownOpen}
							<div 
								class="mt-2 ml-4 space-y-1"
								role="menu"
								aria-label="Menu oferty mobilne"
							>
								{#each OFERTA_ITEMS as item}
									<a 
										href={item.url}
										class="dropdown-item flex items-center px-3 py-2 text-sm text-gray-300 rounded-md transition-all duration-200 group"
										on:click={closeMenu}
										tabindex={isMenuOpen ? "0" : "-1"}
										role="menuitem"
									>
										<img 
											src={item.img} 
											alt={item.desc}
											class="dropdown-icon w-4 h-4 mr-3 filter brightness-0 invert"
										/>
										<span class="uppercase">{item.desc}</span>
									</a>
								{/each}
								<!-- See all services link for mobile -->
								<a 
									href="/#oferta"
									on:click={(e) => handleNavClick(e, '#oferta')}
									class="dropdown-item flex items-center px-3 py-2 text-sm text-gray-300 rounded-md transition-all duration-200 group"
									tabindex={isMenuOpen ? "0" : "-1"}
									role="menuitem"
								>
									<svg class="dropdown-icon w-4 h-4 mr-3 filter brightness-0 invert" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
									</svg>
									<span class="uppercase">Zobacz wszystkie usługi</span>
								</a>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Regular Mobile Navigation Items -->
					<a 
						href={link} 
						on:click={(e) => handleNavClick(e, link)}
						class="menu-item relative block py-3 px-4 rounded-lg transition-all duration-300 font-medium uppercase tracking-wide
						{!isOfertaSubpage && activeSection === link.replace('#', '') ? 'text-white font-semibold' : 'text-gray-200 hover:text-black hover:bg-white hover:bg-opacity-10'}"
						style="animation-delay: {index * 100}ms; opacity: {isMenuOpen ? '1' : '0'}; transform: translateY({isMenuOpen ? '0' : '10px'});"
						tabindex={isMenuOpen ? "0" : "-1"}
					>
						{name}
						<!-- Active indicator -->
						{#if !isOfertaSubpage && activeSection === link.replace('#', '')}
							<span 
								class="absolute bottom-0 left-4 right-4 h-0.5 bg-white transition-all duration-300"
								aria-hidden="true"
							></span>
						{/if}
					</a>
				{/if}
			{/each}
		</div>

		<!-- Menu Footer -->
		<div class="p-4 border-t border-gray-700 bg-black">
			<a 
				href="tel:+48793666397"
				class="block w-full mb-4"
				tabindex={isMenuOpen ? "0" : "-1"}
			>
				<button class="w-full bg-white text-black py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-medium text-sm uppercase tracking-wide">
					<PhoneIcon className="mr-2 w-4 h-4" />
					Zadzwoń teraz
				</button>
			</a>
			
			<!-- Social Media Icons -->
			<div class="flex justify-center space-x-4">
				<a href="https://facebook.com/dizajnownia/" class="text-gray-400 hover:text-white transition-colors p-2" aria-label="Facebook">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
					</svg>
				</a>
				<a href="https://www.instagram.com/dizajnownia/" class="text-gray-400 hover:text-white transition-colors p-2" aria-label="Instagram">
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</nav>
