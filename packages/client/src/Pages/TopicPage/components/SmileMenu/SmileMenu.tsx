import SmileMenuIcon from '../SmileMenu/SmileMenu.svg';
import s from './SmileMenu.module.scss';
import { useState } from 'react';
import { SMILES } from '../../lib/constants';

export const SmileMenu = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSmile, setSelectedSmile] = useState<string | undefined>(
		undefined
	);

	const handlerMenuOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	const handlerSelectSmile = (smile: string) => {
		setSelectedSmile(smile);
	};

	return (
		<div className={s.SmileMenuWrapper}>
			{isOpen && (
				<div className={s.OpenedMenu}>
					{SMILES.map((smile, i) => (
						<button
							key={`smile-${i}`}
							className={s.Smile}
							onClick={() => handlerSelectSmile(smile)}>
							{smile}
						</button>
					))}
				</div>
			)}
			<button className={s.SmileMenuButton} onClick={handlerMenuOpen}>
				{selectedSmile ? (
					<span className={s.SelectedReaction}>{selectedSmile}</span>
				) : (
					<SmileMenuIcon />
				)}
			</button>
		</div>
	);
};
