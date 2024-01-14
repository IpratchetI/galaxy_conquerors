import { useEffect } from 'react';
import './App.css';
import { TopicPage } from '@pages/Topic';

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
		<div className="App">
			<TopicPage />
		</div>
	);
}

export default App;
