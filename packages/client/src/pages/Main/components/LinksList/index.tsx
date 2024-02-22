import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import { SoundSettingsPopup } from '@components/SoundSettingsPopup';

import { Link, Text } from '@/components';
import { routerPaths } from '@/constants/routerPaths';
import { logOutUser } from '@/store/reducers/user/userActionCreator';
import { useAppDispatch } from '@/store';

import { navLinks } from './constants/navLinks';
import styles from './index.module.scss';

export const LinksList = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [activeLinkId, setActiveLinkId] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const exitHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
		e.preventDefault();
		dispatch(logOutUser());
		navigate(routerPaths.login);
	};

	const soundHandler = async (e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setIsModalOpen(true);
	};

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
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

	const clickHandler = useCallback((text: string) => {
		switch (text) {
			case 'Exit':
				return exitHandler;
			case 'Sound':
				return soundHandler;
			default:
				return () => null;
		}
	}, []);

	return (
		<>
			<ul className={styles.list}>
				{navLinks.map(({ id, path, text }) => (
					<li key={id}>
						<Link
							to={path}
							className={classNames({ [styles.isActive]: id === activeLinkId })}
							onMouseEnter={() => setActiveLinkId(id)}
							onClick={clickHandler(text)}>
							<Text size="l" variant={id === activeLinkId ? 'selected' : 'normal'}>
								{text}
							</Text>
						</Link>
					</li>
				))}
			</ul>
			<SoundSettingsPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</>
	);
};
