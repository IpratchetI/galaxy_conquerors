import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import styles from './index.module.scss';

interface ChangePasswordPopupProps {
	onClose: () => void;
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ onClose }) => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'oldPassword') {
			setOldPassword(e.target.value);
		} else if (e.target.name === 'newPassword') {
			setNewPassword(e.target.value);
		}
	};

	const handleSaveClick = async () => {
		try {
			const response = await axios.put(
				'https://ya-praktikum.tech/api/v2/swagger/#/Users/put_user_password',
				{
					oldPassword,
					newPassword
				},
				{
					headers: {
						Authorization: `Bearer ${ACCESS_TOKEN}` // todo: добавить токен
					}
				}
			);
			console.log(response.data);
		} catch (error) {
			console.error('Error saving password:', error);
		}
	};

	const handleBackClick = () => {
		onClose();
	};

	const handlePopupClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className={styles.changePasswordPopup} onClick={handlePopupClick}>
			<Input
				type="password"
				label="Old Password"
				name="oldPassword"
				className={styles.input}
				onChange={handleInputChange}
			/>
			<Input
				type="password"
				label="New Password"
				name="newPassword"
				className={styles.input}
				onChange={handleInputChange}
			/>
			<div className={styles.buttonsContainer}>
				<Button type="button" className={styles.button} onClick={handleSaveClick} title="Save" />
				<Button type="button" className={styles.button} onClick={handleBackClick} title="Back" />
			</div>
		</div>
	);
};

export default ChangePasswordPopup;
