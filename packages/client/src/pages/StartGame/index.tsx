import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import astronaut from '@assets/gameplay/astronaut.png';

import { Spacer, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';

import styles from './index.module.scss';

export const StartGame = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate(routerPaths.game);
			//TODO change => 4000
		}, 2000);
	}, []);

	return (
		<main className={styles.background}>
			<img
				src={astronaut}
				className={styles.astronaut}
				alt="Изображение: Астронавт смотрит в даль"
			/>
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
