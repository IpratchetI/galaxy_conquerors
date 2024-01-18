import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Spacer } from '@/components';

import styles from './index.module.scss';

interface ChangePasswordPopupProps {
	onClose: () => void;
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ onClose }) => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'oldPassword') {
			setOldPassword(value);
		} else if (name === 'newPassword') {
			setNewPassword(value);
		}
	};

	const handleSaveClick = async () => {
		try {
			const formData = new FormData();
			formData.append('oldPassword', oldPassword);
			formData.append('newPassword', newPassword);

			const response = await axios.put('https://ya-praktikum.tech/api/v2/swagger/#/Users/put_user_password', formData, {
				headers: {
					Authorization: `Bearer ${ACCESS_TOKEN}`, // todo: добавить токен
					'Content-Type': 'multipart/form-data'
				}
			});
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
		<Spacer direction="column" fullHeight gap="80">
			<div className={styles.changePasswordPopup} onClick={handlePopupClick}>
				<Input type="password" label="Old Password" name="oldPassword" onChange={handleInputChange} />
				<Input type="password" label="New Password" name="newPassword" onChange={handleInputChange} />
				<div className={styles.buttonsContainer}>
					<Button type="button" onClick={handleSaveClick} title="Save" />
					<Button type="button" onClick={handleBackClick} title="Back" />
				</div>
			</div>
		</Spacer>
	);
};

export default ChangePasswordPopup;
