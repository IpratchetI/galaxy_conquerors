import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserModel } from '@models/User';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';

import { Spacer } from '@/components';
import { validate } from '@/utils/validate';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

export const Login = () => {
	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: loginInputsDefaults
	});

	const submitHandler = () => {
		getValues();
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
							<Button type="submit" onClick={handleSubmit(submitHandler)}>
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
				{/* TODO: добавить путь к странице авторизации после мерджа с роутером */}
				<Link>
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
