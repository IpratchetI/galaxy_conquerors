import { Button, ButtonVariant } from '@components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@components/Input';

import { Spacer } from '@/components';

import s from './index.module.scss';

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
			<Spacer direction="column" justify="between" fullHeight spaceTop="20">
				<Input
					error={errors?.topicName}
					{...register('topicName', {
						required: true
					})}>
					Input theme title
				</Input>
				<Spacer direction="column" gap="35" className={s.buttonContainer}>
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
