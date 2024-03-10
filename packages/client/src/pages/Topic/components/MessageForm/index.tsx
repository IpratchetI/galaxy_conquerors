import { SubmitHandler, useForm } from 'react-hook-form';
import { useImperativeHandle, KeyboardEvent, useRef } from 'react';
import { Input } from '@components/Input';

import s from './index.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { addNewComment, addNewMessage } from '@/store/reducers/forum/forumReducer';
import { forumState, useAppSelector, userState } from '@/store/selectors';
import { v4 as uuidv4 } from 'uuid';

type FormValues = {
	message: string;
};

export const MessageForm = () => {
	const { user } = useAppSelector(userState);
	const { topics } = useAppSelector(forumState);

	const { topicId } = useParams();
	const currentTopic = topics.find(topic => topic.id === topicId!);

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
		if (user) {
			const lastCommentUserId = currentTopic?.comments.at(-1)?.userId;

			if (user.id === lastCommentUserId) {
				dispatch(
					addNewMessage({
						id: uuidv4(),
						text: getValues().message
					})
				);
			} else {
				dispatch(
					addNewComment({
						comment: {
							id: uuidv4(),
							userId: user.id,
							messages: [
								{
									id: '0',
									text: getValues().message
								}
							]
						},
						user: { id: user.id, first_name: user.first_name }
					})
				);
			}
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
