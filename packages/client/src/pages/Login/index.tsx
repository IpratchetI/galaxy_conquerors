import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/user';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { oAuthService } from '@services/oAuthService';

import { routerPaths } from '@/constants/routerPaths';
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';
import { getUser, logInUser } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

import { updateAuth } from '@/store/reducers/user/userReducer';

const redirectUri = 'http://localhost:3000/login';
const serviceId = '57333eb44db64f20ab8a6677e8049304';
// https://oauth.yandex.ru/authorize?response_type=code&client_id=57333eb44db64f20ab8a6677e8049304&redirect_uri=http://localhost:3000/login

export const Login = () => {
	const dispatch = useAppDispatch();
	const { user, error: userError } = useAppSelector(userState);

	const [params] = useSearchParams({ code: '' });

	// const [serviceId, setServiceId] = useState('');

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

	useEffect(() => {
		const code = params.get('code');
		if (code) {
			oAuthService.signIn({ code: code, redirect_uri: 'http://localhost:3000/login' }).then(() => {
				dispatch(updateAuth(true));
				dispatch(getUser());
				navigate(routerPaths.main);
			});
		}
	}, [params]);

	// useEffect(() => {
	// 	oAuthService.getServiceId(redirectUri)
	// 	.then(({ service_id }) => setServiceId(service_id));
	// }, []);

	const handleSignInWithYandex = () => {
		oAuthService.getServiceId(redirectUri).then(({ service_id }) => {
			window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirectUri}`;
			// console.log(service_id);
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
							<Spacer gap="20" align="center" direction="column">
								{userError?.reason && (
									<Text size="s" variant="error">
										{userError?.reason}
									</Text>
								)}
								<Button type="submit" disabled={isSubmitting} onClick={handleSubmit(signInHandler)}>
									Sign In
								</Button>
								<Button type="button" onClick={handleSignInWithYandex}>
									Sign In with Yandex
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
