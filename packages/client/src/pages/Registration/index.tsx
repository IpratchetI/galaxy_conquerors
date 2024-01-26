import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { UserRegistrationModel } from '@models/models/user';
import { FormCard } from '@components/FormCard';
import { AuthService } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from '@components/AuthProtection/AuthProvider/AuthProvider';

import { routerPaths } from '@/constants/routerPaths';
import { regInputsConfig, regInputsDefaults } from '@/pages/Registration/constants';
import { validate } from '@/utils/validate';

import '@styles/main.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Text } from '@/components';
import { catchError } from '@/store/reducers/user/userReducer';
import { DEFAULT_ERROR } from '@/store/constants/error';

import styles from './index.module.scss';

import { AxiosError } from 'axios';

export const Registration = () => {
	const dispatch = useAppDispatch();
	const {
		authState: [_, setAuthorized]
	} = useAuth();
	const { error: userError } = useAppSelector(state => state.userState);

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors, isSubmitting }
	} = useForm<UserRegistrationModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: regInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = async (data: UserRegistrationModel) => {
		try {
			const { status } = await AuthService.signUp(data);

			if (status === 200) {
				setAuthorized(true);
				navigate(routerPaths.main);
				dispatch(catchError());
			}
		} catch (e) {
			const error = e as AxiosError;
			dispatch(catchError(error.response?.data ?? DEFAULT_ERROR));
		}
	};

	const registerHandler = () => submitHandler(getValues());

	return (
		<main className={styles.registration}>
			<Spacer fullHeight>
				<FormCard
					text="Registration"
					fullWidthContent
					footer={
						<Spacer gap="20" direction="column">
							{userError?.reason && (
								<Text size="s" variant="error">
									{userError?.reason}
								</Text>
							)}
							<Button type="submit" disabled={isSubmitting} onClick={handleSubmit(registerHandler)}>
								Register
							</Button>
							<Button onClick={() => navigate(-1)}>Back</Button>
						</Spacer>
					}>
					<form>
						{regInputsConfig.map(({ data: { fieldName, label, type }, validateOptions }, index) => {
							const error = validateErrors[fieldName];
							const value = getValues()[fieldName];
							const isFieldRequired = Boolean(validateOptions.required);

							return (
								<Spacer key={`${fieldName}-${index}`} fullWidth>
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
								</Spacer>
							);
						})}
					</form>
				</FormCard>
			</Spacer>
		</main>
	);
};
