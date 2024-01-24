import { ChangeEvent, InputHTMLAttributes, MutableRefObject, useCallback, useState } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { GlobalError } from 'react-hook-form/dist/types/errors';

import s from './index.module.scss';
import { useTextarea } from './lib/useTextarea';

type InputAttrVariable = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
	/* eslint-disable */
	textareaRef?: MutableRefObject<HTMLTextAreaElement | any>;
	isTextarea?: boolean;
	error?: GlobalError;
	initialValue?: string;
	label?: string;
} & InputAttrVariable &
	Partial<UseFormRegisterReturn<string>>;

export const Input = (props: InputProps) => {
	const {
		children,
		textareaRef,
		error,
		className,
		name,
		initialValue,
		isTextarea = false,
		...otherProps
	} = props;

	// todo: change to state from store and use dispatcher mb
	const [value, setValue] = useState(initialValue ?? '');
	const InputTag = isTextarea ? 'textarea' : 'input';

	useTextarea({
		textareaRef,
		value
	});

	const mods = {
		[s.textarea]: isTextarea
	};

	// todo: update
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		event.preventDefault();
		otherProps?.onChange?.(event);
		setValue(event.target?.value);
	}, []);

	return (
		<div className={s.inputWrapper}>
			<label className={s.label} htmlFor={name}>
				{children}
			</label>
			<InputTag
				ref={textareaRef}
				{...otherProps}
				className={classNames(s.input, mods, className)}
				onChange={handleChange}
				value={value}
			/>
			{error && <span className={s.validationError}>Value is not valid</span>}
		</div>
	);
};
