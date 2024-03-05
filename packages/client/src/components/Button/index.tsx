import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { useTheme } from '@hooks/useTheme';
import { Theme } from '@providers/ThemeProvider/constants';

import s from './index.module.scss';
import SelectIconBlue from './assets/select.svg';
import SelectIconPink from './assets/select-pink.svg';

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

	const { theme } = useTheme();

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
			<span className={s.selectIcon}>
				{variant === ButtonVariant.TEXT &&
					(theme === Theme.LIGHT ? <SelectIconBlue /> : <SelectIconPink />)}
			</span>
			{children || text}
		</button>
	);
};
