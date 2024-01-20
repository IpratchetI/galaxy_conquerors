import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/Error';
import Game from '@pages/Game';

import './app.css';

function App() {
	useEffect(() => {
		const fetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
		};

		fetchServerData();
	}, []);

	return (
		<ErrorBoundary
			fallback={<ErrorPage type="common" />}
			onError={(error, info) => {
				console.error({ error, info });
			}}>
			<div className="App">
				<Game />
			</div>
		</ErrorBoundary>
	);
}

export default App;
