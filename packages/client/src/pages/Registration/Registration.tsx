import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserModel } from '@models/UserModel';
import { regInputsConfig, regInputsDefaults } from '@pages/Registration/constants';

import '@styles/main.scss';
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
			<section className={styles.formCard}>
				<div className={styles.header}>
					<p className={styles.title}>Registration</p>
				</div>
				<div className={styles.content}>
					<form>
						{regInputsConfig.map(({ fieldName, label }) => (
							<Input {...register(fieldName)} label={label} />
						))}
					</form>
				</div>
				<div className={styles.footer}>
					<Button title={'Register'} onClick={() => submitHandler(getValues())} />
					<Button title={'Back'} />
				</div>
			</section>
		</main>
	);
};
