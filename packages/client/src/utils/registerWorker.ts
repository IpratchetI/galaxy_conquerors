export function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('../../service-worker.ts').then(() => {
			console.info('ServiceWorker register');
		});
	} else {
		console.warn('ServiceWorker registration failed');
	}
}

export function unregisterServiceWorker() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(reg => {
			reg.unregister();
			console.info('ServiceWorker register');
		});
	} else {
		console.warn('ServiceWorker unregistration failed');
	}
}
