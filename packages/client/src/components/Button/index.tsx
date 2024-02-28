import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import s from './index.module.scss';
import SelectIcon from './SelectIcon.svg';

export enum ButtonVariant {
	DEFAULT = 'Default',
	TEXT = 'Text'
}

type ButtonProps = {
	variant?: ButtonVariant;
	text?: string;
	fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
	const {
		variant = ButtonVariant.DEFAULT,
		className,
		type = 'button',
		fullWidth = false,
		children,
		text,
		...otherProps
	} = props;

	const mods = {
		[s.text]: variant === ButtonVariant.TEXT,
		[s.default]: variant === ButtonVariant.DEFAULT,
		[s.fullWidth]: fullWidth
	};

	return (
		<button
			{...otherProps}
			className={classNames(s.button, mods, className)}
			type={type}
			title={text}>
			<span className={s.selectIcon}>{variant === ButtonVariant.TEXT && <SelectIcon />}</span>
			{children || text}
		</button>
	);
};
