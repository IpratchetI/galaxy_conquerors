import { useEffect, useState } from 'react';
import classnames from 'classnames';

import s from './Overlay.module.scss';

interface OverlayProps {
	onClick?: () => void;
	isOpen?: boolean;
}

export const Overlay = (props: OverlayProps) => {
	const { onClick, isOpen } = props;
	const [openedState, setOpenedState] = useState(false);

	useEffect(() => {
		if (isOpen === undefined) return;
		if (isOpen) {
			const timeoutID = setTimeout(() => {
				setOpenedState(true);
			}, 400);
			return () => clearTimeout(timeoutID);
		}
		setOpenedState(false);
	});

	return (
		<div
			onClick={onClick}
			className={classnames(s.overlay, {
				[s.Opened]: openedState
			})}
		/>
	);
};
