import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/user';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { routerPaths } from '@/constants/routerPaths';
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';

import { loginInputsConfig, loginInputsDefaults } from './constants';

import '@styles/main.scss';
import { logInUser } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import styles from './index.module.scss';

export const Login = () => {
	const dispatch = useAppDispatch();
	const { user, error: userError } = useAppSelector(userState);

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors, isSubmitting }
	} = useForm<UserLoginModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: loginInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = async (data: UserLoginModel) => {
		dispatch(logInUser(data));
	};

	useEffect(() => {
		if (user) {
			navigate(routerPaths.main);
		}
	}, [user]);

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
							<Spacer gap="20" align="center" direction="column">
								{userError?.reason && (
									<Text size="s" variant="error">
										{userError?.reason}
									</Text>
								)}
								<Button type="submit" disabled={isSubmitting} onClick={handleSubmit(signInHandler)}>
									Sign In
								</Button>
							</Spacer>
						}>
						<form>
							{loginInputsConfig.map(
								({ data: { fieldName, label, type, testId }, validateOptions }) => {
									const key = fieldName as keyof UserLoginModel;
									const error = validateErrors[key];
									const value = getValues()[key];
									const isFieldRequired = Boolean(validateOptions.required);

									return (
										<Input
											key={key}
											type={type}
											error={
												error && {
													message: validate(key, value, isFieldRequired)
												}
											}
											testId={testId}
											{...register(key, validateOptions)}>
											{label}
										</Input>
									);
								}
							)}
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
