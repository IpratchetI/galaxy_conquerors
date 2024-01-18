// todo: заменить на router Link
import { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

import s from './index.module.scss';

export type LinkProps = {
	onClick?: () => void;
	params?: Record<string, string>;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: LinkProps) => {
	const { children, href, onClick, className, params, ...otherProps } = props;

	const createPath = () => {
		const queryParams = new URLSearchParams(params);
		onClick?.();
		return window.location.origin + href + queryParams;
	};

	return (
		<a {...otherProps} className={classNames(s.link, className)} href={createPath()}>
			{children}
		</a>
	);
};
