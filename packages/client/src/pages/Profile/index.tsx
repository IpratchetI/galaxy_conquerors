import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@components/Button';
import { Text } from '@components/Text';
import { Input } from '@components/Input';
import ChangePasswordPopup from '@components/ChangePasswordPopup';

import Avatar from '@/components/Avatar';
import { Spacer } from '@/components';

import styles from './index.module.scss';

const Profile = () => {
	const [isChangePasswordPopupOpen, setChangePasswordPopupOpen] = useState(false);
	const [avatarUrl, setAvatarUrl] = useState('');
	const [profileData, setProfileData] = useState({
		firstName: '',
		secondName: '',
		email: '',
		phone: '',
		login: ''
	});

	useEffect(() => {
		const fetchAvatar = async () => {
			try {
				const response = await axios.get('https://ya-praktikum.tech/api/v2/user/profile/avatar');
				setAvatarUrl(response.data.avatar);
			} catch (error) {
				console.error('Ошибка при получении аватара:', error);
			}
		};

		const fetchProfileData = async () => {
			try {
				const response = await axios.get('https://ya-praktikum.tech/api/v2/user/profile');
				setProfileData({
					firstName: response.data.first_name,
					secondName: response.data.second_name,
					email: response.data.email,
					phone: response.data.phone,
					login: response.data.login
				});
			} catch (error) {
				console.error('Ошибка при получении данных профиля:', error);
			}
		};

		fetchAvatar();
		fetchProfileData();
	}, []);

	const handleSaveProfile = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await axios.put('https://ya-praktikum.tech/api/v2/user/profile', {
				first_name: profileData.firstName,
				second_name: profileData.secondName,
				email: profileData.email,
				phone: profileData.phone,
				login: profileData.login
			});

			if (response.status === 200) {
				console.log('Профиль успешно сохранен');
			} else {
				console.error('Ошибка сохранения профиля');
			}
		} catch (error) {
			console.error('Ошибка сохранения профиля:', error);
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
		// Логика возврата
	};

	const handleInputChange = (name: string, value: string) => {
		setProfileData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	return (
		<main className={styles.background}>
			<Spacer direction="column" fullHeight gap="20">
				<div className={styles.profileContainer}>
					<Avatar avatarUrl={avatarUrl} />
					<div className={styles.profileForm}>
						<Text tag="h1" size="m" align="center" className={styles.title}>
							{'Profile'}
						</Text>
						<Input
							type="text"
							label="First Name"
							name="firstName"
							value={profileData.firstName}
							onChange={e => handleInputChange('firstName', e.target.value)}
						/>
						<Input
							type="text"
							label="Second Name"
							name="secondName"
							value={profileData.secondName}
							onChange={e => handleInputChange('secondName', e.target.value)}
						/>
						<Input
							type="email"
							label="Email"
							name="email"
							value={profileData.email}
							onChange={e => handleInputChange('email', e.target.value)}
						/>
						<Input
							type="tel"
							label="Phone"
							name="phone"
							value={profileData.phone}
							onChange={e => handleInputChange('phone', e.target.value)}
						/>
						<Input
							type="text"
							label="Login"
							name="login"
							value={profileData.login}
							onChange={e => handleInputChange('login', e.target.value)}
						/>
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
			</Spacer>
		</main>
	);
};

export default Profile;
