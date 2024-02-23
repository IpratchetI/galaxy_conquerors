import React, { useEffect } from 'react';
import ship from '@assets/gameplay/enemyShip.png';
import explosion from '@assets/gameplay/explosion.png';
import shot from '@assets/gameplay/shot.png';
import { useDispatch } from 'react-redux';
import { addNewLeader } from '@/store/reducers/leaders/leadersActionCreator';
import { Link, Spacer, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';
import { useAppSelector, userState } from '@/store/selectors';

import styles from './index.module.scss';

console.log(addNewLeader);

const FIRST_ROW_SHIP_COUNT = 9;
const SECOND_ROW_SHIP_COUNT = 8;

export const GameOver = () => {
	const dispatch = useDispatch();
	const { score } = useAppSelector(userState);
	const lastGameScore = score.lastGameScore;

	// Функция для отправки результатов игры на сервер лидерборда
	const sendGameResults = async () => {
		console.log('Sending game results...');
		try {
			await dispatch(
				addNewLeader({ ratingFieldName: lastGameScore.toString(), teamName: 'CamelCase' }) as any
			);
			console.log('Результат игры успешно отправлен на сервер лидерборда');
		} catch (error) {
			console.error('Ошибка отправки результата игры на сервер лидерборда:', error);
		}
	};

	// Вызов функции отправки результатов игры на сервер лидерборда при монтировании компонента
	useEffect(() => {
		console.log('Component mounted, sending game results...');
		sendGameResults();
	}, []);

	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="80" className={styles.container}>
				<Text tag="h1" size="xxl" align="center">
					{'GAME OVER'}
				</Text>
				<Text size="l">{'Score: ' + lastGameScore ?? '0'}</Text>
				<Spacer direction="column" gap="40" className={styles.linkText}>
					<Link to={`${routerPaths.main}${routerPaths.story}`}>
						<Text size="l">{'Play again'}</Text>
					</Link>
					<Link to={routerPaths.main}>
						<Text size="l">{'Exit'}</Text>
					</Link>
				</Spacer>
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
					<img src={explosion} alt="Изображение: Взрыв" />
				</Spacer>
			</Spacer>
		</main>
	);
};
