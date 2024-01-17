import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserModel } from '@models/UserModel';
import { regInputsConfig, regInputsDefaults } from '@pages/Registration/constants';
import { FormCard } from '@components/FormCard';

import '@styles/main.scss';
import { Spacer } from '@/components';

import styles from './Registration.module.scss';

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
				header={<p className={styles.title}>Registration</p>}
				footer={
					<>
						<Button title={'Register'} onClick={() => submitHandler(getValues())} />
						<Button title={'Back'} />
					</>
				}>
				<form>
					{regInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} label={label} {...register(fieldName)} />
					))}
				</form>
			</FormCard>
		</main>
	);
};
