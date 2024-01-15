import styles from './index.module.scss'
import astronaut from '@assets/img/astronaut.png'
import { Spacer } from '@/components'

const StartGame = () => {
	return (
		<main className={styles.background}>
			<img src={astronaut} className={styles.astronaut} />
			<Spacer className={styles.textContainer}>
				Над планетой U-571 нависла угроза...
			</Spacer>
		</main>
	)
}

export default StartGame
