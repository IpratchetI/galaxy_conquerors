import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserModel } from '@models/User';
import { regInputsConfig, regInputsDefaults } from '@pages/Registration/constants';
import { FormCard } from '@components/FormCard';

import '@styles/main.scss';
import styles from './index.module.scss';

/**Страница регистрации нового пользователя */
export const Registration = () => {
	const { register, getValues } = useForm<UserModel>({
		defaultValues: regInputsDefaults
	});

	const submitHandler = (data: UserModel) => {
		console.log(data);
	};

	return (
		<main className={styles.registration}>
			<FormCard
				text={'Registration'}
				footer={
					<>
						<Button title={'Register'} onClick={() => submitHandler(getValues())}>
							{'Register'}
						</Button>
						<Button title={'Back'}>{'Back'}</Button>
					</>
				}>
				<form>
					{regInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} {...register(fieldName)}>
							{label}
						</Input>
					))}
				</form>
			</FormCard>
		</main>
	);
};
