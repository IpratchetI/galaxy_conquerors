import { Button, ButtonVariant } from '@components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { uniqId } from '@utils/uniqId';

import { Spacer } from '@/components';
import { useAppDispatch } from '@/store';
import { addNewTopic } from '@/store/reducers/forum/forumReducer';
import { useAppSelector, userState } from '@/store/selectors';

import s from './index.module.scss';

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
		dispatch(
			addNewTopic({
				id: uniqId(),
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
