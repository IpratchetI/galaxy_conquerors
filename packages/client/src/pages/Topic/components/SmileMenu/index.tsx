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
					{Object.entries(SMILES).map(([group, smiles]) => (
						<div key={group}>
							<div className={s.groupName}>{group}</div>
							<section key={group} className={s.smilesGroup}>
								{smiles.map((smile, i) => (
									<Button key={`smile-${i}`} className={s.smileButton} onClick={handlerSelectSmile}>
										<div className={s.smile}>{smile}</div>
									</Button>
								))}
							</section>
						</div>
					))}
				</div>
			)}
			<Button className={s.smileMenuButton} onClick={handlerMenuOpen}>
				<SmileMenuIcon />
			</Button>
		</Spacer>
	);
};
