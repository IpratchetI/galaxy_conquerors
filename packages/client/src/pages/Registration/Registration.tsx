import { Input } from '@components/Input';
import styles from './Registration.module.scss';
import { Button } from '@components/Button';
import { useForm } from 'react-hook-form';
import { UserModel } from '@models/UserModel';

import '@styles/main.scss';

/**Страница регистрации нового пользователя */
export const Registration = () => {
	const { register, getValues } = useForm<UserModel>({
		defaultValues: {
			first_name: '',
			second_name: '',
			login: '',
			email: '',
			password: '',
			phone: ''
		}
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
						<Input {...register('first_name')} label="first name" />
						<Input {...register('second_name')} label="second name" />
						<Input {...register('login')} label="login" />
						<Input {...register('email')} label="email" />
						<Input {...register('password')} label="password" />
						<Input {...register('phone')} label="phone" />
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
