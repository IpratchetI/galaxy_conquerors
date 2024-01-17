import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { loginInputsConfig, loginInputsDefaults } from '@pages/Login/constants';
import { UserLoginModel } from '@models/UserLoginModel';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';

import '@styles/main.scss';
import styles from './Login.module.scss';

/**Страница логина пользователя */
export const Login = () => {
	const { register, getValues } = useForm<UserLoginModel>({
		defaultValues: loginInputsDefaults
	});

	const submitHandler = (data: UserLoginModel) => {
		console.log(data);
	};

	return (
		<main className={styles.login}>
			<p className={styles.mainName}>
				Galaxy
				<br />
				Conquerors
			</p>
			<FormCard
				header={<p className={styles.title}>Authorization</p>}
				footer={<Button title={'Sign In'} onClick={() => submitHandler(getValues())} />}>
				<form>
					{loginInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} label={label} {...register(fieldName)} />
					))}
				</form>
			</FormCard>
			<Link onClick={() => null}>
				<Text size="l">{'Register'}</Text>
			</Link>
		</main>
	);
};
