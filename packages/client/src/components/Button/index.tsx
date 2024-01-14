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
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
	const {
		variant = ButtonVariant.DEFAULT,
		className,
		type = 'button',
		children,
		...otherProps
	} = props;

	const mods = {
		[s.Text]: variant === ButtonVariant.TEXT,
		[s.Default]: variant === ButtonVariant.DEFAULT
	};

	return (
		<button {...otherProps} className={classNames(s.Button, mods, className)} type={type}>
			<span className={s.SelectIcon}>{variant === ButtonVariant.TEXT && <SelectIcon />}</span>
			{children}
		</button>
	);
};
