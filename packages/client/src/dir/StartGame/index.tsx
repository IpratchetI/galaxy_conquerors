import { useEffect } from 'react';
import astronaut from '@assets/img/astronaut.png';

import { Spacer, Text } from '@/components';

import styles from './index.module.scss';

const StartGame = () => {
	useEffect(() => {
		//TODO добавить роут
		//setTimeout(() => {}, 5000)
	}, []);

	return (
		<main className={styles.background}>
			<img src={astronaut} className={styles.astronaut} />
			<Spacer direction="column" align="start" className={styles.cloudContainer}>
				<div className={styles.cloudMin}></div>
				<div className={styles.cloudMax}></div>
				<div className={styles.textContainer}>
					<Text variant="fillBlack" className={styles.text}>
						Над планетой U-571 нависла угроза...
					</Text>
				</div>
			</Spacer>
		</main>
	);
};

export default StartGame;
