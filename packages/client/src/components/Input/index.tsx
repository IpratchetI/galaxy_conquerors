import { InputHTMLAttributes, MutableRefObject, forwardRef } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { GlobalError } from 'react-hook-form/dist/types/errors';
import { useCombinedRef } from '@hooks/useCombinedRef';

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

export const Input = forwardRef((props: InputProps, ref) => {
	const {
		children,
		textareaRef = { current: null },
		error,
		className,
		name,
		value,
		initialValue,
		isTextarea = false,
		...otherProps
	} = props;

	const InputTag = isTextarea ? 'textarea' : 'input';

	useTextarea({ textareaRef, value });

	const inputRef = useCombinedRef(ref, textareaRef);

	const mods = {
		[s.textarea]: isTextarea
	};

	return (
		<div className={s.inputWrapper}>
			<label className={s.label} htmlFor={name}>
				{children}
			</label>
			<InputTag
				ref={inputRef}
				{...otherProps}
				className={classNames(s.input, mods, className)}
				name={name}
			/>
			{error && <span className={s.validationError}>Value is not valid</span>}
		</div>
	);
});
