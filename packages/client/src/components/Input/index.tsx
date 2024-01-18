import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	search?: boolean;
	label?: string;
	name: string;
	fullWidth?: boolean;
	invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
	const { type = 'text', className, fullWidth, invalid, ...restProps } = props;

	return (
		<div
			className={clsx(styles.input, className, props.disabled && styles.input + '_disabled', {
				[styles['fullWidth']]: fullWidth,
				[styles['invalid']]: invalid
			})}>
			{props.label && <label htmlFor={props.name}>{props.label}</label>}
			<input id={props.name} type={type} ref={ref} {...restProps} />
		</div>
	);
});
