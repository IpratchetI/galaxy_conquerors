import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
	MutableRefObject,
	useCallback,
	useState
} from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { GlobalError } from 'react-hook-form/dist/types/errors';
import { useCombinedRef } from '@hooks/useCombinedRef';

import { Spacer, Text } from '@/components';

import { useTextarea } from './lib/useTextarea';
import s from './index.module.scss';

type InputAttrVariable = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
	isTextarea?: boolean;
	error?: GlobalError;
	initialValue?: string;
	label?: string;
	textareaRef?: MutableRefObject<HTMLTextAreaElement | any>;
	testId?: string;
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
		testId,
		...otherProps
	} = props;

	const InputTag = isTextarea ? 'textarea' : 'input';

	useTextarea({ textareaRef, value });

	const inputRef = useCombinedRef(ref, textareaRef);

	const mods = {
		[s.textarea]: isTextarea,
		[s.invalid]: error?.message
	};

	let errorContent = null;

	if (error) {
		errorContent = (
			<Text className={s.validationError} tag="p" size="xs" variant="error">
				{error.message ? error.message : 'Value is not valid'}
			</Text>
		);
	}

	return (
		<Spacer direction="column" align="start" className={s.inputWrapper}>
			<label className={s.label} htmlFor={name}>
				{children}
			</label>
			<InputTag
				{...otherProps}
				ref={inputRef}
				className={classNames(s.input, mods, className)}
				name={name}
				value={value}
				data-testid={testId}
			/>
			{errorContent}
		</Spacer>
	);
});
