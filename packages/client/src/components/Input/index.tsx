import s from './index.module.scss';
import {
	ChangeEvent,
	InputHTMLAttributes,
	MutableRefObject,
	useCallback,
	useMemo,
	useState
} from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { GlobalError } from 'react-hook-form/dist/types/errors';
import { useTextarea } from './lib/useTextarea';

type InputAttrVariable = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type InputProps = {
	textareaRef?: MutableRefObject<HTMLTextAreaElement | any>;
	isTextarea?: boolean;
	error?: GlobalError;
	initialValue?: string;
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
	const InputTag = useMemo(() => {
		return isTextarea ? 'textarea' : 'input';
	}, []);

	useTextarea({
		textareaRef,
		value
	});

	const mods = {
		[s.Textarea]: isTextarea
	};

	// todo: update
	const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		event.preventDefault();
		otherProps?.onChange?.(event);
		setValue(event.target?.value);
	}, []);

	return (
		<div className={s.InputWrapper}>
			<label className={s.Label} htmlFor={name}>
				{children}
			</label>
			<InputTag
				ref={textareaRef}
				{...otherProps}
				className={classNames(s.Input, mods, className)}
				onChange={handleChange}
				value={value}
			/>
			{error && <span className={s.ValidationError}>Value is not valid</span>}
		</div>
	);
};
