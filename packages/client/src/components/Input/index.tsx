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

import { Spacer, Text } from '@/components';

import { useTextarea } from './lib/useTextarea';
import s from './index.module.scss';

type InputAttrVariable = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
	isTextarea?: boolean;
	error?: GlobalError;
	initialValue?: string;
	label?: string;
} & InputAttrVariable &
	Partial<UseFormRegisterReturn<string>>;

export const Input = forwardRef(
	(props: InputProps, ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			children,
			error,
			className,
			name,
			initialValue,
			isTextarea = false,
			onChange,
			...otherProps
		} = props;

		// todo: change to state from store and use dispatcher mb
		const [value, setValue] = useState(initialValue ?? '');

		useTextarea({
			textareaRef: ref as MutableRefObject<HTMLTextAreaElement>,
			value
		});

		const mods = {
			[s.textarea]: isTextarea,
			[s.invalid]: error?.message
		};

		// todo: update
		const handleChange = useCallback(
			(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
				event.preventDefault();
				onChange?.(event);
				setValue(event.target?.value);
			},
			[]
		);

		let errorContent = null;

		if (error && error.message) {
			errorContent = (
				<Text className={s.validationError} tag="p" size="xs" variant="error">
					{error.message}
				</Text>
			);
		} else if (error && !error.message) {
			errorContent = (
				<Text className={s.validationError} tag="p" size="xs" variant="error">
					Value is not valid
				</Text>
			);
		}

		return (
			<Spacer direction="column" align="start" className={s.inputWrapper}>
				<label className={s.label} htmlFor={name}>
					{children}
				</label>
				{isTextarea ? (
					<textarea
						{...otherProps}
						ref={ref as MutableRefObject<HTMLTextAreaElement>}
						className={classNames(s.input, mods, className)}
						name={name}
						onChange={handleChange}
						value={value}
					/>
				) : (
					<input
						{...otherProps}
						ref={ref as MutableRefObject<HTMLInputElement>}
						className={classNames(s.input, mods, className)}
						name={name}
						onChange={handleChange}
						value={value}
					/>
				)}
				{errorContent}
			</Spacer>
		);
	}
);
