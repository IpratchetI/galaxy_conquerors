import React, { useState, useEffect } from 'react';
import { Button, ButtonVariant } from '@components/Button';
import { Text } from '@components/Text';
import { Input } from '@components/Input';
import { useForm } from 'react-hook-form';
import { UserProfileModel } from '@models/User';
import { FormCard } from '@components/FormCard';

import UserProfileService from '@/services/userProfileService';
import { Spacer } from '@/components';
import { validate } from '@/utils/validate';

import { ChangePasswordPopup } from './components/ChangePasswordPopup';
import { Avatar } from './components/Avatar';
import { profileInputsConfig, profileInputsDefaults, profileApiEndpoints } from './constants';
import styles from './index.module.scss';

export const Profile = () => {
	const [isChangePasswordPopupOpen, setChangePasswordPopupOpen] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [profileData, setProfileData] = useState(profileInputsDefaults);

	const {
		register,
		getValues,
		handleSubmit,
		formState: { errors: validateErrors }
	} = useForm<UserProfileModel>({
		mode: 'onBlur',
		reValidateMode: 'onChange',
		defaultValues: profileInputsDefaults
	});

	useEffect(() => {
		const userProfileService = new UserProfileService(profileApiEndpoints);

		const fetchData = async () => {
			try {
				const avatar = await userProfileService.getAvatar();
				const profile = await userProfileService.getProfileData();

				setAvatarUrl(avatar);
				setProfileData(profile);
			} catch (error) {
				console.error('Ошибка при получении данных:', error);
			}
		};

		fetchData();
	}, []);

	const handleClosePasswordPopup = () => {
		setChangePasswordPopupOpen(false);
	};

	const handleOpenPasswordPopup = () => {
		setChangePasswordPopupOpen(true);
	};

	const handleSaveProfile = async () => {
		const userProfileService = new UserProfileService(profileApiEndpoints);
		const profileData = getValues();

		try {
			await userProfileService.saveProfileData(profileData);

			console.log('Профиль успешно сохранен');
		} catch (error) {
			console.error('Ошибка при сохранении профиля:', error);
		}
	};

	const handleBack = () => {
		// todo: Логика возврата
		console.log('back');
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
							<Button type="button" fullWidth onClick={handleOpenPasswordPopup}>
								<Text align="center" size="s">
									Change password
								</Text>
							</Button>
							<Spacer justify="between" fullWidth>
								<Button
									className={styles.button}
									type="submit"
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
									onClick={handleBack}>
									<Text align="center" size="s">
										Back
									</Text>
								</Button>
							</Spacer>
						</Spacer>
					}>
					<Spacer direction="column" gap="40">
						<Avatar avatarUrl={avatarUrl} />
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
