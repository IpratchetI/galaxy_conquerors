import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';

import { Link, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';
import { logOutUser } from '@/store/reducers/user/userActionCreator';
import { useAppDispatch } from '@/store';

import { navLinks } from './constants/navLinks';
import styles from './index.module.scss';

export const LinksList = () => {
	const dispatch = useAppDispatch();
	const [activeLinkId, setActiveLinkId] = useState<number>(0);
	const navigate = useNavigate();

	const exitHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch(logOutUser());
		navigate(routerPaths.login);
	};

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			event.preventDefault();

			switch (event.key) {
				case 'ArrowUp':
					setActiveLinkId(previousId => {
						if (previousId === null || previousId === 0) return navLinks.length - 1;
						return previousId - 1;
					});
					break;

				case 'ArrowDown':
					setActiveLinkId(previousId => {
						if (previousId === null || previousId === navLinks.length - 1) return 0;
						return previousId + 1;
					});
					break;

				case 'Enter': {
					const to = navLinks.find(link => link.id === activeLinkId)?.path;
					if (to) {
						navigate(to);
					}
					break;
				}

				default:
					return;
			}
		},
		[activeLinkId, navigate]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleKeyDown]);

	return (
		<ul className={styles.list}>
			{navLinks.map(({ id, path, text }) => (
				<li key={id}>
					<Link
						to={path}
						className={classNames({ [styles.isActive]: id === activeLinkId })}
						onMouseEnter={() => setActiveLinkId(id)}
						onClick={text === 'Exit' ? exitHandler : undefined}>
						<Text size="l" variant={id === activeLinkId ? 'selected' : 'normal'}>
							{text}
						</Text>
					</Link>
				</li>
			))}
		</ul>
	);
};
