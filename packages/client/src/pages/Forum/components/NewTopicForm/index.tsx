import { Button, ButtonVariant } from '@components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/Input';

import { Spacer } from '@/components';

import s from './index.module.scss';
import { useAppDispatch } from '@/store';
import { addNewTopic } from '@/store/reducers/forum/forumReducer';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector, userState } from '@/store/selectors';

type NewTopicFormProps = {
	onClick(): void;
};

type FormValues = {
	topicName: string;
};

export const NewTopicForm = ({ onClick }: NewTopicFormProps) => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector(userState);

	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState: { errors }
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = () => {
		console.log([user!.id, user!.first_name]);
		dispatch(
			addNewTopic({
				id: uuidv4(),
				name: getValues().topicName,
				comments: [],
				length: 0,
				users: { [user!.id]: user!.first_name }
			})
		);
		reset();
		onClick();
	};

	// todo: change to form component
	return (
		<form className={s.newTopicForm} onSubmit={handleSubmit(onSubmit)}>
			<Spacer direction="column" gap="40" fullWidth>
				<Input
					error={errors?.topicName}
					{...register('topicName', {
						required: true
					})}>
					Theme name
				</Input>
				<Spacer align="center" direction="column" gap="35">
					<Button type="submit" variant={ButtonVariant.TEXT}>
						Confirm
					</Button>
					<Button variant={ButtonVariant.TEXT} onClick={onClick}>
						Cancel
					</Button>
				</Spacer>
			</Spacer>
		</form>
	);
};
