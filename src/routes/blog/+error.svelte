<script>
    import { page } from '$app/stores';
    import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
    import Navigation from '$lib/components/Navigation.svelte';
    import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen bg-gray-50">
    <Navigation />
    
    <div class="pt-20">
        <div class="bg-white">
            <!-- Breadcrumbs -->
            <div class="-mt-18">
                <Breadcrumbs items={[
                    { name: 'Strona główna', url: '/' },
                    { name: 'Blog', url: '/blog' }
                ]} />
            </div>
            
            <!-- Error Content -->
            <section class="py-20">
                <div class="container mx-auto px-4">
                    <div class="text-center max-w-2xl mx-auto">
                        <div class="text-gray-400 text-6xl mb-6">📝</div>
                        <h1 class="text-4xl font-bold text-gray-900 mb-4">
                            {#if $page.status === 404}
                                Artykuł nie został znaleziony
                            {:else}
                                Wystąpił błąd
                            {/if}
                        </h1>
                        <p class="text-xl text-gray-600 mb-8">
                            {#if $page.status === 404}
                                Przepraszamy, ale artykuł którego szukasz nie istnieje lub został przeniesiony.
                            {:else}
                                Przepraszamy, wystąpił nieoczekiwany błąd. Spróbuj odświeżyć stronę.
                            {/if}
                        </p>
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <a 
                                href="/blog" 
                                class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Wróć do bloga
                            </a>
                            <a 
                                href="/" 
                                class="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                                Strona główna
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    
    <Footer />
</div>
