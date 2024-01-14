import s from './Input.module.scss';
import { ChangeEvent, InputHTMLAttributes, useCallback, useState } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { GlobalError } from 'react-hook-form/dist/types/errors';

export type InputProps = {
	error?: GlobalError;
	initialValue?: string;
} & InputHTMLAttributes<HTMLInputElement> &
	UseFormRegisterReturn<string>;

export const Input = (props: InputProps) => {
	const { children, error, className, name, initialValue, ...otherProps } =
		props;
	const [value, setValue] = useState(initialValue ?? '');

	// todo: update
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValue(event.target?.value);
	}, []);

	return (
		<div className={s.InputWrapper}>
			<label className={s.Label} htmlFor={name}>
				{children}
			</label>
			<input
				{...otherProps}
				className={classNames(s.Input, className)}
				onChange={handleChange}
				value={value}
			/>
			{error && <span className={s.ValidationError}>Value is not valid</span>}
		</div>
	);
};
