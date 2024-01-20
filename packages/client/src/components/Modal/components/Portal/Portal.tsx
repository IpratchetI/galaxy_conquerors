import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
	element?: HTMLElement | null;
}

export const Portal = ({ children, element = null }: PortalProps) => {
	const ref = useRef<HTMLElement | null>(element);

	useEffect(() => {
		ref.current = document.querySelector('body');
	}, []);

	return ref.current ? createPortal(children, ref.current) : null;
};
