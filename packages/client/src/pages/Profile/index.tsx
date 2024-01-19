import React, { useState, useEffect } from 'react';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { Input } from '@components/Input';
import ChangePasswordPopup from '@components/ChangePasswordPopup';
import { ProfileData } from '@models/ProfileData';

import Avatar from '@/components/Avatar';
import UserProfileService from '@/services/userProfileService';

import { profileInputsConfig, profileInputsDefaults, profileApiEndpoints } from './constants';
import styles from './index.module.scss';

const Profile = () => {
	const [isChangePasswordPopupOpen, setChangePasswordPopupOpen] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [profileData, setProfileData] = useState<ProfileData>(profileInputsDefaults);

	useEffect(() => {
		const userProfileService = new UserProfileService(profileApiEndpoints);

		const fetchData = async () => {
			try {
				const avatar = await userProfileService.getAvatar();
				const profile = await userProfileService.getProfileData();

				setAvatarUrl(avatar);
				setProfileData(profile);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	const handleSaveProfile = async (e: React.FormEvent) => {
		e.preventDefault();

		const userProfileService = new UserProfileService(profileApiEndpoints);

		try {
			await userProfileService.saveProfileData(profileData);

			console.log('Profile saved successfully');
		} catch (error) {
			console.error('Error saving profile:', error);
		}
	};

	const handleOpenPasswordPopup = () => {
		setChangePasswordPopupOpen(true);
		document.body.style.overflow = 'hidden';
	};

	const handleClosePasswordPopup = () => {
		setChangePasswordPopupOpen(false);
		document.body.style.overflow = '';
	};

	const handleBack = () => {
		// todo: Логика возврата
	};

	const handleInputChange = (name: string, value: string) => {
		setProfileData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	return (
		<main className={styles.background}>
			<div className={styles.profileContainer}>
				<Avatar avatarUrl={avatarUrl} />
				<div className={styles.profileForm}>
					<Text tag="h1" size="m" align="center" className={styles.title}>
						{'Profile'}
					</Text>
					<form>
						{profileInputsConfig.map(({ fieldName, label }) => (
							<Input
								key={fieldName}
								type="text"
								label={label}
								name={fieldName}
								value={profileData[fieldName]}
								onChange={e => handleInputChange(fieldName, e.target.value)}
							/>
						))}
					</form>
					<div className={styles.buttonsContainer}>
						<Button
							type="button"
							className={styles.buttonWide}
							onClick={handleOpenPasswordPopup}
							title="Change Password"
						/>
						<Button type="submit" className={styles.button} onClick={handleSaveProfile} title="Save" />
						<Button type="button" className={styles.button} onClick={handleBack} title="Back" />
					</div>
				</div>
			</div>
			{isChangePasswordPopupOpen && (
				<div className={styles.overlay} onClick={handleClosePasswordPopup}>
					<ChangePasswordPopup onClose={handleClosePasswordPopup} />
				</div>
			)}
		</main>
	);
};

export default Profile;
