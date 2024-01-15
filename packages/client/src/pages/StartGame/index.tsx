import styles from './index.module.scss'
import astronaut from '@assets/img/astronaut.png'

const StartGame = () => {
	return (
		<main className={styles.background}>
			<img src={astronaut} className={styles.astronaut} />
		</main>
	)
}

export default StartGame
