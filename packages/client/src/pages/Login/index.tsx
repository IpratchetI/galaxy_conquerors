import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/User';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';
import { AuthService } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuthorize } from '@hooks/useAuthorize';

import { routerPaths } from '@/constants/routerPaths';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

export const Login = () => {
	const [, setAuthorized] = useAuthorize();
	const { register, getValues } = useForm<UserLoginModel>({
		defaultValues: loginInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = (data: UserLoginModel) => {
		AuthService.signIn(data).then(() => {
			setAuthorized(true);
			navigate(routerPaths.main);
		});
	};

	const signInHandler = () => {
		const values = getValues();
		submitHandler(values);
	};

	return (
		<main className={styles.login}>
			<Text tag="h1" size="xxl" align="center">
				{'Galaxy \n Conquerors'}
			</Text>
			<FormCard text={'Authorization'} footer={<Button text="Sign In" onClick={signInHandler} />}>
				<form>
					{loginInputsConfig.map(({ fieldName, label }) => (
						<Input key={fieldName} {...register(fieldName)}>
							{label}
						</Input>
					))}
				</form>
			</FormCard>
			<Link to={`/${routerPaths.registration}`}>
				<Text size="l" className={styles.register}>
					{'Register'}
				</Text>
			</Link>
		</main>
	);
};
