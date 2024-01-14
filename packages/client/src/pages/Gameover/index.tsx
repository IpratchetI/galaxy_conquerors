import { useCallback } from 'react'
import { Link, Spacer, Text } from '@/components'
import styles from './index.module.scss'
import ship from '@assets/img/ship.png'
import explosion from '@assets/img/explosion.png'
import shot from '@assets/img/shot.png'

const FIRST_ROW_SHIP_COUNT = 9
const SECOND_ROW_SHIP_COUNT = 8

const Gameover = () => {
	const onExit = useCallback(() => {
		// TODO
		console.log('exit')
	}, [])
	return (
		<main className={styles.background}>
			<Spacer
				direction="column"
				fullHeight
				gap="80"
				className={styles.container}>
				<Text tag="h1" size="xxl" align="center">
					{'GAME OVER'}
				</Text>
				<nav className={styles.linkText}>
					<Link onClick={onExit}>
						<Text size="l">{'Exit'}</Text>
					</Link>
				</nav>
				<Spacer direction="column" gap="6" className={styles.img_container}>
					<Spacer direction="column" gap="20" className={styles.shot_container}>
						{new Array(3).fill(1).map((el, i) => {
							return <img src={shot} key={i} />
						})}
					</Spacer>
					{[FIRST_ROW_SHIP_COUNT, SECOND_ROW_SHIP_COUNT].map((count, index) => {
						return (
							<Spacer direction="row" gap="40" key={index}>
								{new Array(count).fill(1).map((el, elIndex) => {
									return <img src={ship} key={elIndex} />
								})}
							</Spacer>
						)
					})}
					<img src={explosion} />
				</Spacer>
			</Spacer>
		</main>
	)
}

export default Gameover
