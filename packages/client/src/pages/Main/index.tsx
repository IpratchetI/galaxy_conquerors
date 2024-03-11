import { useEffect } from 'react';
import { useNotification } from '@hooks/useNotification';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';

import { Spacer, Text, ThemeSwitcher } from '@/components';
import { routerPaths } from '@/constants/routerPaths';
import { useAppDispatch } from '@/store';
import { useAppSelector, userState } from '@/store/selectors';
import { getUserFromDataBase, postUserToDataBase } from '@/store/reducers/user/userActionCreator';

import styles from './index.module.scss';
import { LinksList } from './components/LinksList';

export const Main = () => {
	const navigate = useNavigate();

	const showNotification = useNotification({ onClick: () => navigate(routerPaths.forum) });

	const dispatch = useAppDispatch();
	const { user, userDataBase } = useAppSelector(userState);
	const { theme } = useTheme();

	useEffect(() => {
		if (user) {
			dispatch(getUserFromDataBase(user.id));
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user && userDataBase === 'empty') {
			const { id, first_name } = user;
			dispatch(
				postUserToDataBase({
					id,
					first_name,
					theme: theme
				})
			);
		}
	}, [userDataBase, dispatch, theme, user]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		// Здесь должно быть получение данных о новых сообщениях/темах в форуме. пока что временная демонстрационная реализация
		const promise = new Promise(resolve => {
			timeoutId = setTimeout(() => {
				resolve('');
			}, 5000);
		});

		promise.then(() => showNotification('You have new messages in the forum'));

		return () => clearTimeout(timeoutId);
	}, [showNotification]);

	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="50">
				<Text tag="h1" size="xxl" align="center">
					{'Galaxy \n Conquerors'}
				</Text>
				<nav>
					<LinksList />
				</nav>
			</Spacer>
			<ThemeSwitcher className={styles.themeSwitcher} />
		</main>
	);
};
