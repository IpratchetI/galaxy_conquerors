import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@pages/Error';
import { AppRouter } from '@components/AppRouter/AppRouter';
import { useAppDispatch } from './store';
import { getTopicsList } from './store/reducers/forum/forumReducer';
import { TOPICS_LIST } from '@pages/Forum/lib/mocks';

function App() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const fetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
		};

		fetchServerData();

		dispatch(getTopicsList(TOPICS_LIST));
	}, []);

	return (
		<ErrorBoundary
			fallback={<ErrorPage type="common" />}
			onError={(error, info) => {
				console.error({ error, info });
			}}>
			<AppRouter />
		</ErrorBoundary>
	);
}

export default App;
