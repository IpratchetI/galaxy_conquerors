import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { UserLoginModel, UserRegistrationModel } from '@models/models/user';
import { FormCard } from '@components/FormCard';
import { AuthService } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { LoadingMeta } from '@models/common';

import { routerPaths } from '@/constants/routerPaths';
import { regInputsConfig, regInputsDefaults } from '@/pages/Registration/constants';
import { validate } from '@/utils/validate';

import '@styles/main.scss';
import { useAppSelector } from '@/store/hooks';
import { Text } from '@/components';

import styles from './index.module.scss';

import { useAuth } from '@components/AuthProtection/AuthProvider/AuthProvider';

export const Registration = () => {
	const {
		authState: [_, setAuthorized]
	} = useAuth();
	const { user, isLoading, error: userError } = useAppSelector(state => state.userState);

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserRegistrationModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: regInputsDefaults
	});

	const navigate = useNavigate();

	const submitHandler = (data: UserLoginModel) => {
		AuthService.signUp(data).then(() => {
			setAuthorized(true);
		});
	};

	useEffect(() => {
		if (user) {
			navigate(routerPaths.main);
		}
	}, [user]);

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
							<Button
								type="submit"
								disabled={isLoading === LoadingMeta.Loading}
								onClick={handleSubmit(registerHandler)}>
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
