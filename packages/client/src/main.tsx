import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

import './style/main.scss';
import { registerServiceWorker } from '@/utils/registerWorker';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);

registerServiceWorker();
