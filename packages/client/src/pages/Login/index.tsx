import { useForm } from 'react-hook-form';
import { useLayoutEffect } from 'react';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { UserLoginModel } from '@models/user';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { FormCard } from '@components/FormCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { OAuthService } from '@services/oAuthService';
import YandexIcon from '@assets/icons/yandexIcon.svg';
import { isDev } from '@utils/isDev';

import { routerPaths } from '@/constants/routerPaths';
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';
import { getUser, logInUser } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';
import { updateAuth } from '@/store/reducers/user/userReducer';
import { getOauthProviderUri } from '@/utils/oauth';

import { loginInputsConfig, loginInputsDefaults } from './constants';
import '@styles/main.scss';
import styles from './index.module.scss';

const redirectUri = isDev()
	? 'http://localhost:3000/login'
	: 'https://camel-case-galaxy-conquerors-34.ya-praktikum.tech/login';

console.log('redirectUri', redirectUri);

export const Login = () => {
	const dispatch = useAppDispatch();
	const { user, error: userError } = useAppSelector(userState);

	const [params] = useSearchParams({ code: '' });

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

	useLayoutEffect(() => {
		if (user) {
			navigate(routerPaths.main);
		}
	}, [user]);

	useLayoutEffect(() => {
		const code = params.get('code');
		if (code) {
			OAuthService.signIn({ code: code, redirect_uri: redirectUri }).then(() => {
				dispatch(updateAuth(true));
				dispatch(getUser());
				navigate(routerPaths.main);
			});
		}
	}, [dispatch, navigate, params]);

	const handleSignInWithYandex = () => {
		OAuthService.getServiceId(redirectUri).then(({ service_id }) => {
			window.location.href = getOauthProviderUri(service_id, redirectUri);
		});
	};

	const signInHandler = () => {
		const values = getValues();
		submitHandler(values);
	};

	return (
		<main className={styles.login}>
			{params.get('code') ? null : (
				<Spacer direction="column" gap="12" fullHeight fullWidth>
					<Spacer direction="column" gap="40" fullWidth>
						<Text tag="p" size="xxl" align="center" className={styles.title}>
							{'Galaxy \n Conquerors'}
						</Text>
						<FormCard
							text="Authorization"
							fullWidthFooter
							footer={
								<Spacer gap="20" align="center" direction="column" fullWidth>
									{userError?.reason && (
										<Text size="s" variant="error">
											{userError?.reason}
										</Text>
									)}
									<Button
										fullWidth
										type="submit"
										disabled={isSubmitting}
										onClick={handleSubmit(signInHandler)}>
										Sign In
									</Button>
									<Button
										fullWidth
										type="button"
										className={styles.signInYandex}
										onClick={handleSignInWithYandex}>
										<Spacer gap="20">
											Sign In
											<YandexIcon />
										</Spacer>
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
			)}
		</main>
	);
};
