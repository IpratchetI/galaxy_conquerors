import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/Error';
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
			}}
		>
			<div className="App">Вот тут будет жить ваше приложение :)</div>
		</ErrorBoundary>
	);
}

export default App;
