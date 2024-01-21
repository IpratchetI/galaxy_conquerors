import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/Error';

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
			Тут будет ваше приложение
		</ErrorBoundary>
	);
}

export default App;
