import React, { useState, useRef, useMemo } from 'react';
import { Button } from '@components/Button';
import { createAvatarPath } from '@pages/Profile/components/utils/createAvatarPath';

import { Input, Modal, Spacer, Text } from '@/components';
import { updateUserAvatar } from '@/store/reducers/user/userActionCreator';
import { useAppSelector, userState } from '@/store/selectors';
import { useAppDispatch } from '@/store';

import styles from './index.module.scss';

export const Avatar: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user, isLoading, error: userError } = useAppSelector(userState);

	const [isPopupOpen, setPopupOpen] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [saveImageError, setSaveImageError] = useState<boolean | null>(null);
	const avatarRef = useRef<HTMLDivElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const avatarUrl = () => {
		if (user?.avatar) {
			return createAvatarPath(user?.avatar);
		}

		return '';
	};

	const handleAvatarClick = () => {
		setPopupOpen(true);
	};

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}

		setSaveImageError(null);
	};

	const handleSaveImage = async () => {
		if (imageFile) {
			try {
				dispatch(updateUserAvatar(imageFile));

				console.log('File uploaded successfully');
			} catch (error) {
				setSaveImageError(true);
				console.error('Error during file upload:', error);
			}
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setImageFile(file);
			const fileUrl = URL.createObjectURL(file);
			setPreview(fileUrl);
		}
	};

	const handleClosePopup = (e?: React.MouseEvent) => {
		e?.stopPropagation();

		setPopupOpen(false);
		setImageFile(null);
		setPreview(null);
		setSaveImageError(null);
	};

	return (
		<div ref={avatarRef} onClick={handleAvatarClick}>
			<div className={styles.avatarMock} style={{ backgroundImage: `url(${avatarUrl()})` }} />
			<Modal isOpen={isPopupOpen} className={styles.modal} onClose={handleClosePopup}>
				<Spacer direction="column" fullWidth>
					<Spacer className={styles.imagePlaceholder} fullWidth>
						{preview ? (
							<img
								className={styles.preview}
								src={preview}
								alt="Изображение: Предпросмотр фотографии пользователя"
							/>
						) : (
							<Text align="center" size="s">
								{'Your image \n will be here'}
							</Text>
						)}
					</Spacer>
					{saveImageError && (
						<Spacer spaceTop="20">
							<Text align="left" size="xs" variant="error">
								An error has occurred. Please try again or come back later
							</Text>
						</Spacer>
					)}
					{userError?.reason && (
						<Text size="s" variant="error">
							{userError?.reason}
						</Text>
					)}
					<Input
						ref={fileInputRef}
						className={styles.avatarInput}
						type="file"
						accept=".jpeg, .jpg, .png, .gif, .webp"
						// @ts-ignore
						onChange={handleFileChange}
					/>
					<Spacer direction="column" fullHeight fullWidth gap="50" spaceTop="40">
						{preview ? (
							<Spacer direction="column" gap="20" fullWidth>
								<Button disabled={isLoading} fullWidth onClick={handleSaveImage}>
									<Text align="center" size="s">
										Confirm
									</Text>
								</Button>
								<Button fullWidth onClick={handleImageClick}>
									<Text align="center" size="s">
										Choose another
									</Text>
								</Button>
							</Spacer>
						) : (
							<Button fullWidth onClick={handleImageClick}>
								<Text align="center" size="s">
									Choose Image
								</Text>
							</Button>
						)}
						<Button fullWidth onClick={handleClosePopup}>
							<Text align="center" size="s">
								Cancel
							</Text>
						</Button>
					</Spacer>
				</Spacer>
			</Modal>
		</div>
	);
};
