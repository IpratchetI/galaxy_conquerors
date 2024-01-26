import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/models/user';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect } from 'react';
import { LoadingMeta } from '@models/common';

import { routerPaths } from '@/constants/routerPaths';
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { authUser } from '@/store/reducers/user/userActionCreator';

import { useAuth } from '@components/AuthProtection/AuthProvider/AuthProvider';

export const Login = () => {
	const dispatch = useAppDispatch();
	const { user, isLoading, error: userError } = useAppSelector(state => state.userState);
	const {
		authState: [, setAuthorized]
	} = useAuth();

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

	const submitHandler = useCallback(
		async (data: UserLoginModel) => {
			try {
				await dispatch(authUser(data));

				if (isLoading === LoadingMeta.Loaded) {
					setAuthorized(true);
				}
			} catch (e) {
				console.error(e);
			}
		},
		[isLoading]
	);

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
								<Button
									type="submit"
									disabled={isLoading === LoadingMeta.Loading}
									onClick={handleSubmit(signInHandler)}>
									Sign In
								</Button>
							</Spacer>
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
