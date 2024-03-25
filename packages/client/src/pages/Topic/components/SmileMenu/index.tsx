import { Fragment, useState } from 'react';
import { useClickOutside } from '@hooks/useClickOutside';
import SmileMenuIcon from '@pages/Topic/components/SmileMenu/SmileMenu.svg';
import { SMILES } from '@pages/Topic/lib/constants';
import { ReactionService } from '@services/reactionService';

import { Button, Spacer } from '@/components';
import { useAppDispatch } from '@/store';
import { updateComment } from '@/store/reducers/forum/forumReducer';

import s from './index.module.scss';

interface ISmileMenuProps {
	messageId: number;
}

export const SmileMenu = (props: ISmileMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useAppDispatch();

	const clickRef = useClickOutside(() => setIsOpen(false));

	const handlerMenuOpen = () => {
		setIsOpen(prevState => !prevState);
	};

	const handlerSelectSmile = (smile: string) => {
		setIsOpen(false);
		ReactionService.addReaction({ commentId: props.messageId, reaction: smile });
		dispatch(
			updateComment({
				messageId: props.messageId,
				reaction: smile
			})
		);
	};

	return (
		<Spacer direction="column" align="end" gap="8" className={s.smileMenuWrapper} ref={clickRef}>
			{isOpen && (
				<div className={s.openedMenu}>
					{Object.entries(SMILES).map(([group, smiles], groupIndex) => (
						<Fragment key={group + groupIndex}>
							<div className={s.groupName}>{group}</div>
							<section key={group} className={s.smilesGroup}>
								{smiles.map((smile, index) => (
									<Button
										key={`smile-${smile + index}`}
										className={s.smileButton}
										onClick={() => handlerSelectSmile(smile)}>
										<div className={s.smile}>{smile}</div>
									</Button>
								))}
							</section>
						</Fragment>
					))}
				</div>
			)}
			<Button className={s.smileMenuButton} onClick={handlerMenuOpen}>
				<SmileMenuIcon />
			</Button>
		</Spacer>
	);
};
