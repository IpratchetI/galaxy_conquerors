const CACHE_NAME = 'cache_v1';
const URLS = [
	'/',
	'/login',
	'/registration',
	'/profile',
	'/game',
	'/leaderboard',
	'/forum',
	'/story',
	'/authors',
	'/gameover',
	'/notFound'
];

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.info('Opened cache');
				return cache.addAll(URLS);
			})
			.catch(err => {
				console.error(err);
				throw err;
			})
	);
});

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response;
			}

			const fetchRequest = event.request.clone();
			return fetch(fetchRequest).then(response => {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}

				const responseToCache = response.clone();
				caches.open(CACHE_NAME).then(cache => {
					cache.put(event.request, responseToCache);
				});
				return response;
			});
		})
	);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.filter(() => true).map(name => caches.delete(name)));
		})
	);
});
