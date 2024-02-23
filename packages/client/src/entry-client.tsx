import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './style/main.scss';
import { registerServiceWorker, unregisterServiceWorker } from '@/utils/registerWorker';
import App from '@/app';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.hydrateRoot(
	document.getElementById('root') as HTMLElement,
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);

import.meta.env.DEV ? unregisterServiceWorker() : registerServiceWorker();
