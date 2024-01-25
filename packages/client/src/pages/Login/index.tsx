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
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

export const Login = () => {
	const [, setAuthorized] = useAuthorize();

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserLoginModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
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
			<Spacer direction="column" gap="12" fullHeight>
				<Spacer direction="column" gap="40">
					<Text tag="p" size="xxl" align="center" className={styles.title}>
						{'Galaxy \n Conquerors'}
					</Text>
					<FormCard
						text="Authorization"
						footer={
							<Button type="submit" onClick={handleSubmit(signInHandler)}>
								Sign In
							</Button>
						}>
						<form>
							{loginInputsConfig.map(({ data: { fieldName, label, type }, validateOptions }) => {
								const error = validateErrors[fieldName];
								const value = getValues()[fieldName];
								const isFieldRequired = Boolean(validateOptions.required);

								return (
									<Input
										key={fieldName}
										type={type}
										error={
											error && {
												message: validate(fieldName, value, isFieldRequired)
											}
										}
										{...register(fieldName, validateOptions)}>
										{label}
									</Input>
								);
							})}
						</form>
					</FormCard>
				</Spacer>
				<Link to={`/${routerPaths.registration}`}>
					<Spacer direction="column" gap="12">
						<Text align="center" size="s">
							x
						</Text>
						<Text className={styles.signUpText} size="s">
							Don not have an account yet?
						</Text>
					</Spacer>
				</Link>
			</Spacer>
		</main>
	);
};
