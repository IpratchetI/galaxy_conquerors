import { useForm } from 'react-hook-form';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Spacer } from '@components/Spacer';
import { UserRegistrationModel } from '@models/user';
import { FormCard } from '@components/FormCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

import { routerPaths } from '@/constants/routerPaths';
import { regInputsConfig, regInputsDefaults } from '@/pages/Registration/constants';
import { validate } from '@/utils/validate';

import '@styles/main.scss';
import { Text } from '@/components';
import { signUpUser } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import styles from './index.module.scss';

export const Registration = () => {
	const dispatch = useAppDispatch();
	const { user, error: userError } = useAppSelector(userState);

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
		dispatch(signUpUser(data));
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
