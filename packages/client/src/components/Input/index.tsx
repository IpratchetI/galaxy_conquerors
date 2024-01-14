import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	search?: boolean;
	label?: string;
	name: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
	const { type = 'text', className, ...restProps } = props;

	return (
		<div className={clsx(styles.input, className, props.disabled && styles.input + '_disabled')}>
			{props.label && (
				<label htmlFor={props.name} className="">
					{props.label}
				</label>
			)}
			<input id={props.name} type={type} ref={ref} {...restProps} />
		</div>
	);
});
