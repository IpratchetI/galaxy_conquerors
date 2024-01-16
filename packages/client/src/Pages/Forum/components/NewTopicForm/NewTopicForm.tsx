import s from './NewTopicForm.module.scss';
import { Button, ButtonVariant } from '@components/Button';
import { MouseEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Spacer } from '@/components';

type NewTopicFormProps = {
	onClick(): void;
};

type FormValues = {
	topicName: string;
};

export const NewTopicForm = ({ onClick }: NewTopicFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>();

	const onSubmit: SubmitHandler<FormValues> = () => {
		// todo: add handler
		console.log('created');
		onClick();
	};

	// todo: change to form component
	return (
		<form className={s.newTopicForm} onSubmit={handleSubmit(onSubmit)}>
			<Input
				error={errors?.topicName}
				{...register('topicName', {
					required: true
				})}
			>
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
		</form>
	);
};
