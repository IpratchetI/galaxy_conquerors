import { useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';
import SmileMenuIcon from '@pages/Topic/components/SmileMenu/SmileMenu.svg';
import { SMILES } from '@pages/Topic/lib/constants';

import { Button, Spacer } from '@/components';

import s from './index.module.scss';

export const SmileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const clickRef = useClickOutside(() => setIsOpen(false));

	const handlerMenuOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	const handlerSelectSmile = () => {
		setIsOpen(false);
		// TODO логика добавления реакции к сообщению
	};

	return (
		<Spacer direction="column" align="end" gap="8" className={s.smileMenuWrapper} ref={clickRef}>
			{isOpen && (
				<div className={s.openedMenu}>
					{SMILES.map((smile, index) => (
						<Button key={`smile-${index}`} className={s.smileButton} onClick={handlerSelectSmile}>
							<div className={s.smile}>{smile}</div>
						</Button>
					))}
				</div>
			)}
			<Button className={s.smileMenuButton} onClick={handlerMenuOpen}>
				<SmileMenuIcon />
			</Button>
		</Spacer>
	);
};
