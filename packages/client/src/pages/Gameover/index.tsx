import { useCallback } from 'react';
import ship from '@assets/gameplay/ship.png';
import explosion from '@assets/gameplay/explosion.png';
import shot from '@assets/gameplay/shot.png';

import { Link, Spacer, Text } from '@/components';

import styles from './index.module.scss';

const FIRST_ROW_SHIP_COUNT = 9;
const SECOND_ROW_SHIP_COUNT = 8;

export const GameOver = () => {
	const onExit = useCallback(() => {
		// TODO
		console.log('exit');
	}, []);
	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="80" className={styles.container}>
				<Text tag="h1" size="xxl" align="center">
					{'GAME OVER'}
				</Text>
				<div className={styles.linkText}>
					<Link onClick={onExit}>
						<Text size="l">{'Exit'}</Text>
					</Link>
				</div>
				<Spacer direction="column" gap="6" className={styles.imgContainer}>
					<Spacer direction="column" gap="20" align="start" className={styles.shotContainer}>
						{new Array(3).fill(1).map((el, i) => {
							return <img src={shot} key={i} alt="Изображение: Выстрел корабля" />;
						})}
					</Spacer>
					{[FIRST_ROW_SHIP_COUNT, SECOND_ROW_SHIP_COUNT].map((count, index) => {
						return (
							<Spacer direction="row" gap="40" key={index}>
								{new Array(count).fill(1).map((el, elIndex) => {
									return <img src={ship} key={elIndex} alt="Изображение: Космический корабль" />;
								})}
							</Spacer>
						);
					})}
					<img src={explosion} />
				</Spacer>
			</Spacer>
		</main>
	);
};
