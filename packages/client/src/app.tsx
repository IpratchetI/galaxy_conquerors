import { useEffect } from 'react'
import Main from './pages/Main'
import './app.css'
import Gameover from './pages/Gameover'

function App() {
	useEffect(() => {
		const fetchServerData = async () => {
			const url = `http://localhost:${__SERVER_PORT__}`
			const response = await fetch(url)
			const data = await response.json()
			console.log(data)
		}

		fetchServerData()
	}, [])
	return (
		<div className="App">
			<Gameover />
		</div>
	)
}

export default App
