import { SubmitHandler, useForm } from 'react-hook-form';
import { useImperativeHandle, KeyboardEvent, useRef } from 'react';
import { Input } from '@components/Input';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '@/store';
import { addNewComment } from '@/store/reducers/forum/forumActionCreator';
import { useAppSelector, userState } from '@/store/selectors';

import s from './index.module.scss';

type FormValues = {
	message: string;
};

export const MessageForm = () => {
	const { user } = useAppSelector(userState);

	const { topicId } = useParams();

	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors }
	} = useForm<FormValues>();

	const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
	const { ref, ...otherRegister } = register('message', {
		required: true
	});

	useImperativeHandle(ref, () => messageInputRef.current);

	const onSubmit: SubmitHandler<FormValues> = () => {
		if (user && topicId) {
			dispatch(
				addNewComment({
					topicId: Number(topicId),
					userId: user?.id,
					content: getValues().message
				})
			);
		}

		reset();
	};

	const handleUserKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
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
