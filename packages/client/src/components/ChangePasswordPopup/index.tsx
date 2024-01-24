import React, { useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { Spacer } from '@/components';
import ChangePasswordService from '@/services/changePasswordService';

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
		const changePasswordService = new ChangePasswordService();

		try {
			await changePasswordService.changePassword(oldPassword, newPassword);
			console.log('Password changed successfully');
		} catch (error) {
			console.error('Error changing password:', error);
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
			{/* @ts-ignore */}
			<Input type="password" label="Old Password" name="oldPassword" onChange={handleInputChange} />
			{/* @ts-ignore */}
			<Input type="password" label="New Password" name="newPassword" onChange={handleInputChange} />
			<Spacer justify-content="space-between" margin-top="65px" spaceTop="50" gap="80">
				<Button type="button" onClick={handleSaveClick} text="Save" />
				<Button type="button" onClick={handleBackClick} text="Back" />
			</Spacer>
		</div>
	);
};

export default ChangePasswordPopup;
