import { SubmitHandler, useForm } from 'react-hook-form';
import { useImperativeHandle, KeyboardEvent, useRef } from 'react';
import { Input } from '@components/Input';

import s from './index.module.scss';

type FormValues = {
	message: string;
};

export const MessageForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>();

	const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref, ...otherRegister } = register('message', {
		required: true
	});

	useImperativeHandle(ref, () => messageInputRef.current);

	const onSubmit: SubmitHandler<FormValues> = () => {
		// todo: add handler
		console.log('send');
	};

	const handleUserKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			handleSubmit(onSubmit)();
		}
	};

	// todo: change to form component mb
	return (
		<form className={s.messageForm}>
			<Input
				isTextarea={true}
				ref={messageInputRef}
				error={errors?.message}
				placeholder="Text your comment..."
				onKeyDown={handleUserKeyPress}
				{...otherRegister}
			/>
		</form>
	);
};
