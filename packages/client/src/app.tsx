import { useEffect } from 'react'
import Main from './Pages/Main'
import StartGame from './Pages/StartGame'
import './app.css'

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
	// return <div className="App">Приложение будет тут</div>
	return (
		<div className="App">
			<StartGame />
		</div>
	)
}

export default App
