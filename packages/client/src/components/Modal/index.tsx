import classNames from 'classnames';
import s from './index.module.scss';
import { ReactNode } from 'react';
import { Portal } from './components/Portal/Portal';
import { Overlay } from './components/Overlay/Overlay';

type ModalProps = {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	onOpen?: () => void;
	children?: ReactNode;
};

export const Modal = (props: ModalProps) => {
	const { className, children, isOpen, onClose } = props;

	const mods = {
		[s.Opened]: isOpen,
	};

	return (
		<Portal>
			<div className={classNames(s.Modal, mods)}>
				<Overlay onClick={onClose} isOpen={isOpen} />
				<div className={classNames(s.Content, [className])}>{children}</div>
			</div>
		</Portal>
	);
};
