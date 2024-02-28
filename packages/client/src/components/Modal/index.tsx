import classNames from 'classnames';
import { MouseEvent, ReactNode } from 'react';

import { Spacer } from '@/components';

import s from './index.module.scss';
import { Portal } from './components/Portal/Portal';
import { Overlay } from './components/Overlay/Overlay';

type ModalProps = {
	className?: string;
	isOpen?: boolean;
	onClose?: (e?: MouseEvent) => void;
	onOpen?: () => void;
	children?: ReactNode;
};

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props;

	const mods = {
		[s.opened]: isOpen
	};

	return (
		<Portal>
			<Spacer className={classNames(s.modal, mods)} fullWidth fullHeight>
				<Overlay onClick={onClose} isOpen={isOpen} />
				<Spacer className={classNames(s.content, [className])}>{children}</Spacer>
			</Spacer>
		</Portal>
	);
};
