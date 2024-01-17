import React from 'react'

const mockHighscores = [
	{ username: '#playerName1', score: 19000 },
	{ username: '#playerName2', score: 1920 },
	{ username: '#playerName3', score: 1900 },
	{ username: '#playerName4', score: 800 },
	{ username: '#playerName5', score: 500 }
	// todo:заменить моковые данные на данные из бэка
]

export const HighscoreList: React.FC = () => {
	return (
		<ul>
			{mockHighscores.map((entry, index) => (
				<li key={index}>{`${entry.username}: ${entry.score}`}</li>
			))}
		</ul>
	)
}
