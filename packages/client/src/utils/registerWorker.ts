export function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../../service-worker.ts').then(() => {
			console.info('ServiceWorker register');
		});
	} else {
		console.warn('ServiceWorker registration failed');
	}
}
