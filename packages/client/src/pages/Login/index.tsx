import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/User';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

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
				text={'Authorization'}
				footer={
					<Button title={'Sign In'} onClick={() => submitHandler(getValues())}>
						{'Sign In'}
					</Button>
				}>
				<form>
					{loginInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} {...register(fieldName)}>
							{label}
						</Input>
					))}
				</form>
			</FormCard>
			<Link>
				<Text size="l">{'Register'}</Text>
			</Link>
		</main>
	);
};
