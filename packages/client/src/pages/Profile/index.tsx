import React, { useState, useEffect } from 'react';
import { Button, ButtonVariant } from '@components/Button';
import { Text } from '@components/Text';
import { Input } from '@components/Input';
import { useForm } from 'react-hook-form';
import { UserProfileModel } from '@models/models/user';
import { FormCard } from '@components/FormCard';
import { useNavigate } from 'react-router-dom';
import { LoadingMeta } from '@models/common';

import { Spacer } from '@/components';
import { validate } from '@/utils/validate';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUser } from '@/store/reducers/user/userActionCreator';

import { ChangePasswordPopup } from './components/ChangePasswordPopup';
import { Avatar } from './components/Avatar';
import { profileInputsConfig } from './constants';
import styles from './index.module.scss';

export const Profile = () => {
	const dispatch = useAppDispatch();
	const { user, isLoading, error: userError } = useAppSelector(state => state.userState);
	const [profileData, setProfileData] = useState(user);
	const [isChangePasswordPopupOpen, setChangePasswordPopupOpen] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserProfileModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		values: profileData
	});

	useEffect(() => {
		setProfileData(user);
	}, [user]);

	const handleClosePasswordPopup = () => {
		setChangePasswordPopupOpen(false);
	};

	const handleOpenPasswordPopup = () => {
		setChangePasswordPopupOpen(true);
	};

	const handleSaveProfile = async () => {
		try {
			const profileData = getValues();
			dispatch(updateUser(profileData));

			console.log('Профиль успешно сохранен');
		} catch (error) {
			console.error('Ошибка при сохранении профиля:', error);
		}
	};

	return (
		<main className={styles.background}>
			<Spacer>
				<FormCard
					className={styles.container}
					fullWidthContent
					fullWidthFooter
					footer={
						<Spacer direction="column" gap="16" spaceTop="30" fullWidth>
							{userError?.reason && (
								<Text size="s" variant="error">
									{userError?.reason}
								</Text>
							)}
							<Button type="button" fullWidth onClick={handleOpenPasswordPopup}>
								<Text align="center" size="s">
									Change password
								</Text>
							</Button>
							<Spacer justify="between" fullWidth>
								<Button
									className={styles.button}
									type="submit"
									disabled={isLoading === LoadingMeta.Loading}
									variant={ButtonVariant.DEFAULT}
									onClick={handleSubmit(handleSaveProfile)}>
									<Text align="center" size="s">
										Save
									</Text>
								</Button>
								<Button
									className={styles.button}
									type="button"
									variant={ButtonVariant.DEFAULT}
									onClick={() => navigate(-1)}>
									<Text align="center" size="s">
										Back
									</Text>
								</Button>
							</Spacer>
						</Spacer>
					}>
					<Spacer direction="column" gap="40">
						<Avatar />
						<Text tag="h1" align="center">
							Profile
						</Text>
						<form className={styles.form}>
							{profileInputsConfig.map(({ data: { fieldName, label, type }, validateOptions }) => {
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
					</Spacer>
				</FormCard>
				<ChangePasswordPopup
					onClose={handleClosePasswordPopup}
					isOpen={isChangePasswordPopupOpen}
				/>
			</Spacer>
		</main>
	);
};
