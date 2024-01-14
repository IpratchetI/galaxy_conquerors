// todo: заменить на router Link
import s from './Link.module.scss';
import { AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type LinkProps = {
	params?: Record<string, string>;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: LinkProps) => {
	const { children, href, className, params, ...otherProps } = props;

	const createPath = () => {
		const queryParams = new URLSearchParams(params);
		return window.location.origin + href + queryParams;
	};

	return (
		<a
			{...otherProps}
			className={classNames(s.Link, className)}
			href={createPath()}>
			{children}
		</a>
	);
};