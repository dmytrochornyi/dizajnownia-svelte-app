import { writable } from 'svelte/store';

// Store for email functionality
export const emailState = writable({
	timeElapsed: 0,
	startTime: null,
	errorMessage: '',
	isSuccess: false
});

// Email sender logic
export function createEmailSender() {
	let timeElapsed = 0;
	let startTime = null;
	let errorMessage = '';
	let isSuccess = false;
	let interval = null;

	const startCountingTime = () => {
		if (!startTime) {
			startTime = new Date();

			interval = setInterval(() => {
				if (startTime) {
					timeElapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
					emailState.update((state) => ({ ...state, timeElapsed }));
				}
			}, 1000);
		}
	};

    const sendMail = async (formData) => {
		const toEmail = 'dizajnownia@gmail.com';

		if (!formData.email || !toEmail) {
			errorMessage = 'Wystąpił błąd';
			isSuccess = false;
			emailState.update((state) => ({ ...state, errorMessage, isSuccess }));
			return;
		}

        if (startTime) {
			if (timeElapsed > 5) {
				try {
					const emailData = {
						to: toEmail,
						subject: `Wiadomosc z www od ${formData.email}`,
						fillingTime: timeElapsed,
						data: formData
					};

                    const response = await fetch('https://srv566170.hstgr.cloud:3000/mail', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},
						body: JSON.stringify(emailData)
					});

                    // Guard: require 2xx and JSON
                    if (!response.ok) {
                        throw new Error('Network error');
                    }
                    const contentType = response.headers.get('content-type') || '';
                    const isJson = contentType.includes('application/json');
                    const result = isJson ? await response.json() : { status: 'error' };

                    if (result && result.status === 'success') {
						isSuccess = true;
						errorMessage = '';
                    } else {
                        throw new Error('Invalid response');
					}
                } catch {
					errorMessage =
						'Coś poszło nie tak. Wyślij wiadomość bezpośrednio na: dizajnownia@gmail.com';
					isSuccess = false;
				}
			} else {
				errorMessage =
					'Coś poszło nie tak. Wyślij wiadomość bezpośrednio na: dizajnownia@gmail.com';
				isSuccess = false;
			}

			timeElapsed = 0;
			startTime = null;
			if (interval) {
				clearInterval(interval);
				interval = null;
			}
		}

		emailState.update((state) => ({
			...state,
			errorMessage,
			isSuccess,
			timeElapsed: 0,
			startTime: null
		}));
	};

	const cleanup = () => {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	};

	return {
		sendMail,
		startCountingTime,
		cleanup,
		get error() {
			return errorMessage;
		},
		get success() {
			return isSuccess;
		}
	};
}
