<script>
	import ContactForm from './ContactForm.svelte';
	import FacebookIcon from './FacebookIcon.svelte';
	import InstagramIcon from './InstagramIcon.svelte';
</script>

<section class="bg-image-gradient" id="kontakt">
	<div class="flex w-full flex-col">
		<div class="flex w-full lg:w-1/2"></div>
		<div class="z-10 flex w-full flex-col items-start gap-10 lg:flex-row lg:items-end">
			<div class="flex w-full flex-col lg:w-1/2">
				<img src="/img/kontakt.svg" alt="kontakt" class="my-20 w-2/3 md:w-2/3" />
				<ContactForm />
			</div>
			<div class="z-10 mt-20 flex w-full flex-col text-white lg:mt-20 lg:w-1/2">
				<div class="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
					<div>
						<div class="mb-4 flex text-4xl font-bold text-white uppercase">adres</div>
						<div class="flex text-xl text-white">ul. Limanowskiego 38</div>
						<div class="flex text-xl text-white">91-052 Łódź</div>
						<div class="flex text-xl text-white">otwarte: pn-pt 8:00 - 16:00</div>
					</div>

					<div>
						<div class="mb-4 flex text-4xl font-bold text-white uppercase">telefon</div>
						<div class="flex">
							<a
								href="tel:+48793666397"
								class="text-xl text-white transition-colors hover:text-gray-300">+48 793 666 397</a
							>
						</div>
					</div>

					<div>
						<div class="mb-4 flex text-4xl font-bold text-white uppercase">e-mail</div>
						<div class="flex text-lg text-white">
							ZAMÓWIENIA:
							<a
								href="mailto:dizajnowniabiuro@gmail.com"
								class="ms-1 text-base text-white underline transition-colors hover:text-gray-300"
							>
								dizajnowniabiuro@gmail.com
							</a>
						</div>
						<div class="flex text-lg text-white">
							FAKTURY:
							<a
								href="mailto:dizajnownia@gmail.com"
								class="ms-1 text-base text-white underline transition-colors hover:text-gray-300"
							>
								dizajnownia@gmail.com
							</a>
						</div>
					</div>

					<div>
						<div class="mb-4 flex text-4xl font-bold text-white uppercase">social media</div>
						<div class="flex space-x-4 text-3xl">
							<a
								href="https://www.facebook.com/dizajnownia/?locale=pl_PL"
								aria-label="Facebook Dizajnownia"
								class="h-8 w-8 text-white transition-colors hover:text-gray-300"
							>
								<FacebookIcon className="fill-white w-full h-full" />
							</a>
							<a
								href="https://www.instagram.com/dizajnownia/"
								aria-label="Instagram Dizajnownia"
								class="h-8 w-8 text-white transition-colors hover:text-gray-300"
							>
								<InstagramIcon className="fill-white w-full h-full" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
