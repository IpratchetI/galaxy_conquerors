import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { MouseEvent, PropsWithChildren } from 'react';

import s from './index.module.scss';

interface ILinkProps extends PropsWithChildren {
	to?: string;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state?: Record<string, any>;
	onMouseEnter?: () => void;
	onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export const Link = (props: ILinkProps) => {
	const { children, className, state, to = '', onMouseEnter, onClick } = props;

	return (
		<RouterLink
			onMouseEnter={onMouseEnter}
			state={state}
			to={to}
			onClick={onClick}
			className={classNames(s.link, className)}>
			{children}
		</RouterLink>
	);
};
