import React, { useState, ChangeEvent } from 'react';

import ChangePasswordService from '@/services/changePasswordService';
import { Button, Input, Spacer, Text, FormCard, Modal } from '@/components';

interface ChangePasswordPopupProps {
	onClose: () => void;
	isOpen?: boolean;
}

export const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
	onClose,
	isOpen = false
}) => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
		<Modal isOpen={isOpen} onClose={onClose}>
			<FormCard
				fullWidthContent
				footer={
					<Spacer justify="between" spaceTop="20" gap="80">
						<Button type="button" onClick={handleSaveClick}>
							<Text align="center" size="s">
								Save
							</Text>
						</Button>
						<Button type="button" onClick={handleBackClick}>
							<Text align="center" size="s">
								Back
							</Text>
						</Button>
					</Spacer>
				}>
				<Spacer direction="column" gap="40" fullWidth>
					{/* @ts-ignore */}
					<Input type="password" name="oldPassword" onChange={handleInputChange}>
						old password
					</Input>
					{/* @ts-ignore */}
					<Input type="password" name="newPassword" onChange={handleInputChange}>
						new password
					</Input>
				</Spacer>
			</FormCard>
		</Modal>
	);
};
