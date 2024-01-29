import { useCallback, useEffect } from 'react';
import { useNotification } from '@hooks/useNotification';
import { useNavigate } from 'react-router-dom';

import { Spacer, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';

import { LinksList } from './components/LinksList';
import styles from './index.module.scss';

export const Main = () => {
	const navigate = useNavigate();

	const notificationClickHandler = useCallback(() => {
		navigate(routerPaths.forum);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showNotification = useNotification({ onClick: notificationClickHandler });

	useEffect(() => {
		// TODO здесь должно быть получение данных о новых сообщениях/темах в форуме. пока что временная демонстрационная реализация
		const promise = new Promise(resolve => {
			setTimeout(() => {
				resolve('');
			}, 5000);
		});

		promise.then(() => showNotification('You have new messages in the forum'));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="80">
				<Text tag="h1" size="xxl" align="center">
					{'Galaxy \n Conquerors'}
				</Text>
				<nav>
					<LinksList />
				</nav>
			</Spacer>
		</main>
	);
};
