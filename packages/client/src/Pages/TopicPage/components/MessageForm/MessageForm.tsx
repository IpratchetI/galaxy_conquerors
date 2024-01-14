import { SubmitHandler, useForm } from 'react-hook-form';
import s from './MessageForm.module.scss';
import { useImperativeHandle, KeyboardEvent, useRef } from 'react';
import { Input } from '@components/Input';

type FormValues = {
	message: string;
};

export const MessageForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref, ...otherRegister } = register('message', {
		required: true,
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
		<form className={s.MessageForm}>
			<Input
				isTextarea={true}
				textareaRef={messageInputRef}
				error={errors?.message}
				placeholder="Text your comment..."
				onKeyPress={handleUserKeyPress}
				{...otherRegister}
			/>
		</form>
	);
};
