import SmileMenuIcon from '../SmileMenu/SmileMenu.svg';
import s from './index.module.scss';
import { useState } from 'react';
import { SMILES } from '../../lib/constants';
import { Button, Spacer } from '@/components';

export const SmileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSmile, setSelectedSmile] = useState<string | undefined>(undefined);

	const handlerMenuOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	const handlerSelectSmile = (smile: string) => {
		setSelectedSmile(smile);
	};

	return (
		<Spacer direction="column" align="end" gap="8" className={s.smileMenuWrapper}>
			{isOpen && (
				<div className={s.openedMenu}>
					{SMILES.map((smile, i) => (
						<Button
							key={`smile-${i}`}
							className={s.smile}
							onClick={() => handlerSelectSmile(smile)}
						>
							{smile}
						</Button>
					))}
				</div>
			)}
			<Button className={s.smileMenuButton} onClick={handlerMenuOpen}>
				{selectedSmile ? (
					<span className={s.selectedReaction}>{selectedSmile}</span>
				) : (
					<SmileMenuIcon />
				)}
			</Button>
		</Spacer>
	);
};
