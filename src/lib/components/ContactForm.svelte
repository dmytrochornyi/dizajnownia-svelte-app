<script>
	import { onDestroy } from 'svelte';
	import { createEmailSender } from '$lib/stores/emailStore.js';

	const emailSender = createEmailSender();

	let formData = {
		name: '',
		email: '',
		message: ''
	};

	let errors = {};
	let isSubmitting = false;

	function validateForm() {
		errors = {};

		if (!formData.name.trim()) {
			errors.name = 'Imię jest wymagane';
		}

		if (!formData.email.trim()) {
			errors.email = 'Email jest wymagany';
		} else if (!/^\S+@\S+$/i.test(formData.email)) {
			errors.email = 'Adres email jest niepoprawny';
		}

		if (!formData.message.trim()) {
			errors.message = 'Musisz napisać jakaś wiadomość';
		}

		return Object.keys(errors).length === 0;
	}

	async function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;
		await emailSender.sendMail(formData);
		isSubmitting = false;

		// Reset form on success
		if (emailSender.success) {
			formData = { name: '', email: '', message: '' };
		}
	}

	function handleFocus() {
		emailSender.startCountingTime();
	}

	onDestroy(() => {
		emailSender.cleanup();
	});
</script>

<form on:submit|preventDefault={handleSubmit} class="flex w-full flex-col gap-3">
   <input
	   bind:value={formData.name}
	   type="text"
	   id="contact-name"
	   name="name"
	   placeholder="Imię"
	   autocomplete="name"
	   class="h-12 border-2 border-gray-300 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none"
	   on:focus={handleFocus}
	   disabled={isSubmitting}
	   required
   />
	{#if errors.name}
		<span class="text-sm text-red-600">{errors.name}</span>
	{/if}

   <input
	   bind:value={formData.email}
	   type="email"
	   id="contact-email"
	   name="email"
	   placeholder="E-mail"
	   autocomplete="email"
	   class="h-12 border-2 border-gray-300 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none"
	   disabled={isSubmitting}
	   required
   />
	{#if errors.email}
		<span class="text-sm text-red-600">{errors.email}</span>
	{/if}

   <textarea
	   bind:value={formData.message}
	   id="contact-message"
	   name="message"
	   placeholder="Wiadomość"
	   autocomplete="off"
	   class="h-40 resize-none border-2 border-gray-300 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm transition-all focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none"
	   disabled={isSubmitting}
	   required
   ></textarea>
	{#if errors.message}
		<span class="text-sm text-red-600">{errors.message}</span>
	{/if}

   <button
	   type="submit"
	   class="h-12 transform bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-2 text-xl text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-gray-700 hover:to-gray-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 border-0"
	   disabled={isSubmitting}
   >
	   {isSubmitting ? 'wysyłanie...' : 'wyślij'}
   </button>

	{#if emailSender.success}
		<div class="font-medium text-green-600">Wiadomość została wysłana</div>
	{:else if emailSender.error}
		<div class="text-red-600">{emailSender.error}</div>
	{/if}
</form>
