import { useCallback } from 'react';
import ship from '@assets/img/ship.png';
import explosion from '@assets/img/explosion.png';
import shot from '@assets/img/shot.png';

import { Link, Spacer, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';

import styles from './index.module.scss';

const FIRST_ROW_SHIP_COUNT = 9;
const SECOND_ROW_SHIP_COUNT = 8;

const Gameover = () => {
	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="80" className={styles.container}>
				<Text tag="h1" size="xxl" align="center">
					{'GAME OVER'}
				</Text>
				<div className={styles.linkText}>
					<Link to={routerPaths.main}>
						<Text size="l">{'Exit'}</Text>
					</Link>
				</div>
				<Spacer direction="column" gap="6" className={styles.imgContainer}>
					<Spacer direction="column" gap="20" align="start" className={styles.shotContainer}>
						{new Array(3).fill(1).map((el, i) => {
							return <img src={shot} key={i} />;
						})}
					</Spacer>
					{[FIRST_ROW_SHIP_COUNT, SECOND_ROW_SHIP_COUNT].map((count, index) => {
						return (
							<Spacer direction="row" gap="40" key={index}>
								{new Array(count).fill(1).map((el, elIndex) => {
									return <img src={ship} key={elIndex} />;
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

export default Gameover;
